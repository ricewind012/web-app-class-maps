import { componentList as sharedComponentList } from "./steam-shared";
import type { ComponentListItem } from "./types";

const sharedWebComponents = Object.fromEntries(
	Object.entries(sharedComponentList).filter(([k]) => k.startsWith("global")),
);
for (const k of Object.keys(sharedWebComponents)) {
	Reflect.deleteProperty(sharedComponentList, k);
}
console.log(sharedComponentList);

export const componentList: Record<string, ComponentListItem> = {
	...sharedComponentList,
};
