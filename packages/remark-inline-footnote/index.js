/**
 * @import {} from 'remark-parse' // Need to import namespaces
 * @import {} from 'remark-stringify'
 * @import {} from "mdast-util-inline-footnote"
 * @import {Processor} from 'unified'
 */

import { inlineFootnote } from "micromark-extension-inline-footnote";
import { inlineFootnoteFromMarkdown, inlineFootnoteToGfm } from "mdast-util-inline-footnote";

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

	return inlineFootnoteToGfm;
}
