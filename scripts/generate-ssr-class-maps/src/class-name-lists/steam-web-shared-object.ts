/**
 * Filter for the classes found in non-inlined CSS modules.
 */
export const componentClassNameFilterMap: Record<string, string> = {
	contextmenu: "contextMenu",
	// why is this included lol?
	// pagedsettings: "PagedSettingsDialog",
	tw_block: "ZIndex",
	tw_button: "Button",
	tw_checkbox: "Checkbox",
	tw_controlbox: "ControlBox",
	tw_heading: "Heading",
	tw_icon: "IconSizeDefault",
	tw_link: "TextLinkButton",
	tw_segmentedcontrol: "SegmentedControl",
	tw_separator: "Separator",
	tw_spinner: "Spinner",
	tw_text: "WhiteSpace",
	tw_toggle: "Track",
};
