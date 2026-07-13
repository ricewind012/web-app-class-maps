import type { PluginCreator, Rule } from "postcss";

interface PluginOptions {
	/**
	 * List of paths to ignore.
	 */
	filter: RegExp[];
}

const DEFAULT_OPTIONS: PluginOptions = {
	filter: [],
};

/**
 * Appends `!important` to all declarations. Filter paths with
 * {@link PluginOptions.filter}.
 */
export const appendImportantPlugin: PluginCreator<PluginOptions> = (
	opts = DEFAULT_OPTIONS,
) => ({
	Once(css) {
		css.walkRules((rule) => {
			const nodes = rule.nodes.filter((node) => {
				// weird shit
				const parent = node.parent as Rule;
				return !opts.filter.some((e) => e.test(parent.selector));
			});
			for (const node of nodes) {
				if (node.type !== "decl") {
					continue;
				}

				// !important is invalid in @keyframes
				// TODO: is this needed since the above if ?
				const pp = node.parent.parent;
				if (pp.type === "atrule" && pp.name === "keyframes") {
					continue;
				}

				node.important = true;
			}
		});
	},
	postcssPlugin: "append-important",
});
appendImportantPlugin.postcss = true;
