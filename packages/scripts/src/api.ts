import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Protocol } from "devtools-protocol";
import { lilconfig } from "lilconfig";
import { appInfo, createConnection, getArgs } from "./shared.js";

export type App = "steam";

/**
 * Pages that have an existing class map, excluding `steamclient`.
 */
export type Page =
	| "steamaccountpreferences"
	| "steamapppage"
	| "steamclient"
	| "steamgameslist"
	| "steamnotificationspage"
	| "steamprofileedit"
	| "steamshoppingcart"
	| "steamstoremenu";

/**
 * Existing scripts.
 */
export type ScriptFile =
	| "build-class-modules"
	| "make-readable-classes"
	| "migrate"
	| "replace-old-classes";

export interface Config {
	/**
	 * Path of built class maps.
	 */
	classMaps: string;

	/**
	 * Directories for the postcss plugin to ignore.
	 *
	 * For example:
	 * ```json
	 * ["steam/client/shared", "steam/web/vars"]
	 * ```
	 * will ignore `src/steam/client/shared` and `src/steam/web/vars`, assuming
	 * the base dir is `src`.
	 */
	ignore: string[];
}

interface Script {
	execute(arg?: string): Promise<void>;
}

const DIST_PATH = path.dirname(fileURLToPath(import.meta.url));
const CDP_FILES_PATH = path.join(DIST_PATH, "cdp");
const SCRIPT_PATH = path.join(DIST_PATH, "lib");

const DEFAULT_CONFIG: Config = {
	classMaps: "class_maps",
	ignore: [],
};

export const config: Config = Object.assign(
	DEFAULT_CONFIG,
	(await lilconfig("web-app-class-maps").search())?.config || {},
);

export const connection = await (() => {
	// postcss-cli hangs because of cdp
	const isPostcss = path.basename(process.argv[1]) === "postcss";
	if (isPostcss) {
		return;
	}

	const [app] = getArgs();
	const info = appInfo[app];
	return createConnection((e) => e.find(info.connFilter)).catch((e) => {
		console.log(e.message, info.connErrorMsgFormat);
		process.exit(1);
	});
})();

/**
 * Loads a script by its name.
 */
export function readScript(name: ScriptFile): Promise<Script> {
	return import(`file://${path.join(SCRIPT_PATH, `${name}.js`)}`);
}

/**
 * Evaluates a JavaScript expression in the active CDP context.
 */
export function run(
	expression: string,
	conn = connection,
): Promise<Protocol.Runtime.EvaluateResponse> {
	return conn.Runtime.evaluate({
		awaitPromise: true,
		expression,
		returnByValue: true,
	});
}

/**
 * Reads and evaluates a helper script from the `cdp` directory and returns its
 * resolved value.
 */
export function runCdpFile(file: string, conn = connection) {
	return runWithResult(
		fs.readFileSync(path.join(CDP_FILES_PATH, file), "utf8"),
		conn,
	);
}

/**
 * Evaluates a JavaScript expression and returns its resolved value. Only use if
 * certain the expression never fails.
 */
export async function runWithResult(expression: string, conn = connection) {
	const resp = await run(expression, conn);
	return resp.result.value;
}

/**
 * Waits for the specified number of milliseconds.
 */
export function sleep(ms: number) {
	return new Promise((r) => setTimeout(r, ms));
}
