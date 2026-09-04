import fs from "node:fs/promises";
import path from "node:path";
import prettier from "prettier";
import type { Page } from "../api.js";
import { connection, run, runCdpFile, runWithResult, sleep } from "../api.js";
import { CDP_FILES_PATH } from "../constants.js";
import {
	cachePath,
	createWebConnection,
	fileExists,
	getSteamPageUrl,
} from "../shared.js";

const EXPRESSIONS = {
	createBrowserView: (url: string) => `
		function onFinishedRequest() {
			window._finished = true;
			browser.off("${STEAM_BROWSERVIEW_EVENT}", onFinishedRequest);
		}

		browser = SteamClient.BrowserView.Create();
		browser.SetVisible(false);
		browser.LoadURL("${url}");
		browser.on("${STEAM_BROWSERVIEW_EVENT}", onFinishedRequest);
	`,
	finish: `
		window._finished = false;
		SteamClient.BrowserView.Destroy(browser);
	`,
	isFinished: "window._finished",
	isPreloadFinished: "window._preloadFinished",
	setPreloadExists: "window._preloadExists = true",
};

/**
 * Steam's BrowserView event to listen for on page load.
 */
const STEAM_BROWSERVIEW_EVENT = "finished-request";
const STEAM_WEB_SELECTORS: Record<Exclude<Page, "steamclient">, string> = {
	steamaccountpreferences: "[data-featuretarget='family-management']",
	steamapppage: "[data-featuretarget='appreviews']",
	steamnotificationspage: "#react_root",
	steamprofileedit: "#react_root",
	steamshoppingcart: "[data-featuretarget='react-root']",
	steamstoremenu: "[data-featuretarget='store-menu-v7']",
};
const TIMEOUT = 10_000;

async function sleepUntilResult(expression: string, conn?: typeof connection) {
	while (!(await runWithResult(expression, conn))) {
		await sleep(10);
	}
}

/**
 * Gets a CDP web connection, accounting for the needed React part to load.
 */
async function getWebConn(page: Page) {
	if (page === "steamclient") {
		return null;
	}

	const openedConn = await createWebConnection(page).catch(() => {});
	if (openedConn) {
		return openedConn;
	}

	const { url } = await getSteamPageUrl(page);
	await run(EXPRESSIONS.createBrowserView(url));

	console.log("Waiting for page load...");
	await sleepUntilResult(EXPRESSIONS.isFinished);
	const conn = await createWebConnection(page).catch((e) => {
		console.error(
			"%s\nNo page whose URL is %o has been found.",
			e.message,
			url,
		);
		process.exit(1);
	});

	const handle = setTimeout(async () => {
		await run(EXPRESSIONS.finish);
		console.error("Selector wasn't found after %d seconds", TIMEOUT / 1_000);
		process.exit(1);
	}, TIMEOUT);
	const selector = `${STEAM_WEB_SELECTORS[page]}:not(:empty)`;
	const expression = `!!document.querySelector("${selector}")`;
	console.log("Waiting for %o selector...", selector);
	await sleepUntilResult(expression, conn);
	clearTimeout(handle);

	return conn;
}

async function doTheThing(page: Page, conn: typeof connection) {
	const writeModules = async () => {
		await runCdpFile(path.join("db", `${page}.js`), conn);
		return await runCdpFile("class-modules.js", conn);
	};

	const preloadPath = path.join("preload", `${page}.js`);
	const preloadExists = fileExists(path.join(CDP_FILES_PATH, preloadPath));
	// Don't print "found no modules", since it's gonna be found later
	if (preloadExists) {
		await run(EXPRESSIONS.setPreloadExists, conn);
	}
	await runCdpFile("class-modules-webpack.js", conn);

	if (preloadExists) {
		await writeModules();
		await runCdpFile(preloadPath, conn);
		await sleepUntilResult(EXPRESSIONS.isPreloadFinished, conn);
		// Be *entirely* sure the React parts loaded
		await sleep(1_000);
		// Second pass to get triggered loaded modules
		await runCdpFile("class-modules-webpack.js", conn);
	}

	const output = await writeModules();
	const [classModules, allModules]: [number, number] = await runWithResult(
		"[Object.keys(classModules).length, allModules.length]",
		conn,
	);

	const filePath = path.join(cachePath, `${page}.json`);
	const content = await prettier.format(JSON.stringify(output), {
		parser: "json-stringify",
	});
	await fs.mkdir(cachePath, { recursive: true });
	await fs.writeFile(filePath, content);
	console.log("Wrote %s/%s modules to %o", classModules, allModules, filePath);
}

export async function execute(page: Page = "steamclient") {
	const isClient = page === "steamclient";
	const webConn = await getWebConn(page);

	const conn = isClient ? connection : webConn;
	await doTheThing(page, conn);

	webConn?.close();
	if (!isClient) {
		await run(EXPRESSIONS.finish);
	}
}
