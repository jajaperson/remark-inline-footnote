# remark-inline-footnote

**[remark][]** plugin to support for [Obsidian][]-style inline footnotes.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install remark-inline-footnote
```

In Deno with [`esm.sh`][esmsh]:

```js
import gfmInlineFootnote from "https://esm.sh/remark-inline-footnote@1";
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
	import gfmInlineFootnote from "https://esm.sh/remark-inline-footnote@1?bundle";
</script>
```

## Use

Say our document `example.md` contains:

```markdown
Venus is the second planet^[See [Wikipedia](https://en.wikipedia.org/wiki/Venus).] from the sun.
```

…and our module `example.js` contains:

```js
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkInlineFootnote from "remark-inline-footnote";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { read } from "to-vfile";
import { unified } from "unified";

const file = await unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkInlineFootnote)
	.use(remarkRehype)
	.use(rehypeStringify)
	.process(await read("example.md"));

console.log(String(file));
```

…then running `node example.js` yields:

<!-- prettier-ignore -->
```html
<p>Venus is the second planet<sup><a href="#user-content-fn-inline-0" id="user-content-fnref-inline-0" data-footnote-ref aria-describedby="footnote-label">1</a></sup> from the sun.</p>
<section data-footnotes class="footnotes"><h2 class="sr-only" id="footnote-label">Footnotes</h2>
<ol>
<li id="user-content-fn-inline-0">
<p>See <a href="https://en.wikipedia.org/wiki/Venus">Wikipedia</a>. <a href="#user-content-fnref-inline-0" data-footnote-backref="" aria-label="Back to reference 1" class="data-footnote-backref">↩</a></p>
</li>
</ol>
</section>
```

Alternatively we could convert to [GFM][] if our module `example2.js` contains:

```js
import remarkStringify from "remark-stringify";
import remarkGfm from "remark-gfm";
import remarkInlineFootnote from "remark-inline-footnote";
import remarkParse from "remark-parse";
import { read } from "to-vfile";
import { unified } from "unified";

const file = await unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkInlineFootnote)
	.use(remarkStringify)
	.process(await read("example.md"));

console.log(String(file));
```

…then running `node example2.js` yields:

```md
Venus is the second planet[^inline-0] from the sun.

[^inline-0]: See [Wikipedia](https://en.wikipedia.org/wiki/Venus).
```

## API

This package exports no identifiers.
The default export is [`remarkInlineFootnote`][api-remark-gfm].

### `unified().use(remarkInlineFootnote)`

Add support for inline footnotes.

###### Returns

Nothing (`undefined`).

## Security

Use of `remark-inline-footnote` does not involve **[rehype][]** ([hast][]) or user
content so there are no openings for [cross-site scripting (XSS)][wiki-xss]
attacks.

<!-- Definitions -->

[api-options]: #options
[api-remark-gfm]: #unifieduseremarkgfm-options
[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[esmsh]: https://esm.sh
[gfm]: https://github.github.com/gfm/
[hast]: https://github.com/syntax-tree/hast
[health]: https://github.com/remarkjs/.github
[license]: license
[mdast-util-from-markdown]: https://github.com/syntax-tree/mdast-util-from-markdown
[mdast-util-gfm]: https://github.com/syntax-tree/mdast-util-gfm
[micromark]: https://github.com/micromark/micromark
[micromark-extension-gfm]: https://github.com/micromark/micromark-extension-gfm
[npm]: https://docs.npmjs.com/cli/install
[rehype]: https://github.com/rehypejs/rehype
[rehype-slug]: https://github.com/rehypejs/rehype-slug
[remark]: https://github.com/remarkjs/remark
[remark-breaks]: https://github.com/remarkjs/remark-breaks
[remark-frontmatter]: https://github.com/remarkjs/remark-frontmatter
[remark-github]: https://github.com/remarkjs/remark-github
[remark-rehype]: https://github.com/remarkjs/remark-rehype
[unified]: https://github.com/unifiedjs/unified
[Obsidian]: https://obsidian.md
[wiki-xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
