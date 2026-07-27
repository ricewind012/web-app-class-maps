// biome-ignore lint/correctness/noUnusedVariables: Runs globally in CDP
var exportedModules: ExportedModuleMap = [
	["notificationspage", (e) => e.NotificationPageCtn],
	[
		"notification",
		(e) =>
			e.StandardTemplateContainer &&
			!e.AllNotificationsCommentPlus &&
			!e.ShortTemplate,
	],
	// TODO: has DesktopToastTemplate, BottomBar, etc., wtf?
	["notificationcontainer", (e) => e.SteamNotificationWrapper],
];
