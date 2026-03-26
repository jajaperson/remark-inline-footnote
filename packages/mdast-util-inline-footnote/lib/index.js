/** @import {Extension as FromMarkdownExtension, CompileContext, Handle as FromMarkdownHandle} from "mdast-util-from-markdown" */

/**
 * Create an extension for `mdast-util-from-markdown` to enable GFM footnotes
 * in markdown.
 *
 * @returns {FromMarkdownExtension}
 *   Extension for `mdast-util-from-markdown`.
 */
export function inlineFootnoteFromMarkdown() {
	return {
		enter: {
			inlineFootnote: enterInlineFootnote,
		},
		exit: {
			inlineFootnote: exitInlineFootnote,
		},
	};
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function enterInlineFootnote(token) {
	this.enter({ type: "inlineFootnote", children: [] }, token);
}

/**
 * @this {CompileContext}
 * @type {FromMarkdownHandle}
 */
function exitInlineFootnote(token) {
	this.exit(token);
}
