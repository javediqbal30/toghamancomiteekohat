import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.toghamancomitee.com',
  output: 'static',
  build: {
    format: 'directory'
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/') && !page.includes('/portal/')
    })
  ]
});
