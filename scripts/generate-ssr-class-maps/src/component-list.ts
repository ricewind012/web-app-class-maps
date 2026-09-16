import type { Function as OxcFunction } from "oxc-parser";
import { getFuncReturn, getReactComponentProps } from "./ast-utils";
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

export type NotOkValveComponent = "communitytemplate" | "steamavatar";

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
 * Class map that corresponds for each React prop. Used for conditional objects
 * in {@link getClassNamesFromClassnamesCall}.
 */
export const componentClassnamePropMap: Partial<
	Record<NotOkValveComponent, Map<string, string>>
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
	communitytemplate: new Map([
		["strWebAPIToken", "Body"],
		["children", "Root"],
	]),
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
	communitytemplate: new Set(["strWebAPIToken"]),
	steamavatar: new Set(["avatarURL", "bDisableAnimation"]),
};

function uniquelyIdReactComponent(decl: OxcFunction) {
	const info = {
		props: getReactComponentProps(decl),
	};

	return { decl, info };
}

/**
 * These are implied to be React components, so do not check if they are.
 */
export const componentVisitors: Record<
	NotOkValveComponent,
	(decl: OxcFunction) => [string, string][]
> = {
	communitytemplate: (decl) => {
		const ret = getFuncReturn(decl);
		if (ret?.type !== "CallExpression") {
			return [];
		}

		console.log(uniquelyIdReactComponent(decl));
		return [];
		//return getClassNamesFromChildren(ret, true);
	},
	steamavatar: (decl) => {
		const ret = getFuncReturn(decl);
		if (ret?.type !== "SequenceExpression") {
			return [];
		}

		// return statement
		const call = ret.expressions.findLast((e) => e.type === "CallExpression");
		if (!call) {
			return [];
		}

		return getClassNamesFromChildren(call, true);
	},
};
