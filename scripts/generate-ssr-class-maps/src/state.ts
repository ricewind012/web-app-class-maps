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
	/**
	 * Inlined classes may sometimes be duplicated but this is a Set for
	 * consistency.
	 */
	readonly classes: Set<string>[];
	readonly classesInlined: Set<string>[];
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
