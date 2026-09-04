import { describe, expect, it, test } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { after } from "node:test";
import type { Page } from "../src/api.ts";
import { CLASS_MAP_URL_PART } from "../src/constants.ts";

const originalArgv = process.argv.slice();
process.argv = ["bun", "index.js", "steam"];
const api = await import("../src/api.ts");
process.argv = originalArgv;
const { cachePath } = await import("../src/shared.ts");

const { connection, getClassMap, run, runCdpFile, runWithResult, sleep } = api;

describe("getClassMap", () => {
	const page: Page = "steamapppage";
	const cacheFilePath = path.join(cachePath, `${page}.json`);
	const classMap = {
		htmlpopupdialog: {
			HTMLPopupDialog: "stuff",
		},
	};
	// Isolate `getClassMap` from the network
	const originalFetch = globalThis.fetch;

	after(() => {
		Object.defineProperty(globalThis, "fetch", {
			configurable: true,
			value: originalFetch,
		});
		fs.rmSync(cacheFilePath, { force: true });
	});

	it("fetches and caches a class map", async () => {
		const fetchCalls: string[] = [];

		fs.rmSync(cacheFilePath, { force: true });
		Object.defineProperty(globalThis, "fetch", {
			configurable: true,
			value: async (input: URL | RequestInfo) => {
				fetchCalls.push(input.toString());
				return new Response(JSON.stringify(classMap));
			},
		});

		// fetch
		expect(await getClassMap(page)).toEqual(classMap);
		// cache, doesn't push to fetchCalls
		expect(await getClassMap(page)).toEqual(classMap);
		expect(fetchCalls).toEqual([`${CLASS_MAP_URL_PART}/${page}.json`]);
		expect(JSON.parse(fs.readFileSync(cacheFilePath, "utf8"))).toEqual(
			classMap,
		);
	});

	it("reads a fresh class map from disk cache", async () => {
		fs.mkdirSync(cachePath, { recursive: true });
		fs.writeFileSync(cacheFilePath, JSON.stringify(classMap));
		Object.defineProperty(globalThis, "fetch", {
			configurable: true,
			value: async () => {
				throw new Error("getClassMap should not fetch a fresh disk cache");
			},
		});

		expect(await getClassMap(page)).toEqual(classMap);
	});
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
