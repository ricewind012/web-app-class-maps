import { expect, test } from "bun:test";
import type { Rule } from "postcss";
import postcss from "postcss";
import { appendImportantPlugin } from "../src/append-important";

test("adds !important to declarations outside the ignore filter", async () => {
	const input = `
		.foo { color: red; }
		.bar { padding: 0; }
	`;
	const result = await postcss([
		appendImportantPlugin({ filter: [/\.foo/] }),
	]).process(input, { from: undefined });

	const [fooRule, barRule] = result.root.nodes as Rule[];
	const fooDecl = fooRule.nodes[0];
	const barDecl = barRule.nodes[0];
	// Satisfy TypeScript
	if (fooDecl.type !== "decl" || barDecl.type !== "decl") {
		return;
	}

	expect(fooDecl.important).toBeUndefined();
	expect(barDecl.important).toBeTrue();
});

test("does not append !important inside keyframes", async () => {
	const input = `
		@keyframes fade {
			from { color: red; }
			to { color: blue; }
		}
	`;
	const result = await postcss([appendImportantPlugin()]).process(input, {
		from: undefined,
	});

	const keyframes = result.root.first;
	// Satisfy TypeScript
	if (keyframes.type !== "atrule") {
		return;
	}

	const [fromRule, toRule] = keyframes.nodes as Rule[];
	const fromDecl = fromRule.nodes[0];
	const toDecl = toRule.nodes[0];
	// Satisfy TypeScript
	if (fromDecl.type !== "decl" || toDecl.type !== "decl") {
		return;
	}

	expect(fromDecl.important).toBeUndefined();
	expect(toDecl.important).toBeUndefined();
});
