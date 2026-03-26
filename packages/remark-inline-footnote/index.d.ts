/**
 * Processes Obsidian-style inline footnotes by first turning them into GFM-style footnotes.
 *
 * @returns
 *   Transform.
 *
 * @this {Processor}
 */
export default function remarkInlineFootnote(this: Processor<undefined, undefined, undefined, undefined, undefined>): (tree: Root) => void;
import type { Processor } from 'unified';
import type { Root } from 'mdast';
