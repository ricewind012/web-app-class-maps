/** biome-ignore-all lint/suspicious/noExplicitAny: lol */

declare global {
	type ClassModule = Record<string, string>;
	type ClassModuleMap = Record<string, ClassModule>;
	type ExportedModuleMap = [string, (filter: any) => boolean][];

	interface Window {
		// for whatever reason it's number in lib.dom.d.ts
		[index: string]: any;
	}

	function findFirstModule(
		filter: (mod: any) => boolean,
		component: string,
	): any;
	function findModule(filter: (mod: any) => boolean): ClassModule;
	function findAllModules(filter: (mod: any) => boolean): ClassModule[];
}

export {};
