/** @import { VFile } from "vfile" */

import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import remarkInlineFootnote from "../index.js";
import { examples } from "../../../examples/examples.js";

export const inputDir = new URL("../../../examples/", import.meta.url);
export const outputDir = new URL("fixture/", import.meta.url);

/**
 * @type {Array<{description: string, input: string, output: string, process: (inp: Buffer) => Promise<VFile>}>}
 */
export const fixtures = Object.entries(examples).flatMap(([name, description]) => {
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
