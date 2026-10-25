import { withBase } from './base-path.mjs';

// Content stays portable: authors keep writing /blog/... and /images/... in Studio.
export default function markdownBase({ base = '/' } = {}) {
  return function transform(tree) {
    function visit(node) {
      if (node.type === 'element' && node.properties) {
        for (const key of ['href', 'src']) {
          if (typeof node.properties[key] === 'string') {
            node.properties[key] = withBase(node.properties[key], base);
          }
        }
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
