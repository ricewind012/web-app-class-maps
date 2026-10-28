import { type ObjectExpression, parseSync, Visitor } from "oxc-parser";
import { getFuncName, isJsxCall, isSSRClassName } from "./ast-utils";
import { COMMON_REACT_PROPS } from "./consts";

function getObjectKeys(decl: ObjectExpression) {
	const keys: string[] = [];
	for (const prop of decl.properties) {
		if (prop.type !== "Property" || prop.key.type !== "Identifier") {
			continue;
		}

		if (COMMON_REACT_PROPS.has(prop.key.name)) {
			continue;
		}

		keys.push(prop.key.name);
	}

	return keys;
}

interface ReactComponentInfo {
	calls: Set<string>;
	count: number;
	depth: number;
	keys: Set<string>;
	outer: string;
	strings: Set<string>;
}

let count = 0;

/**
 * Gathers all possible info on a React component.
 */
export function uniquelyIdReactComponent(
	componentOuter: string,
	parent = true,
): ReactComponentInfo | undefined {
	if (!componentOuter.toLowerCase().includes("classname")) {
		//console.error("This component does not use className:\n%s", componentOuter);
		return;
	}

	const { errors, program } = parseSync("a.js", componentOuter);
	if (errors.length > 0) {
		console.error(errors);
		return;
	}

	// info
	count++;
	let depth = 0;
	const calls: string[] = [];
	const keys: string[] = [];
	const strings: string[] = [];

	const visitor = new Visitor({
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

			const { start, end } = node;
			const outer = componentOuter.slice(start, end);
			//console.log({ depth, node, outer });
			const a = uniquelyIdReactComponent(outer, false);
			//a && console.log({ a });
		},
		"CallExpression:exit"(node) {
			if (!isJsxCall(node)) {
				return;
			}

			depth--;
		},
		ObjectExpression(node) {
			const real = getObjectKeys(node);
			keys.push(...real);
		},
		TemplateLiteral(node) {
			if (isSSRClassName(node)) {
				return;
			}

			const value = node.quasis.map((e) => e.value.raw).join("");
			strings.push(value);
		},
		VariableDeclaration(node) {
			// TODO
			const [propsDecl] = node.declarations;
			if (propsDecl.id.type !== "ObjectPattern") {
				return;
			}

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
	return {
		calls: new Set(calls.toSorted()),
		count,
		depth,
		keys: new Set(keys.toSorted()),
		strings: new Set(strings.toSorted()),
		outer: componentOuter,
	};
}
