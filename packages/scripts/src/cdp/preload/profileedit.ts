const elements = document.getElementsByClassName(
	classModules.profileedit.NavLink,
);
for (const btn in elements) {
	// why the fuck is this a string ???
	(btn as unknown as HTMLElement).click();
}
