// Privacy policy and imprint, one page per language.
import { SITE, langDir, headCommon, header, footer } from './shared.mjs';

export function renderLegal(t, kind) {
  const doc = t[kind];
  const page = `${kind}.html`;
  const url = `${SITE}${langDir(t.lang)}${page}`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE}#website`, url: SITE, name: 'Sergej Kukshausen' },
      { '@type': 'Person', '@id': `${SITE}#person`, name: 'Sergej Kukshausen', url: SITE },
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: doc.title.replace(/&amp;/g, '&'), inLanguage: t.lang,
        ...(kind === 'privacy' ? { dateModified: '2026-10-16' } : {}),
        isPartOf: { '@id': `${SITE}#website` }, about: { '@id': `${SITE}#person` },
      },
    ],
  };
  const note = t.legal.translationNote ? `\n      <p class="translation-note">${t.legal.translationNote}</p>` : '';
  return `<!doctype html>
<html lang="${t.lang}" class="scroll-smooth">
  <head>
${headCommon({ t, page, title: doc.title, description: doc.description, robots: 'noindex, follow' })}
    <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
    </script>
    <script type="module" src="/src/legal.ts"></script>
  </head>
  <body>
${header(t, { page, anchors: false })}

    <main class="legal">
      <h1>${doc.h1}</h1>${note}
      <p class="meta">${t.legal.lastUpdated}</p>
${doc.body}
    </main>

${footer(t)}
  </body>
</html>
`;
}
