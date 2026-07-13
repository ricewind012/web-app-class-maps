import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Config } from "./api.js";

const packagePath = path
	.dirname(fileURLToPath(import.meta.url))
	.split(path.sep)
	.slice(0, -1)
	.join(path.sep);

const DIST_PATH = path.join(packagePath, "dist");
export const CDP_FILES_PATH = path.join(DIST_PATH, "cdp");
export const SCRIPT_PATH = path.join(DIST_PATH, "lib");

export const DEFAULT_CONFIG: Config = {
	classMaps: "class_maps",
	ignore: [],
};

export const STORE_BASE_URL = "https://store.steampowered.com";
