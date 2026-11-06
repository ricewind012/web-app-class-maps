import { readFile, writeFile } from "node:fs/promises";
import { availableParallelism } from "node:os";
import { join } from "node:path";
import { Worker } from "node:worker_threads";
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

async function main() {
	const [list, file] = process.argv.slice(2);
	const filePath = join(
		"..",
		"class-maps",
		`${list.replace("steam-web-", "")}.json`,
	);
	if (file) {
		const source = await readFile(file, "utf8");
		const classMap = await parseFile(source, list);
		console.log(classMap);
		writeFile(filePath, JSON.stringify(classMap));
		return;
	}

	const url = CLASS_MAPS[list];
	const resp = await fetch(url);
	if (!resp.ok) {
		throw new Error(`Failed to fetch ${url}: ${resp.status}`);
	}

	const html = await resp.text();
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
	writeFile(filePath, JSON.stringify(classMap));
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
