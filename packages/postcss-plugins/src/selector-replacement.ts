import path from "node:path";
import { getClassMap, type Page } from "@web-app-class-maps/scripts";
import type { PluginCreator, Rule } from "postcss";

interface PluginOptions {
	/**
	 * Return `true` to skip selector replacement for a path.
	 *
	 * @param path Relative path to the current working directory.
	 *
	 * @example
	 * This will return `true` for `src/steam/client/shared/vars.css`,
	 * and `false` for `src/steam/common/steamavatar.scss`.
	 * ```js
	 * (path) => path.startsWith("steam/client/shared") || path.startsWith("steam/web/vars");
	 * ```
	 */
	ignore: (path: string) => boolean;
}

const DEFAULT_OPTIONS: PluginOptions = {
	ignore: () => false,
};

const PAGES: Page[] = [
	"steamaccountpreferences",
	"steamapppage",
	"steamclient",
	"steamnotificationspage",
	"steamprofileedit",
];
const STEAM_PAGES = new Set(
	PAGES.filter((e) => e.startsWith("steam")).map((e) => e.replace("steam", "")),
);
const SELECTOR = /#([\w-]+)/g;

const cwd = process.cwd();

export const selectorReplacementPlugin: PluginCreator<PluginOptions> = (
	opts = DEFAULT_OPTIONS,
) => ({
	async OnceExit(css) {
		const inputFile = css.source.input.file;
		const inputFileName = path.parse(inputFile).name;

		// Collect all rules for later, since walkRules doesn't support async
		const rules: Rule[] = [];
		css.walkRules((rule) => {
			rules.push(rule);
		});
		//console.log(rules.map((e) => e.selector).join("\n"));

		// This will get used later on for the latest files that were found in
		// the class map, i.e. an SCSS file that is *only* used for including
		// the @use spam is *not* going to be included on the list.
		const prevModNames: string[] = [];

		for (const rule of rules) {
			const { input, start } = rule.source;
			const pos = input.origin(start.line, start.column);
			const file = pos === false || !pos.file ? inputFile : pos.file;
			const relPath = path.relative(cwd, file);
			const ignored = opts.ignore(relPath);
			if (ignored) {
				continue;
			}

			const fileName = path.basename(file);
			const getPage = (filePath: string) => {
				const splitPath = filePath.split(path.sep);
				const page = splitPath.find((e) => PAGES.includes(e as Page));
				const steamPage = splitPath.find((e) => STEAM_PAGES.has(e));
				return (page ??
					(steamPage ? (`steam${steamPage}` as Page) : undefined)) as Page;
			};
			// Steam stuff is scattered all across the websites, so make this
			// consistent with others in the future, i.e. for Steam it can be
			// "src/steam/web/apppage", "src/steam/client", for Discord just
			// "src/discord", etc.
			const resolvedPage = getPage(inputFile) ?? getPage(file);
			if (!resolvedPage) {
				continue;
			}

			const map = await getClassMap(resolvedPage);
			if (!map) {
				console.error("[%s] no such map", resolvedPage);
				continue;
			}

			const modName = path.parse(fileName).name;
			const lastRealMod = prevModNames.findLast((e) => e !== modName);
			const mod = map[modName] ?? map[lastRealMod];
			const a = [
				":where(#TabTimer #TimePart:not(#Running))",
				":where(#TabTimer #TimePart:not(#Running)) #ContentBox",
			].some((e) => rule.selector === e);
			a &&
				console.log("%o", {
					a: rule.selector,
					file,
					fileName,
					lastRealMod,
					mod: !!mod,
					modName,
					prevModNames: prevModNames.slice(-10),
					relPath,
				});
			if (!mod) {
				console.error("[%s] no such module", fileName, rule.selector);
				continue;
			}

			if (modName !== prevModNames.at(-1)) {
				prevModNames.push(modName);
			}
			rule.selector = rule.selector.replace(SELECTOR, (_, s) => {
				const id = mod[s];
				if (!id) {
					console.error("[%s] %o is undefined", fileName, `#${s}`);
					return;
				}

				return `.${id}`;
			});
		}
	},
	postcssPlugin: "selector-replacement",
});
selectorReplacementPlugin.postcss = true;
