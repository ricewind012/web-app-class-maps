import path from "node:path";
import { fileURLToPath } from "node:url";

const SRC_PATH = path.dirname(fileURLToPath(import.meta.url));

export const CDP_FILES_PATH = path.join(path.dirname(SRC_PATH), "dist", "cdp");
export const CLASS_MAP_URL_PART =
	"https://raw.githubusercontent.com/ricewind012/web-app-class-maps/refs/heads/data";
export const SCRIPT_PATH = path.join(SRC_PATH, "lib");
