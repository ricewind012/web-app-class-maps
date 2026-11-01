import type { ReactComponentInfo } from "./react-component-id";

// k: minified var name, v: class name
export const classNameByVarName = new Map<string, string>();

// Tracks whether the visitor is currently inside a function while finding
// top-level objects.
let functionNestingDepth = 0;

export function changeFunctionDepth(increase: boolean) {
	functionNestingDepth += increase ? 1 : -1;
}

export function isInFunction() {
	return functionNestingDepth > 0;
}

// referenced by index
interface State {
	readonly classes: string[][];
	readonly classesInlined: string[][];
	readonly components: ReactComponentInfo[][];
	index: number;
}

export const state: State = {
	classes: [],
	classesInlined: [],
	components: [],
	index: 0,
};
