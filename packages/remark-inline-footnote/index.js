/**
 * @import {Root, FootnoteReference, FootnoteDefinition} from 'mdast'
 * @import {} from 'remark-parse' // Need to import namespaces
 * @import {} from 'remark-stringify'
 * @import {} from "mdast-util-inline-footnote"
 * @import {Processor} from 'unified'
 */

import { inlineFootnote } from "micromark-extension-inline-footnote";
import { inlineFootnoteFromMarkdown } from "../mdast-util-inline-footnote/index.js";
import { visit } from "unist-util-visit";

/**
 * Processes Obsidian-style inline footnotes by first turning them into GFM-style footnotes.
 *
 * @returns
 *   Transform.
 *
 * @this {Processor}
 */
export default function remarkInlineFootnote() {
	const self = this;
	const data = self.data();

	const micromarkExtensions = (data.micromarkExtensions ??= []);
	const fromMarkdownExtensions = (data.fromMarkdownExtensions ??= []);

	micromarkExtensions.push(inlineFootnote());
	fromMarkdownExtensions.push(inlineFootnoteFromMarkdown());
	/**
	 * @param {Root} tree
	 * @return {void}
	 */
	return function (tree) {
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
	};
}
