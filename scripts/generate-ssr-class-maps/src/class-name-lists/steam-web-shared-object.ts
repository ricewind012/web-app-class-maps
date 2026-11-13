/**
 * Filter for the classes found in non-inlined CSS modules.
 */
export const componentClassNameFilterMap: Record<string, string> = {
	// why is this included lol?
	// pagedsettings: "PagedSettingsDialog",
	baseui_block: "ZIndex",
	baseui_button: "Button",
	baseui_checkbox: "Checkbox",
	baseui_controlbox: "ControlBox",
	baseui_heading: "Heading",
	baseui_icon: "IconSizeDefault",
	baseui_link: "TextLinkButton",
	baseui_segmentedcontrol: "SegmentedControl",
	baseui_separator: "Separator",
	baseui_spinner: "Spinner",
	baseui_text: "WhiteSpace",
	baseui_toggle: "Track",
	contextmenu: "contextMenu",
};
