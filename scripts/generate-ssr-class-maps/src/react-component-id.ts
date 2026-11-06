import {
	type ObjectExpression,
	parseSync,
	type Span,
	Visitor,
} from "oxc-parser";
import { getFuncName, isSSRClassName } from "./ast-utils";

export interface ReactComponentInfo {
	/** currently unused, may be helpful later */
	calls: Set<string>;
	/** inlined */
	classes: Set<string>;
	keys: Set<string>;
	strings: Set<string>;
}

/**
 * Extracts the property names of an object.
 *
 * @example
 * ```js
 * // (an ObjectExpression, obviously)
 * const value = {
 *   className: "body",
 *   id: "dialog",
 *   "data-testid": "profile",
 *   children: null,
 * };
 *
 * getObjectKeys(value);
 * // => ["className", "id", "data-testid", "children"]
 * ```
 */
function getObjectKeys(node: ObjectExpression) {
	const keys: string[] = [];
	for (const prop of node.properties) {
		if (prop.type !== "Property" || prop.key.type !== "Identifier") {
			continue;
		}

		keys.push(prop.key.name);
	}

	return keys;
}

/**
 * Deserializes a React component function body and gathers certain metadata
 * about it.
 *
 * @param componentOuter The component's function definition
 *
 * @example
 * ```js
 * const component = "function Pa(e){return(0,I.jsx)(St,{level:`3`,color:`dull-12`,weight:`heavy`,className:`aw6Om0V9rvM-`,...e})}";
 * const info = uniquelyIdReactComponent(component);
 * console.log(info);
 * // => {
 * //   calls: Set(1) {
 * //     "jsx",
 * //   },
 * //   classes: Set(1) {
 * //     "aw6Om0V9rvM-",
 * //   },
 * //   keys: Set(3) {
 * //     "color",
 * //     "level",
 * //     "weight",
 * //   },
 * //   strings: Set(3) {
 * //     "3",
 * //     "dull-12",
 * //     "heavy",
 * //   },
 * // }
 * ```
 */
export function uniquelyIdReactComponent(text: string, span: Span) {
	// Instantly bail out if it doesn't use the className prop
	// TODO: why? doesn't work without it, though
	const { start, end } = span;
	const outer = text.slice(start, end);
	if (!outer.toLowerCase().includes("classname:")) {
		//return;
	}

	// Wrap in parentheses for anonymous functions used with forwardRef/memo
	const { errors, program } = parseSync("a.js", `(${outer})`);
	if (errors.length > 0) {
		console.error(errors.map((e) => e.codeframe).join("\n"));
		return;
	}

	// info
	// these later get converted into *sorted* sets, classes should not
	const calls: string[] = [];
	const classes = new Set<string>();
	const keys: string[] = [];
	const strings: string[] = [];

	const visitor = new Visitor({
		// TODO: why
		CallExpression(node) {
			const funcName = getFuncName(node);
			if (!funcName) {
				return;
			}

			calls.push(funcName);
		},
		// Used only for plain object keys, as they can't be template literals
		Literal(node) {
			const { value } = node;
			if (typeof value !== "string") {
				return;
			}

			strings.push(value);
		},
		ObjectExpression(node) {
			// Empty object
			if (node.properties.length === 0) {
				return;
			}

			const real = getObjectKeys(node);
			keys.push(...real);
		},
		TemplateLiteral(node) {
			if (isSSRClassName(node)) {
				const value = node.quasis[0].value.raw;
				classes.add(value);
				return;
			}

			// This only finds the first part of a template literal, but it's
			// fine, since it's what is usually needed
			const value = node.quasis[0].value.raw;
			strings.push(value);
		},
		VariableDeclaration(node) {
			// TODO
			const [propsDecl] = node.declarations;
			if (propsDecl.id.type !== "ObjectPattern") {
				return;
			}

			// TODO: map not needed anymore?
			const props = new Map<string, string>();
			for (const prop of propsDecl.id.properties) {
				if (prop.type !== "Property") {
					continue;
				}

				const { key, value } = prop;
				// Prop has a default value
				if (value.type === "AssignmentPattern") {
					if (key.type !== "Identifier" || value.left.type !== "Identifier") {
						continue;
					}

					props.set(value.left.name, key.name);
					continue;
				}

				if (key.type !== "Identifier" || value.type !== "Identifier") {
					continue;
				}

				// Reverse to match others' behavior
				props.set(value.name, key.name);
			}

			keys.push(...props.values());
		},
	});
	visitor.visit(program);

	const info: ReactComponentInfo = {
		calls: new Set(calls.toSorted()),
		classes,
		keys: new Set(keys.toSorted()),
		strings: new Set(strings.toSorted()),
	};
	return info;
}
