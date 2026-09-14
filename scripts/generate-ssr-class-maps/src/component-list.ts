import type { Function as OxcFunction } from "oxc-parser";
import { getFuncReturn } from "./ast-utils";
import { getClassNamesFromChildren } from "./class-name-utils";

export type OkValveComponent =
	| "contextmenu"
	| "pagedsettings"
	// lol
	| "sharedsvggamerecordings"
	| "tw_button"
	| "tw_checkbox"
	| "tw_controlbox"
	| "tw_heading"
	| "tw_icon"
	| "tw_layout"
	| "tw_link"
	| "tw_segmentedcontrol"
	| "tw_separator"
	| "tw_spinner"
	| "tw_text"
	| "tw_toggle"
	| "workshopitemcontainer";

export type NotOkValveComponent = "steamavatar";

/**
 * Filter for the classes found in objects.
 */
export const componentClassNameFilterMap: Record<OkValveComponent, string> = {
	contextmenu: "contextMenu",
	pagedsettings: "PagedSettingsDialog",
	sharedsvggamerecordings: "RecordingIconContainer",
	tw_button: "Button",
	tw_checkbox: "Checkbox",
	tw_controlbox: "ControlBox",
	tw_heading: "Heading", // HeadingSize-1
	tw_icon: "IconSizeDefault",
	tw_layout: "ZIndex",
	tw_link: "TextLinkButton",
	tw_segmentedcontrol: "SegmentedControl",
	tw_separator: "Separator",
	tw_spinner: "Spinner",
	tw_text: "WhiteSpace",
	tw_toggle: "Track",
	workshopitemcontainer: "aspectratio_square",
};

/**
 * Class map that corresponds for each React prop. Used for
 * {@link getClassNamesFromClassnamesCall}.
 */
export const componentPropMap: Record<
	NotOkValveComponent,
	Map<string, string>
> = {
	steamavatar: new Map([
		["isOnline", "Online"],
		// TODO: lol
		["!isOnline", "Offline"],
		["isInGame", "InGame"],
		["isWatchingBroadcast", "WatchingBroadcast"],
		["isAwayOrSnooze", "AwayOrSnooze"],
	]),
};

/**
 * Class map for those without names.
 *
 * Checks for those React props that have the `className` prop. If no parent, it
 * has to match the parent component's props and not the returned component's
 * props.
 */
export const componentManualMap: Record<
	NotOkValveComponent,
	Map<string, string>
> = {
	steamavatar: new Map([
		["rgSources", "Avatar"],
		["bDisableAnimation", "AvatarFrame"],
		["role", "AvatarFrameImg"],
		["avatarURL", "AvatarHolder"],
		["style", "AvatarStatus"],
	]),
};

/**
 * Filter for the classes that have to be manually found.
 */
export const componentPropFilterMap: Record<
	NotOkValveComponent,
	Set<string>
> = {
	steamavatar: new Set(["avatarURL", "bDisableAnimation"]),
};

/**
 * These are implied to be React components, so do not check if they are.
 */
export const componentVisitors: Record<
	NotOkValveComponent,
	(decl: OxcFunction) => [string, string][]
> = {
	steamavatar: (decl) => {
		const arg = getFuncReturn(decl);
		if (arg?.type !== "SequenceExpression") {
			return [];
		}

		// return statement
		const call = arg.expressions.findLast((e) => e.type === "CallExpression");
		if (!call) {
			return [];
		}

		return getClassNamesFromChildren(call, true);
	},
};
