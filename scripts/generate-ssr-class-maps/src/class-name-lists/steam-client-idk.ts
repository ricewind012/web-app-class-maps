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

// TODO: objects
// - AddMarkerCtn: clipplayback
// - InviteDropBackground: invitedrop
// - ChatMessageSteamStore_Description: bbcode
// - QuickAccessControllerOrderContainer: remoteplay
// - ImageAndInfoBoxContainer: overlaytimelinepreview

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
	achievementsetstooltip: {
		classes: [
			// TODO
			"achievementiconbase_AchievementIconWrapper",
			"achievementiconbase_Icon",
			"achievementiconbase_HiddenLabel",
			"AchievementTooltip",
			"AchievementTooltipBody",
			"AchievementIconBackground",
			"BlurContainer",
			"UnlockInfo",
		],
		classesInlined: [
			"RareAchievementNoAnimation",
			"RareAchievementIconGlowContainerRoot",
			"RareAchievementIconGlowContainer",
			"RareAchievementIconGlow",
			"IconGlow",
		].map((e) => `achievementiconbase_${e}`),
		filter: (info) =>
			info.strings.has("#Achievements_Row_UnlockedOnDate") &&
			info.strings.has("dull-8"),
	},
	awardmodal: {
		classes: [
			"GrantAwardModal",
			"Header",
			"Title",
			"Description",
			"ButtonContainer",
			"LabelCtn",
			"IconCtn",
			"Label",
			"Points",
			"Footer",
			"PointsArea",
			"Column",
			"Left",
			"BalanceIcon",
			"BalanceDetails",
			"BalanceLabel",
			"BalanceAmount",
			"Right",
			"Actions",
			"Action",
			"FooterLink",
			"Divider",
			"ConfirmContainer",
			"ConfirmTextCtn",
			"ConfirmText",
			"AwardName",
			"ConfirmAwardImage",
			"LoadingContainer",
			"SuccessContainer",
			"SuccessText",
			"Loading",
			"ErrorContainer",
			"ErrorText",
			"PointsAmount",
			"PointsAmountIcon",
			"NotEnoughPoints",
			"UnstyledButton",
		],
		filter: (info) => info.strings.has("useGetReactionConfiguration"),
	},
	awardmodal_unstyledbutton: {
		classes: ["UnstyledButton"],
		classesInlined: [
			"InitialLoading",
			"LoadingContainer",
			"Visible",
			"ConfirmText",
			"TimePeriod",
			// "Buttons",
			// "Selected",
			// "Disabled",
			// "IconCheckMark",
		],
		filter: (info) => info.strings.has("#GrantAwardDescription_Review"),
	},
	/* TODO: there are more classes, fix NOW
	friendsnooze: {
		classes: [
			"SnoozeContainer",
			"SnoozeZ",
			"Medium",
			"Large",
			"Z1",
			"Z2",
			"Z3",
			"hoverParent",
		],
		classesInlined: ["animating", "Dim"],
		// yeah dude
		filter: (info) => info.strings.has("data-text"),
	},
	*/
	chatroom: {
		classes: [
			"", // "dialogs" module
			"", // "dialogs" module
			"General",
			"Avatar",
			"AvatarAndUser",
			"ChannelsButtons",
			"Notification",
			"GamepadSaveGroupDialog",
			"GamepadLeaveRow",
			"GamepadLeaveButton",
			"GamepadGroupSettings",
			"LeaveButton",
			"PermissionsEdit",
			"Back",
			"PermissionsGroup",
			"PermissionToggle",
			"DirectMessageToggle",
			"RoleNameHeader",
			"FixedRoleName",
		],
		classesInlined: [
			"NoIconLabel",
			"PermissionsDescription",
			"RoleNameHeader",
			"Watching",
		],
		filter: (info) => info.strings.has("Small Smallish"),
	},
	chatroommenu: {
		classes: [
			"ChatRoomContextNoPermission",
			"ChatroomContextMenuDisableableItem",
		],
		classesInlined: ["DisabledDescriptor"],
		filter: (info) => info.strings.has("FindGamesToPlayWithFriends/ChatRoom"),
	},
	chattabs: {
		classes: [
			"ChatTab",
			"UnreadGlow",
			"VoiceStatusMessage",
			"CloseButton",
			"ChatTabRow",
			"ChatTabContent_Friend",
			"ChatTabContent_ChatRoom",
			"ChatTabContent_ChatRoomName",
			"UnreadCircle",
		],
		classesInlined: [
			"ChatTabTransitionGroup",
			"ChatTabTransition_Enter",
			"ChatTabTransition_EnterActive",
			"ChatTabTransition_Exit",
			"ChatTabTransition_ExitActive",
			"Active",
			"VoiceActive",
			"MicMuted",
			"MicStatus",
			"IsNotFriendLabel",
		],
		filter: (info) => info.strings.has("#Chat_CloseTabAction_SteamDeck"),
	},
	claimitemshared: {
		classes: ["CheckMark", "DialogCtn", "EquipCtn"],
		filter: (info) => info.strings.has("#Sale_ClaimableReward_AlreadyClaimed"),
	},
	clipplaybackscrollbar_golivebutton: {
		classes: [
			"ClipDecorator", // clipdecorator
			"ContentAndGradient",
			"ScrollbarPlaceholder",
			"LeftControlsAndContent",
			"ScrollGradientCtn",
			"FrontGradient",
			"EndGradient",
			"ScrollbarAndSiblings",
			"ScrollBarCtn",
			"ScrollTrack",
			"PlayHeadAnnotation",
			"RangeAnnotation",
			"ScrollThumb",

			// golivebutton
			"GoLiveButtonCtn",
			"GoLiveButton",
			"JumpToEndIcon",
		],
		classesInlined: ["IsLive", "HideGradient", "HideScrollBar", "Highlight"],
		filter: (info) => info.strings.has("#Playback_AtLatest"),
	},
	// TODO
	clipplaybackskip: {
		classes: ["SkipperCtn", "ArrowButton", "ArrowButtonRight"],
		//classesInlined: ["Disabled"],
		filter: (info) =>
			info.strings.has("#HighlightSkipper_JumpToPrevious") &&
			info.strings.has("#HighlightSkipper_JumpToNext"),
	},
	clipplayheadseekscrubber: {
		classes: [
			"RangeControls",
			"RangeSelectorCtn",
			"InactiveSelectedRangeControl",
			"SelectedRangeMask",
			"RangeIcon",
			"TrackRangeControls",
			"RangeControl",
			"RangeMask",
		],
		classesInlined: ["Active"],
		// o23F9bJf68E- Hide
		filter: (info) =>
			info.calls.has("ConvertGlobalMSToGlobalPXOffset") &&
			info.keys.has("setActiveControlState"),
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
	// TODO: there are more, bug in parse-file
	cliptimelinecontextmenu: {
		classes: [
			"TimelineContextMenuItem",
			"MenuItem",
			"AddUserMarker",
			"TakeScreenshot",
			"StartEndClip",
		],
		filter: (info) =>
			info.strings.has("Failed to determine time start/end for clip"),
	},
	cliptimelinedatedecorator: {
		classes: ["TimelineRelativeDate"],
		classesInlined: ["Overlay"],
		filter: (info) =>
			info.keys.has("label") &&
			info.keys.has("transform") &&
			info.strings.has("translateX("),
	},
	cliptimelinegamemodes: {
		classes: ["GameModeMarker", "Playing", "Staging", "Menus", "Invalid"],
		classesInlined: ["GameModeMarkerClip"],
		filter: (info) =>
			info.calls.has("ConvertGlobalMSToGlobalPXOffset") &&
			info.strings.has("translateX( "),
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
	cliptimelinerecordingdecorator: {
		classes: ["RecordingDecorator", "LiveRecordingBuffer"],
		classesInlined: ["Clip", "Manual", "ClipMode", "IsLive"],
		filter: (info) =>
			["endPX", "startPX", "recordingType"].every((e) => info.keys.has(e)),
	},
	contentreportdialog: {
		classes: [
			"ContentReportDialog",
			"ChatReportSubmittedDialog",
			"ChatReportSubmittedBody",
			"ButtonPlaceholder",
			"AccountSafetyCtn",
			"Icon",
			"Explanation",
			"ExplanationHeader",
			"ExplanationBody",
			"ExplanationMoreInfo",
		],
		classesInlined: ["ChatReportCallToAction"],
		filter: (info) =>
			info.strings.has("#ChatRoom_ServerMessage_RenameChatRoom"),
	},
	eventbbcodesketchfab: {
		classes: [
			"sketchfab_play_overlay_image",
			"sketchfabmodelembedded",
			"dynamiclink_box",
			"dynamiclink_content",
			"dynamiclink_name",
			"dynamiclink_type",
		],
		classesInlined: ["dynamiclink_preview", "dynamiclink_author"],
		filter: (info) => info.strings.has("#EventDisplay_Sketchfab"),
	},
	eventdescriptionstorecapsule: {
		classes: ["AppSummaryWidgetCtn"],
		// yeah dude
		filter: (info) => info.strings.has("AppSummaryWidgetCtn"),
	},
	eventreminder: {
		classes: [
			"FlexColumnContainer",
			"ReminderDialog",
			"ReminderOptions",
			"ReminderBackground",
			"ReminderOption",
			"CheckboxWrapper",
			"ReminderCheckBox",
			"IconMode",
			"ReminderDefault",
			"TextMode",
			"ReminderOpennedOptions",
			"ReminderOptionsHeader",
			"ReminderCalendarOptions",
		],
		classesInlined: [
			"RemindCheck",
			"RemindBell",
			"ReminderExpandsLeft",
			"RpcThrobber",
			"FullStartTime",
			"Unverified",
			"FlexColumnContainer",
		],
		filter: (info) => info.strings.has("#EventDisplay_Reminder_SetReminder"),
	},
	eventsexternalimage: {
		classes: ["ImageBlocked"],
		filter: (info) => info.strings.has("#Image_Externally_Hosted_Hidden"),
	},
	eventsociallinks: {
		classes: [
			"AppSocialLinksCtn",
			"AppSocialLinks",
			"AppSocialLinkIcon",
			"AppSocialLinkWithText",
			"AppSocialText",
		],
		filter: (info) => info.strings.has("#EventDisplay_SocialTitle"),
	},
	gamerecordingtour: {
		classes: [
			"TourPositioner",
			"TourBox",
			"CloseButton",
			"X",
			"Title",
			"Content",
			"Action",
			"TourStopArrow",
		],
		classesInlined: ["TipCount"],
		filter: (info) => info.strings.has("#Tour_TipCount"),
	},
	// TODO
	messages: {
		classes: [
			"SpeakerName_InGame",
			"SpeakerName_WatchingBroadcast",
			"SpeakerName_Online",
			"SpeakerName_Default",
			"MsgWithAddons",
			"Addons",
			"Emoticon",
			// "reactions" module
			"MessageReactions",
			"OpenPickerButton",
			"AddReactionIcon",
			"MessageReaction",
			"EmoticonReaction",
			"StickerReaction",
			"ReactionCount",
			"ReactionHover",
			"HoverDescription",
			"ReactorName",
			"ReactionName",
		],
		classesInlined: ["Open"],
		filter: (info) => info.strings.has("#Chat_MessageDeleted"),
	},
	pageablecontainer: {
		classes: ["PageableContainer", "Small"],
		classesInlined: [
			"HeaderPageControls",
			"Name",
			"Clickable",
			"PageClickContainer",
			"PageLeft",
			"Disabled",
			"PageRight",
			"PageableCloseButton",
		],
		filter: (info) =>
			info.keys.has("bShowCloseButton") &&
			info.keys.has("fnOnCloseButtonClicked"),
	},
	pagedcontent: {
		classes: ["Container", "Nav", "NavTitle", "NavItems", "NavItem", "Content"],
		filter: (info) => info.keys.has("initialActivePage"),
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
	quickaccessvoicecontrolssteamdeck: {
		classes: [
			"Title",
			"PendingVoiceChats",
			"PendingVoiceChatsList",
			"PendingVoiceChatRequest",
			"FriendVoiceChat",
			"VoiceChatRequestButton",
			"Accept",
			"Decline",
			"VoiceChatList",
			"FriendVoiceChatSliderContainer",
			"SliderPadding",
			"GroupRoomContainer",
			"GroupVoiceChatMember",
			"RoomHeader",
			"RoomHeaderRow",
			"RoomTitle",
			"GroupVoiceChatFriend",
			"MicMutedLocally",
			"MicMutedRemotely",
			"OutputMutedRemotely",
			"quickaccesscontrols_PanelSection",
			"quickaccesscontrols_PanelSectionTitle",
			"quickaccesscontrols_Text",
			"quickaccesscontrols_PanelSectionRow",
			"quickaccesscontrols_QuickAccessNotifications",
			"quickaccesscontrols_EmptyNotifications",
			"quickaccesscontrols_LowBattery",
			"quickaccesscontrols_LowBatteryGauge",
			"quickaccesscontrols_Remaining",
			"quickaccesscontrols_BatterySectionContainer",
			"quickaccesscontrols_BatteryIcon",
			"quickaccesscontrols_BatteryPercentageLabel",
			"quickaccesscontrols_BatteryDetailsLabels",
			"quickaccesscontrols_BatteryProjectedValue",
			"quickaccesscontrols_BatteryProjectedLabel",
		],
		classesInlined: [
			"quickaccesscontrols_PanelSectionTitle",
			"quickaccesscontrols_Text",
			"FriendVoiceChatContainer",
			"FriendVoiceChatButton",
			"FriendVoiceChat",
			"ConnectingIndicator",
			"LeaveVoiceChat",
			"GroupVoiceChatContainer",
			"GroupContainer",
			"GroupTitle",
		],
		filter: (info) =>
			info.calls.has("OnRejectOneOnOneVoiceChatForPartner") &&
			info.strings.has("#Voice_End"),
	},
	reorderablelist: {
		classes: [
			"ReorderableListDialog",
			"ModalHeader",
			"CloseButtonContainer",
			"ReorderableListIconIndexCtr",
			"ReorderableListIndexCtr",
			"ReorderArrow",
			"ReorderableListItem",
			"ReorderableListIndex",
			"ReorderableListItemLabel",
		],
		classesInlined: [
			"IconsFocusable",
			"Selected",
			"Disabled",
			// remoteplay
			"",
			"",
			"",
			"",
			"",
			"",
		],
		filter: (info) => info.strings.has("#ReorderableList_ReorderInstructions"),
	},
	screenshotmanagerphasetags: {
		classes: ["PhaseTags", "TagGroup", "PhaseListIcon", "Dim"],
		// TODO: skipped because the above components are all forwardRef'd
		classesInlined: ["", "TextTags", "Dim"],
		filter: (info) => info.strings.has("#PhaseList_PhaseGroupAndName"),
	},
	/* No classes in vars
	personastatusicons: {
		classesInlined: [
			"PersonaStatusIcon",
			"MobilePhoneIcon",
			"VRIcon",
			"SteamDeckIcon",
		],
		filter: (info) => info.strings.has("#Platform_Hint_Mobile"),
	},
	*/
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
