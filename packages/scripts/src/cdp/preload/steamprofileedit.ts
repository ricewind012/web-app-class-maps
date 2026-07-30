declare var _preloadFinished: boolean;
declare var Millennium: {
	findElement: <T extends HTMLElement>(
		doc: Document,
		sel: string,
	) => Promise<NodeListOf<T>>;
};

var el = async <T extends HTMLElement>(sel: string) =>
	(await Millennium.findElement<T>(document, sel))[0];

(async () => {
	const avatarNavLink = await el(
		`.${classModules.shell.NavLink}[href$="/avatar"]`,
	);
	avatarNavLink.click();

	// Upload a bogus image to trigger loading the avatarcrop module
	const fileInput = await el<HTMLInputElement>("input[type='file']");
	const file = new File([""], "image0.jpg", { type: "image/jpg" });
	const dt = new DataTransfer();
	dt.items.add(file);
	fileInput.files = dt.files;
	fileInput.dispatchEvent(new Event("input", { bubbles: true }));

	window._preloadFinished = true;
})();
