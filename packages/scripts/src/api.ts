import path from "node:path";
import type CDP from "chrome-remote-interface";
import type { Protocol } from "devtools-protocol";
import { lilconfig } from "lilconfig";
import { CDP_FILES_PATH, DEFAULT_CONFIG, SCRIPT_PATH } from "./constants.js";
import { appInfo, createConnection, getArgs, readFile } from "./shared.js";

export type App = "steam";

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

/**
 * Existing scripts.
 */
export type ScriptFile =
	| "build-class-modules"
	| "make-readable-classes"
	| "migrate"
	| "replace-old-classes";

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

const [app] = getArgs();

// postcss-cli hangs because of cdp
const isPostcss =
	path.basename(process.argv[1]) === "postcss" ||
	path.basename(path.dirname(process.argv[1])) === "postcss-cli";

export const connection =
	!isPostcss &&
	(await createConnection((e) =>
		// TODO: for now
		e.find(appInfo[app ?? "steam"].connFilter),
	).catch((e) => {
		console.log(appInfo[app].connErrorMsgFormat, e.message);
		process.exit(1);
	}));

export const config: Config = Object.assign(
	DEFAULT_CONFIG,
	(await lilconfig("web-app-class-maps").search())?.config || {},
);

/**
 * Loads a script by its name.
 */
export const readScript = (name: ScriptFile): Promise<Script> =>
	import(`file://${path.join(SCRIPT_PATH, `${name}.js`)}`);

/**
 * Evaluates a JavaScript expression in the active CDP context.
 */
export function run(
	expression: string,
	conn: CDP.Client = connection,
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
export const runCdpFile = (file: string, conn: CDP.Client = connection) =>
	runWithResult(readFile(path.join(CDP_FILES_PATH, file)), conn);

/**
 * Evaluates a JavaScript expression and returns its resolved value. Only use if
 * certain the expression never errors.
 */
export const runWithResult = async (
	expression: string,
	conn: CDP.Client = connection,
) => (await run(expression, conn)).result.value;

/**
 * Waits for the specified number of milliseconds.
 */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
