import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

const page = (name: string) => fileURLToPath(new URL(`./${name}.html`, import.meta.url));

// BASE_PATH is set by the GitHub Pages workflow ("/kukshausen-portfolio/").
// Leave it unset for local dev or a custom domain at the site root.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [tailwindcss()],
  build: {
    target: 'es2022',
    cssMinify: true,
    rollupOptions: {
      input: {
        main: page('index'),
        privacy: page('privacy'),
        imprint: page('imprint'),
      },
    },
  },
});
