import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import markdownBase from './src/lib/markdown-base.mjs';

// GitHub Pages builds set the base; local/Studio previews keep root URLs.
const base = process.env.ASTRO_BASE_PATH || '/';
export default defineConfig({
  site: 'https://ludulicious.github.io',
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: { processor: unified({ rehypePlugins: [[markdownBase, { base }]] }) },
});
