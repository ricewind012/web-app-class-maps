import type {
	CallExpression,
	Expression,
	IdentifierReference,
	ObjectExpression,
	TemplateLiteral,
} from "oxc-parser";
import { getCommaOpFuncName } from "./ast-utils";
import { componentManualMap, componentPropMap } from "./component-list";
import { classNameByVariableName, currentComponent } from "./state";

const classnameCallGetters: Partial<
	// biome-ignore lint/suspicious/noExplicitAny: The arg types are all different
	Record<Expression["type"], (arg: any) => [string, string][]>
> = {
	Identifier(arg: IdentifierReference) {
		const { props } = currentComponent;
		return getIdentClassNamePair(arg, props);
	},
	ObjectExpression(arg: ObjectExpression) {
		// fuck off typescript
		if (!currentComponent) {
			return [];
		}

		const { component, props } = currentComponent;
		const classes: [string, string][] = [];
		for (const prop of arg.properties) {
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
			const readableClassName = componentPropMap[component].get(reactProp);
			if (!className || !readableClassName) {
				continue;
			}

			classes.push([className, readableClassName]);
		}

		return classes;
	},
	TemplateLiteral(arg: TemplateLiteral) {
		// TODO
	},
};
const validClassnameCallGetterTypes = new Set<Expression["type"]>(
	Object.keys(classnameCallGetters) as unknown as Expression["type"][],
);

/**
 * @returns `(0, mod.default)(a, b, c)` -> `["value for a", "value for b"]`.
 */
export function getClassNamesFromClassnamesCall(expr: CallExpression) {
	const name = getCommaOpFuncName(expr);
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

		// it's defined, piss off typescript
		const value = classnameCallGetters[arg.type]?.(arg);
		if (!value) {
			continue;
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

	const rawProps = propsDecl.properties.filter((e) => e.type === "Property");
	// Get *all* the props at first
	for (const prop of rawProps) {
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

	// TODO: bruh
	if (!parent) {
		currentComponent.props = new Map(props);
	}

	// Now parse these props
	for (const prop of rawProps) {
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

	/*
	console.log("\n--------------", {
		outer: text.slice(expr.start, expr.end),
		pairs: new Map(pairs),
		parent,
		props,
	});
	*/

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

	// TODO: looks awful
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
