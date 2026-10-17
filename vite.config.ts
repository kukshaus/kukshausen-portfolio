import { defineConfig, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { renderPages } from './scripts/render-pages.mjs';

// Pages are generated from src/pages/*.mjs + src/i18n/*.mjs (one set per language).
const pages = await renderPages();

// Re-render on template or text edits during `npm run dev`.
function i18nPages(): Plugin {
  return {
    name: 'i18n-pages',
    configureServer(server) {
      server.watcher.add(['src/pages', 'src/i18n']);
      server.watcher.on('change', async (file) => {
        if (/src[\\/](pages|i18n)[\\/]/.test(file)) {
          await renderPages();
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}

// BASE_PATH is set by the GitHub Pages workflow ("/kukshausen-portfolio/").
// Leave it unset for local dev or a custom domain at the site root.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [tailwindcss(), i18nPages()],
  build: {
    target: 'es2022',
    cssMinify: true,
    rollupOptions: { input: pages },
  },
});
