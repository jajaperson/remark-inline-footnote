/**
 * @import {Extension, TokenizeContext, Tokenizer, State, Construct} from "micromark-util-types"
 */

import { ok as assert } from "devlop";
import { codes } from "micromark-util-symbol";

/**
 * Creates an extension for `micromark` to enable Obsidian-style inline footnote syntax
 *
 * @returns {Extension}
 *   Extension for the `micromark` package that can be passed in `extensions` to enable
 *   Obsidian-style inline footnote syntax.
 */
export function inlineFootnote() {
	/** @type {Construct} */
	const construct = {
		name: "inlineFootnote",
		tokenize: inlineFootnoteTokenize,
	};

	return {
		text: {
			[codes.caret]: construct,
		},
	};
}

/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function inlineFootnoteTokenize(effects, ok, nok) {
	let depth = 0;
	return start;

	/**
	 * Start of inline footnote.
	 *
	 * ```markdown
	 * > | a ^[b] c
	 *       ^
	 * ```
	 *
	 * @type {State}
	 */
	function start(code) {
		assert(code === codes.caret, "expected `^`");
		effects.enter("inlineFootnote");
		effects.enter("inlineFootnoteMarker");
		effects.consume(code);
		return open;
	}

	/**
	 * After `^` at `[`.
	 *
	 * ```markdown
	 * > | a ^[b] c
	 *        ^
	 * ```
	 *
	 * @type {State}
	 */
	function open(code) {
		if (code !== codes.leftSquareBracket) return nok(code);
		effects.consume(code);
		depth++;
		effects.exit("inlineFootnoteMarker");
		effects.enter("inlineFootnoteText", { contentType: "text" });
		return inside;
	}

	/**
	 * After `^[`.
	 *
	 * ```markdown
	 * > | a ^[b] c
	 *         ^
	 * ```
	 *
	 * @type {State}
	 */
	function inside(code) {
		if (code === null) return nok(code);

		if (code === codes.leftSquareBracket) {
			depth++;
		}

		if (code === codes.rightSquareBracket) {
			depth--;
			if (depth === 0) {
				effects.exit("inlineFootnoteText");

				effects.enter("inlineFootnoteMarker");
				effects.consume(code);
				effects.exit("inlineFootnoteMarker");

				effects.exit("inlineFootnote");
				return ok;
			}
		}

		effects.consume(code);
		return inside;
	}
}
