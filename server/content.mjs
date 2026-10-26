// Site content for the MCP server: the JSON the build writes to api/v1/, loaded once at startup.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const LANGS = ['en', 'de', 'ru', 'hu'];
export const RESOURCES = ['profile', 'services', 'projects', 'process', 'faq', 'skills', 'contact', 'legal'];

/** Reads api/v1/{lang}/all.json for every language; fails fast when a file is missing or broken. */
export function loadContent(dir) {
  const content = {};
  for (const lang of LANGS) {
    const all = JSON.parse(readFileSync(join(dir, lang, 'all.json'), 'utf8'));
    for (const name of RESOURCES) {
      if (!all.data[name]) throw new Error(`content: ${lang}/all.json has no "${name}"`);
    }
    content[lang] = all;
  }
  // The CV is English only: api/v1/cv.json and cv.md next to the language folders.
  content.cv = JSON.parse(readFileSync(join(dir, 'cv.json'), 'utf8'));
  content.cvMarkdown = readFileSync(join(dir, 'cv.md'), 'utf8');
  return content;
}

/** One resource in the API's envelope: { lang, updated, data }. */
export const resource = (content, lang, name) => ({ lang, updated: content[lang].updated, data: content[lang].data[name] });

const words = (text) => text.toLocaleLowerCase().split(/[^\p{L}\p{N}/+#.-]+/u).filter((w) => w.length > 1);

/** FAQ entries ranked by how many query words they contain; every entry when the query is empty. */
export function searchFaq(content, lang, query = '') {
  const items = content[lang].data.faq.items;
  const terms = [...new Set(words(query))];
  if (!terms.length) return items;
  return items
    .map((item) => {
      const text = `${item.question} ${item.answer}`.toLocaleLowerCase();
      return { item, score: terms.filter((t) => text.includes(t)).length };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}
