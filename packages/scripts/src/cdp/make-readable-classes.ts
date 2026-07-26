/**
 * @returns the readable class name.
 */
function getNormalClass(className: string) {
	for (const key of Object.keys(classModules)) {
		const mod = classModules[key];
		if (!mod) console.log({ key });
		const keys = Object.keys(mod);
		const name = keys.find((e) => mod[e] === className);
		if (!name) {
			continue;
		}

		return [key, name].join("_");
	}

	notInDb.push(className);
}

/**
 * Sets readable classes to a `data-readable-class` attribute.
 */
function normalizeElement(el: HTMLElement) {
	const readableClasses = [...el.classList]
		.map(getNormalClass)
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

	if (notInDb.length > 0) {
		const classes = [...new Set(notInDb)];
		console.error(
			"%s classes are not in the classes db: %o",
			classes.length,
			classes.sort(),
		);
	}
}

declare const g_PopupManager: {
	GetPopups(): MapIterator<{ window: Window }>;
};
declare const popups: Window[];
declare const SteamClient: { User: object };

var inSteamClient = !!SteamClient?.User;
var notInDb: string[] = [];
if (inSteamClient) {
	window.popups = [...g_PopupManager.GetPopups()].map((e) => e.window);
	for (const popup of popups) {
		// @ts-expect-error: this works actually, fuck typescript
		popup.addEventListener("focus", main);
	}
} else {
	main({ target: window });
}
