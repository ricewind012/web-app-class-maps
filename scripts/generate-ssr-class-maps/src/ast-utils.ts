import type {
	CallExpression,
	Function as OxcFunction,
	TemplateLiteral,
} from "oxc-parser";

/**
 * @returns `mod.useEffect` / `(0, mod.useEffect)` -> `useEffect`
 */
export function getFuncName(expr: CallExpression) {
	// mod.func
	const c = expr.callee;
	if (c.type === "MemberExpression" && c.property.type === "Identifier") {
		return c.property.name;
	}

	// (0, mod.func)
	if (
		c.type !== "ParenthesizedExpression" ||
		c.expression.type !== "SequenceExpression"
	) {
		return;
	}

	const [lhs, rhs] = c.expression.expressions;
	if (lhs.type !== "Literal" || lhs.raw !== "0") {
		return;
	}

	if (rhs.type !== "MemberExpression" || rhs.property.type !== "Identifier") {
		return;
	}

	return rhs.property.name;
}

/**
 * @returns the function's `return`.
 */
function getFuncReturn(decl: OxcFunction) {
	const ret = decl.body?.body.find((e) => e.type === "ReturnStatement");
	return ret?.argument;
}

/**
 * Is the expression `(0, mod.jsx)`?
 */
function isJsxCall(expr: CallExpression) {
	const name = getFuncName(expr);
	return name === "jsx" || name === "jsxs";
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

	let arg = getFuncReturn(decl);
	// Find the jsx call if conditionally rendered
	if (arg?.type === "ConditionalExpression") {
		arg = [arg.consequent, arg.alternate].find(
			(e) => e.type === "CallExpression" && isJsxCall(e),
		);
	}
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
 * SSR classes are 12 characters long and end with a `-`, with an underscore if
 * starting with a number.
 */
export function isSSRClassName(node: TemplateLiteral) {
	const value = node.quasis[0].value.raw;
	const len = value.length;
	const startsWithNumber = value[0] === "_" && len === 13;
	return value.at(-1) === "-" && (len === 12 || startsWithNumber);
}
