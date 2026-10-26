// Renders the content API: api/v1/index.json, api/v1/openapi.json and api/v1/{lang}/{resource}.json.
// Returns { 'api/v1/…json': body }. Vite emits these into dist/ and serves them in `npm run dev`.
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export async function renderApi() {
  // Cache-bust so the dev server picks up edited texts.
  const stamp = `?t=${Date.now()}`;
  const load = async (rel) => import(pathToFileURL(resolve(root, rel)).href + stamp);
  const { LANGS, SITE, UPDATED } = await load('src/pages/shared.mjs');
  const { API_BASE, API_VERSION, buildLanguage } = await load('src/api/resources.mjs');
  const { ENDPOINTS, openapi } = await load('src/api/openapi.mjs');

  const files = {};
  const put = (path, body) => (files[`${API_BASE}${path}`] = `${JSON.stringify(body)}\n`);
  for (const lang of LANGS) {
    const t = (await load(`src/i18n/${lang}.mjs`)).default;
    for (const [name, body] of Object.entries(buildLanguage(t))) put(`${lang}/${name}.json`, body);
  }
  put('openapi.json', openapi());
  put('index.json', {
    name: 'Sergej Kukshausen content API',
    version: API_VERSION,
    updated: UPDATED,
    languages: LANGS,
    defaultLanguage: 'en',
    endpoints: ENDPOINTS.map((e) => ({ name: e.name, path: `/{lang}/${e.name}.json`, summary: e.description })),
    openapi: `${SITE}${API_BASE}openapi.json`,
    docs: `${SITE}api/`,
  });
  return files;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const files = await renderApi();
  console.log(`rendered ${Object.keys(files).length} API files`);
}
