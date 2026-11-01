import type { ReactComponentInfo } from "../react-component-id";

// Length of the CSS module (including the inlined classes count) has to match
// with all the arrays' lengths here. Some class names are skipped (except when
// it makes sense, i.e. for context):
//
// - Logged out
// - Responsive
// - Steam China

interface ComponentListItem {
	classes: string[];
	classesInlined?: string[];
	filter: (info: ReactComponentInfo) => boolean;
}

export const componentList: Record<string, ComponentListItem> = {
	communitytemplate: {
		classes: ["ProgressBar", "Body", "ReactRoot", "Content"],
		filter: (info) => info.strings.has("CommunityTemplate"),
	},
	globalfooter: {
		classes: [
			"GlobalFooter",
			"LegalNotice",
			"LogoLinks",
			"LinkColumnHeading",
			// Steam China
			"",
			"",
			"",
		],
		filter: (info) => info.strings.has("#footer_link_header_steam"),
	},
	globalheader: {
		classes: [
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
		classesInlined: ["SuperNavValveOnly", "SuperNavNewTag", "SuperNavUserName"],
		filter: (info) =>
			info.strings.has("globalheader") && info.strings.has("aria-current"),
	},
	globalheadercontrols: {
		classes: [
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
		classesInlined: [
			"LanguageMenuBetaTag",
			"GreenEnvelopeFallback",
			"GreenEnvelope",
		],
		filter: (info) => info.strings.has("#global_menu_install_steam"),
	},
	globalheaderresponsivemenu: {
		classes: [
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
		classesInlined: [
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
		filter: (info) => info.strings.has("#global_menu_account_details"),
	},
	hoverposition: {
		classes: ["HoverPositionOuter", "HoverPosition"],
		classesInlined: [
			"HoverAboveModal",
			"Ready",
			"NoSpace",
			"EnablePointerEvents",
		],
		filter: (info) => info.strings.has(".hover_arrow.left"),
	},
	root: {
		classes: ["Root"],
		filter: (info) => info.strings.has("noOpinionatedGlobalStyles"),
	},
	simplemodaldialog: {
		classes: [
			"SimpleModalDialog",
			"SimpleModalDialogHeader",
			"XButton",
			"SimpleModalContentCtn",
		],
		classesInlined: ["SimpleModalDialogTitle"],
		filter: (info) => info.strings.has("SimpleModalDialog"),
	},
	steamavatar: {
		classes: [
			"AvatarHolder",
			"Avatar",
			"Offline",
			"Online",
			"AvatarStatus",
			"InGame",
			"AwayOrSnooze",
			"WatchingBroadcast",
			"AvatarFrame",
			"AvatarFrameImg",
		],
		filter: (info) => info.strings.has("data-status-position"),
	},
	throbber: {
		classes: [
			"LoadingWrapper",
			"static",
			"bottomCircle",
			"noString",
			"throbber_small",
			"throbber_medium",
			"throbber_large",
			"roundOuterOutline",
			"roundOuter",
			"roundFill",
			"topCircle",
			...Array.from(
				Array(15),
				(_, i) => `roundThrobber${(i + 1).toString().padStart(2, "0")}`,
			).reverse(),
			"throbber_xlarge",
			"throbber_xxlarge",
		],
		classesInlined: [
			"throbber_center_wrapper",
			"ThrobberDelayAppear",
			"Visible",
			"NewThrobber",
			"ThrobberText",
			"Throbber",
			"blur",
		],
		filter: (info) => info.strings.has("SteamLogoThrobber"),
	},
	tooltip: {
		classes: ["TextToolTip"],
		filter: (info) => info.strings.has("tool-tip-source"),
	},
	tw_flex: {
		classes: [
			"Flex",
			"Direction",
			"Justify",
			"Align",
			"Gap",
			"GapX",
			"GapY",
			"Wrap",
			"Inline",
		],
		filter: (info) =>
			["as", "focusable", "navProps"].every((e) => info.keys.has(e)) &&
			info.strings.has("flow-children") &&
			!info.strings.has("grid"),
	},
	tw_grid: {
		classes: [
			"Grid",
			"Display",
			"Columns",
			"Rows",
			"AutoColumns",
			"AutoRows",
			"AutoFlow",
			"Areas",
			"Flow",
			"AlignContent",
			"JustifyContent",
			"Gap",
			"GapX",
			"GapY",
		],
		filter: (info) =>
			info.strings.has("flow-children") && info.strings.has("grid"),
	},
};
