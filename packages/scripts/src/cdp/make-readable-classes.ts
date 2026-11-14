declare var classModules: ClassModuleMap;

var readableClassMap = new Map<string, string>();
for (const [modName, mod] of Object.entries(classModules)) {
	for (const [className, value] of Object.entries(mod)) {
		if (typeof value !== "string") {
			continue;
		}

		readableClassMap.set(value, `${modName}_${className}`);
	}
}

/**
 * @returns the readable class name.
 */
function getNormalClass(className: string) {
	const readableClass = readableClassMap.get(className);
	if (readableClass) {
		return readableClass;
	}

	notInDb.add(className);
}

/**
 * Sets readable classes to a `data-readable-class` attribute.
 */
function normalizeElement(el: HTMLElement) {
	const readableClasses = Array.from(el.classList, getNormalClass)
		.filter(Boolean)
		.map((e) => `\t${e}`)
		.join("\n");
	if (readableClasses === "") {
		return;
	}

	el.dataset.readableClass = `\n${readableClasses}\n`;
}

function main({ target }: { target: Window }) {
	const elements = target.document.querySelectorAll<HTMLElement>("[class]");
	for (const el of elements) {
		normalizeElement(el);
	}

	if (inSteamClient) {
		for (const popup of popups) {
			// @ts-expect-error: this works actually, fuck typescript
			popup.removeEventListener("focus", main);
		}
	}

	if (notInDb.size > 0) {
		const classes = [...notInDb].sort();
		console.error(
			"%s classes are not in the classes db: %o",
			classes.length,
			classes,
		);
	}
}

declare const g_PopupManager: {
	GetPopups(): MapIterator<{ window: Window }>;
};
declare const popups: Window[];
declare const SteamClient: { User: object };

var inSteamClient = !!SteamClient?.User;
var notInDb = new Set<string>();
if (inSteamClient) {
	window.popups = [...g_PopupManager.GetPopups()].map((e) => e.window);
	for (const popup of popups) {
		// @ts-expect-error: this works actually, fuck typescript
		popup.addEventListener("focus", main);
	}
} else {
	main({ target: window });
}
