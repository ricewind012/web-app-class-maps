import { expect, test } from "bun:test";

const originalArgv = process.argv.slice();
process.argv = ["bun", "index.js", "steam"];
const api = await import("../src/api.ts");
process.argv = originalArgv;

const { connection, run, runCdpFile, runWithResult, sleep } = api;

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
