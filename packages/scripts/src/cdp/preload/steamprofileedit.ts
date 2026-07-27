const elements = document.querySelectorAll<HTMLElement>(
	`.${classModules.profileedit.NavLink}`,
);
for (const btn of elements) {
	btn.click();
}
