// OpenAPI 3.1 description of the content API. The docs page at /api/ is rendered from the same ENDPOINTS list.
import { SITE, LANGS, LANG_NAMES } from '../pages/shared.mjs';
import { API_VERSION, API_BASE } from './resources.mjs';

const str = (description, extra = {}) => ({ type: 'string', description, ...extra });
const url = (description) => str(description, { format: 'uri' });
const arr = (items, description) => ({ type: 'array', items, ...(description ? { description } : {}) });
const obj = (properties, description) => ({
  type: 'object',
  required: Object.keys(properties),
  additionalProperties: false,
  properties,
  ...(description ? { description } : {}),
});
const ref = (name) => ({ $ref: `#/components/schemas/${name}` });

const Links = obj({
  linkedin: url('LinkedIn profile'),
  xing: url('Xing profile'),
  github: url('GitHub profile'),
  malt: url('Malt freelancer profile'),
  upwork: url('Upwork freelancer profile'),
  calendly: url('Page to book a 20-minute intro call'),
});

const SCHEMAS = {
  Links,
  Profile: obj({
    name: str('Full name'),
    headline: str('Hero headline of the homepage'),
    jobTitle: str('Current job title'),
    summary: str('Two-sentence professional summary'),
    intro: str('Intro paragraph under the headline'),
    highlight: str('Most recent highlight'),
    availability: str('Availability for new engagements'),
    location: obj({ city: str('City'), country: str('ISO 3166-1 alpha-2 country code'), remote: { type: 'boolean', description: 'Works remotely' } }),
    employer: obj({ name: str('Employer'), url: url('Employer website') }),
    about: arr(str('Paragraph'), 'About-me paragraphs'),
    focusAreas: arr(obj({ id: str('Stable id'), area: str('Focus area'), details: str('What it covers') })),
    education: arr(obj({ degree: str('Degree'), institution: str('University') })),
    certifications: arr(str('Certification')),
    languages: arr(obj({
      code: str('ISO 639-1 language code'),
      name: str('Language name, in the requested language'),
      level: str('Proficiency', { enum: ['native', 'fluent', 'basic'] }),
    })),
    contact: obj({ email: str('Email address', { format: 'email' }), phone: str('Phone number in E.164 format'), booking: url('Page to book a call') }),
    links: ref('Links'),
    cv: url('CV as PDF'),
    portrait: url('Portrait photo (JPEG, 712x1040)'),
    url: url('Homepage in the requested language'),
  }),
  Services: obj({
    intro: str('Intro sentence of the services section'),
    items: arr(obj({ id: str('Stable id'), title: str('Service'), description: str('What it includes'), proof: str('Where it was done before'), url: url('Section on the homepage') })),
  }),
  Projects: obj({
    items: arr(obj({
      id: str('Stable id'),
      organization: str('Company the work was done at'),
      from: { type: 'integer', description: 'Start year' },
      to: { type: ['integer', 'null'], description: 'End year, null while ongoing' },
      label: str('Card label as shown on the page'),
      title: str('Project title'),
      description: str('What was done and the outcome'),
      stack: arr(str('Technology or practice')),
    })),
  }),
  Process: obj({
    steps: arr(obj({ id: str('Stable id'), duration: str('Typical duration'), title: str('Step'), description: str('What happens') })),
    contracting: str('How contracting works'),
    channels: obj({ direct: str('Email for direct contracts', { format: 'email' }), malt: url('Malt profile'), upwork: url('Upwork profile') }),
  }),
  Faq: obj({
    items: arr(obj({ id: str('Stable id'), question: str('Question'), answer: str('Answer in plain text; links are written as "text (url)"') })),
  }),
  Skills: obj({
    intro: str('Intro sentence of the toolkit section'),
    items: arr(obj({ id: str('Stable id, also the icon name under /assets/images/skills/'), name: str('Technology'), description: str('How it is used') })),
  }),
  Contact: obj({
    email: str('Email address', { format: 'email' }),
    phone: str('Phone number in E.164 format'),
    booking: url('Page to book a 20-minute call'),
    reply: str('Reply time and languages'),
    topics: arr(obj({ id: str('Stable id'), label: str('Topic as offered in the contact form') })),
    links: ref('Links'),
    url: url('Contact section on the homepage'),
  }),
  LegalDocument: obj({ title: str('Page title'), url: url('Page URL'), html: str('Body as HTML') }),
  Legal: obj({
    lastUpdated: str('Last-updated line'),
    translationNote: { type: ['string', 'null'], description: 'Note that the translation is not authoritative, null for authoritative languages' },
    imprint: ref('LegalDocument'),
    privacy: ref('LegalDocument'),
  }),
};
SCHEMAS.All = obj({
  profile: ref('Profile'), services: ref('Services'), projects: ref('Projects'), process: ref('Process'),
  faq: ref('Faq'), skills: ref('Skills'), contact: ref('Contact'), legal: ref('Legal'),
});
SCHEMAS.Index = obj({
  name: str('API name'),
  version: str('API version'),
  updated: str('Date the content was last updated', { format: 'date' }),
  languages: arr(str('Language code', { enum: LANGS })),
  defaultLanguage: str('Language of the site root', { enum: LANGS }),
  endpoints: arr(obj({ name: str('Resource name'), path: str('Path template under the server URL'), summary: str('What it returns') })),
  openapi: url('This API as an OpenAPI 3.1 document'),
  docs: url('Human-readable documentation'),
});

/** Every per-language endpoint: GET {server}/{lang}/{name}.json */
export const ENDPOINTS = [
  { name: 'profile', schema: 'Profile', summary: 'Profile', description: 'Who Sergej is: headline, summary, about text, focus areas, education, certifications, languages, contact and profile links.' },
  { name: 'services', schema: 'Services', summary: 'Services', description: 'The four services offered to fintech and banking teams.' },
  { name: 'projects', schema: 'Projects', summary: 'Projects', description: 'Selected work with organization, years, outcome and stack, newest first.' },
  { name: 'process', schema: 'Process', summary: 'Engagement process', description: 'How an engagement runs, from intro call to engagement, and the contracting channels.' },
  { name: 'faq', schema: 'Faq', summary: 'FAQ', description: 'Questions clients ask, with answers in plain text.' },
  { name: 'skills', schema: 'Skills', summary: 'Toolkit', description: 'Technologies in the toolkit and how each one is used.' },
  { name: 'contact', schema: 'Contact', summary: 'Contact', description: 'Email, phone, booking link, reply time, contact form topics and profile links.' },
  { name: 'legal', schema: 'Legal', summary: 'Imprint and privacy', description: 'Imprint and privacy policy, with the body as HTML.' },
  { name: 'all', schema: 'All', summary: 'Everything', description: 'All of the resources above in one response, keyed by resource name.' },
];

export const SERVER = `${SITE}${API_BASE.replace(/\/$/, '')}`;

const envelope = (schema) => ({
  type: 'object',
  required: ['lang', 'updated', 'data'],
  additionalProperties: false,
  properties: {
    lang: { $ref: '#/components/schemas/Lang' },
    updated: str('Date the content was last updated', { format: 'date' }),
    data: ref(schema),
  },
});

const ok = (schema, description) => ({
  description,
  headers: {
    ETag: { $ref: '#/components/headers/ETag' },
    'Cache-Control': { $ref: '#/components/headers/CacheControl' },
  },
  content: { 'application/json': { schema } },
});
const COMMON = {
  304: { description: 'Not modified: the ETag sent in If-None-Match still matches.' },
  404: { description: 'Unknown language or resource.' },
};

export function openapi() {
  const paths = {
    '/index.json': {
      get: {
        operationId: 'getIndex',
        summary: 'API index',
        description: 'Languages, endpoints and links to this document and the docs.',
        tags: ['Meta'],
        responses: { 200: ok(ref('Index'), 'The API index.'), ...COMMON },
      },
    },
    '/openapi.json': {
      get: {
        operationId: 'getOpenApi',
        summary: 'OpenAPI document',
        description: 'This API as an OpenAPI 3.1 document.',
        tags: ['Meta'],
        responses: { 200: ok({ type: 'object' }, 'This document.'), ...COMMON },
      },
    },
  };
  for (const e of ENDPOINTS) {
    paths[`/{lang}/${e.name}.json`] = {
      get: {
        operationId: `get${e.schema}`,
        summary: e.summary,
        description: e.description,
        tags: ['Content'],
        parameters: [{ $ref: '#/components/parameters/Lang' }],
        responses: { 200: ok(envelope(e.schema), `${e.summary} in the requested language.`), ...COMMON },
      },
    };
  }
  return {
    openapi: '3.1.1',
    info: {
      title: 'Sergej Kukshausen content API',
      version: API_VERSION,
      summary: 'The content of sergej.kukshausen.me as JSON, in four languages.',
      description:
        'Read-only, public and unauthenticated. Every response is a static file served with brotli or gzip, an ETag and CORS open to every origin. Text fields are plain text in the requested language; ids, years and URLs are the same in every language.',
      contact: { name: 'Sergej Kukshausen', email: 'sergej@kukshausen.me', url: SITE },
    },
    servers: [{ url: SERVER }],
    // Public: no authentication on any operation.
    security: [],
    tags: [
      { name: 'Content', description: 'The site content, one resource per section.' },
      { name: 'Meta', description: 'Discovery.' },
    ],
    paths,
    components: {
      parameters: {
        Lang: {
          name: 'lang',
          in: 'path',
          required: true,
          description: LANGS.map((l) => `\`${l}\` ${LANG_NAMES[l]}`).join(', '),
          schema: { $ref: '#/components/schemas/Lang' },
        },
      },
      headers: {
        ETag: { description: 'Version of the response; send it back in If-None-Match to get a 304.', schema: { type: 'string' } },
        CacheControl: { description: 'Cached for 5 minutes, then served stale for up to a day while revalidating.', schema: { type: 'string' } },
      },
      schemas: { Lang: { type: 'string', enum: LANGS, description: 'Language code' }, ...SCHEMAS },
    },
  };
}
