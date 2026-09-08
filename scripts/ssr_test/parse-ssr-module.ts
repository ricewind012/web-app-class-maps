import { readFile } from "node:fs/promises";
import { parse, Visitor, type Expression, type PropertyKey } from "oxc-parser";
import * as ReactUtils from "./react-utils";

type ValveComponent = "steamavatar";

const [, , file] = process.argv;
const text = await readFile(file, "utf8");
// TODO: some files only export class names... wtf
if (text.length < 1000) {
	//console.error("Length < 1000, most likely not what we want");
	//process.exit(1);
}
if (text.includes("<1>") || text.slice(0, 6) !== "import") {
	console.error("Localization tokens");
	process.exit(1);
}

const { errors, program } = await parse(file, text);
if (errors.length > 0) {
	console.error(errors);
	process.exit(1);
}

const componentPropMap: Record<ValveComponent, Record<string, string>> = {
	steamavatar: {
		// skip rgSources & playerLinkDetails & bLimitProfileFrameAnimationTime
		Avatar: "avatarURL",
		AvatarFrame: "bDisableAnimation",
	},
};

const componentPropSkipMap: Record<ValveComponent, Set<string>> = {
	steamavatar: new Set([
		"rgSources",
		"playerLinkDetails",
		"bLimitProfileFrameAnimationTime",
	]),
};

const components = new Map<ValveComponent, Map<string, string>>();
const varNameToClassName = new Map<string, string>();
let functionDepth = 0;

const visitor = new Visitor({
	FunctionDeclaration(decl) {
		// For module-context global detection
		functionDepth++;

		if (!ReactUtils.isComponent(decl)) {
			return;
		}

		// TODO: detect component file
		const component: ValveComponent = "steamavatar";
		const props = ReactUtils.getComponentProps(decl);
		if (decl.params.length === 1 && props) {
			const names = [...props.keys()];
			for (const name of names) {
				if (componentPropSkipMap[component].has(name)) {
					console.error(`Skipping '${name}'`);
					return;
				}
			}
		}

		// Never undefined (see above), satisfy TypeScript
		const ret = decl.body?.body.find((e) => e.type === "ReturnStatement");
		if (!ret) {
			return;
		}

		// Never undefined (see above), satisfy TypeScript
		const arg = ret.argument;
		if (!arg) {
			return;
		}

		//
	},
	"FunctionDeclaration:exit"() {
		functionDepth--;
	},
	ObjectExpression(decl) {
		// Only globals (by module context)
		if (functionDepth !== 0) {
			return;
		}

		// test
		if (varNameToClassName.size === 0) {
			return;
		}

		const { start, end } = decl;
		const outer = text.slice(start, end);
		// Empty object
		if (end - start === 2) {
			return;
		}

		const kv: [PropertyKey, Expression][] = [];
		for (const prop of decl.properties) {
			if (prop.type !== "Property") {
				continue;
			}

			const k = prop.key;
			// Most likely React props
			// TODO: test in future, happened one time only?
			if (
				k.type === "Identifier" &&
				(k.name === "children" || k.name === "className")
			) {
				return;
			}

			const v = prop.value;
			// Most likely the object that's declared before the class names
			// TODO: test in future
			if (v.type === "ArrowFunctionExpression") {
				return;
			}

			kv.push([k, v]);
		}

		console.log(
			"%sInput: %s%s\n",
			Bun.color("gray", "ansi"),
			Bun.color("white", "ansi"),
			outer,
		);

		const pairs: [string, string][] = [];
		for (const [k, v] of kv) {
			if (k.type === "Literal" && v.type === "TemplateLiteral") {
				pairs.push([String(k.value), v.quasis[0].value.raw]);
			} else if (k.type === "Identifier" && v.type === "Identifier") {
				const realClassName = varNameToClassName.get(v.name);
				if (!realClassName) {
					console.error("No class name for '%s'", k.name);
				}

				pairs.push([k.name, realClassName ?? v.name]);
			}
		}

		const keyWidth = Math.max(...pairs.map(([k]) => k.length));
		const valueWidth = Math.max(...pairs.map(([, v]) => v.length));
		console.log("%sResult:", Bun.color("gray", "ansi"));
		for (const [k, v] of pairs) {
			console.log(
				"%s%s %s-> %s%s",
				Bun.color("white", "ansi"),
				k.padEnd(keyWidth),
				Bun.color("gray", "ansi"),
				Bun.color("white", "ansi"),
				v.padEnd(valueWidth),
			);
		}
		console.log("%s------------------", Bun.color("rgb(64 64 64)", "ansi"));
	},
	VariableDeclarator(decl) {
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
		if (len !== 12 || (value[0] === "_" && len !== 13)) {
			return;
		}

		const { start, end } = decl;
		console.log(
			"%sInput: %s%s",
			Bun.color("gray", "ansi"),
			Bun.color("white", "ansi"),
			text.slice(start, end),
		);

		const { name } = decl.id;
		varNameToClassName.set(name, value);
	},
});
visitor.visit(program);
console.log({ varNameToClassName });
