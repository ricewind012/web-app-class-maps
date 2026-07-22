import fs from "node:fs";
import cdp from "chrome-remote-interface";
import type ProcessInfo from "find-process";
import findProcess from "find-process";
import { type Page, runWithResult } from "./api.js";
import { STORE_BASE_URL } from "./constants.js";

export const readFile = (file: string) => fs.readFileSync(file).toString();

interface SteamPage {
	/**
	 * The URL to open if not open already.
	 */
	url: string;

	/**
	 * URL regex to match if there is an open page.
	 */
	match: RegExp;
}

/**
 * Gets a page URL for a given page name.
 */
export async function getPageUrl(page: Page): Promise<SteamPage> {
	const resolve = (name: string) =>
		runWithResult(`urlStore.ResolveURL("${name}")`);
	const pageObj = (url: string) => ({
		match: new RegExp(`^${url.replace(/\/+$/, "")}`),
		url,
	});

	const profileUrl = await resolve("SteamIDMyProfile");
	switch (page) {
		case "accountpreferences":
			return {
				match: new RegExp(`^${STORE_BASE_URL}/account`),
				url: await resolve("FamilyManagement"),
			};
		case "apppage":
			return {
				match: new RegExp(`^${STORE_BASE_URL}/app/\\d+`),
				url: `${STORE_BASE_URL}/app/666220`,
			};
		case "gameslist":
			return pageObj(`${profileUrl}games`);
		case "notificationspage":
			return pageObj(`${profileUrl}notifications`);
		case "profileedit":
			return pageObj(await resolve("SteamIDEditPage"));
		case "shoppingcart":
			return pageObj(await resolve("StoreCart"));
		case "storemenu":
			return pageObj(await resolve("StoreFrontPage"));
	}
}

/**
 * Creates a CDP connection for a given target.
 */
export async function createConnection(
	target: (targets: cdp.Target[]) => cdp.Target,
) {
	const processes: ProcessInfo[] = await findProcess("name", "steamwebhelper");
	const port = Number(
		processes
			.find((e) => e.cmd.includes("--remote-debugging-port="))
			.cmd.match(/--remote-debugging-port=(\d+)/)?.[1],
	);
	if (Number.isNaN(port)) {
		throw new Error(
			"Is -cef-enable-debugging in use or Millennium installed with -dev being in use?",
		);
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
	const { match } = await getPageUrl(page);
	const connection = await createConnection((e) =>
		e.find((e) => e.url.match(match)),
	);

	return connection;
}
