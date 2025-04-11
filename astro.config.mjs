import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { autoNewTabExternalLinks } from './src/autoNewTabExternalLinks';
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://ak264.github.io',
  base: '/AkremB-main', // Add this line for GitHub Pages deployment
  output: 'static',
  integrations: [mdx(), sitemap(), tailwind(), partytown(), react()],
  markdown: {
    extendDefaultPlugins: true,
    rehypePlugins: [[autoNewTabExternalLinks, {
      domain: 'localhost:4321'
    }]]
  }
});