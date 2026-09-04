import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type CDP from "chrome-remote-interface";
import cdp from "chrome-remote-interface";
import type ProcessInfo from "find-process";
import findProcess from "find-process";
import { type App, type Page, runWithResult, type ScriptFile } from "./api.js";

export type ClassModule = Record<string, string>;
export type ClassModuleMap = Record<string, ClassModule>;

interface AppInfo {
	connErrorMsgFormat: string;
	connFilter: (target: CDP.Target) => boolean;
	processName: string;
}

interface SteamPage {
	/**
	 * URL regex to match if there is an open page.
	 */
	match: RegExp;

	/**
	 * The URL to open if not open already.
	 */
	url: string;
}

const STEAM_STORE_BASE_URL = "https://store.steampowered.com";

export const appInfo: Record<App, AppInfo> = {
	steam: {
		connErrorMsgFormat:
			"Try running Steam with -cef-enable-debugging or using Millennium with -dev",
		connFilter: (e) => e.title === "SharedJSContext",
		processName: "steamwebhelper",
	},
};

const cacheDir = (() => {
	const home = os.homedir();
	switch (process.platform) {
		case "win32":
			return process.env.LOCALAPPDATA || path.join(home, "AppData", "Local");
		case "darwin":
			return path.join(home, "Library", "Caches");
		default:
			return process.env.XDG_CACHE_HOME || path.join(home, ".cache");
	}
})();
export const cachePath = path.join(cacheDir, "web-app-class-maps");

/**
 * Creates a CDP connection for a given target.
 */
export async function createConnection(
	target: (targets: cdp.Target[]) => cdp.Target,
) {
	const processes: ProcessInfo[] = await findProcess(
		"name",
		appInfo.steam.processName,
	);
	const port = Number(
		processes
			.find((e) => e.cmd.includes("--remote-debugging-port="))
			.cmd.match(/--remote-debugging-port=(\d+)/)?.[1],
	);
	if (Number.isNaN(port)) {
		throw new Error(appInfo.steam.connErrorMsgFormat);
	}

	const connection = await cdp({
		host: "127.0.0.1",
		port,
		target,
	});

	await connection.Runtime.enable();
	connection.Runtime.on("consoleAPICalled", (ev) => {
		if (ev.type !== "error") {
			return;
		}

		console.error(...ev.args.map((e) => e.description || e.value));
	});

	return connection;
}

/**
 * Creates a CDP connection for a given page name.
 */
export async function createWebConnection(page: Page) {
	const { match } = await getSteamPageUrl(page);
	const connection = await createConnection((e) =>
		e.find((e) => e.url.match(match)),
	);

	return connection;
}

/**
 * @returns `true` if the file exists.
 */
export async function fileExists(path: string) {
	const { F_OK, R_OK, W_OK } = fs.constants;
	try {
		await fs.access(path, F_OK | R_OK | W_OK);
		return true;
	} catch {
		return false;
	}
}

/**
 * Gets the command line's arguments but typed.
 */
export function getArgs() {
	return process.argv.slice(2) as [App, ScriptFile, ...string[]];
}

/**
 * Gets a page URL for a given page name.
 */
export async function getSteamPageUrl(page: Page): Promise<SteamPage> {
	const resolve = (name: string) =>
		runWithResult(`urlStore.ResolveURL("${name}")`);
	const pageObj = (url: string) => ({
		match: new RegExp(`^${url.replace(/\/+$/, "")}`),
		url,
	});

	const profileUrl = await resolve("SteamIDMyProfile");
	switch (page) {
		case "steamaccountpreferences":
			return {
				match: new RegExp(`^${STEAM_STORE_BASE_URL}/account`),
				url: await resolve("FamilyManagement"),
			};
		case "steamapppage":
			return {
				match: new RegExp(`^${STEAM_STORE_BASE_URL}/app/\\d+`),
				url: `${STEAM_STORE_BASE_URL}/app/666220`,
			};
		case "steamnotificationspage":
			return pageObj(`${profileUrl}notifications`);
		case "steamprofileedit":
			return pageObj(await resolve("SteamIDEditPage"));
		case "steamshoppingcart":
			return pageObj(await resolve("StoreCart"));
		case "steamstoremenu":
			return pageObj(await resolve("StoreFrontPage"));
	}
}
