export { inlineFootnote } from "./index.js";

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
