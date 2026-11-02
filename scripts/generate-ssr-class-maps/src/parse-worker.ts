import { parentPort, workerData } from "node:worker_threads";
import { parseFile } from "./parse-file";

if (!parentPort) {
	throw new Error("This module must run in a worker thread");
}

if (typeof workerData !== "string") {
	throw new Error("Worker expected a file path");
}

const classMap = await parseFile(workerData);
parentPort.postMessage(classMap);
