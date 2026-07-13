declare global {
	type ClassModule = Record<string, string>;
	type ClassModuleMap = Record<string, ClassModule>;

	interface Window {
		// for whatever reason it's number in lib.dom.d.ts
		[index: string]: any;
	}

	// build-class-modules
	var SteamClient: any;
	var browser: any;

	var classModules: ClassModuleMap;
	var exportedModules: [string, (filter: any) => boolean][];
	var parsedModules: [string, ClassModule][];
	var specialModules: ClassModuleMap;

	var g_PopupManager: any;
	var popups: any[];
	var inClient: boolean;
	var notInDb: string[];

	function findFirstModule(
		filter: (mod: any) => boolean,
		component: string,
	): any;
	function findModule(filter: (mod: any) => boolean): any;
	function findAllModules(filter: (mod: any) => boolean): any[];
}

export {};
