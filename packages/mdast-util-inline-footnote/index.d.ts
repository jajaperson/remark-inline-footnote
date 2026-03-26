import { Parent, PhrasingContent } from "mdast";
export { inlineFootnoteFromMarkdown } from "./lib/index.js";

export interface InlineFootnote extends Parent {
	type: "inlineFootnote";
	children: PhrasingContent[];
}

declare module "mdast" {
	interface RootContentMap {
		inlineFootnote: InlineFootnote;
	}
}
