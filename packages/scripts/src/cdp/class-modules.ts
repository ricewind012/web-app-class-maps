// from build-class-modules
declare var exportedModules: ExportedModuleMap;
declare var parsedModules: [string, ClassModule][];
declare var specialModules: ClassModuleMap;

// biome-ignore lint/correctness/noUnusedVariables: "Returns" below for CDP
var classModules: ClassModuleMap = {
	...(window.specialModules || {}),
	...(window.parsedModules
		?.map((e) => ({ [e[0]]: e[1] }))
		.reduce((a, b) => Object.assign(a, b)) || {}),
	...exportedModules
		.flatMap((a) => {
			const mod = findFirstModule(a[1], a[0]);
			if (!mod) {
				return {};
			}

			return {
				[a[0]]: Object.keys(mod || {})
					// Remove keys like "duration-app-launch"
					.filter((e) => !mod[e].match(/^\d+(\.\d+)?(\w{2})?$/))
					.map((e) => ({ [e]: mod[e] }))
					.reduce((a, b) => Object.assign(a, b)),
			};
		})
		.reduce((a, b) => Object.assign(a, b)),
};

// return
classModules;
