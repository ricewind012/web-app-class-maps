import { availableParallelism } from "node:os";
import { Worker } from "node:worker_threads";
import { parseFile } from "./parse-file";

// spawn() is faster by 300ms with 475 files but ehh this looks better XD
function parseInWorker(file: string) {
	const worker = new Worker(new URL("./parse-worker.ts", import.meta.url), {
		workerData: file,
	});

	return new Promise<Map<string, Record<string, string>>>((resolve, reject) => {
		worker.once("message", (value) => {
			resolve(value);
		});
		worker.once("error", reject);
		worker.once("exit", (code) => {
			if (code === 0) {
				return;
			}

			reject(`Failed to parse ${file} (worker exited with code ${code})`);
		});
	});
}

async function main() {
	const files = process.argv.slice(2);
	if (files.length === 0) {
		throw new Error("Usage: bun src/index.ts <file> [file ...]");
	}

	if (files.length === 1) {
		const classMap = await parseFile(files[0]);
		console.log(classMap);
		return;
	}

	const threads = Math.min(availableParallelism(), files.length);
	const classMap = new Map<string, Record<string, string>>();
	for (let i = 0; i < files.length; i += threads) {
		const batch = files.slice(i, i + threads);
		const results = await Promise.all(batch.map(parseInWorker));
		for (const result of results) {
			for (const [component, classes] of result) {
				classMap.set(component, classes);
			}
		}
	}

	console.log(classMap);
}

main().catch((error: unknown) => {
	console.error(error);
	process.exitCode = 1;
});
