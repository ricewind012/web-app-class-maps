import { readFile } from "node:fs/promises";
import { parse, Visitor, type Expression } from "oxc-parser";
import * as ReactUtils from "./react-utils";

const [, , file] = process.argv;
const text = await readFile(file, "utf8");
if (text.length < 1000) {
	console.error("Length < 1000, most likely not what we want");
	process.exit(1);
}

const { errors, program } = await parse(file, text);
if (errors.length > 0) {
	console.error(errors);
	process.exit(1);
}

// TODO: detect component
const varNameToClassName = new Map<string, string>();
const visitations: string[] = [];

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
 * Is the expression `(0, mod.jsx)`?
 */
function isJsxCall(expr: Expression) {
	const name = getCommaOpFuncName(expr);
	return name === "jsx";
}

const visitor = new Visitor({
	FunctionDeclaration(decl) {
		if (!ReactUtils.isComponent(decl)) {
			return;
		}

		// Find the (0, jsx)
		const ret = decl.body?.body.find((e) => e.type === "ReturnStatement");
		if (!ret) {
			return;
		}

		const arg = ret.argument;
		if (!arg) {
			return;
		}

		const isCall = arg.type === "CallExpression" && isJsxCall(arg);
		// TODO: doesn't work on conditional rendering
		const isCond =
			arg.type === "SequenceExpression" &&
			arg.expressions.at(-1)?.type !== "LogicalExpression";
		if (!isCall && !isCond) {
			return;
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
				return;
			}
		}

		const { start, end } = arg;
		const outer = text.slice(start, end);
		console.log("--------------------------------\n%o\n%o", arg, outer);
	},
	VariableDeclarator(decl) {
		if (!decl.init) {
			return;
		}

		// TODO: sometimes they are in an object, like the old webpack
		// modules
		if (decl.id.type !== "Identifier") {
			return;
		}

		const { start, end } = decl.init;
		const value = text.slice(start, end);

		// Data URIs
		if (value.slice(1, 6) === "data:") {
			return;
		}

		// Usually SSR classes are 12 (+2 for quotes) characters long
		const len = value.length;
		if (len !== 14) {
			//console.error("len !== 14, maybe wrong?", { len, value });
			return;
		}

		const { name } = decl.id;
		varNameToClassName.set(name, value);
		visitations.push(`${name} = ${value}`);
	},
});
visitor.visit(program);
