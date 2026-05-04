// Remark plugin that rewrites `<video src="relative.mp4">` (and `<source src="...">`,
// `<audio src="...">`) JSX attributes inside MDX so that webpack processes the file
// through Docusaurus' built-in media loader rule instead of leaving a literal string
// the browser cannot resolve.
import path from 'node:path';
import fs from 'node:fs';

const MEDIA_TAGS = new Set(['video', 'audio', 'source', 'track']);
const SKIP_PROTOCOL = /^(?:[a-z]+:|\/\/|\/|#|data:|pathname:)/i;

function walk(node, visitor) {
  if (!node || typeof node !== 'object') return;
  visitor(node);
  const children = node.children;
  if (Array.isArray(children)) {
    for (const child of children) walk(child, visitor);
  }
}

function buildRequireExpression(requirePath) {
  const literal = {
    type: 'Literal',
    value: requirePath,
    raw: JSON.stringify(requirePath),
  };
  return {
    type: 'mdxJsxAttributeValueExpression',
    value: `require(${literal.raw}).default`,
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        comments: [],
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'CallExpression',
                callee: { type: 'Identifier', name: 'require' },
                arguments: [literal],
                optional: false,
              },
              property: { type: 'Identifier', name: 'default' },
              computed: false,
              optional: false,
            },
          },
        ],
      },
    },
  };
}

export default function remarkVideoAssets() {
  return (tree, vfile) => {
    const filePath = vfile?.path ?? vfile?.history?.[vfile.history.length - 1];
    if (!filePath) return;
    const sourceDir = path.dirname(filePath);

    walk(tree, (node) => {
      if (
        node.type !== 'mdxJsxFlowElement' &&
        node.type !== 'mdxJsxTextElement'
      ) {
        return;
      }
      if (!MEDIA_TAGS.has(node.name)) return;

      const attrs = node.attributes;
      if (!Array.isArray(attrs)) return;

      for (const attr of attrs) {
        if (attr?.type !== 'mdxJsxAttribute' || attr.name !== 'src') continue;
        if (typeof attr.value !== 'string') continue; // already an expression
        const raw = attr.value;
        if (!raw || SKIP_PROTOCOL.test(raw)) continue;

        const decoded = decodeURIComponent(raw.split('?')[0].split('#')[0]);
        const absolute = path.resolve(sourceDir, decoded);
        if (!fs.existsSync(absolute)) {
          // Leave it untouched so Docusaurus' broken-link reporting can still complain.
          continue;
        }
        const relPosix = path
          .relative(sourceDir, absolute)
          .split(path.sep)
          .join('/');
        const requirePath = relPosix.startsWith('.') ? relPosix : `./${relPosix}`;
        attr.value = buildRequireExpression(requirePath);
      }
    });
  };
}
