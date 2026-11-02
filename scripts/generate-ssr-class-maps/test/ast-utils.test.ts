import { describe, expect, test } from "bun:test";
import {
	type CallExpression,
	type Function as OxcFunction,
	parseSync,
	type TemplateLiteral,
	Visitor,
} from "oxc-parser";
import {
	getFuncName,
	isReactComponent,
	isSSRClassName,
} from "../src/ast-utils";

// Having a single function here would be ugly either way

function parseFirstCall(source: string) {
	const { program } = parseSync("test.js", source);
	let call: CallExpression | undefined;
	new Visitor({
		CallExpression(node) {
			call ??= node;
		},
	}).visit(program);
	if (!call) {
		throw new Error("Expected source to contain a CallExpression");
	}

	return call;
}

function parseFirstFunction(source: string) {
	const { program } = parseSync("test.js", source);
	let fn: OxcFunction | undefined;
	new Visitor({
		FunctionDeclaration(node) {
			fn ??= node;
		},
	}).visit(program);
	if (!fn) {
		throw new Error("Expected source to contain a FunctionDeclaration");
	}

	return fn;
}

function parseFirstTemplate(source: string) {
	const { program } = parseSync("test.js", source);
	let template: TemplateLiteral | undefined;
	new Visitor({
		TemplateLiteral(node) {
			template ??= node;
		},
	}).visit(program);
	if (!template) {
		throw new Error("Expected source to contain a TemplateLiteral");
	}

	return template;
}

describe("getFuncName", () => {
	test("ignores unsupported callees", () => {
		expect(getFuncName(parseFirstCall("useEffect()"))).toBeUndefined();
	});

	test("supports member and transpiled sequence calls", () => {
		expect(getFuncName(parseFirstCall("module.useEffect()"))).toBe("useEffect");
		expect(getFuncName(parseFirstCall("(0, module.useEffect)()"))).toBe(
			"useEffect",
		);
	});
});

describe("isReactComponent", () => {
	test("rejects unsupported function declarations", () => {
		for (const source of [
			"function a() {}",
			"async function a() { return mod.jsx(Box, {}); }",
			"function a(a, b) { return mod.jsx(Box, {}); }",
			"function a() { return null; }",
		]) {
			expect(isReactComponent(parseFirstFunction(source))).toBeFalse();
		}
	});

	test("recognizes direct and conditional JSX returns", () => {
		for (const source of [
			"function a() { return mod.jsx(Box, {}); }",
			"function a(props) { return props.ready ? mod.jsx(Box, {}) : null; }",
		]) {
			expect(isReactComponent(parseFirstFunction(source))).toBeTrue();
		}
	});
});

describe("isSSRClassName", () => {
	test("rejects other template literal values", () => {
		expect(isSSRClassName(parseFirstTemplate("`too-short`"))).toBeFalse();
		expect(isSSRClassName(parseFirstTemplate("`aw6Om0V9rvM`"))).toBeFalse();
	});

	test("accepts 12-character and numeric-prefixed names", () => {
		expect(isSSRClassName(parseFirstTemplate("`aw6Om0V9rvM-`"))).toBeTrue();
		expect(isSSRClassName(parseFirstTemplate("`_1w6Om0V9rvM-`"))).toBeTrue();
	});
});
