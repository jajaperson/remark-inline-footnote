export { inlineFootnote } from "./lib/index.js";

/**
 * Augment.
 */
declare module "micromark-util-types" {
	/**
	 * Token types.
	 */
	interface TokenTypeMap {
		inlineFootnote: "inlineFootnote";
		inlineFootnoteMarker: "inlineFootnoteMarker";
		inlineFootnoteText: "inlineFootnoteText";
	}
}
