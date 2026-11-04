import type { ReactComponentInfo } from "../react-component-id";

// Length of the CSS module (including the inlined classes count) has to match
// with all the arrays' lengths here. Some class names are skipped (except when
// it makes sense, i.e. for context):
//
// - Logged out
// - Responsive
// - Steam China

export interface ComponentListItem {
	classes: string[];
	classesInlined?: string[];
	filter: (info: ReactComponentInfo) => boolean;
}
