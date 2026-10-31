import type { ReactComponentInfo } from "../react-component-id";

export type Component =
	| "communitytemplate"
	| "globalfooter"
	| "globalheader"
	| "globalheaderresponsivemenu"
	| "globalheaderrightside"
	| "root"
	| "simplemodaldialog";

export const componentFilters: Record<
	Component,
	(info: ReactComponentInfo) => boolean
> = {
	communitytemplate: (info) => info.strings.has("CommunityTemplate"),
	globalfooter: (info) => info.strings.has("#footer_link_header_steam"),
	globalheader: (info) =>
		info.strings.has("globalheader") && info.strings.has("aria-current"),
	globalheaderresponsivemenu: (info) =>
		info.strings.has("#global_menu_account_details"),
	globalheaderrightside: (info) =>
		info.strings.has("#global_menu_install_steam"),
	root: (info) => info.strings.has("noOpinionatedGlobalStyles"),
	simplemodaldialog: (info) => info.strings.has("SimpleModalDialog"),
};

export const classNameByIndex: Record<Component, string[]> = {
	communitytemplate: ["ProgressBar", "Body", "ReactRoot", "Content"],
	globalfooter: [
		"GlobalFooter",
		"LegalNotice",
		"LogoLinks",
		"LinkColumnHeading",
		// Steam China
		"",
		"",
		"",
	],
	globalheader: [
		"Container",
		"Content",
		"ResponsiveContainer",
		"Logo",
		"ResponsiveButton",
		"ResponsiveButtonImg",
		"SuperNav",
		"SuperNavList",
		"SuperNavItem",
		// bruh valve
		"SuperNavMenu",
		"SuperNavMenuItem",
	],
	globalheaderresponsivemenu: [
		"Menu",
		"MenuContent",
		"UserOnline",
		"UserInGame",
		"UserOffline",
		"",
		"UserCartWalletArea",
		"MenuItem",
		"MenuItemList",
		"MenuItemHeader",
		"MenuItemArrow",
		"MenuItemListItem",
		"Footer",
		// Steam China
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
	],
	globalheaderrightside: [
		"Container",
		"AccountMenuItemTextHighlight",
		"Avatar",
		"AccountMenuButton",
		"AccountBalance",
		"AccountInfoContainer",
		"AccountMenuItem",
		"AccountMenu",
		// bruh valve
		"AccountMenuChina",
		"InstallSteamButton",
		"InstallSteamButtonLoggedOut",
	],
	root: ["Root"],
	simplemodaldialog: [
		"SimpleModalDialog",
		"SimpleModalDialogHeader",
		"XButton",
		"SimpleModalContentCtn",
	],
};

export const inlinedClassNameByIndex: Partial<Record<Component, string[]>> = {
	// TODO: broken, for some reason doesnt count memo/forwardRef
	//globalheader: ["SuperNavValveOnly", "SuperNavNewTag", "SuperNavUserName"],
	globalheader: ["SuperNavValveOnly"],
	globalheaderresponsivemenu: [
		"unknown_1",
		// for some reason this is duplicated...
		"MenuItemHeader",
		"MenuUserArea",
		"MenuUserPersona",
		"MenuUserAvatarContainer",
		"MenuUserAvatar",
		"MenuUserName",
		"NotificationsCtn",
		"NotificationsUnread",
		"NotificationsEnvelope",
		"NotificationsCount",
		"MenuItemMinor",
		// Global header?
		"",
		"",
		"",
		"",
	],
	globalheaderrightside: [
		"LanguageMenuBetaTag",
		"GreenEnvelopeFallback",
		"GreenEnvelope",
	],
	simplemodaldialog: ["SimpleModalDialogTitle"],
};
