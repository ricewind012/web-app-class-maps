import fs from "node:fs/promises";
import path from "node:path";
import postcss, { type PluginCreator } from "postcss";
import { getClassMap, type Page } from "../api.js";
import type { ClassModuleMap } from "../shared.js";

const NEW_CSS_PATH = "migrated";
const SELECTOR = /\.([\w-]+)/g;

const newFiles: Record<string, string[]> = {};
const notFound: string[] = [];
const unsorted: string[] = [];

let classes: ClassModuleMap;
let modules: string[];
let keys: Record<string, string[]>;

/**
 * @param {string} name Obfuscated class name.
 * @returns [module, readableName]
 */
function findReadableClass(name: string): [string, string] {
	for (const mod of modules) {
		const newName = keys[mod].find((e) => classes[mod][e] === name);
		if (newName) {
			return [mod, newName];
		}
	}

	return ["", name];
}

const processFilePlugin: PluginCreator<never> = () => ({
	Once(css) {
		css.walkRules((rule) => {
			rule.selector = rule.selector.replace(SELECTOR, (_, match) => {
				const [mod, className] = findReadableClass(match);
				return mod === "" ? `.${match}` : `#${mod}_${className}`;
			});

			const modsInSelector = new Set(
				[...rule.selector.matchAll(/#([a-z]+)_/g)].map((e) => e[1]),
			);
			if (modsInSelector.size === 1) {
				const mod = [...modsInSelector][0];
				if (!newFiles[mod]) {
					newFiles[mod] = [];
				}

				rule.selector = rule.selector.replaceAll(`${mod}_`, "");
				newFiles[mod].push(rule.toString());
			} else if (modsInSelector.size === 0) {
				notFound.push(rule.toString());
			} else {
				unsorted.push(rule.toString());
			}
		});
	},
	postcssPlugin: "process-file",
});
processFilePlugin.postcss = true;

export async function execute(page: Page) {
	const classMap = await getClassMap(page);

	classes = classMap;
	modules = Object.keys(classes);
	keys = modules
		.map((e) => ({ [e]: Object.keys(classes[e]) }))
		.reduce((a, b) => Object.assign(a, b));

	const files = await fs.readdir(process.cwd(), {
		encoding: "utf8",
		recursive: true,
	});
	for (const file of files.filter((e) => e.endsWith(".css"))) {
		await postcss([processFilePlugin()]).process(await fs.readFile(file), {
			from: file,
		});
	}

	await fs.mkdir(NEW_CSS_PATH, { recursive: true });
	for (const mod of Object.keys(newFiles)) {
		await fs.writeFile(
			path.join(NEW_CSS_PATH, `${mod}.css`),
			newFiles[mod].join("\n\n"),
		);
	}
	await fs.writeFile(
		path.join(NEW_CSS_PATH, "_NOTFOUND.css"),
		notFound.join("\n\n"),
	);
	await fs.writeFile(
		path.join(NEW_CSS_PATH, "_UNSORTED.css"),
		unsorted.join("\n\n"),
	);
}
