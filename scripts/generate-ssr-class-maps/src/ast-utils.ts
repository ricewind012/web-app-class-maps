import type { CallExpression, Function as OxcFunction } from "oxc-parser";

/**
 * @returns `(0, mod.useEffect)` -> `useEffect`
 */
export function getCommaOpFuncName(expr: CallExpression) {
	if (
		expr.type !== "CallExpression" ||
		expr.callee.type !== "ParenthesizedExpression" ||
		expr.callee.expression.type !== "SequenceExpression"
	) {
		return;
	}

	const [lhs, rhs] = expr.callee.expression.expressions;
	if (lhs.type !== "Literal" || lhs.raw !== "0") {
		return;
	}

	if (rhs.type !== "MemberExpression" || rhs.property.type !== "Identifier") {
		return;
	}

	return rhs.property.name;
}

/**
 * @returns `let { className: i, ...a } = e` -> `Map { "i": "className" }`
 */
export function getReactComponentProps(decl: OxcFunction) {
	// React components only accept props
	if (decl.params.length !== 1) {
		return;
	}

	const varDecl = decl.body?.body.find((e) => e.type === "VariableDeclaration");
	if (!varDecl) {
		return;
	}

	// Usually the first
	const [propsDecl] = varDecl.declarations;
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

	return props;
}

/**
 * @returns the function's `return`.
 */
export function getFuncReturn(decl: OxcFunction) {
	const ret = decl.body?.body.find((e) => e.type === "ReturnStatement");
	// Returns nothing
	if (!ret) {
		return;
	}

	return ret.argument;
}

/**
 * Does the expression return a React element?
 */
export function isReactComponent(decl: OxcFunction) {
	// What
	if (!decl.body) {
		return false;
	}

	// Never async
	if (decl.async || decl.generator) {
		return false;
	}

	// React components are paramless or have 1 for its props
	if (decl.params.length > 1) {
		return false;
	}

	const arg = getFuncReturn(decl);
	// what XD
	if (!arg) {
		return false;
	}

	// Is it a direct call or hidden in a logical expression?
	const isDirectCall = arg.type === "CallExpression" && isJsxCall(arg);
	const isCond =
		arg.type === "SequenceExpression" &&
		arg.expressions.at(-1)?.type !== "LogicalExpression";
	if (!isDirectCall && !isCond) {
		return false;
	}

	// Exclude React hooks
	if (
		arg.type === "SequenceExpression" &&
		arg.expressions[0].type === "CallExpression"
	) {
		const callExpr = arg.expressions.find((e) => e.type === "CallExpression");
		if (
			callExpr &&
			callExpr.callee.type !== "ParenthesizedExpression" &&
			!isJsxCall(callExpr)
		) {
			return false;
		}
	}

	return true;
}

/**
 * Is the expression `(0, mod.jsx)`?
 */
export function isJsxCall(expr: CallExpression) {
	const name = getCommaOpFuncName(expr);
	return name === "jsx" || name === "jsxs";
}
