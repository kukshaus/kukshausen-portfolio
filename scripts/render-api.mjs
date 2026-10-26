// Renders the content API: api/v1/index.json, api/v1/openapi.json and api/v1/{lang}/{resource}.json,
// plus the MCP discovery files: mcp/server-card.json (served at /mcp/server-card) and .well-known/ai-catalog.json.
// Returns { 'path/file.json': body }. Vite emits these into dist/ and serves them in `npm run dev`.
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SUPPORTED_PROTOCOL_VERSIONS } from '@modelcontextprotocol/sdk/types.js';
import { SERVER_INFO } from '../server/mcp.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export async function renderApi() {
  // Cache-bust so the dev server picks up edited texts.
  const stamp = `?t=${Date.now()}`;
  const load = async (rel) => import(pathToFileURL(resolve(root, rel)).href + stamp);
  const { LANGS, SITE, UPDATED } = await load('src/pages/shared.mjs');
  const { API_BASE, API_VERSION, buildLanguage } = await load('src/api/resources.mjs');
  const { ENDPOINTS, CV_DESCRIPTION, openapi } = await load('src/api/openapi.mjs');
  const { cv, cvMarkdown } = await load('src/api/cv.mjs');

  const files = {};
  const put = (path, body) => (files[`${API_BASE}${path}`] = `${JSON.stringify(body)}\n`);
  for (const lang of LANGS) {
    const t = (await load(`src/i18n/${lang}.mjs`)).default;
    for (const [name, body] of Object.entries(buildLanguage(t))) put(`${lang}/${name}.json`, body);
  }
  put('cv.json', cv());
  files[`${API_BASE}cv.md`] = cvMarkdown();
  put('openapi.json', openapi());
  put('index.json', {
    name: 'Sergej Kukshausen content API',
    version: API_VERSION,
    updated: UPDATED,
    languages: LANGS,
    defaultLanguage: 'en',
    endpoints: [
      ...ENDPOINTS.map((e) => ({ name: e.name, path: `/{lang}/${e.name}.json`, summary: e.description })),
      { name: 'cv', path: '/cv.json', summary: CV_DESCRIPTION },
      { name: 'cv-markdown', path: '/cv.md', summary: 'The CV as Markdown. English only.' },
    ],
    openapi: `${SITE}${API_BASE}openapi.json`,
    docs: `${SITE}api/`,
  });

  // MCP Server Card (SEP-2127) and the domain's AI Catalog pointing to it.
  const mcpUrl = `${SITE}mcp`;
  const card = {
    $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
    name: 'me.kukshausen/sergej',
    version: SERVER_INFO.version,
    title: SERVER_INFO.title,
    description: 'Profile, CV, services, projects and FAQ of Sergej Kukshausen, plus booking an intro call',
    websiteUrl: SITE,
    icons: [
      { src: `${SITE}favicon.svg`, mimeType: 'image/svg+xml', sizes: ['any'] },
      { src: `${SITE}icon-512.png`, mimeType: 'image/png', sizes: ['512x512'] },
    ],
    // Streamable HTTP exists since 2025-03-26; older versions only spoke HTTP+SSE.
    remotes: [{ type: 'streamable-http', url: mcpUrl, supportedProtocolVersions: SUPPORTED_PROTOCOL_VERSIONS.filter((v) => v >= '2025-03-26') }],
  };
  if (card.description.length > 100) throw new Error(`server card: description is ${card.description.length} chars, max 100`);
  files['mcp/server-card.json'] = `${JSON.stringify(card, null, 2)}\n`;
  files['.well-known/ai-catalog.json'] = `${JSON.stringify(
    {
      specVersion: '1.0',
      host: { displayName: 'Sergej Kukshausen', identifier: 'did:web:sergej.kukshausen.me', documentationUrl: SITE },
      entries: [
        {
          identifier: 'urn:air:kukshausen.me:mcp:sergej',
          displayName: SERVER_INFO.title,
          type: 'application/mcp-server-card+json',
          description: card.description,
          tags: ['engineering-management', 'fintech', 'consulting', 'portfolio'],
          url: `${mcpUrl}/server-card`,
          updatedAt: `${UPDATED}T00:00:00Z`,
        },
      ],
    },
    null,
    2,
  )}\n`;
  return files;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const files = await renderApi();
  console.log(`rendered ${Object.keys(files).length} API files`);
}
