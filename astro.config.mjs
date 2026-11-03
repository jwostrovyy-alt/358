import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jwostrovyy-alt.github.io',
  base: '/358',
  integrations: [tailwind(), sitemap()],
  output: 'static',
});

