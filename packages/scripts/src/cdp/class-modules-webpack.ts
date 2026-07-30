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

// Leave only the relevant modules
var allModules = Object.values<WebpackModule>(webpackCache).filter((e) => {
	if (!e || typeof e !== "object" || e.__esModule) {
		return false;
	}

	const keys = Object.keys(e);
	const first = keys[0];
	return (
		first &&
		first.length >= 2 &&
		!(
			keys.length === 1 &&
			(first === "duration-app-launch" ||
				first === "version" ||
				first.match(/^str[A-Z]/))
		) &&
		keys.every((k) => typeof e[k] === "string")
	);
});

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
