// Note that every module is only available on the "family management" page.
// biome-ignore lint/correctness/noUnusedVariables: Runs globally in CDP
var exportedModules: ExportedModuleMap = [
	["authorizeddevices", (e) => e.AuthorizedDeviceGroup],
	["cookies", (e) => e.CookieSection],
	["familymanagement", (e) => e.FamilySettingsContainer],
	["familymanagementinvites", (e) => e.IncomingInviteRow],
	["familymanagementtabs", (e) => e.GraphicalAssetsTabs],
	// TODO: gamepaddialog
	["toggle", (e) => e.Field],
];
