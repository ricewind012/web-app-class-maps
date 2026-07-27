#!/usr/bin/env bun

import path from "node:path";
import { type App, connection, readScript, type ScriptFile } from "./api.js";
import { getArgs } from "./shared.js";

// TODO: migrate doesn't care about this
const [app, file, arg] = getArgs();
const apps: App[] = ["steam"];
const files: ScriptFile[] = [
	"build-class-modules",
	"make-readable-classes",
	"migrate",
	"replace-old-classes",
];
if (!apps.some((e) => app === e) || !files.some((e) => file === e)) {
	console.error("Usage: %s <app> <script>", path.basename(process.argv[1]));
	console.error("Where <app>:\n%s", apps.map((e) => `- ${e}`).join("\n"));
	console.error("Where <script>:\n%s", files.map((e) => `- ${e}`).join("\n"));
	connection.close();
	process.exit(2);
}

const script = await readScript(file);
await script.execute(arg);
connection.close();
