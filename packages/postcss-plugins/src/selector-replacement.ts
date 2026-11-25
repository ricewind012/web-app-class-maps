import path from "node:path";
import { getClassMap, type Page } from "@web-app-class-maps/scripts";
import type { PluginCreator, Rule } from "postcss";

interface PluginOptions {
	/**
	 * Return `true` to mark these files as not being candidates for class name
	 * replacement.
	 *
	 * @param path Relative path to the current working directory.
	 *
	 * @example
	 * `mixins/controls.scss`:
	 * ```scss
	 * \@mixin radio {
	 *     #Group {
	 *         display: none;
	 *     }
	 * }
	 * ```
	 *
	 * `controls/radio.scss`:
	 * ```scss
	 * \@use "mixins/controls";
	 *
	 * #Button {
	 *     \@include controls.radio;
	 * }
	 * ```
	 *
	 * If this returns `true` for `mixins/controls.scss`, then `#Group` will use
	 * the `Group` class name from the `radio` module, and if not, it will use
	 * it from the `controls` module instead.
	 */
	ignoreExternalRules: (path: string) => boolean;

	/**
	 * Return `true` to skip selector replacement for a path.
	 *
	 * @param path Relative path to the current working directory.
	 *
	 * @example
	 * This will return `true` for `src/steam/client/shared/vars.css`,
	 * and `false` for `src/steam/common/steamavatar.scss`.
	 * ```js
	 * (path) => path.startsWith("src/steam/client/shared") || path.startsWith("src/steam/web/vars");
	 * ```
	 */
	ignoreReplacement: (path: string) => boolean;
}

const DEFAULT_OPTIONS: PluginOptions = {
	ignoreExternalRules: () => false,
	ignoreReplacement: () => false,
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

		// This will get used later on for the latest files that were found in
		// the class map, i.e. an SCSS file that is *only* used for including
		// the @use spam is *not* going to be included on the list.
		const prevModNames: string[] = [];

		// Pass 1: #Field in gamepaddialog.css -> #gamepaddialog_Field
		const rules: Rule[] = [];
		css.walkRules((rule) => {
			if (!SELECTOR.test(rule.selector)) {
				return;
			}

			const { input, start } = rule.source;
			const pos = input.origin(start.line, start.column);
			const file = pos === false || !pos.file ? inputFile : pos.file;
			const relPath = path.relative(cwd, file);
			if (opts.ignoreReplacement(relPath)) {
				//console.log(rule.selector)
				//rules.push(rule);
				//return;
			}

			const modName = path.parse(file).name;
			const externalIgnored = opts.ignoreExternalRules(relPath);
			const lastRealMod = externalIgnored
				? (prevModNames.findLast((e) => e !== modName) ?? modName)
				: modName;
			if (!externalIgnored) {
				prevModNames.push(modName);
			}

			const a = [
				//":where(#TabTimer #TimePart:not(#Running))",
				//":where(#TabTimer #TimePart:not(#Running)) #ContentBox",
				"#SortingDropDownControlButton",
				"#SortingDropDownControlButton:disabled",
				"#TabTimer #TimePartEdit:disabled",
			].some((e) => rule.selector === e);
			if (a) {
				console.log({
					a: modName,
					ab: [modName, prevModNames.at(-1), lastRealMod],
					b: lastRealMod,
					file,
					//prevModNames,
					selA: rule.selector,
					selB: rule.selector.replace(SELECTOR, (_, s) => {
						return `#${lastRealMod}_${s}`;
					}),
				});
			}
			rule.selector = rule.selector.replace(SELECTOR, (_, s) => {
				return `#${lastRealMod}_${s}`;
			});
			rules.push(rule);
		});

		// Pass 2: #gamepaddialog_Field -> the class name in the map
		for (const rule of rules) {
			const { input, start } = rule.source;
			const pos = input.origin(start.line, start.column);
			const file = pos === false || !pos.file ? inputFile : pos.file;

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

			const a = [
				//":where(#TabTimer #TimePart:not(#Running))",
				//":where(#TabTimer #TimePart:not(#Running)) #ContentBox",
				"#SortingDropDownControlButton",
				"#SortingDropDownControlButton:disabled",
				"#overlaytimer_TabTimer #overlaytimer_TimePartEdit:disabled",
			].some((e) => rule.selector === e);
			if (a) {
				console.log({
					file,
					sel: rule.selector,
				});
			}

			rule.selector = rule.selector.replace(
				/#([a-z_]+)_([\w-]+)/g,
				(_, modName, className) => {
					//return _;
					const mod = map[modName];
					if (!mod) {
						console.error("[%s] no such module", modName, `#${className}`);
						return;
					}

					modName === "radio" &&
						className === "SortingDropDownControlButton" &&
						console.log({ _ });

					const id = mod[className];
					if (!id) {
						console.error("[%s] %o is undefined", modName, `#${className}`);
						return;
					}

					return `.${id}`;
				},
			);
		}
	},
	postcssPlugin: "selector-replacement",
});
selectorReplacementPlugin.postcss = true;
