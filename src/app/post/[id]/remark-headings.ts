import type { Heading, Root, Text } from 'mdast';
import Slugger from "github-slugger";
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

export type HeadingTocItem = {
  id?: string;
  depth: number;
  value?: string;
  children?: HeadingTocItem[];
}

export type HeadingToc = HeadingTocItem[]

export default function remarkHeadingToc(formatter = (id: string) => ` {#${id}}`) {
  return async function transformer(tree: Root, vFile: any) {
    const headings: HeadingToc = [];
    const slugger = new Slugger();

    function getFlatHeadingsList(node: Heading) {
      const str = toString(node);
      const id = slugger.slug(str);

      const h: HeadingTocItem = {
        id,
        depth: node.depth,
        value: str,
      };

      headings.push(h);

      const customTextNode: Text = {
        type: 'text',
        value: formatter(id),
      };

      if (node.children) {
        node.children.push(customTextNode);
      } else {
        node.children = [customTextNode];
      }
    }

    visit(tree, 'heading', getFlatHeadingsList);
    vFile.data.remarkHeadingToc = buildHeadingsTree(headings);
  };
}

function buildHeadingsTree(headings: HeadingToc): HeadingToc {
  const root: HeadingTocItem = { depth: 0 };
  const parents: HeadingToc = [];
  let previous = root;

  headings.forEach((heading) => {
    if (heading.depth > previous.depth) {
      if (previous.children === undefined) {
        previous.children = [];
      }
      parents.push(previous);
    } else if (heading.depth < previous.depth) {
      while (parents[parents.length - 1]!.depth >= heading.depth) {
        parents.pop();
      }
    }

    parents[parents.length - 1]!.children?.push(heading);
    previous = heading;
  });

  return root.children ?? [];
}
