import { color } from "bun";
import { parseSync, Visitor } from "oxc-parser";
import { getFuncName, isReactComponent, isSSRClassName } from "./ast-utils";
import { componentClassNameFilterMap } from "./class-name-lists/steam-web-shared-object";
import type { ComponentListItem } from "./class-name-lists/types";
import {
	type ReactComponentInfo,
	uniquelyIdReactComponent,
} from "./react-component-id";
import {
	changeFunctionDepth,
	classNameByVarName,
	isInFunction,
	state,
} from "./state";

const COMMON_REACT_PROPS = new Set(["children", "className", "ref"]);
const BLACKLISTED_OBJ_EXPR_KEYS = new Set([
	...COMMON_REACT_PROPS,
	// BB code init objects
	"Constructor",
]);

const c = {
	gray: color("gray", "ansi"),
	reset: "\x1b[m",
	white: color("white", "ansi"),
};

function printClasses(lhs: string[], rhs: string[]) {
	// One of them may be bigger while filling up
	const len = Math.max(lhs.length, rhs.length);
	for (let i = 0; i < len; i++) {
		const a = (lhs[i] ?? "").padStart(13);
		const b =
			rhs[i] === ""
				? `${c.gray}-- skipped --${c.reset}`
				: `${c.white}${rhs[i] ?? ""}${c.reset}`;
		console.log("%s %s|%s %s", a, c.gray, c.reset, b);
	}
}

export async function parseFile(source: string, list: string) {
	const classMap = new Map<string, Record<string, string>>();
	const file =
		source
			.slice(source.lastIndexOf("\n") + 1, source.length)
			.match(/^\/\/# sourceMappingURL=(.*)\.map$/)?.[1] ?? "";
	const errorMsg = (() => {
		switch (true) {
			case file.includes(" as language,"):
				return `${file} is a localization file`;
			case !/`[a-zA-Z0-9]{11}-`/.test(source) &&
				!/`_[a-zA-Z0-9]{12}-`/.test(source):
				return `${file} has no class names`;
		}
	})();
	if (errorMsg) {
		console.error(errorMsg);
		return classMap;
	}

	const { errors, program } = parseSync(file, source);
	if (errors.length > 0) {
		console.error(errors);
		return classMap;
	}

	const visitor = new Visitor({
		CallExpression(node) {
			const name = getFuncName(node);
			if (name !== "forwardRef" && name !== "memo") {
				return;
			}

			const component = node.arguments[0];
			const info = uniquelyIdReactComponent(source, component);
			if (!info) {
				return;
			}

			state.components[state.index] ||= [];
			state.components[state.index].push(info);
		},
		FunctionDeclaration(node) {
			changeFunctionDepth(true);
			if (!isReactComponent(node)) {
				//return;
			}

			const info = uniquelyIdReactComponent(source, node);
			if (!info) {
				return;
			}

			state.components[state.index] ||= [];
			state.components[state.index].push(info);
			state.classesInlined[state.index] ||= [];
			state.classesInlined[state.index].push(...info.classes);
		},
		"FunctionDeclaration:exit"() {
			changeFunctionDepth(false);
		},
		// If the CSS module is referenced like[`this`] in the code, it will include
		// both inlined classes, and the module itself right after
		ObjectExpression(node) {
			if (list !== "steam-web-shared") {
				return;
			}

			// Only inspect top-level objects
			if (isInFunction()) {
				return;
			}

			// Empty object
			if (node.properties.length === 0) {
				return;
			}

			const pairs: [string, string][] = [];
			for (const prop of node.properties) {
				if (prop.type !== "Property") {
					continue;
				}

				const k = prop.key;
				if (k.type === "Identifier" && BLACKLISTED_OBJ_EXPR_KEYS.has(k.name)) {
					return;
				}

				const v = prop.value;
				// Any other objects
				if (v.type !== "Identifier" && v.type !== "TemplateLiteral") {
					return;
				}

				if (k.type === "Literal" && v.type === "TemplateLiteral") {
					// Raw string
					pairs.push([String(k.value), v.quasis[0].value.raw]);
				} else if (k.type === "Identifier" && v.type === "Identifier") {
					// A variable is being used
					const realClassName = classNameByVarName.get(v.name);
					// They are all being declared *right before* the object, so
					// satisfy TypeScript
					if (!realClassName) {
						return;
					}

					pairs.push([k.name, realClassName]);
				}
			}

			const component = Object.keys(componentClassNameFilterMap).find((key) =>
				pairs.some(([k]) => k === componentClassNameFilterMap[key]),
			);
			if (!component) {
				return;
			}

			const ckv: Record<string, string> = {};
			for (const [k, v] of pairs) {
				ckv[k] = v;
			}
			classMap.set(component, ckv);
		},
		// VariableDeclarator isn't used because it would ++ the index on each
		// variable declaration instead of once
		VariableDeclaration(node) {
			const classes: string[] = [];
			const classesInlined: string[] = [];
			const components: ReactComponentInfo[] = [];
			for (const decl of node.declarations) {
				// Class name variables are always initialized
				if (!decl.init) {
					continue;
				}

				if (decl.id.type !== "Identifier") {
					continue;
				}

				// React component
				if (decl.init.type === "CallExpression") {
					const info = uniquelyIdReactComponent(source, decl.init);
					if (!info) {
						continue;
					}

					classesInlined.push(...info.classes);
					components.push(info);
					continue;
				}

				// SSR strings are always templates without variables
				if (
					decl.init.type !== "TemplateLiteral" ||
					decl.init.quasis.length > 1
				) {
					continue;
				}

				const value = decl.init.quasis[0].value.raw;
				// Data URIs, 0.01ms shaven off
				if (value.slice(0, 5) === "data:") {
					continue;
				}

				if (!isSSRClassName(decl.init)) {
					continue;
				}

				classes.push(value);
			}

			if (classes.length === 0) {
				if (classesInlined.length !== 0) {
					state.classesInlined[state.index] = classesInlined;
					state.components[state.index] = components;
				}
				return;
			}

			// If all variables pass the checks, this is a new CSS module "object".
			// Immediately fill the arrays with existing info, the "components" and
			// "classesInlined" keys are already from forwardRef/memo components
			state.index++;
			state.classes[state.index] = classes;
			state.classesInlined[state.index] = classesInlined;
			state.components[state.index] = components;
		},
		VariableDeclarator(node) {
			// SSR strings are always templates without variables
			if (
				node.id.type !== "Identifier" ||
				node.init?.type !== "TemplateLiteral" ||
				node.init.quasis.length > 1
			) {
				return;
			}

			const value = node.init.quasis[0].value.raw;
			// Data URIs
			if (value.slice(0, 5) === "data:") {
				return;
			}

			if (!isSSRClassName(node.init)) {
				return;
			}

			classNameByVarName.set(node.id.name, value);
		},
	});
	visitor.visit(program);

	const { componentList } = (await import(`./class-name-lists/${list}`)) as {
		componentList: Record<string, ComponentListItem>;
	};
	console.log(state.components.map((e) => e.map((e) => e?.strings)));
	// Start from 1, since variables are declared first
	for (let i = 1; i <= state.index; i++) {
		const components = state.components[i];
		outer: for (const info of components) {
			for (const [name, listItem] of Object.entries(componentList)) {
				if (!listItem.filter(info)) {
					continue;
				}

				const lhs = state.classes[i];
				const rhs = listItem.classes;
				const lhsInline = state.classesInlined[i];
				const rhsInline = listItem.classesInlined ?? lhsInline; // skip if it doesn't exist
				const kv: Record<string, string> = {};
				for (const [a, b] of [
					[lhs, rhs],
					[lhsInline, rhsInline],
				]) {
					// Check if they got changed... instantly error if so, because
					// the rest is now bogus
					if (a.length === b.length) {
						for (let i = 0; i < a.length; i++) {
							if (b[i] === "") {
								continue;
							}

							kv[b[i]] = a[i];
						}
						classMap.set(name, kv);
						continue;
					}

					console.error("Class name length doesn't match!\nInfo: %o\nList:", {
						component: name,
						file,
						isInline: a === lhsInline,
					});
					printClasses(a, b);
					process.exit(1);
				}

				delete componentList[name];
				break outer;
			}
		}
	}
	return classMap;
}
