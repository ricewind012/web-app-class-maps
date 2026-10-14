import { afterAll, expect, mock, spyOn, test } from "bun:test";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { Page } from "@web-app-class-maps/scripts";
import postcss from "postcss";

mock.module("@web-app-class-maps/scripts", () => ({
	getClassMap: async () => {
		return {
			htmlpopupdialog: {
				HTMLPopupDialog: "stuff",
			},
		};
	},
}));

const CONTENT = `#HTMLPopupDialog { color: red; }`;
const PAGE: Page = "steamclient";

const pathForMap = (map: string) =>
	path.join(tmpDir, "src", "steam", map, "htmlpopupdialog.css");
const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "wacm-postcss-test-"));
const cwdSpy = spyOn(process, "cwd");
cwdSpy.mockReturnValue(tmpDir);

const originalArgv = process.argv.slice();
process.argv = ["bun", "postcss", "--base=src"];
const { getClassMap } = await import("@web-app-class-maps/scripts");
const { selectorReplacementPlugin } = await import(
	"../src/selector-replacement"
);
process.argv = originalArgv;

afterAll(async () => {
	await fs.rm(tmpDir, { force: true, recursive: true });
	cwdSpy.mockRestore();
});

test("swaps #id selectors using the matching class map module", async () => {
	const file = pathForMap("client");
	const result = await postcss([selectorReplacementPlugin()]).process(CONTENT, {
		from: file,
	});
	const classMap = await getClassMap(PAGE);
	expect(result.css).toStartWith(
		`.${classMap.htmlpopupdialog.HTMLPopupDialog}`,
	);
});

test("does not swap #id selectors without a matching class map module", async () => {
	const file = pathForMap("unrelated_map");
	const result = await postcss([selectorReplacementPlugin()]).process(CONTENT, {
		from: file,
	});
	expect(result.css).toStartWith("#HTMLPopupDialog");
});

test("respects options.ignore", async () => {
	const file = pathForMap("client");
	const result = await postcss([
		selectorReplacementPlugin({ ignore: ["steam/client"] }),
	]).process(CONTENT, { from: file });
	expect(result.css).toStartWith("#HTMLPopupDialog");
});
