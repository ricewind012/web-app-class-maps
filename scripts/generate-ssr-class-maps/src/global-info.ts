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
 * Info about the currently visited component. Global to let
 * {@link classnameCallGetters} access it
 */
// @ts-expect-error: FUCK YOU
export const info: Info = {};

function setInfo<T extends keyof Info>(k: T, v: Info[T]) {
	info[k] = v;
}
