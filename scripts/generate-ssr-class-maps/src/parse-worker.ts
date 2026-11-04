import { parentPort, workerData } from "node:worker_threads";
import { parseFile } from "./parse-file";

if (!parentPort) {
	throw new Error("This module must run in a worker thread");
}

if (typeof workerData !== "object") {
	throw new Error(
		`Worker expected an object, got ${JSON.stringify(workerData)}`,
	);
}
const { list, source } = workerData as { list: string; source: string };
const classMap = await parseFile(source, list);
parentPort.postMessage(classMap);
