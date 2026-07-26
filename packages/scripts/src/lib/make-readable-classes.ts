import type { Page } from "../api.js";
import { connection, readScript, runCdpFile } from "../api.js";
import { createWebConnection } from "../shared.js";

export async function execute(page: Page) {
	const isClient = page === "steamclient";
	const webConn = isClient ? null : await createWebConnection(page);
	const conn = isClient ? connection : webConn;

	const script = await readScript("build-class-modules");
	await script.execute(page);

	if (isClient) {
		console.log("Waiting for focus...");
	}
	await runCdpFile("make-readable-classes.js", conn);
}
