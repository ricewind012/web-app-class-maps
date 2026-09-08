import { Function as OxcFunction, type Expression } from "oxc-parser";

/**
 * @returns `(0, mod.useEffect)` -> `useEffect`
 */
function getCommaOpFuncName(expr: Expression) {
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
 * @returns `let { className: i, ...a } = e` -> `Map { "className": "i" }`
 */
export function getComponentProps(decl: OxcFunction) {
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
		if (key.type !== "Identifier" || value.type !== "Identifier") {
			continue;
		}

		props.set(key.name, value.name);
	}

	return props;
}

/**
 * Does the expression return a React element?
 */
export function isComponent(decl: OxcFunction) {
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

	const ret = decl.body?.body.find((e) => e.type === "ReturnStatement");
	// Returns nothing
	if (!ret) {
		return false;
	}

	const arg = ret.argument;
	// what XD
	if (!arg) {
		return false;
	}

	// The rest is finding the (0, mod.jsx)
	const isCall = arg.type === "CallExpression" && isJsxCall(arg);
	const isCond =
		arg.type === "SequenceExpression" &&
		arg.expressions.at(-1)?.type !== "LogicalExpression";
	if (!isCall && !isCond) {
		return false;
	}

	// Exclude React hooks
	if (
		arg.type === "SequenceExpression" &&
		arg.expressions[0].type === "CallExpression"
	) {
		const callExpr = arg.expressions.find(
			(e) =>
				e.type === "CallExpression" &&
				e.callee.type === "ParenthesizedExpression",
		);
		if (callExpr && !isJsxCall(callExpr)) {
			return false;
		}
	}

	return true;
}

/**
 * Is the expression `(0, mod.jsx)`?
 */
function isJsxCall(expr: Expression) {
	const name = getCommaOpFuncName(expr);
	return name === "jsx";
}
