import { afterAll, beforeEach, expect, mock, test } from "bun:test";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { Page } from "@web-app-class-maps/scripts";
import postcss from "postcss";

mock.module("@web-app-class-maps/scripts", () => ({
	config: {
		ignore: [],
	},
	getClassMap: async () => {
		return {
			htmlpopupdialog: {
				HTMLPopupDialog: "stuff",
			},
		};
	},
}));

const PAGE: Page = "steamclient";

const originalArgv = process.argv.slice();
process.argv = ["bun", "postcss", "--base=src"];
const { config, getClassMap } = await import("@web-app-class-maps/scripts");
const { selectorReplacementPlugin } = await import(
	"../src/selector-replacement"
);
process.argv = originalArgv;

const originalIgnore = config.ignore;
const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "wacm-postcss-test-"));

beforeEach(() => {
	config.ignore = [];
});

afterAll(async () => {
	config.ignore = originalIgnore;
	await fs.rm(tmpDir, { force: true, recursive: true });
});

test("swaps #id selectors using the matching class map module", async () => {
	const file = path.join(tmpDir, "client", "htmlpopupdialog.css");
	const result = await postcss([selectorReplacementPlugin()]).process(
		`#HTMLPopupDialog { color: red; }`,
		{ from: file },
	);
	const classMap = await getClassMap(PAGE);
	expect(result.css).toStartWith(
		`.${classMap.htmlpopupdialog.HTMLPopupDialog}`,
	);
});

test("does not swap #id selectors without a matching class map module", async () => {
	const file = path.join(tmpDir, "unrelated_map", "htmlpopupdialog.css");
	const result = await postcss([selectorReplacementPlugin()]).process(
		`#HTMLPopupDialog { color: red; }`,
		{ from: file },
	);
	expect(result.css).toStartWith("#HTMLPopupDialog");
});
