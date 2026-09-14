import type { NotOkValveComponent } from "./component-list";

type ReactProps = Map<string, string>;

interface Info {
	/**
	 * The component name.
	 */
	component: NotOkValveComponent;

	/**
	 * React props of the component.
	 */
	props: ReactProps;
}

/**
 * Info about the currently visited component.
 */
// @ts-expect-error: FUCK YOU
export const currentComponent: Info = {};

// k: minified var name, v: class name
export const classNameByVariableName = new Map<string, string>();

// Tracks whether the visitor is currently inside a function while finding
// top-level objects.
let functionNestingDepth = 0;

export function changeFunctionDepth(increase: boolean) {
	functionNestingDepth += increase ? 1 : -1;
}

export function isInFunction() {
	return functionNestingDepth > 0;
}

function setInfo<T extends keyof Info>(k: T, v: Info[T]) {
	currentComponent[k] = v;
}
