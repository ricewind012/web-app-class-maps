import Bun from "bun";
import { readFile } from "node:fs/promises";
import { parse, Visitor, type Expression, type PropertyKey } from "oxc-parser";
import * as ReactUtils from "./react-utils";

type ValveComponent =
	| "contextmenu"
	| "pagedsettings"
	| "steamavatar"
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

const [, , file] = process.argv;
const text = await readFile(file, "utf8");
// TODO: some files only export class names... wtf
if (text.includes("<1>") || text.slice(0, 6) !== "import") {
	console.error("Localization tokens");
	process.exit(1);
}

const { errors, program } = await parse(file, text);
if (errors.length > 0) {
	console.error(errors);
	process.exit(1);
}

const componentClassFilterMap: Record<ValveComponent, string> = {
	contextmenu: "contextMenu",
	pagedsettings: "PagedSettingsDialog",
	sharedsvggamerecordings: "RecordingIconContainer",
	steamavatar: "AvatarFrame",
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

// TODO: What
const componentPropMap: Partial<
	Record<ValveComponent, Record<string, string>>
> = {
	steamavatar: {
		Avatar: "avatarURL",
		AvatarFrame: "bDisableAnimation",
	},
};

const componentPropSkipMap: Partial<Record<ValveComponent, Set<string>>> = {
	steamavatar: new Set([
		"rgSources",
		"playerLinkDetails",
		"bLimitProfileFrameAnimationTime",
	]),
};

const classMap: Partial<Record<ValveComponent, Record<string, string>>> = {};

// Template-string variables declared at the top level, keyed by source name.
// These values are resolved when a later global object refers to the variable.
const classNameByVariableName = new Map<string, string>();

// Oxc does not attach parent links to nodes, so this tracks whether the visitor
// is currently inside a function while finding top-level objects.
let functionNestingDepth = 0;

const visitor = new Visitor({
	FunctionDeclaration(decl) {
		// For top-level global detection
		functionNestingDepth++;

		if (!ReactUtils.isComponent(decl)) {
			return;
		}

		const props = ReactUtils.getComponentProps(decl);
		if (!props) {
			return;
		}

		// TODO: detect component file
		const component: ValveComponent = "steamavatar";

		// TODO: hop on the props object
		const names = [...props.keys()];
		for (const name of names) {
			if (componentPropSkipMap[component]?.has(name)) {
				console.error(`Skipping '${name}'`);
				return;
			}
		}
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
			Object.keys(componentClassFilterMap) as ValveComponent[]
		).find((key) => pairs.some(([k]) => k === componentClassFilterMap[key]));
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
