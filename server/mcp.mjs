// Remote MCP server for sergej.kukshausen.me: the site content as read-only tools and resources.
// Stateless Streamable HTTP with JSON responses, so every POST /mcp is answered on its own.
// nginx proxies /mcp here; the server card and AI catalog are static files served by nginx.
import { createServer as createHttpServer } from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { LANGS, RESOURCES, loadContent, resource, searchFaq } from './content.mjs';

export const SERVER_INFO = { name: 'sergej-kukshausen', title: 'Sergej Kukshausen', version: '1.0.0' };
const SITE = 'https://sergej.kukshausen.me/';
const MAX_BODY = 64 * 1024;

const INSTRUCTIONS = `Public, read-only content of sergej.kukshausen.me: Sergej Kukshausen, Engineering Manager at Fiserv in Budapest, open to fractional engineering leadership, mainframe-to-AWS migrations and AI skills for dev teams.
Every tool takes lang (en, de, ru, hu; default en). Ids, years and URLs are the same in every language.
To get in touch, use get_contact: it returns the email, phone and the link to book a 20-minute call.`;

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
/** Every tool, for the docs page. */
export const TOOL_SUMMARIES = [...TOOLS.map(([name, , title, description]) => ({ name, title, description })), SEARCH_FAQ];

const result = (body) => ({ content: [{ type: 'text', text: JSON.stringify(body) }], structuredContent: body });

/** A fresh McpServer for one request; registering the handful of tools costs microseconds. */
export function buildServer(content) {
  const server = new McpServer(SERVER_INFO, { instructions: INSTRUCTIONS });

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

export function startServer({ port, host, contentDir }) {
  const content = loadContent(contentDir);
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

    const server = buildServer(content);
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
  });
}
