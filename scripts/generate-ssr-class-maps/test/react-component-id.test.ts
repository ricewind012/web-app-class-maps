import { describe, expect, test } from "bun:test";
import { parseSync, type Span, Visitor } from "oxc-parser";
import { uniquelyIdReactComponent } from "../src/react-component-id";

const CLASS_NAME = "aw6Om0V9rvM-";

function getResultFromString(source: string) {
	const { program } = parseSync("test.js", source);
	let span: Span | undefined;
	new Visitor({
		FunctionDeclaration(node) {
			span = node;
		},
	}).visit(program);
	if (!span) {
		return;
	}

	return uniquelyIdReactComponent(source, span);
}

describe("uniquelyIdReactComponent", () => {
	test("extracts component metadata", () => {
		const source = `function Component(props) { const { as, color = \`red\` } = props; return mod.jsx(Box, { className: \`${CLASS_NAME}\`, role: "button", ...props }); }`;
		const info = getResultFromString(source);

		expect(info).toBeDefined();
		expect(info?.calls).toEqual(new Set(["jsx"]));
		expect(info?.classes).toEqual(new Set([CLASS_NAME]));
		expect(info?.keys).toEqual(new Set(["as", "className", "color", "role"]));
		expect(info?.strings).toEqual(new Set(["button", "red"]));
	});

	test("ignores duplicate classes and sorts metadata", () => {
		const source = `function Component(props) { const { zeta, alpha } = props; return mod.jsxs(Box, { className: \`${CLASS_NAME}\`, other: \`${CLASS_NAME}\`, label: "yep", title: "a" }); }`;
		const info = getResultFromString(source);

		expect(info?.classes).toEqual(new Set([CLASS_NAME]));
		expect(info?.keys ?? []).toEqual(
			new Set(["alpha", "className", "label", "other", "title", "zeta"]),
		);
		expect(info?.strings ?? []).toEqual(new Set(["a", "yep"]));
	});

	test("returns undefined without a className prop", () => {
		const source =
			"function Component() { return mod.jsx(Box, { role: `button` }); }";

		expect(getResultFromString(source)).toBeUndefined();
	});
});
