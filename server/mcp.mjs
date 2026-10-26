// Remote MCP server for sergej.kukshausen.me: the site content as read-only tools and resources.
// Stateless Streamable HTTP with JSON responses, so every POST /mcp is answered on its own.
// nginx proxies /mcp here; the server card and AI catalog are static files served by nginx.
import { createServer as createHttpServer } from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { LANGS, RESOURCES, loadContent, resource, searchFaq } from './content.mjs';
import { BookingError, createBooking, isTimeZone } from './booking.mjs';

export const SERVER_INFO = { name: 'sergej-kukshausen', title: 'Sergej Kukshausen', version: '1.0.0' };
const SITE = 'https://sergej.kukshausen.me/';
const MAX_BODY = 64 * 1024;

const INSTRUCTIONS = `Public content of sergej.kukshausen.me: Sergej Kukshausen, Engineering Manager at Fiserv in Budapest, open to fractional engineering leadership, mainframe-to-AWS migrations and AI skills for dev teams.
Every content tool takes lang (en, de, ru, hu; default en). Ids, years and URLs are the same in every language.
For the full CV (every job with highlights and stack, education, certifications), use get_cv; it is in English.
To get in touch, use get_contact: it returns the email, phone and the link to book a 20-minute call.`;
const BOOKING_INSTRUCTIONS = `
To book the 20-minute intro call: find_free_slots, then book_intro_call without confirm to check the slot, show the person the details, and only after they agree call it again with confirm: true.`;

const lang = z.enum(LANGS).default('en').describe('Language of the text fields: en, de, ru or hu');
const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

const TOOLS = [
  ['get_profile', 'profile', 'Profile', 'Who Sergej Kukshausen is: headline, summary, about text, focus areas, education, certifications, languages, contact and profile links.'],
  ['list_services', 'services', 'Services', 'The four services offered to fintech and banking teams, each with what it includes and where it was done before.'],
  ['list_projects', 'projects', 'Projects', 'Selected work with organization, years, outcome and technology stack, newest first.'],
  ['get_engagement_process', 'process', 'Engagement process', 'How an engagement runs, from the 20-minute intro call to a 3 to 6 month engagement, and how contracting works.'],
  ['list_skills', 'skills', 'Toolkit', 'Technologies in the toolkit and how each one is used.'],
  ['get_contact', 'contact', 'Contact', 'Email, phone, the link to book a 20-minute call, reply time, enquiry topics and profile links.'],
];

const SEARCH_FAQ = {
  name: 'search_faq',
  title: 'Search the FAQ',
  description: 'Questions clients ask, with answers. Pass a query to rank the entries that contain its words; leave it out to get all of them.',
};
const GET_CV = {
  name: 'get_cv',
  title: 'CV',
  description: 'The full CV: summary, expertise, every job with highlights and tech stack, education, certifications, languages and interests. English only. format "markdown" returns it as one Markdown document instead of JSON.',
};
const FIND_SLOTS = {
  name: 'find_free_slots',
  title: 'Find free slots',
  description: 'Free start times for the 20-minute intro call with Sergej, from Calendly. Pass a date for one day, or days for the coming days (default 7).',
};
const BOOK_CALL = {
  name: 'book_intro_call',
  title: 'Book the intro call',
  description:
    'Books the 20-minute intro call (Google Meet) at a start time from find_free_slots. Without confirm it only checks the slot and returns the details; show them to the person and call again with confirm: true only after they explicitly agree. Calendly then emails the invitation.',
};
/** Every tool, for the docs page. */
export const TOOL_SUMMARIES = [...TOOLS.map(([name, , title, description]) => ({ name, title, description })), SEARCH_FAQ, GET_CV, FIND_SLOTS, BOOK_CALL];

const result = (body) => ({ content: [{ type: 'text', text: JSON.stringify(body) }], structuredContent: body });
const failure = (message) => ({ content: [{ type: 'text', text: message }], isError: true });
const timeZone = z
  .string()
  .max(64)
  .refine(isTimeZone, 'Not an IANA time zone')
  .default('Europe/Budapest')
  .describe('IANA time zone of the person, e.g. Europe/Berlin; times are shown in it');

/** Runs a booking call; Calendly and limit errors become tool errors the agent can act on. */
async function bookingResult(run) {
  try {
    return result(await run());
  } catch (error) {
    if (error instanceof BookingError) return failure(error.message);
    console.error('booking:', error);
    return failure('Booking is not available right now');
  }
}

function registerBooking(server, booking, ip) {
  server.registerTool(
    FIND_SLOTS.name,
    {
      title: FIND_SLOTS.title,
      description: FIND_SLOTS.description,
      inputSchema: {
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD').optional().describe('One day, YYYY-MM-DD, in the given time zone'),
        days: z.number().int().min(1).max(14).default(7).describe('Number of days from now, when no date is given'),
        timeZone,
      },
      annotations: { title: FIND_SLOTS.title, readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    (args) => bookingResult(() => booking.findSlots(args)),
  );
  server.registerTool(
    BOOK_CALL.name,
    {
      title: BOOK_CALL.title,
      description: BOOK_CALL.description,
      inputSchema: {
        start: z.iso.datetime({ offset: true }).describe('Start time exactly as returned by find_free_slots'),
        name: z.string().trim().min(2).max(100).describe('Full name of the person booking'),
        email: z.email().max(200).describe('Email the invitation goes to'),
        timeZone,
        notes: z.string().trim().max(1000).optional().describe('What the person wants to talk about'),
        confirm: z.boolean().default(false).describe('true only after the person agreed to the details from the unconfirmed call'),
      },
      annotations: { title: BOOK_CALL.title, readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    },
    (args) => bookingResult(() => booking.book({ ...args, ip })),
  );
}

/** A fresh McpServer for one request; registering the handful of tools costs microseconds. */
export function buildServer(content, { booking, ip } = {}) {
  const server = new McpServer(SERVER_INFO, { instructions: booking ? INSTRUCTIONS + BOOKING_INSTRUCTIONS : INSTRUCTIONS });

  for (const [name, res, title, description] of TOOLS) {
    server.registerTool(name, { title, description, inputSchema: { lang }, annotations: { title, ...READ_ONLY } }, ({ lang: l }) =>
      result(resource(content, l, res)),
    );
  }

  server.registerTool(
    SEARCH_FAQ.name,
    {
      title: SEARCH_FAQ.title,
      description: SEARCH_FAQ.description,
      inputSchema: { query: z.string().max(200).optional().describe('Words to look for, e.g. "mainframe AWS" or "Jira"'), lang },
      annotations: { title: SEARCH_FAQ.title, ...READ_ONLY },
    },
    ({ query, lang: l }) => {
      const items = searchFaq(content, l, query);
      return result({ lang: l, updated: content[l].updated, data: { query: query ?? '', count: items.length, items } });
    },
  );

  server.registerTool(
    GET_CV.name,
    {
      title: GET_CV.title,
      description: GET_CV.description,
      inputSchema: { format: z.enum(['json', 'markdown']).default('json').describe('json (structured) or markdown (one document)') },
      annotations: { title: GET_CV.title, ...READ_ONLY },
    },
    ({ format }) =>
      format === 'markdown'
        ? { content: [{ type: 'text', text: content.cvMarkdown }] }
        : result(content.cv),
  );

  server.registerResource('cv', `${SITE}api/v1/cv.json`, { title: 'CV', description: 'The full CV as JSON, in English.', mimeType: 'application/json' }, (uri) => ({
    contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify(content.cv) }],
  }));
  server.registerResource('cv-markdown', `${SITE}api/v1/cv.md`, { title: 'CV (Markdown)', description: 'The full CV as Markdown, in English.', mimeType: 'text/markdown' }, (uri) => ({
    contents: [{ uri: uri.href, mimeType: 'text/markdown', text: content.cvMarkdown }],
  }));

  server.registerResource(
    'content',
    new ResourceTemplate(`${SITE}api/v1/{lang}/{resource}.json`, {
      list: () => ({
        resources: LANGS.flatMap((l) =>
          RESOURCES.map((r) => ({ uri: `${SITE}api/v1/${l}/${r}.json`, name: `${r}-${l}`, title: `${r[0].toUpperCase()}${r.slice(1)} (${l})`, mimeType: 'application/json' })),
        ),
      }),
      complete: {
        lang: (value) => LANGS.filter((l) => l.startsWith(value)),
        resource: (value) => RESOURCES.filter((r) => r.startsWith(value)),
      },
    }),
    { title: 'Site content', description: 'Every section of the site as JSON, per language.', mimeType: 'application/json' },
    (uri, { lang: l, resource: r }) => {
      if (!LANGS.includes(l) || !RESOURCES.includes(r)) throw new Error(`Unknown resource ${uri.href}`);
      return { contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify(resource(content, l, r)) }] };
    },
  );

  if (booking) registerBooking(server, booking, ip);
  return server;
}

function sendJson(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json', ...headers });
  res.end(JSON.stringify(body));
}
const rpcError = (code, message) => ({ jsonrpc: '2.0', error: { code, message }, id: null });

/** Reads at most MAX_BODY bytes; null when the body is larger. */
async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY) return null;
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

/** The client IP nginx passes in X-Real-IP; only trusted from a loopback peer. */
function clientIp(req) {
  const peer = req.socket.remoteAddress ?? '';
  const loopback = peer === '127.0.0.1' || peer === '::1' || peer === '::ffff:127.0.0.1';
  const header = req.headers['x-real-ip'];
  return loopback && typeof header === 'string' && header ? header : peer;
}

export function startServer({ port, host, contentDir, calendlyToken }) {
  const content = loadContent(contentDir);
  const booking = calendlyToken ? createBooking({ token: calendlyToken }) : undefined;
  console.log(`mcp: booking tools ${booking ? 'on' : 'off (no CALENDLY_TOKEN)'}`);
  const http = createHttpServer(async (req, res) => {
    const { pathname } = new URL(req.url ?? '/', 'http://localhost');
    if (pathname === '/health') return sendJson(res, 200, { ok: true });
    if (pathname !== '/mcp') return sendJson(res, 404, rpcError(-32601, 'Not found: the MCP endpoint is /mcp'));
    // Stateless JSON mode: no server-initiated stream (GET) and no session to end (DELETE).
    if (req.method !== 'POST') return sendJson(res, 405, rpcError(-32000, 'Method not allowed: send JSON-RPC with POST'), { Allow: 'POST' });

    const raw = await readBody(req);
    if (raw === null) return sendJson(res, 413, rpcError(-32600, `Request body over ${MAX_BODY} bytes`));
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return sendJson(res, 400, rpcError(-32700, 'Parse error: the body is not JSON'));
    }

    const server = buildServer(content, { booking, ip: clientIp(req) });
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
    res.on('close', () => {
      void transport.close();
      void server.close();
    });
    try {
      await server.connect(transport);
      await transport.handleRequest(req, res, body);
    } catch (error) {
      console.error('mcp:', error);
      if (!res.headersSent) sendJson(res, 500, rpcError(-32603, 'Internal error'));
    }
  });
  http.listen(port, host, () => console.log(`mcp: listening on http://${host}:${port}/mcp`));
  return http;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain || process.env.MCP_START === '1') {
  startServer({
    port: Number(process.env.MCP_PORT ?? 3100),
    host: process.env.MCP_HOST ?? '127.0.0.1',
    contentDir: process.env.MCP_CONTENT_DIR ?? fileURLToPath(new URL('../dist/api/v1/', import.meta.url)),
    calendlyToken: process.env.CALENDLY_TOKEN?.trim(),
  });
}
