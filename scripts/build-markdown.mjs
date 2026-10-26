// Markdown for agents: writes a .md next to every built page (index.html → index.md, imprint.html → imprint.md).
// nginx serves it for requests with "Accept: text/markdown", like Cloudflare's Markdown for Agents.
// Output: YAML frontmatter (title, description, image, url, lang), the page's <main> as Markdown, JSON-LD at the end.
import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const SITE = 'https://sergej.kukshausen.me/';
const dist = resolve(process.argv[2] ?? 'dist');
// The 404 page has nothing to say, and the API docs are already machine-readable.
const SKIP = new Set(['404.html', 'api/index.html']);

const decode = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const meta = (html, attr, name) => {
  const tag = html.match(new RegExp(`<meta[^>]*${attr}="${name}"[^>]*>`, 'i'))?.[0];
  const content = tag?.match(/content="([^"]*)"/i)?.[1];
  return content ? decode(content) : undefined;
};
const yaml = (v) => JSON.stringify(v); // JSON strings are valid YAML scalars

function convert(html, pageUrl) {
  const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced', emDelimiter: '*' });
  td.use(gfm);
  // Forms, icons and decorative images mean nothing as text.
  td.remove(['script', 'style', 'noscript', 'form', 'svg', 'img', 'picture', 'button', 'nav', 'template']);
  td.addRule('hidden', { filter: (node) => node.getAttribute?.('aria-hidden') === 'true' || node.hasAttribute?.('hidden'), replacement: () => '' });
  td.addRule('absoluteLinks', {
    filter: (node) => node.nodeName === 'A' && node.getAttribute('href'),
    replacement: (content, node) => {
      const text = content.trim();
      if (!text) return '';
      const href = new URL(node.getAttribute('href'), pageUrl).href;
      return href === text ? `<${href}>` : `[${text}](${href})`;
    },
  });

  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  const body = td
    .turndown(main)
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    // A heading left with nothing under it (the contact form's) goes too.
    .replace(/\n+#{1,6} [^\n]+$/, '');

  const front = {
    title: meta(html, 'name', 'title') ?? meta(html, 'property', 'og:title') ?? decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? ''),
    description: meta(html, 'name', 'description') ?? meta(html, 'property', 'og:description'),
    image: meta(html, 'property', 'og:image'),
    url: pageUrl,
    lang: html.match(/<html[^>]*lang="([^"]+)"/i)?.[1],
  };
  const frontmatter = Object.entries(front)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${yaml(v)}`)
    .join('\n');

  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((m) => JSON.parse(m[1]));
  const ld = jsonLd.length ? `\n\n\`\`\`json\n${JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd, null, 2)}\n\`\`\`` : '';
  return `---\n${frontmatter}\n---\n\n${body}${ld}\n`;
}

let count = 0;
for (const file of globSync('**/*.html', { cwd: dist })) {
  const rel = relative(dist, resolve(dist, file)).split('\\').join('/');
  if (SKIP.has(rel)) continue;
  const html = readFileSync(resolve(dist, rel), 'utf8');
  const pageUrl = SITE + rel.replace(/(^|\/)index\.html$/, '$1');
  const md = convert(html, pageUrl);
  if (md.length < 200) throw new Error(`markdown: ${rel} converted to almost nothing`);
  writeFileSync(resolve(dist, rel.replace(/\.html$/, '.md')), md);
  count++;
}
console.log(`built ${count} markdown pages`);
