import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Protocol } from "devtools-protocol";
import { lilconfig } from "lilconfig";
import { appInfo, createConnection, getArgs } from "./shared.js";

export type App = "steam";

/**
 * Types that you can provide as a JavaScript expression.
 */
// biome-ignore lint/suspicious/noExplicitAny: Intentional
type Expression = string | ((...args: any[]) => any);

/**
 * Pages that have an existing class map, excluding `steamclient`.
 */
export type Page =
	| "steamaccountpreferences"
	| "steamapppage"
	| "steamclient"
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
 * Evaluates a JavaScript expression (string or function) in the active CDP
 * context. If a function is provided it will be converted to a string and
 * invoked immediately.
 */
export function run(
	expr: Expression,
	conn = connection,
): Promise<Protocol.Runtime.EvaluateResponse> {
	const expression = (() => {
		if (typeof expr === "string") {
			return expr;
		}

		const fn = expr.toString();
		// Extract the body instead of sending the function as is - it may be a
		// const arrow function, whose reassignment is forbidden when sent
		// through CDP
		const body = fn.slice(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
		// While you *do* need to await it in the actual console, this isn't
		// required here
		return `(async () => { ${body} })()`;
	})();

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
export async function runWithResult(expr: Expression, conn = connection) {
	const resp = await run(expr, conn);
	return resp.result.value;
}

/**
 * Waits for the specified number of milliseconds.
 */
export function sleep(ms: number) {
	return new Promise((r) => setTimeout(r, ms));
}
