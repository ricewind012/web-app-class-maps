import { readFile } from "node:fs/promises";
import { color } from "bun";
import { parseSync, Visitor } from "oxc-parser";
import { getFuncName, isReactComponent, isSSRClassName } from "./ast-utils";
import {
	type Component,
	classNameByIndex,
	componentFilters,
	inlinedClassNameByIndex,
} from "./class-name-lists/steam-web-shared";
import {
	type ReactComponentInfo,
	uniquelyIdReactComponent,
} from "./react-component-id";

// referenced by index
interface State {
	classes: string[][];
	classesInlined: string[][];
	components: ReactComponentInfo[][];
	index: number;
}

const c = {
	gray: color("gray", "ansi"),
	red: color("red", "ansi"),
	white: color("white", "ansi"),
};

function printClasses(lhs: string[], rhs: string[]) {
	for (let i = 0; i < lhs.length; i++) {
		const a = lhs[i].padStart(13);
		const b = rhs[i] ?? [c.red, "undefined", c.white].join("");
		console.log("%s %s|%s %s", a, c.gray, c.white, b);
	}
}

const [, , file] = process.argv;
const text = await readFile(file, "utf8");
const { errors, program } = parseSync(file, text);
if (errors.length > 0) {
	console.error(errors);
	process.exit(1);
}

const classMap = new Map<Component, Record<string, string>>();
const state: State = {
	classes: [],
	classesInlined: [],
	components: [],
	index: 0,
};

const visitor = new Visitor({
	CallExpression(node) {
		const name = getFuncName(node);
		if (name !== "forwardRef" && name !== "memo") {
			return;
		}

		const component = node.arguments[0];
		const { start, end } = component;
		const outer = text.slice(start, end);
		const info = uniquelyIdReactComponent(outer);
		if (!info) {
			return;
		}

		state.components[state.index].push(info);
	},
	FunctionDeclaration(node) {
		if (!isReactComponent(node)) {
			return;
		}

		const { start, end } = node;
		const outer = text.slice(start, end);
		const info = uniquelyIdReactComponent(outer);
		if (!info) {
			return;
		}

		state.components[state.index].push(info);
		state.classesInlined[state.index].push(...info.classes);
	},
	// VariableDeclarator isn't used because it would ++ the index on each
	// variable declaration instead of once
	VariableDeclaration(node) {
		const classes: string[] = [];
		for (const decl of node.declarations) {
			// Class name variables are always initialized
			if (!decl.init) {
				continue;
			}

			if (decl.id.type !== "Identifier") {
				continue;
			}

			// React component
			if (decl.id.name === "K" && decl.init.type === "CallExpression") {
				//this.CallExpression?.(decl.init);
				//console.log({ decl }, getFuncName(decl.init));
				continue;
			}

			// SSR strings are always templates without variables
			if (decl.init.type !== "TemplateLiteral" || decl.init.quasis.length > 1) {
				continue;
			}

			const value = decl.init.quasis[0].value.raw;
			// Data URIs, 0.01ms shaven off
			if (value.slice(0, 5) === "data:") {
				continue;
			}

			if (!isSSRClassName(decl.init)) {
				continue;
			}

			classes.push(value);
		}

		if (classes.length === 0) {
			return;
		}

		// If all variables pass the checks, this is a new CSS module "object"

		state.index++;
		state.classes[state.index] ||= [];
		state.classes[state.index].push(...classes);
		state.components[state.index] = [];
		state.classesInlined[state.index] = [];
	},
});
visitor.visit(program);

// Start from 1, since variables are declared first
for (let i = 1; i <= state.index; i++) {
	const components = state.components[i];
	outer: for (const info of components) {
		for (const [k, filter] of Object.entries(componentFilters)) {
			// TODO: this can still go through if it finds a diff component with
			// the same list length/filter
			if (!filter(info)) {
				continue;
			}

			const name = k as Component;
			const kv: Record<string, string> = {};

			// Check if they got changed... instantly error if so, because the
			// rest is now bogus
			const msg =
				"Class name length doesn't match!\nComponent: %s\nInline: %s\nList:";
			const lhs = state.classes[i];
			const rhs = classNameByIndex[name];
			const lhsInline = state.classesInlined[i];
			const rhsInline = inlinedClassNameByIndex[name] ?? lhsInline; // skip if doesn't exist
			for (const [a, b] of [
				[lhs, rhs],
				[lhsInline, rhsInline],
			]) {
				if (a.length === b.length) {
					for (let i = 0; i < a.length; i++) {
						if (b[i] === "") {
							continue;
						}

						kv[b[i]] = a[i];
					}
					classMap.set(name, kv);
					continue;
				}

				console.log(`\n\n${name}`);
				console.log("# CLASSES:");
				printClasses(
					lhs,
					lhs.map((_, i) => rhs[i]),
				);
				console.log("\n# INLINED:");
				printClasses(
					lhsInline,
					lhsInline.map((_, i) => rhsInline[i]),
				);
				console.error(msg, name, a === lhsInline, a.length, b.length);
				printClasses(a, b);
				process.exit(1);
			}

			//delete componentFilters[name];
			break outer;
		}
	}
}
console.log(classMap);
