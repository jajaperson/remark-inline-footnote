import { BlockContent, Parent, DefinitionContent, PhrasingContent } from "mdast";
export { inlineFootnoteFromMarkdown } from "./types.js";

interface InlineFootnote extends Parent {
	type: "inlineFootnote";
	children: PhrasingContent[];
}

declare module "mdast" {
	interface RootContentMap {
		inlineFootnote: InlineFootnote;
	}
}
