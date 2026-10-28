import { relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDirectory = fileURLToPath(new URL('../../public/', import.meta.url));

// Let Astro process editor-authored public images as local Markdown/MDX imports.
export default function remarkImages() {
  return (tree, file) => {
    const imageDefinitions = new Set();
    function collect(node) {
      if (node.type === 'imageReference') imageDefinitions.add(node.identifier);
      node.children?.forEach(collect);
    }
    collect(tree);
    function visit(node) {
      if ((node.type === 'image' || (node.type === 'definition' && imageDefinitions.has(node.identifier))) && node.url?.startsWith('/images/')) {
        const path = resolve(publicDirectory, `.${decodeURI(node.url)}`);
        if (!path.startsWith(`${publicDirectory}images${sep}`)) throw new Error(`Invalid image path: ${node.url}`);
        const relativePath = relative(resolve(file.dirname), path).split(sep).join('/');
        node.url = relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
