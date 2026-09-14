import { readFile } from "node:fs/promises";
import Bun from "bun";
import {
	type Expression,
	type PropertyKey,
	parseSync,
	Visitor,
} from "oxc-parser";
import { getReactComponentProps, isReactComponent } from "./ast-utils";
import {
	componentClassNameFilterMap,
	componentPropFilterMap,
	componentVisitors,
	type NotOkValveComponent,
	type OkValveComponent,
} from "./component-list";
import {
	changeFunctionDepth,
	classNameByVariableName,
	currentComponent,
	isInFunction,
} from "./state";

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
 * Used in the visitor's `ObjectExpression`.
 */
const BLACKLISTED_OBJ_EXPR_KEYS = new Set([
	// Common React props
	"children",
	"className",
	// BB code init objects
	"Constructor",
]);

const classMap: Partial<
	Record<OkValveComponent | NotOkValveComponent, Record<string, string>>
> = {};

const visitor = new Visitor({
	FunctionDeclaration(decl) {
		changeFunctionDepth(true);

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

		currentComponent.component = component;
		currentComponent.props = props;
		const classes = componentVisitors[component](decl);
		if (!classMap[component]) {
			classMap[component] = {};
		}
		for (const [k, v] of classes) {
			classMap[component][k] = v;
		}

		const { start, end } = decl;
		const outer = text.slice(start, end);
		//console.log("-----------------", { outer, props });
	},
	"FunctionDeclaration:exit"() {
		changeFunctionDepth(false);
	},
	ObjectExpression(decl) {
		// Only inspect top-level objects
		if (isInFunction()) {
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
//console.log(classMap);
console.log("-----", { classNameByVariableName });
