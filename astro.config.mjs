import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';
import { unified } from '@astrojs/markdown-remark';
import markdownBase from './src/lib/markdown-base.mjs';
import remarkImages from './src/lib/remark-images.mjs';

// GitHub Pages builds set the base; local/Studio previews keep root URLs.
const base = process.env.ASTRO_BASE_PATH || '/';
export default defineConfig({
  site: 'https://ludulicious.github.io',
  base,
  trailingSlash: 'always',
  image: { remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' }], layout: 'constrained' },
  integrations: [sitemap(), mdx({ remarkPlugins: [remarkImages], rehypePlugins: [[markdownBase, { base }]] }), markdoc()],
  markdown: { processor: unified({ remarkPlugins: [remarkImages], rehypePlugins: [[markdownBase, { base }]] }) },
});
