import { Function as OxcFunction } from "oxc-parser";

export function isComponent(decl: OxcFunction) {
	const { body, params } = decl;
	if (!body) {
		return false;
	}

	// Returns nothing
	if (body.body.at(-1)?.type !== "ReturnStatement") {
		//return false;
	}

	// React components have no params or only 1 for its props
	if (params.length > 1) {
		//return false;
	}

	/* this sucks
	// Usually *a relevant one's* body starts with destructuring props
	if (
		params.length === 1 &&
		body.type === "BlockStatement" &&
		body.body[0].type !== "VariableDeclaration"
	) {
		console.error("React component doesnt start with you know what");
		return false;
	}
	*/

	return true;
}
