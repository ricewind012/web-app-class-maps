import { readFile, writeFile } from "node:fs/promises";
import { availableParallelism } from "node:os";
import { join } from "node:path";
import { Worker } from "node:worker_threads";
import { componentClassNameFilterMap } from "./class-name-lists/steam-web-shared-object";
import type { ComponentListItem } from "./class-name-lists/types";
import { parseFile } from "./parse-file";

type ClassMap = Map<string, Record<string, string>>;

const CLASS_MAPS: Record<string, string> = {
	"steam-web-shared":
		"https://steamcommunity.com/market/listings/730/G180720F7083004",
	"steam-web-shared_store": "https://store.steampowered.com/cart",
	"steam-web-shoppingcart": "https://store.steampowered.com/cart",
	"steam-web-workshop":
		"https://steamcommunity.com/workshop/browse/?appid=312520",
	"steam-web-workshophome": "https://steamcommunity.com/app/312520/workshop/",
};

async function getTextFromURL(url: string) {
	const resp = await fetch(url);
	if (!resp.ok) {
		throw new Error(`Failed to fetch ${url}: ${resp.status}`);
	}

	return resp.text();
}

function parseInWorker(source: string, list: string) {
	const worker = new Worker(new URL("./parse-worker.ts", import.meta.url), {
		workerData: { list, source },
	});

	return new Promise<ClassMap>((resolve, reject) => {
		worker.once("message", (value) => {
			resolve(value);
		});
		worker.once("error", reject);
		worker.once("exit", (code) => {
			if (code === 0) {
				return;
			}

			reject(`Worker exited with code ${code}`);
		});
	});
}

async function writeClassMap(list: string, classMap: ClassMap) {
	const { componentList } = (await import(`./class-name-lists/${list}`)) as {
		componentList: Record<string, ComponentListItem>;
	};
	const additional = Object.keys(componentClassNameFilterMap);
	const listKeys = Object.keys(componentList);
	if (list === "steam-web-shared") {
		listKeys.push(...additional);
	}

	const a = new Set(listKeys);
	const b = new Set(classMap.keys());
	const notFound = a.difference(b);
	if (notFound.size > 0) {
		console.error("These components were not found: %o", notFound);
		process.exit(1);
	}

	console.log(classMap);
	const filePath = join("class-maps", `${list.replace("steam-web-", "")}.json`);
	writeFile(filePath, JSON.stringify(Object.fromEntries(classMap), null, 4));
}

async function main() {
	const [list, file] = process.argv.slice(2);
	if (file) {
		const source = await readFile(file, "utf8");
		const classMap = await parseFile(source, list);
		await writeClassMap(list, classMap);
		return;
	}

	const url = CLASS_MAPS[list];
	const html = await getTextFromURL(url);
	const matches = [
		...html.matchAll(/<link rel="modulepreload" href="(https.*?\.js)" as/g),
		...html.matchAll(/<script type="module" src="(https.*?\.js)" nonce/g),
	].map((e) => e[1]);
	const hrefs = [...new Set(matches)];
	writeFile("a", hrefs.join("\n"));

	const threads = Math.min(availableParallelism(), hrefs.length);
	const results = new Array<ClassMap>(hrefs.length);
	let nextIdx = 0;
	const parseNext = async () => {
		while (nextIdx < hrefs.length) {
			const idx = nextIdx++;
			const href = hrefs[idx];
			const text = await getTextFromURL(href);
			results[idx] = await parseInWorker(text, list);
		}
	};
	await Promise.all(Array.from({ length: threads }, () => parseNext()));

	const classMap = new Map<string, Record<string, string>>();
	for (const result of results) {
		for (const [component, classes] of result) {
			classMap.set(component, {
				...classMap.get(component),
				...classes,
			});
		}
	}
	await writeClassMap(list, classMap);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
