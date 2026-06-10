import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  site: 'https://www.crystalgroup.in',
  trailingSlash: 'ignore',
  prefetch: {
    defaultStrategy: 'hover',
    prefetchAll: true,
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  vite: {
    ssr: {
      noExternal: ['gsap'],
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@data': path.resolve('./src/data'),
        '@assets': path.resolve('./src/assets'),
        '@styles': path.resolve('./src/styles'),
        '@layouts': path.resolve('./src/layouts'),
      }
    }
  }
});
