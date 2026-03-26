import { fromMarkdown } from "mdast-util-from-markdown";
import { inlineFootnote } from "micromark-extension-inline-footnote";
import { inlineFootnoteFromMarkdown } from "../index.js";

export const base = new URL("fixture/", import.meta.url);

/**
 * @type {Array<{description: string, input: string, output: string, process: (inp: Buffer) => string}>}
 */
export const fixtures = Object.entries({
	basic: "Should give an AST for a basic footnote",
	attention: "Should give an AST for a footnote with attention constructs",
	link: "Should give an AST for a footnote with a link",
	eof: "Should handle premature file endings correctly",
	nested: "Should handle nested footnotes correctly",
}).map(([name, description]) => ({
	description,
	input: `${name}.md`,
	output: `${name}.json`,
	process(md) {
		const ast = fromMarkdown(md, {
			extensions: [inlineFootnote()],
			mdastExtensions: [inlineFootnoteFromMarkdown()],
		});
		return JSON.stringify(ast, null, "\t");
	},
}));
