import { type ObjectExpression, parseSync, Visitor } from "oxc-parser";
import { getFuncName, isJsxCall, isSSRClassName } from "./ast-utils";

export interface ReactComponentInfo {
	calls: Set<string>;
	/** inlined */
	classes: Set<string>;
	depth: number;
	keys: Set<string>;
	outer: string;
	strings: Set<string>;
}

/**
 * Extracts the property names of an object literal.
 *
 * @example
 * ```ts
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
function getObjectKeys(decl: ObjectExpression) {
	const keys: string[] = [];
	for (const prop of decl.properties) {
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
 * @param parent Used internally for recursive traversal so nested JSX calls can
 * be analyzed without infinitely recursing.
 *
 * @example
 * ```ts
 * const component = "function Pa(e){return(0,I.jsx)(St,{level:`3`,color:`dull-12`,weight:`heavy`,className:va,...e})}";
 *
 * const info = uniquelyIdReactComponent(component);
 * console.log(info);
 * // {
 * //   calls: Set(1) {
 * //     "jsx",
 * //   },
 * //   count: 136,
 * //   depth: 0,
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
 * //   outer: "function Pa(e){return(0,I.jsx)(St,{level:`3`,color:`dull-12`,weight:`heavy`,className:va,...e})}",
 * // }
 * ```
 */
export function uniquelyIdReactComponent(
	componentOuter: string,
	parent = true,
) {
	if (!componentOuter.toLowerCase().includes("classname:")) {
		return;
	}

	// Wrap in parentheses for anonymous functions used with forwardRef/memo
	const { errors, program } = parseSync("a.js", `(${componentOuter})`);
	if (errors.length > 0) {
		console.error(errors.map((e) => e.codeframe).join("\n"));
		return;
	}

	// info
	let depth = 0;
	// these later get converted into *sorted* sets
	const calls: string[] = [];
	const classes = new Set<string>();
	const keys: string[] = [];
	const strings: string[] = [];

	const visitor = new Visitor({
		// TODO: why
		CallExpression(node) {
			const funcName = getFuncName(node);
			if (!funcName) {
				// TODO lol wtf
				//console.log(componentOuter.slice(node.start, node.end));
				return;
			}

			calls.push(funcName);
			if (!parent || !isJsxCall(node)) {
				return;
			}

			depth++;

			/*
			const { start, end } = node;
			const outer = componentOuter.slice(start, end);
			console.log({ depth, node, outer });
			const a = uniquelyIdReactComponent(outer, false);
			a && console.log({ a });
			*/
		},
		"CallExpression:exit"(node) {
			if (!isJsxCall(node)) {
				return;
			}

			depth--;
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
			// TODO: why
			if (!real.includes("className")) {
				return;
			}

			// TODO: why
			const props = node.properties.filter((e) => e.type === "Property");
			const needed = props.find(
				(e) => e.key.type === "Identifier" && e.key.name === "className",
			);
			if (!needed) {
				return;
			}

			keys.push(...real);
		},
		TemplateLiteral(node) {
			if (isSSRClassName(node)) {
				const value = node.quasis[0].value.raw;
				classes.add(value);
				return;
			}

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

	// biome-ignore assist/source/useSortedKeys: dadsdda
	const info: ReactComponentInfo = {
		calls: new Set(calls.toSorted()),
		classes,
		depth,
		keys: new Set(keys.toSorted()),
		strings: new Set(strings.toSorted()),
		outer: componentOuter,
	};

	return info;
}
