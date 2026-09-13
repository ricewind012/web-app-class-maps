import { readFile } from "node:fs/promises";
import Bun from "bun";
import {
	type CallExpression,
	type Expression,
	type IdentifierReference,
	type ObjectExpression,
	type Function as OxcFunction,
	type PropertyKey,
	parseSync,
	type TemplateLiteral,
	Visitor,
} from "oxc-parser";
import {
	getCommaOpFuncName,
	getFuncReturn,
	getReactComponentProps,
	isReactComponent,
} from "./ast-utils";

type OkValveComponent =
	| "contextmenu"
	| "pagedsettings"
	// lol
	| "sharedsvggamerecordings"
	| "tw_button"
	| "tw_checkbox"
	| "tw_controlbox"
	| "tw_heading"
	| "tw_icon"
	| "tw_layout"
	| "tw_link"
	| "tw_segmentedcontrol"
	| "tw_separator"
	| "tw_spinner"
	| "tw_text"
	| "tw_toggle"
	| "workshopitemcontainer";

type NotOkValveComponent = "steamavatar";

type ReactProps = Map<string, string>;

/*
const a = await (
	await fetch("https://steamcommunity.com/workshop/browse/?appid=312520")
).text();
const hrefs = [
	...a.matchAll(/<link rel="modulepreload" href="(https.*?\.js)" as="script"/g),
	...a.matchAll(/<script type="module" src="(https.*?\.js)" nonce/g),
].map((e) => e[1]);
*/

const [, , file] = process.argv;
const text = await readFile(file, "utf8");
// TODO: some files only export class names... wtf
/*
if (text.includes("<1>") || text.slice(0, 6) !== "import") {
	console.error("Localization tokens");
	process.exit(1);
}
*/

const { errors, program } = parseSync(file, text);
if (errors.length > 0) {
	console.error(errors);
	process.exit(1);
}

/**
 * Filter for the classes found in objects.
 */
const componentClassNameFilterMap: Record<OkValveComponent, string> = {
	contextmenu: "contextMenu",
	pagedsettings: "PagedSettingsDialog",
	sharedsvggamerecordings: "RecordingIconContainer",
	tw_button: "Button",
	tw_checkbox: "Checkbox",
	tw_controlbox: "ControlBox",
	tw_heading: "Heading", // HeadingSize-1
	tw_icon: "IconSizeDefault",
	tw_layout: "ZIndex",
	tw_link: "TextLinkButton",
	tw_segmentedcontrol: "SegmentedControl",
	tw_separator: "Separator",
	tw_spinner: "Spinner",
	tw_text: "WhiteSpace",
	tw_toggle: "Track",
	workshopitemcontainer: "aspectratio_square",
};

/**
 * Class map that corresponds for each React prop. Used for
 * {@link getClassNamesFromClassnamesCall}.
 */
const componentPropMap: Record<NotOkValveComponent, Map<string, string>> = {
	steamavatar: new Map([
		["isOnline", "Online"],
		// TODO: lol
		["!isOnline", "Offline"],
		["isInGame", "InGame"],
		["isWatchingBroadcast", "WatchingBroadcast"],
		["isAwayOrSnooze", "AwayOrSnooze"],
	]),
};

/**
 * Class map for those without names.
 *
 * Checks for those React props that have the `className` prop. If no parent, it
 * has to match the top level props.
 */
const componentManualMap: Record<NotOkValveComponent, Map<string, string>> = {
	steamavatar: new Map([
		["rgSources", "Avatar"],
		["data-status-position", "AvatarHolder"],
		["bDisableAnimation", "AvatarFrame"],
		["role", "AvatarFrameImg"],
		["style", "AvatarStatus"],
	]),
};

/**
 * Filter for the classes that have to be manually found.
 */
const componentPropFilterMap: Record<NotOkValveComponent, Set<string>> = {
	steamavatar: new Set(["avatarURL", "bDisableAnimation"]),
};

/**
 * Skip components, usually those without class names, that have these props.
 */
const componentPropSkipMap: Record<NotOkValveComponent, Set<string>> = {
	steamavatar: new Set([
		"rgSources",
		"playerLinkDetails",
		"bLimitProfileFrameAnimationTime",
	]),
};

const classMap: Partial<
	Record<OkValveComponent | NotOkValveComponent, Record<string, string>>
> = {};

// k: minified var name, v: class name
const classNameByVariableName = new Map<string, string>();

// Tracks whether the visitor is currently inside a function while finding
// top-level objects.
let functionNestingDepth = 0;

/**
 * Info about the currently visited component. Global to let
 * {@link classnameCallGetters} access it
 */
// @ts-expect-error: FUCK YOU
let info: {
	/**
	 * The component name.
	 */
	component: NotOkValveComponent;

	/**
	 * React props of the component.
	 */
	props: ReactProps;
} = {};

// biome-ignore lint/correctness/noUnusedVariables: stfu
function dbgDecl(decl: Expression, other?: Record<string, unknown>) {
	const { start, end } = decl;
	if (!start || !end) {
		return;
	}

	const outer = text.slice(start, end);
	console.log({ ...other, decl, outer });
}

const classnameCallGetters: Partial<
	// biome-ignore lint/suspicious/noExplicitAny: The arg types are all different
	Record<Expression["type"], (arg: any) => [string, string][]>
> = {
	Identifier(arg: IdentifierReference) {
		const { component, props } = info;
		const className = classNameByVariableName.get(arg.name);
		if (!className) {
			const prop = props.get(arg.name);
			return [[prop ?? "", prop === "className" ? "not needed" : "unhandled"]];
		}

		// TODO: looks awful
		const readableClassNameProp = [...props.values()].find((k) =>
			[...componentManualMap[component].keys()].some((e) => e === k),
		);
		if (!readableClassNameProp) {
			return [[className, ""]];
		}

		const readableClassName = componentManualMap[component].get(
			readableClassNameProp,
		);
		if (!readableClassName) {
			return [["", ""]];
		}

		return [[className, readableClassName]];
	},
	ObjectExpression(arg: ObjectExpression) {
		// fuck off typescript
		if (!info) {
			return [];
		}

		const { component, props } = info;
		const classes: [string, string][] = [];
		for (const prop of arg.properties) {
			// Not a thing
			if (prop.type === "SpreadElement") {
				continue;
			}

			const k = prop.key;
			// Always a reference to another var
			if (k.type !== "Identifier") {
				continue;
			}

			const v = prop.value;
			// Always var refs or bools
			const reactProp = (() => {
				if (v.type === "Identifier") {
					return props.get(v.name);
				}

				// TODO
				if (v.type === "LogicalExpression") {
					return v.type;
				}

				// TODO: can be "[S]: !s, [C]: s", see steamavatar
				if (v.type === "UnaryExpression") {
					const arg = v.argument;
					if (arg.type !== "Identifier") {
						return;
					}

					return props.get(arg.name);
				}
			})();
			if (!reactProp) {
				return [];
			}

			const className = classNameByVariableName.get(k.name);
			const readableClassName = componentPropMap[component].get(reactProp);
			if (!className || !readableClassName) {
				continue;
			}

			classes.push([className, readableClassName]);
		}

		return classes;
	},
	TemplateLiteral(arg: TemplateLiteral) {
		// TODO
	},
};
const validClassnameCallGetterTypes = new Set<Expression["type"]>(
	Object.keys(classnameCallGetters) as unknown as Expression["type"][],
);

/**
 * @returns `(0, mod.default)(a, b, c)` -> `["value for a", "value for b"]`.
 */
function getClassNamesFromClassnamesCall(expr: CallExpression) {
	const name = getCommaOpFuncName(expr);
	// It's the ONLY default export for some reason
	if (name !== "default") {
		return [];
	}

	const classNames: [string, string][] = [];
	for (const arg of expr.arguments) {
		// Not a thing
		if (arg.type === "SpreadElement") {
			return [];
		}

		if (!validClassnameCallGetterTypes.has(arg.type)) {
			console.error("unhandled Classnames arg type %o", arg.type);
			return [];
		}

		// it's defined, piss off typescript
		const value = classnameCallGetters[arg.type]?.(arg);
		if (!value) {
			continue;
		}

		classNames.push(...value);
	}

	return classNames;
}

/**
 * Gets the class names of a `jsx(s)` call and its children.
 */
function getClassNamesFromChildren(expr: Expression): [string, string][] {
	// Multiple children
	if (expr.type === "ArrayExpression") {
		return expr.elements.flatMap((child) =>
			child && child.type !== "SpreadElement"
				? getClassNamesFromChildren(child)
				: [],
		);
	}

	// Not a jsx(s) call. Implied, satisfy TypeScript
	if (expr.type !== "CallExpression") {
		return [];
	}

	const props = expr.arguments.find((e) => e.type === "ObjectExpression");
	// No props. Implied, satisfy TypeScript
	if (!props) {
		return [];
	}

	console.log({
		a: props.properties.map((e) => e.key?.name),
		b: [...info.props.values()],
	});

	const pairs: [string, string][] = [];
	for (const prop of props.properties) {
		if (prop.type === "SpreadElement" || prop.key.type !== "Identifier") {
			continue;
		}

		if (prop.key.name === "children") {
			pairs.push(...getClassNamesFromChildren(prop.value));
			continue;
		}

		if (prop.key.name !== "className" || prop.value.type !== "CallExpression") {
			continue;
		}

		pairs.push(...getClassNamesFromClassnamesCall(prop.value));
	}

	return pairs;
}

/**
 * These are implied to be React components, so do not check if they are.
 */
const componentVisitors: Record<
	NotOkValveComponent,
	(decl: OxcFunction) => [string, string][]
> = {
	steamavatar: (decl) => {
		const arg = getFuncReturn(decl);
		if (arg?.type !== "SequenceExpression") {
			return [];
		}

		// return statement
		const call = arg.expressions.findLast((e) => e.type === "CallExpression");
		if (!call) {
			return [];
		}

		return getClassNamesFromChildren(call as CallExpression);
	},
};

const visitor = new Visitor({
	FunctionDeclaration(decl) {
		functionNestingDepth++;

		if (!isReactComponent(decl)) {
			return;
		}

		const props = getReactComponentProps(decl);
		if (!props) {
			return;
		}

		const names = [...props.values()];
		const component = (
			Object.keys(componentPropFilterMap) as NotOkValveComponent[]
		).find((k) => names.some((e) => componentPropFilterMap[k].has(e)));
		// No component, bye
		if (!component) {
			return;
		}

		// TODO: is this needed because of the above? it wouldn't find it anyway
		const dumbComponent = names.find((e) =>
			componentPropSkipMap[component].has(e),
		);
		if (dumbComponent) {
			console.error(`Skipping '${dumbComponent}'`);
			return;
		}

		info = { component, props };
		const classes = componentVisitors[component](decl);
		classMap[component] = {};
		for (const [k, v] of classes) {
			classMap[component][k] = v;
		}

		const { start, end } = decl;
		const outer = text.slice(start, end);
		console.log("-----------------", { classMap, outer, props });
	},
	"FunctionDeclaration:exit"() {
		functionNestingDepth--;
	},
	ObjectExpression(decl) {
		// Only inspect top-level objects
		if (functionNestingDepth !== 0) {
			return;
		}

		const { start, end } = decl;
		// Empty object
		if (end - start === 2) {
			return;
		}

		const objectProps: [PropertyKey, Expression][] = [];
		for (const prop of decl.properties) {
			if (prop.type !== "Property") {
				continue;
			}

			const BLACKLISTED_OBJ_EXPR_KEYS = new Set([
				// Common React props
				"children",
				"className",
				// BB code init objects
				"Constructor",
			]);
			const k = prop.key;
			if (k.type === "Identifier" && BLACKLISTED_OBJ_EXPR_KEYS.has(k.name)) {
				return;
			}

			const v = prop.value;
			// Any other objects
			if (v.type !== "Identifier" && v.type !== "TemplateLiteral") {
				return;
			}

			objectProps.push([k, v]);
		}

		const pairs: [string, string][] = [];
		for (const [k, v] of objectProps) {
			if (k.type === "Literal" && v.type === "TemplateLiteral") {
				// Raw string
				pairs.push([String(k.value), v.quasis[0].value.raw]);
			} else if (k.type === "Identifier" && v.type === "Identifier") {
				// A variable is being used
				const realClassName = classNameByVariableName.get(v.name);
				// They are all being declared *right before* the object, so
				// it's safe to assume it's something else
				if (!realClassName) {
					return;
				}

				pairs.push([k.name, realClassName]);
			}
		}

		// No classes, bye
		if (pairs.length === 0) {
			return;
		}

		const component = (
			Object.keys(componentClassNameFilterMap) as OkValveComponent[]
		).find((key) =>
			pairs.some(([k]) => k === componentClassNameFilterMap[key]),
		);
		if (!component) {
			return;
		}

		const ckv: Record<string, string> = {};
		const keyWidth = Math.max(...pairs.map(([k]) => k.length));
		const valueWidth = Math.max(...pairs.map(([, v]) => v.length));
		console.log(
			"%sComponent: %s%s",
			Bun.color("gray", "ansi"),
			Bun.color("white", "ansi"),
			component,
		);
		for (const [k, v] of pairs) {
			ckv[k] = v;
			console.log(
				"%s%s %s-> %s%s",
				Bun.color("white", "ansi"),
				k.padEnd(keyWidth),
				Bun.color("gray", "ansi"),
				Bun.color("white", "ansi"),
				v.padEnd(valueWidth),
			);
		}
		console.log("%s------------------", Bun.color("gray", "ansi"));
		classMap[component] = ckv;
	},
	VariableDeclarator(decl) {
		// Class name variables are always initialized
		if (!decl.init) {
			return;
		}

		if (decl.id.type !== "Identifier") {
			return;
		}

		// SSR strings are always templates without variables
		if (decl.init.type !== "TemplateLiteral" || decl.init.quasis.length > 1) {
			return;
		}

		const value = decl.init.quasis[0].value.raw;
		// Data URIs
		if (value.slice(0, 5) === "data:") {
			return;
		}

		// SSR classes are 12 characters long, with an underscore if starting
		// with a number
		const len = value.length;
		const startsWithNumber = value[0] === "_" && len === 13;
		if (len !== 12 && !startsWithNumber) {
			return;
		}

		classNameByVariableName.set(decl.id.name, value);
	},
});
visitor.visit(program);
//console.log("-----", { classNameByVariableName });
