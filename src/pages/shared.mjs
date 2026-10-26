// Pieces shared by every generated page: site constants, <head> boilerplate, header, footer.
export const SITE = 'https://sergej.kukshausen.me/';
export const CALENDLY = 'https://calendly.com/sagei-lol/20-minute-meeting';
export const MALT = 'https://www.malt.com/profile/sergejkukshausen';
export const UPWORK = 'https://www.upwork.com/freelancers/~01a10ce5666c6d650f';
export const LANGS = ['en', 'de', 'ru', 'hu'];
/** Date the content was last updated, shown on the pages and returned by the API. */
export const UPDATED = '2026-10-23';
export const LANG_NAMES = { en: 'English', de: 'Deutsch', ru: 'Русский', hu: 'Magyar' };

/** Folder of a language relative to the site root: '' for English, 'de/' etc. */
export const langDir = (lang) => (lang === 'en' ? '' : `${lang}/`);
/** Relative prefix from a page in `lang` back to the site root. */
export const toRoot = (lang) => (lang === 'en' ? '' : '../');

/** Replace {key}…{/key} pairs and bare {key} tokens with markup. */
export function fill(text, tokens) {
  let out = text;
  for (const [key, [open, close]] of Object.entries(tokens)) {
    out = out.replaceAll(`{${key}}`, open).replaceAll(`{/${key}}`, close ?? '');
  }
  return out;
}

export function headCommon({ t, page, title, description, robots }) {
  const self = `${SITE}${langDir(t.lang)}${page}`;
  const alternates = LANGS.map(
    (l) => `    <link rel="alternate" hreflang="${l}" href="${SITE}${langDir(l)}${page}" />`,
  ).join('\n');
  return `    <meta charset="utf-8" />
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#073E29" />
    <meta name="description" content="${description}" />
    <meta name="robots" content="${robots}" />
    <meta name="author" content="Sergej Kukshausen" />
    <link rel="canonical" href="${self}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${SITE}${page}" />
    <link rel="alternate" type="text/markdown" href="${SITE}${langDir(t.lang)}${page ? page.replace(/\.html$/, '.md') : 'index.md'}" />`;
}

export function langSwitcher(t, page) {
  const back = toRoot(t.lang);
  const links = LANGS.map((l) => {
    const href = `${back}${langDir(l)}${page}` || './';
    const current = l === t.lang ? ' aria-current="page"' : '';
    return `<a href="${href}" hreflang="${l}" lang="${l}" title="${LANG_NAMES[l]}"${current}>${l.toUpperCase()}</a>`;
  }).join('');
  return `<nav class="lang-switch" aria-label="${t.nav.language}">${links}</nav>`;
}

export function header(t, { page, anchors }) {
  // On the homepage the nav uses in-page anchors; on legal pages it links back to the homepage sections.
  const base = anchors ? '' : './';
  const item = (id, label) =>
    `          <li class="py-3 px-[0.3rem] sm:px-3 md:px-5 whitespace-nowrap"><a class="text-[0.8rem] min-[400px]:text-[0.9rem] sm:text-lg" href="${base}#${id}">${label}</a></li>`;
  return `    <header
      class="sm:min-h-[140px] min-h-[117px] flex flex-wrap justify-between items-center flex-col md:flex-row px-3 bg-white w-full sticky top-0 z-[1] relative"
    >
      <a href="./" class="flex-none mx-10" aria-label="${t.nav.home}">
        <svg viewBox="0 0 100 72" class="h-12 w-auto sm:h-[4.5rem] mt-3 sm:mt-0" role="img" aria-label="Kukshausen logo">
          <circle cx="30" cy="40" r="27" fill="none" stroke="#073E29" stroke-width="6" />
          <text x="30" y="59" text-anchor="middle" font-family="Lexend Deca, system-ui, sans-serif" font-weight="700" font-size="54" fill="#073E29">S</text>
          <path d="M68 8v56" stroke="#073E29" stroke-width="7" stroke-linecap="round" />
          <path d="M70 42 L92 22" stroke="#073E29" stroke-width="7" stroke-linecap="round" />
          <path d="M72 40 L94 64" stroke="#073E29" stroke-width="7" stroke-linecap="round" />
        </svg>
      </a>
      <nav class="flex-1 absolute inset-x-1/2 top-[50%] md:top-[unset]" aria-label="${t.nav.label}">
        <ul class="flex justify-center">
${item('services', t.nav.services)}
${item('projects', t.nav.work)}
${item('about', t.nav.about)}
${item('faq', t.nav.faq)}
${item('contact', t.nav.contact)}
        </ul>
      </nav>
      ${langSwitcher(t, page)}
      ${anchors ? '<div class="progress" aria-hidden="true"></div>' : ''}
    </header>`;
}

export function footer(t) {
  return `    <footer class="site-footer" role="contentinfo">
      <div>&copy; 2026 Sergej Kukshausen · ${t.footer.updated} <time datetime="${UPDATED}">${t.dateLong}</time></div>
      <div class="links">
        <a href="imprint.html">${t.footer.imprint}</a>
        <a href="privacy.html">${t.footer.privacy}</a>
      </div>
    </footer>`;
}
