import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// BASE_PATH is set by the GitHub Pages workflow ("/kukshausen-portfolio/").
// Leave it unset for local dev or a custom domain at the site root.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [tailwindcss()],
  build: {
    target: 'es2022',
    cssMinify: true,
  },
});
