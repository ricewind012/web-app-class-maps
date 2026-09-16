export const COMMON_REACT_PROPS = new Set(["children", "className", "ref"]);
export const BLACKLISTED_OBJ_EXPR_KEYS = new Set([
	...COMMON_REACT_PROPS,
	// BB code init objects
	"Constructor",
]);
