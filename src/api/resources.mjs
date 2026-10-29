// JSON resources of the public content API, built from the same src/i18n/*.mjs texts as the pages.
// Ids, years and URLs are language-independent; every text field is in the requested language.
import { SITE, CALENDLY, MALT, UPWORK, UPDATED, langDir, fill } from '../pages/shared.mjs';
import { SKILLS, AISKILLS } from '../pages/home.mjs';

export const API_VERSION = '1.0.0';
export const API_BASE = 'api/v1/';

export const EMAIL = 'sergej@kukshausen.me';
export const PHONE = '+36707871989';
export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/sergej-kukshausen-099015163/',
  xing: 'https://www.xing.com/profile/Sergej_Kukshausen',
  github: 'https://github.com/kukshaus',
  malt: MALT,
  upwork: UPWORK,
  calendly: CALENDLY,
};

// One entry per item of the i18n lists, in the same order.
const SERVICE_IDS = ['ai-skills-agents-mcp', 'fractional-engineering-management', 'legacy-to-aws-migration', 'mtext-output-management'];
const PROJECTS = [
  { id: 'printing-group-ai-automation', organization: 'Online printing group, SE Asia', from: 2026, to: null },
  { id: 'mtext-upgrade-github-copilot', organization: 'Enterprise M/Text platform', from: 2026, to: 2026 },
  { id: 'fiserv-payment-routing', organization: 'Fiserv', from: 2020, to: null },
  { id: 'fiserv-team-leadership', organization: 'Fiserv', from: 2020, to: null },
  { id: 'fiserv-ai-skills', organization: 'Fiserv', from: 2020, to: null },
  { id: 'capgemini-digital-transformation', organization: 'Capgemini', from: 2018, to: 2020 },
  { id: 'itexia-automation', organization: 'ITEXIA', from: 2016, to: 2018 },
  { id: 'tte-europe-java-web-apps', organization: 'TTE-Europe', from: 2014, to: 2015 },
];
const STEP_IDS = ['intro-call', 'assessment', 'engagement'];
const FAQ_IDS = ['mainframe-to-aws', 'german-speaking-fractional-em', 'mtext-consultant', 'ai-coding-tools-rollout', 'claude-skills-for-jira', 'engagement-start', 'what-is-fractional-em', 'claude-copilot-codex-in-practice'];
const FOCUS_IDS = ['leadership', 'ai-assisted-delivery', 'programming', 'cloud-architecture', 'quality-compliance', 'certifications'];
const TOPIC_IDS = [...SERVICE_IDS, 'full-time-role', 'other'];
const LEVELS = { de: 'native', ru: 'native', en: 'fluent', hu: 'basic' };

const ENTITIES = { '&amp;': '&', '&nbsp;': ' ', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" };
/** Inline HTML from the i18n files as plain text. */
export const plain = (html) =>
  html.replace(/<[^>]+>/g, '').replace(/&(amp|nbsp|lt|gt|quot|#39);/g, (m) => ENTITIES[m]).replace(/\s+/g, ' ').trim();
/** Link tokens become "text (url)", as in the page's structured data. */
const linked = (text, urls) =>
  plain(fill(text, Object.fromEntries(Object.entries(urls).map(([k, u]) => [k, ['', ` (${u})`]]))));

const pageUrl = (lang, page = '') => `${SITE}${langDir(lang)}${page}`;
const envelope = (t, data) => ({ lang: t.lang, updated: UPDATED, data });

/** Fails the build when a translation's lists drift from the ids above. */
function assertShape(t) {
  const checks = [
    ['services.items', t.services.items, SERVICE_IDS],
    ['work.items', t.work.items, PROJECTS],
    ['process.steps', t.process.steps, STEP_IDS],
    ['faq.items', t.faq.items, FAQ_IDS],
    ['about.focus', t.about.focus, FOCUS_IDS],
    ['contact.topics', t.contact.topics, TOPIC_IDS],
  ];
  for (const [path, list, ids] of checks) {
    if (list.length !== ids.length) throw new Error(`api: ${t.lang}.${path} has ${list.length} items, expected ${ids.length}`);
  }
  for (const [id] of SKILLS) if (!t.toolkit.tips[id]) throw new Error(`api: ${t.lang}.toolkit.tips.${id} is missing`);
}

export const profile = (t) =>
  envelope(t, {
    name: 'Sergej Kukshausen',
    headline: plain(t.hero.h1),
    jobTitle: plain(t.schema.jobTitle),
    summary: plain(t.schema.description),
    intro: plain(t.hero.sub),
    highlight: plain(t.hero.proof),
    availability: plain(t.hero.available),
    location: { city: 'Budapest', country: 'HU', remote: true },
    employer: { name: 'Fiserv', url: 'https://www.fiserv.com/' },
    about: t.about.paragraphs.map(plain),
    focusAreas: t.about.focus.map(([area, details], i) => ({ id: FOCUS_IDS[i], area: plain(area), details: plain(details) })),
    education: [{ degree: 'BSc Computer Science', institution: 'TU Bergakademie Freiberg' }],
    certifications: ['Professional Scrum Master I (PSM I)', 'Certified SAFe 4 Agilist'],
    languages: ['de', 'ru', 'en', 'hu'].map((code) => ({ code, name: t.about.languages[code], level: LEVELS[code] })),
    contact: { email: EMAIL, phone: PHONE, booking: CALENDLY },
    links: LINKS,
    cv: `${SITE}Sergej_Kukshausen_CV.pdf`,
    portrait: `${SITE}assets/images/sergej-portrait.jpg`,
    url: pageUrl(t.lang),
  });

export const services = (t) =>
  envelope(t, {
    intro: plain(t.services.intro),
    items: t.services.items.map((s, i) => ({
      id: SERVICE_IDS[i],
      title: plain(s.title),
      description: plain(s.desc),
      proof: plain(s.proof),
      url: `${pageUrl(t.lang)}#services`,
    })),
  });

export const projects = (t) =>
  envelope(t, {
    items: t.work.items.map((w, i) => ({
      ...PROJECTS[i],
      label: plain(w.tag),
      title: plain(w.title),
      description: plain(w.text),
      stack: w.stack.split(' · ').map(plain),
    })),
  });

export const process = (t) =>
  envelope(t, {
    steps: t.process.steps.map((s, i) => ({ id: STEP_IDS[i], duration: plain(s.when), title: plain(s.title), description: plain(s.text) })),
    contracting: plain(fill(t.process.contracting, { malt: ['Malt'], upwork: ['Upwork'] })),
    channels: { direct: EMAIL, malt: MALT, upwork: UPWORK },
  });

export const faq = (t) =>
  envelope(t, {
    items: t.faq.items.map((f, i) => ({
      id: FAQ_IDS[i],
      question: plain(f.q),
      answer: linked(f.a, { calendly: CALENDLY, aiskills: AISKILLS }),
    })),
  });

export const skills = (t) =>
  envelope(t, {
    intro: plain(t.toolkit.intro),
    items: SKILLS.map(([id, name]) => ({ id, name, description: plain(t.toolkit.tips[id]) })),
  });

export const contact = (t) =>
  envelope(t, {
    email: EMAIL,
    phone: PHONE,
    booking: CALENDLY,
    reply: plain(t.contact.reply),
    topics: t.contact.topics.map((label, i) => ({ id: TOPIC_IDS[i], label: plain(label) })),
    links: LINKS,
    url: `${pageUrl(t.lang)}#contact`,
  });

export const legal = (t) =>
  envelope(t, {
    lastUpdated: plain(t.legal.lastUpdated),
    translationNote: t.legal.translationNote ? plain(t.legal.translationNote) : null,
    imprint: { title: plain(t.imprint.title), url: pageUrl(t.lang, 'imprint.html'), html: t.imprint.body.trim() },
    privacy: { title: plain(t.privacy.title), url: pageUrl(t.lang, 'privacy.html'), html: t.privacy.body.trim() },
  });

/** Per-language resources, keyed by the file name under api/v1/{lang}/. */
export const RESOURCES = { profile, services, projects, process, faq, skills, contact, legal };

export function buildLanguage(t) {
  assertShape(t);
  const out = Object.fromEntries(Object.entries(RESOURCES).map(([name, build]) => [name, build(t)]));
  const all = envelope(t, Object.fromEntries(Object.entries(out).map(([name, r]) => [name, r.data])));
  return { ...out, all };
}
