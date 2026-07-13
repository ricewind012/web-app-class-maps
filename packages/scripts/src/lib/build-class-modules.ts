import fs from "node:fs";
import path from "node:path";
import prettier from "prettier";
import type { Page } from "../api.js";
import {
	config,
	connection,
	run,
	runCdpFile,
	runWithResult,
	sleep,
} from "../api.js";
import { createWebConnection, getPageUrl } from "../shared.js";

/**
 * BrowserView event to listen for on page load.
 */
const BROWSER_EVENT = "finished-request";

const SELECTORS: Record<Page, string> = {
	accountpreferences: "[data-featuretarget]",
	apppage: "[data-featuretarget]",
	gameslist: "[data-featuretarget='gameslist-root']",
	notificationspage: "#react_root",
	profileedit: "#react_root",
	shoppingcart: "[data-featuretarget='react-root']",
	storemenu: "[data-featuretarget$='-carousel']",
};

async function sleepUntilResult(expression: string, conn?: typeof connection) {
	while (!(await runWithResult(expression, conn))) {
		await sleep(10);
	}
}

/**
 * Gets a CDP web connection, accounting for the needed React part to load.
 */
async function getWebConn(page: Page | "client") {
	if (page === "client") {
		return null;
	}

	const openedConn = await createWebConnection(page).catch(() => {});
	if (openedConn) {
		return openedConn;
	}

	const { url } = await getPageUrl(page);
	await run(`
		function onFinishedRequest() {
			window._finished = true;
			browser.off("${BROWSER_EVENT}", onFinishedRequest);
		}

		browser = SteamClient.BrowserView.Create();
		browser.LoadURL("${url}");
		browser.on("${BROWSER_EVENT}", onFinishedRequest);
	`);

	console.log("Waiting for page load...");
	await sleepUntilResult("window._finished");
	const conn = await createWebConnection(page).catch((e) => {
		console.log("%s\nNo page whose URL is %o has been found.", e.message, url);
		process.exit(1);
	});

	const selector = `${SELECTORS[page as Page]}:not(:empty)`;
	const expression = `!!document.querySelector("${selector}")`;
	console.log("Waiting for %o selector...", selector);
	await sleepUntilResult(expression, conn);

	return conn;
}

async function doTheThing(page: Page, conn: typeof connection) {
	const webpackRan = await runWithResult("!!webpackCache", conn);
	const forceWebpackRerun = await runWithResult("forceWebpackRerun", conn);
	if (!webpackRan || forceWebpackRerun) {
		await runCdpFile("class-modules-webpack.js", conn);
	}

	const preloadFile = path.join("preload", `${page}.js`);
	if (fs.existsSync(preloadFile)) {
		await runCdpFile(preloadFile, conn);
	}
	await runCdpFile(path.join("db", `${page}.js`), conn);

	const output = await runCdpFile("class-modules.js", conn);
	const [classModules, allModules] = (await runWithResult(
		"[Object.keys(classModules).length, allModules.length]",
		conn,
	)) as [number, number];
	console.log({ allModules, classModules, output });

	const filePath = path.join(config.classMaps, `${page}.json`);
	const content = await prettier.format(JSON.stringify(output), {
		parser: "json-stringify",
	});
	fs.mkdirSync(config.classMaps, { recursive: true });
	fs.writeFileSync(filePath, content);
	console.log("Wrote %s/%s modules to %o", classModules, allModules, filePath);
}

export async function execute(page: Page | "client" = "client") {
	const isClient = page === "client";
	const webConn = await getWebConn(page);

	const conn = isClient ? connection : webConn;
	await doTheThing(page as Page, conn);

	webConn?.close();
	if (!isClient) {
		await run(`
			window._finished = false;
			SteamClient.BrowserView.Destroy(browser);
		`);
	}
}
