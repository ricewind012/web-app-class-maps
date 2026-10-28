import type {
	CallExpression,
	Expression,
	IdentifierReference,
	VisitorObject,
} from "oxc-parser";
import { getFuncName } from "./ast-utils";
import {
	componentClassnamePropMap,
	componentManualMap,
} from "./component-list";
import { COMMON_REACT_PROPS } from "./consts";
import { classNameByVariableName, currentComponent } from "./state";

type ChangeReturnType<F extends Function, T> = (...args: Parameters<F>) => T;

// biome-ignore lint/suspicious/noExplicitAny: fuck off cunt
type Function = (...args: any[]) => any;

type ClassnameCallGetters<T = Required<VisitorObject>> = {
	[K in keyof T]: K extends `${string}:exit`
		? never
		: T[K] extends Function
			? ChangeReturnType<T[K], [string, string][]>
			: never;
};

const classnameCallGetters: Partial<ClassnameCallGetters> = {
	Identifier(node) {
		const { props } = currentComponent;
		return getIdentClassNamePair(node as IdentifierReference, props);
	},
	ObjectExpression(node) {
		const { component, props } = currentComponent;
		const classes: [string, string][] = [];
		for (const prop of node.properties) {
			// Not a thing
			if (prop.type === "SpreadElement") {
				continue;
			}

			const k = prop.key;
			// Always a reference to another var
			if (k.type !== "Identifier") {
				continue;
			}

			const v = prop.value;
			// Always var refs or bools
			const reactProp = (() => {
				if (v.type === "Identifier") {
					return props.get(v.name);
				}

				// TODO
				if (v.type === "LogicalExpression") {
					return v.type;
				}

				// TODO: can be "[S]: !s, [C]: s", see steamavatar
				if (v.type === "UnaryExpression") {
					const arg = v.argument;
					if (arg.type !== "Identifier") {
						return;
					}

					return props.get(arg.name);
				}
			})();
			if (!reactProp) {
				return [];
			}

			const className = classNameByVariableName.get(k.name);
			// it's defined, piss off typescript
			const readableClassName =
				componentClassnamePropMap[component]?.get(reactProp);
			if (!className || !readableClassName) {
				continue;
			}

			classes.push([className, readableClassName]);
		}

		return classes;
	},
	//TemplateLiteral(node) {},
};

const validClassnameCallGetterTypes = new Set(
	Object.keys(classnameCallGetters) as unknown as (keyof VisitorObject)[],
);

/**
 * @returns `(0, mod.default)(a, b, c)` -> `["value for a", "value for b"]`.
 */
export function getClassNamesFromClassnamesCall(expr: CallExpression) {
	const name = getFuncName(expr);
	// It's the ONLY default export for some reason
	if (name !== "default") {
		return [];
	}

	const classNames: [string, string][] = [];
	for (const arg of expr.arguments) {
		// Not a thing
		if (arg.type === "SpreadElement") {
			return [];
		}

		if (!validClassnameCallGetterTypes.has(arg.type)) {
			console.error("unhandled Classnames arg type %o", arg.type);
			return [];
		}

		// The key and argument are correlated at runtime, but TypeScript cannot
		// preserve that correlation when indexing the mapped type with a union.
		const getter = classnameCallGetters[arg.type] as unknown as (
			node: Expression,
		) => [string, string][];
		const value = getter(arg);
		if (!value) {
			// TODO: not a thing?
			//continue;
		}

		classNames.push(...value);
	}

	return classNames;
}

/**
 * Gets the class names of a `jsx(s)` call and its children.
 */
export function getClassNamesFromChildren(
	expr: Expression,
	parent: boolean,
): [string, string][] {
	// Multiple children
	if (expr.type === "ArrayExpression") {
		return expr.elements.flatMap((child) =>
			child && child.type !== "SpreadElement"
				? getClassNamesFromChildren(child, parent)
				: [],
		);
	}

	// Not a jsx(s) call. Implied, satisfy TypeScript
	if (expr.type !== "CallExpression") {
		return [];
	}

	const propsDecl = expr.arguments.find((e) => e.type === "ObjectExpression");
	// No props. Implied, satisfy TypeScript
	if (!propsDecl) {
		return [];
	}

	const pairs: [string, string][] = [];
	const props = parent ? currentComponent.props : new Map<string, string>();

	const propNodes = propsDecl.properties.filter((e) => e.type === "Property");
	// Get *all* the props at first
	for (const prop of propNodes) {
		if (parent) {
			break;
		}

		const k = prop.key;
		if (k.type !== "Identifier") {
			continue;
		}

		// Only values are used anyway. It could be a bool, empty string, etc.
		// either way, so don't bother
		props.set(Math.random().toString(), k.name);
	}

	const outer = text.slice(expr.start, expr.end);
	if (!parent) {
		if ([...props.values()].every((e) => COMMON_REACT_PROPS.has(e))) {
			console.log("fucking hello?", { outer, props });
			return [];
		}

		currentComponent.props = new Map(props);
	}

	// Now parse these props
	for (const prop of propNodes) {
		const k = prop.key;
		if (k.type !== "Identifier") {
			continue;
		}

		const v = prop.value;
		if (k.name === "children") {
			pairs.push(...getClassNamesFromChildren(v, false));
			continue;
		}

		if (k.name !== "className") {
			continue;
		}

		if (v.type === "CallExpression") {
			pairs.push(...getClassNamesFromClassnamesCall(v));
		} else if (v.type === "Identifier") {
			pairs.push(...getIdentClassNamePair(v, props));
		}
	}

	if (outer.includes("className:Io") && false) {
		console.log("\n--------------", {
			outer,
			pairs: new Map(pairs),
			parent,
			props,
		});
	}

	return pairs;
}

export function getIdentClassNamePair(
	ident: IdentifierReference,
	props: Map<string, string>,
): [string, string][] {
	const { component } = currentComponent;
	const className = classNameByVariableName.get(ident.name);
	if (!className) {
		return [["", ""]];
	}

	const map = componentManualMap[component];
	const keys = [...map.keys()];
	const readableClassNameProp = [...props.values()].find((k) =>
		keys.some((e) => e === k),
	);
	if (!readableClassNameProp) {
		return [[className, ""]];
	}

	const readableClassName = map.get(readableClassNameProp);
	if (!readableClassName) {
		return [["", ""]];
	}

	return [[className, readableClassName]];
}
