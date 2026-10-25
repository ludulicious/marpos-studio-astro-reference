import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Replace before deploying this reference website.
  site: 'https://example.com',
  integrations: [sitemap()],
});
