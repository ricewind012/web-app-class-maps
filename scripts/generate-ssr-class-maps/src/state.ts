import type { NotOkValveComponent } from "./component-list";

type ReactProps = Map<string, string>;

/**
 * The currently visited component.
 */
interface CurrentReactComponent {
	/**
	 * The component name.
	 */
	component: NotOkValveComponent;

	/**
	 * React props of the component.
	 */
	props: ReactProps;
}

// k: minified var name, v: class name
export const classNameByVariableName = new Map<string, string>();

// @ts-expect-error: FUCK YOU
export const currentComponent: CurrentReactComponent = {};

// Tracks whether the visitor is currently inside a function while finding
// top-level objects.
let functionNestingDepth = 0;

export function changeFunctionDepth(increase: boolean) {
	functionNestingDepth += increase ? 1 : -1;
}

export function isInFunction() {
	return functionNestingDepth > 0;
}
