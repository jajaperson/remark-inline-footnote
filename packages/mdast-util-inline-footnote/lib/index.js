/** @import {Extension as FromMarkdownExtension, CompileContext, Handle as FromMarkdownHandle} from "mdast-util-from-markdown" */
/** @import {Root, FootnoteDefinition, FootnoteReference} from "mdast" */
import { visit } from "unist-util-visit";

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

/**
 * Processes `tree` to replace all `InlineFootnote` nodes with GFM-compatible
 * `FootnoteReference` nodes, with a corresponding `FootnoteDefinition` at the
 * end of the document.
 *
 * @param {Root} tree
 * @return {void}
 */
export function inlineFootnoteToGfm(tree) {
	/** @type FootnoteDefinition[] */
	const defs = [];
	visit(tree, "inlineFootnote", function (node, index, parent) {
		/* c8 ignore next */
		if (!parent || typeof index !== "number") return;

		const children = node.children;
		const identifier = `inline-${defs.length}`;

		/** @type FootnoteDefinition */
		const footnoteDef = {
			type: "footnoteDefinition",
			identifier,
			children: [
				{
					type: "paragraph",
					children,
				},
			],
		};

		/** @type FootnoteReference */
		const footnoteRef = {
			type: "footnoteReference",
			identifier,
		};

		defs.push(footnoteDef);
		parent.children[index] = footnoteRef;
	});

	tree.children.push(...defs);
}
