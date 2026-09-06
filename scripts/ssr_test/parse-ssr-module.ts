import { readFile } from "node:fs/promises";
import { parse, Visitor } from "oxc-parser";
import * as ReactUtils from "./react-utils";

const [, , file] = process.argv;
const text = await readFile(file, "utf8");
if (text.length < 1000) {
	console.error("Length < 1000, most likely not what we want");
	process.exit(1);
}

const { errors, program } = await parse(file, text, { range: true });
if (errors.length > 0) {
	console.error(errors);
	process.exit(1);
}

// TODO: detect component
const varNameToClassName = new Map<string, string>();
const visitations: string[] = [];

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

		const { start, end } = ret;
		const outer = text.slice(start, end);
		if (!ret?.argument) {
			return;
		}

		// TODO: doesn't work on conditional rendering
		const arg = ret.argument;
		if (arg.type !== "CallExpression") {
			const { start, end } = arg;
			const outer = text.slice(start, end);
			console.log("-------------------------------\n%o\n%o", arg, outer);
			return;
		}

		if (
			//arg.callee.type !== "ParenthesizedExpression" ||
			// Webpack has (0, mod.export), SSR uses ES modules, so it'd just be
			// "export" here
			arg.callee.type === "Identifier"
			// || arg.callee.expression.type !== "SequenceExpression"
		) {
			return;
		}

		const [lhs, rhs] = arg.callee.expression.expressions;
		if (lhs.type !== "Literal" || lhs.raw !== "0") {
			return;
		}

		if (
			rhs.type !== "MemberExpression" ||
			rhs.property.type !== "Identifier" ||
			rhs.property.name !== "jsx"
		) {
			return;
		}

		//console.log(arg.callee, outer);
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
		//if (len <= 10 || len >= 20) {
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
