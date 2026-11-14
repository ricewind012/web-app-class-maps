declare var _preloadExists: boolean;

type InitReq = {
	m: Record<string, WebpackModule>;
	(id: string): WebpackModule;
};
type WebpackModule = Record<string, string>;

var initReq: InitReq | undefined;
var webpackCache: Record<string, WebpackModule> = {};
// biome-ignore lint/style/noNonNullAssertion: No other way probably
var webpackGlobal = Object.keys(window).find((e) => e.startsWith("webpack"))!;
var webpackModules = window[webpackGlobal] as {
	push(chunk: [[number], object, (r: InitReq) => void]): void;
};
webpackModules.push([
	[Math.random()],
	{},
	(r: InitReq) => {
		initReq = r;
	},
]);
// Satisfy TypeScript, this never fails either way
if (!initReq) {
	throw new Error("initReq was not initialized by webpack module injection");
}
for (const i of Object.keys(initReq.m)) {
	webpackCache[i] = initReq(i);
}

var allModules: WebpackModule[] = [];
for (const mod of Object.values<WebpackModule>(webpackCache)) {
	if (!mod || typeof mod !== "object" || mod.__esModule) {
		continue;
	}

	const keys = Object.keys(mod);
	const first = keys[0];
	const notNeeded =
		!first ||
		first.length < 2 ||
		(keys.length === 1 &&
			(first === "duration-app-launch" ||
				first === "version" ||
				first.match(/^str[A-Z]/))) ||
		!keys.every((key) => typeof mod[key] === "string");
	if (notNeeded) {
		continue;
	}

	const copy: WebpackModule = {};
	for (const [k, v] of Object.entries(mod)) {
		// "M5YgSyrfvCXXY_XYhYzcl Icon" -> "M5YgSyrfvCXXY_XYhYzcl"
		copy[k] = v.replace(/\s+.*/, "");
	}
	allModules.push(copy);
}

// biome-ignore lint/correctness/noUnusedVariables: Runs globally in CDP
function findModule(filter: (mod: WebpackModule) => boolean) {
	return allModules.find(filter);
}

function findAllModules(filter: (mod: WebpackModule) => boolean) {
	return allModules.filter(filter);
}

// biome-ignore lint/correctness/noUnusedVariables: Runs globally in CDP
function findFirstModule(
	filter: (mod: WebpackModule) => boolean,
	component: string,
) {
	const modules = findAllModules(filter);
	const printError = (msg: string) => {
		console.error("[%s] %s", component, msg);
	};

	if (!window._preloadExists && modules.length === 0) {
		printError("found no modules");
	}
	if (modules.length > 1) {
		printError("found more than 1 module, returning first found");
	}

	return modules[0];
}

/**
 * Find a unique class name from multiple similiar class modules.
 *
 * @param key Class name.
 * @param index Array index.
 */
// biome-ignore lint/correctness/noUnusedVariables: Runs globally in CDP
function findUniqueKey(key: string, index = 0) {
	const mod = findAllModules((mod) => !!mod[key])[index];
	return Object.keys(mod).find(
		(modKey) => findAllModules((mod2) => !!mod2[modKey]).length === 1,
	);
}
