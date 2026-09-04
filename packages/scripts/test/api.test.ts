import { expect, test } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import type { Page } from "../src/api.ts";
import { CLASS_MAP_URL_PART } from "../src/constants.ts";

const originalArgv = process.argv.slice();
process.argv = ["bun", "index.js", "steam"];
const api = await import("../src/api.ts");
process.argv = originalArgv;
const { cachePath } = await import("../src/shared.ts");

const { connection, getClassMap, run, runCdpFile, runWithResult, sleep } = api;

// getClassMap
const page: Page = "steamapppage";
const cacheFilePath = path.join(cachePath, `${page}.json`);
const classMap = { button: { primary: "primary_123" } };
// Isolate `getClassMap` from the network
const originalFetch = globalThis.fetch;

test("getClassMap fetches and caches a class map", async () => {
	const fetchCalls: string[] = [];

	fs.rmSync(cacheFilePath, { force: true });
	Object.defineProperty(globalThis, "fetch", {
		configurable: true,
		value: async (input: URL | RequestInfo) => {
			fetchCalls.push(input.toString());
			return new Response(JSON.stringify(classMap));
		},
	});

	try {
		// fetch
		expect(await getClassMap(page)).toEqual(classMap);
		// cache, doesn't push to fetchCalls
		expect(await getClassMap(page)).toEqual(classMap);
		expect(fetchCalls).toEqual([`${CLASS_MAP_URL_PART}/${page}.json`]);
		expect(JSON.parse(fs.readFileSync(cacheFilePath, "utf8"))).toEqual(
			classMap,
		);
	} finally {
		Object.defineProperty(globalThis, "fetch", {
			configurable: true,
			value: originalFetch,
		});
		fs.rmSync(cacheFilePath, { force: true });
	}
});

test("run forwards a JavaScript expression to the CDP runtime", async () => {
	const response = await run("1 + 1", connection);
	expect(response.result.value).toBe(2);
});

test("runCdpFile evaluates a helper file verbatim", async () => {
	const response = await runCdpFile("make-readable-classes.ts", connection);
	expect(response).toBeUndefined();
});

test("runWithResult unwraps the CDP runtime value", async () => {
	const value = await runWithResult("42", connection);
	expect(value).toBe(42);
});

test("sleep resolves after the requested delay", async () => {
	const before = Date.now();
	await sleep(10);
	const elapsed = Date.now() - before;
	expect(elapsed).toBeGreaterThanOrEqual(8);
});
