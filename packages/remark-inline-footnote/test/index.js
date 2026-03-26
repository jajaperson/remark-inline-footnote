import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { fixtures, inputDir, outputDir } from "./fixtures.js";
/** @import {InlineFootnote} from "mdast-util-inline-footnote" */

test("remark-inline-footnote", async function (t) {
	for (const fixture of fixtures) {
		await t.test(fixture.description, async function () {
			const input = await fs.readFile(new URL(fixture.input, inputDir));
			const expected = String(await fs.readFile(new URL(fixture.output, outputDir)));
			const actual = String(await fixture.process(input));
			assert.equal(actual.trim(), expected.trim());
		});
	}

	t.test("Should leave an inline footnote with no parent alone", function () {
		/** @type {InlineFootnote} */
		const contrivedTree = {
			type: "inlineFootnote",
			children: [],
		};
	});
});
