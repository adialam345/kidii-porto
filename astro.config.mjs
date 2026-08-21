import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  server: {
    port: 4380,
    host: true,
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    compress({
      CSS: true,
      HTML: false,
      Image: true,
      JavaScript: true,
      SVG: true,
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['gsap', '@gsap/react'],
    },
    optimizeDeps: {
      include: ['gsap', '@gsap/react'],
    },
  },
});




