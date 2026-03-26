import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { fixtures, base } from "./fixtures.js";

test("remark-inline-footnote", async function (t) {
	for (const fixture of fixtures) {
		await t.test(fixture.description, async function () {
			const input = await fs.readFile(new URL(fixture.input, base));
			const expected = String(await fs.readFile(new URL(fixture.output, base)));
			const actual = String(await fixture.process(input));
			assert.equal(actual.trim(), expected.trim());
		});
	}
});
