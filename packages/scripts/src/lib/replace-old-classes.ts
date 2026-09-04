import fs from "node:fs";
import postcss, { type PluginCreator } from "postcss";
import type { ClassModuleMap } from "../shared.js";

// This is pretty much a Steam-exclusive practice either way
const CLASS_MAP_FILE = "client.json";
const OLD_CLASS_MAP_FILE = "client_old.json";
const SELECTOR = /\.([\w-]+)/g;

if ([CLASS_MAP_FILE, OLD_CLASS_MAP_FILE].some((e) => !fs.existsSync(e))) {
	console.log("Usage:");
	console.log(
		"1. Run %o on stable Steam.",
		"bun x @web-app-class-maps/scripts build-class-modules",
	);
	console.log("2. Move %o to %o.", CLASS_MAP_FILE, OLD_CLASS_MAP_FILE);
	console.log("3. Run the same command on beta Steam.");
	process.exit(1);
}

interface SelectorReplacerOptions {
	match: RegExp;
	replace: (substring: string, ...args: string[]) => string;
}

const selectorReplacerPlugin: PluginCreator<SelectorReplacerOptions> = (
	opts,
) => ({
	Once(css) {
		css.walkRules((rule) => {
			rule.selector = rule.selector.replace(opts.match, opts.replace);
		});
	},
	postcssPlugin: "selector-replacement",
});
selectorReplacerPlugin.postcss = true;

const cwd = process.cwd();
const oldClasses = JSON.parse(
	fs.readFileSync(OLD_CLASS_MAP_FILE, "utf8"),
) as ClassModuleMap;
const newClasses = JSON.parse(
	fs.readFileSync(CLASS_MAP_FILE, "utf8"),
) as ClassModuleMap;
const modules = Object.keys(oldClasses);
const keys = modules
	.map((e) => ({ [e]: Object.keys(oldClasses[e]) }))
	.reduce((a, b) => Object.assign(a, b));

function findNewClassFromOld(oldName: string): string {
	for (const mod of modules) {
		const className = keys[mod].find((e) => oldClasses[mod][e] === oldName);
		const newName = newClasses[mod]?.[className];
		if (!newName) {
			continue;
		}

		if (oldName !== newName) {
			console.log("Changed %o to %o", oldName, newName);
		}

		return `.${newName}`;
	}

	return `.${oldName}`;
}

export async function execute() {
	const files = fs.readdirSync(cwd, { encoding: "utf8", recursive: true });
	for (const file of files.filter((e) => e.endsWith(".css"))) {
		postcss([
			selectorReplacerPlugin({
				match: SELECTOR,
				replace: (_, s) => findNewClassFromOld(s),
			}),
		])
			.process(fs.readFileSync(file), {
				from: file,
			})
			.then(({ css }) => {
				fs.writeFileSync(file, css);
				console.log("[%s] done", file);
			});
	}
}
