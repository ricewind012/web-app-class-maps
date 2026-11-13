import type { ComponentListItem } from "./types";

// TODO: simplemodaldialog & throbber don't get fetched in the market page

export const componentList: Record<string, ComponentListItem> = {
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
		filter: (info) => info.strings.has("#footer_legal_notice"),
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
	modaldialog: {
		classes: ["ModalDialog", "ModalDialogContent"],
		classesInlined: ["NoBodyScroll"],
		filter: (info) => info.strings.has("ModalDialog"),
	},
	root: {
		classes: ["Root"],
		filter: (info) => info.strings.has("--default-font-size"),
	},
	/*
	simplemodaldialog: {
		classes: [
			"SimpleModalDialog",
			"SimpleModalDialogHeader",
			"XButton",
			"SimpleModalContentCtn",
		],
		classesInlined: ["WideMode", "SimpleModalDialogTitle"],
		filter: (info) => info.strings.has("SimpleModalDialog"),
	},
	*/
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
	/*
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
			// These two are from the duplicated main component that's not
			// assigned to anything ??? Not worth "fixing"
			// "Throbber",
			// "blur",
		],
		filter: (info) => info.strings.has("SteamLogoThrobber"),
	},
	*/
	tooltip: {
		classes: ["TextToolTip"],
		// Dude
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
			info.strings.has("wrap"),
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
			["as", "focusable", "navProps"].every((e) => info.keys.has(e)) &&
			info.strings.has("flow-children") &&
			!info.strings.has("wrap"),
	},
	tw_popoverlist: {
		classes: ["Root", "Item"],
		filter: (info) =>
			info.strings.has(
				"<PopoverListItem> must be a child of <PopoverListRoot>.",
			),
	},
	tw_radio: {
		classes: ["RadioItem", "Radio"],
		classesInlined: ["RadioGroupDisabled"],
		filter: (info) =>
			info.strings.has(
				"<RadioGroup.Option> must be rendered within a <RadioGroup.Root>",
			),
	},
};
