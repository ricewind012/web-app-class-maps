import { mkdir, readFile, writeFile } from "node:fs/promises";
import { availableParallelism, homedir } from "node:os";
import { join } from "node:path";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { Worker } from "node:worker_threads";
import puppeteer from "puppeteer-core";
import { parseFile } from "./parse-file";

type ClassMap = Map<string, Record<string, string>>;

const CLASS_MAPS: Record<string, string> = {
	"steam-web-shared": "https://store.steampowered.com/cart",
	"steam-web-shoppingcart": "https://store.steampowered.com/cart",
};

function parseInWorker(source: string, list: string) {
	const worker = new Worker(new URL("./parse-worker.ts", import.meta.url), {
		workerData: { list, source },
	});

	return new Promise<ClassMap>((resolve, reject) => {
		worker.once("message", resolve);
		worker.once("error", reject);
		worker.once("exit", (code) => {
			if (code !== 0) {
				reject(new Error(`Worker exited with code ${code}`));
			}
		});
	});
}

async function main() {
	const [list, file] = process.argv.slice(2);
	if (!list) {
		throw new Error("Usage: bun src/index_puppeteer.ts <class-list> [file]");
	}

	const filePath = join(
		"..",
		"class-maps",
		`${list.replace("steam-web-", "")}.json`,
	);
	if (file) {
		const source = await readFile(file, "utf8");
		const classMap = await parseFile(source, list);
		console.log(classMap);
		await writeFile(filePath, JSON.stringify(classMap));
		return;
	}

	const url = CLASS_MAPS[list];
	if (!url) {
		throw new Error(`Unknown class list: ${list}`);
	}

	const userDataDir = join(
		homedir(),
		".generate-ssr-class-maps",
		"steam-browser-profile",
	);
	await mkdir(userDataDir, { recursive: true });

	// TODO: this has to run in ci one day
	const browser = await puppeteer.launch({
		browser: "firefox",
		executablePath: "/opt/firefox-nightly/firefox",
		//headless: false,
		userDataDir,
	});

	try {
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: "networkidle2" });
		console.log(
			`Steam cart opened in Chrome using profile ${userDataDir}. Log in if needed, then press Enter here to continue.`,
		);
		const readline = createInterface({ input: stdin, output: stdout });
		try {
			await readline.question("");
		} finally {
			readline.close();
		}

		await page.reload({ waitUntil: "networkidle2" });
		const links = await page.$$eval(
			'link[rel="modulepreload"][href], script[type="module"][src]',
			(e) => e.map((e) => (e instanceof HTMLLinkElement ? e.href : e.src)),
		);
		const hrefs = [...new Set(links)];
		await writeFile("a", hrefs.join("\n"));

		const threads = Math.min(availableParallelism(), hrefs.length);
		const results = new Array<ClassMap>(hrefs.length);
		let nextIdx = 0;
		const parseNext = async () => {
			while (nextIdx < hrefs.length) {
				const idx = nextIdx++;
				const href = hrefs[idx];
				// Fetching from the browser returns a NetworkError lol?
				const resp = await fetch(href);
				if (!resp.ok) {
					throw new Error(`Failed to fetch ${href}: ${resp.status}`);
				}

				results[idx] = await parseInWorker(await resp.text(), list);
			}
		};
		await Promise.all(Array.from({ length: threads }, () => parseNext()));

		const classMap: Record<string, Record<string, string>> = {};
		for (const result of results) {
			for (const [component, classes] of result) {
				classMap[component] = classes;
			}
		}

		console.log(classMap);
		await writeFile(filePath, JSON.stringify(classMap));
	} finally {
		await browser.close();
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
