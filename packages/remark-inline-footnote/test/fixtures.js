/** @import { VFile } from "vfile" */

import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import remarkInlineFootnote from "../index.js";

export const base = new URL("fixture/", import.meta.url);

/**
 * @type {Array<{description: string, input: string, output: string, process: (inp: Buffer) => Promise<VFile>}>}
 */
export const fixtures = Object.entries({
	basic: "Should handle a basic footnote",
	attention: "Should handle a footnote with attention constructs",
	link: "Should handle a footnote with a link",
	eof: "Should handle premature file endings correctly",
	nested: "Should handle nested footnotes correctly",
}).flatMap(([name, description]) => {
	/** @type {{description: string, input: string, output: string, process: (inp: Buffer) => Promise<VFile>}} */
	const toMd = {
		description: description + " when compiling to markdown",
		input: `${name}.md`,
		output: `${name}-gfm.md`,
		async process(md) {
			return await unified()
				.use(remarkParse)
				.use(remarkInlineFootnote)
				.use(remarkGfm)
				.use(remarkStringify)
				.process(md);
		},
	};

	/** @type {{description: string, input: string, output: string, process: (inp: Buffer) => Promise<VFile>}} */
	const toHtml = {
		description: description + " when compiling to html",
		input: `${name}.md`,
		output: `${name}.html`,
		async process(md) {
			return await unified()
				.use(remarkParse)
				.use(remarkInlineFootnote)
				.use(remarkGfm)
				.use(remarkRehype)
				.use(rehypeStringify)
				.process(md);
		},
	};

	return [toMd, toHtml];
});
