import type { ReactComponentInfo } from "./react-component-id";

// k: minified var name, v: class name
export const classNameByVarName = new Map<string, string>();

export function changeFunctionDepth(increase: boolean) {
	state.functionNestingDepth += increase ? 1 : -1;
}

export function isInFunction() {
	return state.functionNestingDepth > 0;
}

// referenced by index
interface State {
	readonly classes: string[][];
	readonly classesInlined: string[][];
	readonly components: ReactComponentInfo[][];
	/**
	 * Tracks whether the visitor is currently inside a function while finding
	 * top-level objects.
	 */
	functionNestingDepth: number;
	index: number;
}

export const state: State = {
	classes: [],
	classesInlined: [],
	components: [],
	functionNestingDepth: 0,
	index: 0,
};
