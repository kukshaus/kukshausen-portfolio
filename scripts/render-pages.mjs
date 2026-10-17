// Renders every page in every language into the HTML entry files Vite builds from.
//   /index.html, /privacy.html, /imprint.html            English
//   /de/…, /ru/…, /hu/…                                  translations
// The generated HTML files are build artefacts (gitignored); edit src/i18n/*.mjs and src/pages/*.mjs instead.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['en', 'de', 'ru', 'hu'];

export async function renderPages() {
  // Cache-bust so the dev server picks up edited templates and texts.
  const stamp = `?t=${Date.now()}`;
  const load = async (rel) => import(pathToFileURL(resolve(root, rel)).href + stamp);
  const { renderHome } = await load('src/pages/home.mjs');
  const { renderLegal } = await load('src/pages/legal.mjs');

  const outputs = {};
  for (const lang of LANGS) {
    const t = (await load(`src/i18n/${lang}.mjs`)).default;
    const dir = lang === 'en' ? root : resolve(root, lang);
    mkdirSync(dir, { recursive: true });
    const pages = {
      'index.html': renderHome(t),
      'privacy.html': renderLegal(t, 'privacy'),
      'imprint.html': renderLegal(t, 'imprint'),
    };
    for (const [file, html] of Object.entries(pages)) {
      const path = resolve(dir, file);
      writeFileSync(path, html);
      outputs[`${lang}-${file.replace('.html', '')}`] = path;
    }
  }
  return outputs;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const out = await renderPages();
  console.log(`rendered ${Object.keys(out).length} pages`);
}
