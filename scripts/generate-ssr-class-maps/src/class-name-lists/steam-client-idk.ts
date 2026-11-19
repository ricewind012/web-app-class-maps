import { componentList as sharedComponentList } from "./steam-shared";
import type { ComponentListItem } from "./types";

// XD
const sharedWebComponents = Object.fromEntries(
	Object.entries(sharedComponentList).filter(([k]) => k.startsWith("global")),
);
for (const k of Object.keys(sharedWebComponents)) {
	Reflect.deleteProperty(sharedComponentList, k);
}

// Remove AvatarFrame{,Img} (wtf)
sharedComponentList.staticsteamavatar.classes =
	sharedComponentList.staticsteamavatar.classes.slice(0, -2);

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
	cliptimeline: {
		classes: [
			"TimelineAndControls",
			"PlayerAndControls",
			"VideoPlayerContainer",
			"TimelineContainer",
			"GamepadTimelineContainer",
			"TourYellowUnderline",
			"LoadingTimeline",
			"ScrollAndControlsCtn",
			"TimelineScrollContainer",
			"ContentContainer",
			"AbsoluteLayer",
			"RelativeLayer",
			"RecordingDecorators",
			"ClipDecorators",
			"GameModes",
			"DateDecorator",
			"BackgroundTicks",
			"Highlights",
			"RangeHighlights",
			"RangeSelector",
			"SeekScrubber",
			"PlayHead",
			"PositionLeft",
			"PositionRight",
			"Phases",
		],
		// TODO
		// Fullscreen && `br-3t69A9Y0-`
		// Visible MsPeYVInjso-
		// DD-gCH4AyRg- GamepadTimelineContainerClipModeSpacer
		// xP7qeNW99Qo- GamepadMode
		filter: (info) => info.calls.has("SetTimelineParentCtnRef"),
	},
	cliptimelinemarker: {
		classes: [
			"Selected",
			"HighlightIcon",
			"CustomMarker",
			"Faded",
			"Marker",
			"GameMarkerSVG",
		],
		filter: (info) => info.calls.has("serializeToString"),
	},
	parentalplaytimeblocked: {
		classes: ["ParentalButton", "ParentalWrapper"],
		classesInlined: ["Blocked"],
		filter: (info) => info.keys.has("displayOffIfDisabled"),
	},
	personanameandstatus: {
		classes: [
			"statusAndName",
			"threeLines",
			"blocked",
			"playerName",
			"EllipsisName",
			"NoMask",
			"twoLine",
			"partyBeaconJoin",
			"hidePersona",
			"compactView",
			"noContextMenu",
		],
		classesInlined: [
			"playerNickname",
			"DNDContainer",
			"playerNicknameBracket",
			"PendingPersona",
			"richPresenceContainer",
			"gameName",
			"threeLines",
			"richPresenceLabel",
			"dropPadding",
			"gameIsPrivateIcon",
		],
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
	staticsteamavatar: sharedComponentList.staticsteamavatar,
	suggestdialog: {
		classes: [
			"mentionDialogPosition",
			"mentionDialog",
			"suggestOption",
			"mentionSearchOption",
			"selected",
		],
		filter: (info) =>
			info.keys.has("fnOnMouseOver") && info.keys.has("matchKey"),
	},
	voicesettingsfriends: {
		classes: [
			// TODO: this is emoticonsuggestion, "ARyrUoFBJKQ-"
			"Emoticon",

			"RecommendedNote",
			"TransmissionTypeSettings",
			"HotkeySettingRow",
			"HotkeyButton",
			"HotkeySettingDescription",
			"VoiceSettings",
			"AdvancedSettingsButton",
			"ToggleRow",
		],
		classesInlined: ["Capturing", "HotkeyClearButton", "scrollMaskVertical"],
		filter: (info) => info.strings.has("#VoicePushToMuteAssigned"),
	},
};
