import { defineConfig, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { renderPages } from './scripts/render-pages.mjs';
import { renderApi } from './scripts/render-api.mjs';

// Pages are generated from src/pages/*.mjs + src/i18n/*.mjs (one set per language).
const pages = await renderPages();

// Re-render on template or text edits during `npm run dev`.
function i18nPages(): Plugin {
  return {
    name: 'i18n-pages',
    configureServer(server) {
      server.watcher.add(['src/pages', 'src/i18n', 'src/api']);
      server.watcher.on('change', async (file) => {
        if (/src[\\/](pages|i18n|api)[\\/]/.test(file)) {
          await renderPages();
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}

// The content API (static JSON under api/v1/) and the MCP discovery files, emitted into dist/ and served by the dev server.
function apiFiles(): Plugin {
  return {
    name: 'api-files',
    async generateBundle() {
      for (const [fileName, source] of Object.entries(await renderApi())) {
        this.emitFile({ type: 'asset', fileName, source });
      }
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        let path = (req.url ?? '').split('?')[0].replace(/^\//, '');
        if (path === 'mcp/server-card') path = 'mcp/server-card.json';
        if (!/^(api\/v1\/|mcp\/|\.well-known\/ai-catalog)/.test(path)) return next();
        const body = (await renderApi())[path];
        if (body === undefined) return next();
        res.setHeader('Content-Type', path.endsWith('.md') ? 'text/markdown; charset=utf-8' : 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(body);
      });
    },
  };
}

// BASE_PATH is set by the GitHub Pages workflow ("/kukshausen-portfolio/").
// Leave it unset for local dev or a custom domain at the site root.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [tailwindcss(), i18nPages(), apiFiles()],
  build: {
    target: 'es2022',
    cssMinify: true,
    rollupOptions: { input: pages },
  },
});
