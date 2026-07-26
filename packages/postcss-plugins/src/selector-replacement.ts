import fs from "node:fs";
import path from "node:path";
import { config } from "@web-app-class-maps/scripts";
import type { PluginCreator } from "postcss";
import yargs from "yargs";

const PAGES = [
	"steamaccountpreferences",
	"steamapppage",
	"steamclient",
	"steamgameslist",
	"steamnotificationspage",
	"steamprofileedit",
	"steamshoppingcart",
	"steamstoremenu",
];
const STEAM_PAGES = new Set(
	PAGES.filter((e) => e.startsWith("steam")).map((e) => e.replace("steam", "")),
);
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
		// Steam stuff is scattered all across the websites, so make this
		// consistent with others in the future, i.e. for Steam it can be
		// "src/steam/web/apppage", "src/steam/client", for Discord just
		// "src/discord", etc.
		const page = splitPath.find((e) => PAGES.includes(e));
		const steamPage = splitPath.find((e) => STEAM_PAGES.has(e));
		const resolvedPage = page ?? (steamPage ? `steam${steamPage}` : undefined);
		if (!resolvedPage) {
			return;
		}

		const map = getClassMap(resolvedPage);
		if (!map) {
			console.error("[%s] no such map", resolvedPage);
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
