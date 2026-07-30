import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Config } from "./api.js";

const DIST_PATH = path.dirname(fileURLToPath(import.meta.url));

export const CDP_FILES_PATH = path.join(DIST_PATH, "cdp");
export const SCRIPT_PATH = path.join(DIST_PATH, "lib");
export const DEFAULT_CONFIG: Config = {
	classMaps: "class_maps",
	ignore: [],
};
