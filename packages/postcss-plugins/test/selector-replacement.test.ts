import { expect, test } from "bun:test";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import postcss from "postcss";

const originalArgv = process.argv.slice();
process.argv = ["bun", "postcss", "--base=src"];
const { config } = await import("@web-app-class-maps/scripts");
const { selectorReplacementPlugin } = await import(
	"../src/selector-replacement"
);
process.argv = originalArgv;

const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "wacm-selector-"));
const classMapsDir = path.join(tmpDir, "class-maps");
await fs.mkdir(classMapsDir, { recursive: true });
await fs.mkdir(path.join(tmpDir, "steamclient"), { recursive: true });
await fs.writeFile(
	path.join(classMapsDir, "steamclient.json"),
	JSON.stringify({
		htmlpopupdialog: {
			HTMLPopupDialog: "stuff",
		},
	}),
);

test("swaps #id selectors using the matching class map module", async () => {
	const originalClassMaps = config.classMaps;
	const originalIgnore = config.ignore;
	config.classMaps = classMapsDir;
	config.ignore = [];

	try {
		const file = path.join(tmpDir, "client", "htmlpopupdialog.css");
		const result = await postcss([selectorReplacementPlugin()]).process(
			`#HTMLPopupDialog { color: red; }`,
			{ from: file },
		);
		expect(result.css).toStartWith(".stuff");
	} finally {
		config.classMaps = originalClassMaps;
		config.ignore = originalIgnore;
		await fs.rm(tmpDir, { force: true, recursive: true });
	}
});

test("does not swap #id selectors without a matching class map module", async () => {
	const originalClassMaps = config.classMaps;
	const originalIgnore = config.ignore;
	config.classMaps = classMapsDir;
	config.ignore = [];

	try {
		const file = path.join(tmpDir, "unrelated_map", "htmlpopupdialog.css");
		const result = await postcss([selectorReplacementPlugin()]).process(
			`#HTMLPopupDialog { color: red; }`,
			{ from: file },
		);
		expect(result.css).toStartWith("#HTMLPopupDialog");
	} finally {
		config.classMaps = originalClassMaps;
		config.ignore = originalIgnore;
		await fs.rm(tmpDir, { force: true, recursive: true });
	}
});
