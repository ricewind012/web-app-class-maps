import fs from "node:fs";
import path from "node:path";
import type { PluginCreator } from "postcss";
import yargs from "yargs";
import { config } from "../api.js";

const PAGES = [
	"accountpreferences",
	"apppage",
	"client",
	"gameslist",
	"notificationspage",
	"profileedit",
	"shoppingcart",
	"storemenu",
];
const SELECTOR = /#(\w+)/g;

const argv = yargs(process.argv)
	.options({ base: { type: "string" } })
	.parseSync();
const cwd = process.cwd();
const classMap: Record<string, Record<string, string>> = {};

/**
 * Gets a class map on demand rather than reading all files at once.
 */
function getClassMap(page: string) {
	if (classMap[page]) {
		return classMap[page];
	}

	const pagePath = path.join(config.classMaps, `${page}.json`);
	if (!fs.existsSync(pagePath)) {
		return;
	}

	classMap[page] = JSON.parse(fs.readFileSync(pagePath, "utf8"));
	return classMap[page];
}

export const selectorReplacementPlugin: PluginCreator<never> = () => ({
	Once(css) {
		const { file } = css.source.input;
		const fileName = path.basename(file);

		const splitPath = file.split(path.sep);
		const page = PAGES.find((e) => splitPath.includes(e));
		if (!page) {
			return;
		}

		const map = getClassMap(page);
		if (!map) {
			console.error("[%s] no such map", page);
			return;
		}

		const modName = path.parse(fileName).name;
		const mod = map[modName];
		const ignoredPaths = config.ignore || [];
		const src = path.join(cwd, argv.base);
		const skipFile = ignoredPaths.some((e) =>
			file.startsWith(path.join(src, e)),
		);
		if (!mod) {
			if (!skipFile) {
				console.error("[%s] no such module", fileName);
			}
			return;
		}

		css.walkRules((rule) => {
			rule.selector = rule.selector.replace(SELECTOR, (_, s) => {
				const id = mod[s];
				if (!id) {
					console.error("[%s] %o is undefined", fileName, `#${s}`);
					return;
				}

				return `.${id}`;
			});
		});
	},
	postcssPlugin: "selector-replacement",
});
selectorReplacementPlugin.postcss = true;
