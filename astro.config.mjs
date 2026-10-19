import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.kramolis.cz',
  output: 'static',
  // the compression drops the space at a line break between inline elements of the posts
  compressHTML: false,
  // keeps the addresses of the old Jekyll site: /2015/01/16/<slug>.html, /tags.html
  build: { format: 'preserve' },
  integrations: [sitemap()],
});
