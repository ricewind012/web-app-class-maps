import type { ComponentListItem } from "./types";

export const componentList: Record<string, ComponentListItem> = {
	accountpanel: {
		classes: [
			"CurrentUserProfileBackground",
			"CurrentUserProfileBackgroundImage",
			"AccountPanelPage",
			"AvatarAndLabel",
			"LabelHolder",
			"NetworkWarning",
			"Highlight",
			"HasActiveSupportAlert",
			"ChangeAccountButtons",
			"ChangeAccountButton",
			"FatButtonRow",
			"FatButton",
			"FatButtonFocus",
			"RewardsDisclaimer",
			"SteamDeckRewardsBtns",
			"HLAlyxPromoButtons",
			"FramePromoLogo",
		],
		classesInlined: ["Avatar", "Label", "Details"],
		filter: (info) => info.strings.has("#UserManagement_ViewProfile"),
	},
	accountsettings: {
		classes: [
			"EntryLabel",
			"EntryValue",
			"AvatarAndLabel",
			"LabelHolder",
			"SettingsDialogFatButton",
		],
		classesInlined: ["Avatar"],
		filter: (info) => info.strings.has("#Settings_Account_ViewProfile"),
	},
	parentalplaytimeblocked: {
		classes: ["ParentalButton", "ParentalWrapper"],
		classesInlined: ["Blocked"],
		filter: (info) => info.keys.has("displayOffIfDisabled"),
	},
	personanameandstatus: {
		classes: [
			"statusAndName",
			"",
			"",
			"playerName",
			"",
			"",
			"twoLine",
			"",
			"",
			"",
			"noContextMenu",
		],
		classesInlined: [""],
		filter: (info) => info.strings.has("ContextMenuButton"),
	},
	settings: {
		classes: [
			"SettingsDialogButton",
			"",
			"",
			"",
			"SettingsModal",
			"SettingsTitleBar",
			"MarginTop",
		],
		// SettingsDialogBodyFade went somewhere else, cool
		// classesInlined: [""],
		filter: (info) =>
			[
				"active",
				"hideMenu",
				"element",
				"position",
				"browserInfo",
				"options",
				"refInstance",
				"children",
			].every((e) => info.keys.has(e)),
	},
};
