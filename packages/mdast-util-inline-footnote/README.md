# mdast-util-inline-footnote

[mdast][] extensions to parse [Obsidian]-style inline footnotes
and convert them to [GFM footnotes][gfm-footnote].
Intended to be used with [micromark-extension-inline-footnote][].

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install micromark-extension-inline-footnote mdast-util-inline-footnote
```

In Deno with [`esm.sh`][esmsh]:

```js
import { inlineFootnoteFromMarkdown } from "https://esm.sh/mdast-util-inline-footnote@1";
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
	import { inlineFootnoteFromMarkdown } from "https://esm.sh/mdast-util-inline-footnote12?bundle";
</script>
```

## API

This package exports the identifiers
[`inlineFootnoteFromMarkdown`][api-frommarkdown] and
[`inlineFootnoteToGfm`][api-togfm].
There is no default export.

### `inlineFootnoteFromMarkdown()`

Create an extension for
[`mdast-util-from-markdown`][mdast-util-from-markdown]
to enable inline footnotes in markdown.

###### Returns

Extension for `mdast-util-from-markdown`
([`FromMarkdownExtension`][frommarkdownextension]).

### `inlineFootnoteToGfm`

Utility function for converting all inline footnotes in an abstract syntax tree
to a GFM footnote reference (in place)
and a GFM footnote definition (at the end of the tree).

[Obsidian]: https://obsidian.md
[mdast-util-from-markdown]: https://github.com/syntax-tree/mdast-util-from-markdown
[micromark]: https://github.com/micromark/micromark
[mdast-util-inline-footnote]: https://github.com/jajaperson/remark-inline-footnote/tree/main/packages/mdast-util-inline-footnote
[esmsh]: https://esm.sh
[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[micromark-extension]: https://github.com/micromark/micromark#syntaxextension
[mdast]: https://github.com/syntax-tree/mdast
[gfm-footnote]: https://github.com/syntax-tree/mdast-util-gfm-footnote
[npm]: https://docs.npmjs.com/cli/install
[api-frommarkdown]: #inlinefootnotefrommarkdown
[frommarkdownextension]: https://github.com/syntax-tree/mdast-util-from-markdown#extension
[api-togfm]: #inlinefootnotetogfm
[micromark-inline-footnote]: https://github.com/jajaperson/remark-inline-footnote/tree/main/packages/micromark-extension-inline-footnote
