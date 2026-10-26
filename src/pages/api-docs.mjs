// Documentation page of the content API at /api/. Not linked from the site, not in the sitemap, noindex.
// Rendered from the OpenAPI document; src/api-docs.ts adds the language switch and the "Send request" buttons.
import { LANGS, LANG_NAMES } from './shared.mjs';
import { ENDPOINTS, SERVER, openapi } from '../api/openapi.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Flattens a schema into rows of [path, type, description], resolving $refs. */
function fields(schema, components, path = '', rows = []) {
  const s = schema.$ref ? components[schema.$ref.split('/').pop()] : schema;
  if (s.type === 'object' && s.properties) {
    for (const [key, child] of Object.entries(s.properties)) {
      const p = path ? `${path}.${key}` : key;
      const c = child.$ref ? components[child.$ref.split('/').pop()] : child;
      rows.push([p, typeOf(c), c.description ?? '']);
      if (c.type === 'object' || c.type === 'array') fields(c, components, p, rows);
    }
  } else if (s.type === 'array') {
    const items = s.items.$ref ? components[s.items.$ref.split('/').pop()] : s.items;
    if (items.type === 'object') fields(items, components, `${path}[]`, rows);
  }
  return rows;
}

function typeOf(s) {
  if (s.enum) return s.enum.map((v) => JSON.stringify(v)).join(' | ');
  const t = Array.isArray(s.type) ? s.type.join(' | ') : s.type;
  if (t === 'array') return `${s.items.type === 'object' || s.items.$ref ? 'object' : s.items.type}[]`;
  return s.format ? `${t} (${s.format})` : t;
}

function endpoint({ id, path, summary, description, schema, example, perLang }, components) {
  const rows = fields(schema, components);
  const call = path.replace('{lang}', 'en');
  return `      <section id="${id}" class="api-endpoint">
        <h2>${esc(summary)}</h2>
        <p class="api-route"><span class="api-method">GET</span> <code data-path="${esc(path)}">${esc(SERVER + call)}</code></p>
        <p>${esc(description)}</p>
        <div class="api-actions">
          <button type="button" class="cta text-white bg-[#073E29] px-4 py-2 font-bold" data-send="${esc(path)}">Send request</button>
          <button type="button" class="cta-secondary px-4 py-2 font-bold" data-copy="${esc(path)}">Copy curl</button>
          <span class="api-status" data-status aria-live="polite"></span>
        </div>
        <pre class="api-curl"><code data-curl="${esc(path)}">curl ${esc(SERVER + call)}</code></pre>
        <details class="api-response"${example ? '' : ' data-empty'}>
          <summary>Response${perLang ? ' <span data-lang-label>(en)</span>' : ''}</summary>
          <pre><code data-response>${example ? esc(JSON.stringify(example, null, 2)) : 'Press "Send request" to load it.'}</code></pre>
        </details>
${rows.length ? `        <table class="api-fields">
          <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
${rows.map(([p, t, d]) => `            <tr><td><code>${esc(p)}</code></td><td>${esc(t)}</td><td>${esc(d)}</td></tr>`).join('\n')}
          </tbody>
        </table>` : ''}
      </section>`;
}

/** `files` is the output of renderApi(), used for the pre-rendered English examples. */
export function renderApiDocs(files) {
  const spec = openapi();
  const components = spec.components.schemas;
  const read = (path) => JSON.parse(files[`api/v1${path}`]);
  const list = [
    ...ENDPOINTS.map((e) => {
      const path = `/{lang}/${e.name}.json`;
      const op = spec.paths[path].get;
      return {
        id: e.name, path, summary: e.summary, description: e.description, perLang: true,
        schema: op.responses[200].content['application/json'].schema,
        // The combined and the legal response are long; they load on demand.
        example: ['all', 'legal'].includes(e.name) ? null : read(path.replace('{lang}', 'en')),
      };
    }),
    { id: 'index', path: '/index.json', summary: 'API index', description: spec.paths['/index.json'].get.description, schema: { $ref: '#/components/schemas/Index' }, example: read('/index.json') },
    { id: 'openapi', path: '/openapi.json', summary: 'OpenAPI document', description: 'This API as an OpenAPI 3.1 document, for code generators, Postman, Insomnia or an AI agent.', schema: { type: 'object' }, example: null },
  ];

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>API | Sergej Kukshausen</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="description" content="Content API of sergej.kukshausen.me: profile, services, projects, FAQ and more as JSON in four languages." />
    <meta name="theme-color" content="#073E29" />
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/lexend-deca-latin.woff2" crossorigin />
    <script type="module" src="/src/api-docs.ts"></script>
  </head>
  <body data-server="${SERVER}">
    <header class="api-header">
      <a href="../" class="font-semibold text-[#073E29]">sergej.kukshausen.me</a>
      <label class="api-lang">Language
        <select data-lang class="field bg-[#E0F1F1] pl-3 pr-10 py-2 outline-none">
${LANGS.map((l) => `          <option value="${l}">${l} · ${LANG_NAMES[l]}</option>`).join('\n')}
        </select>
      </label>
    </header>

    <div class="api-layout">
      <nav class="api-nav" aria-label="Endpoints">
        <a href="#overview">Overview</a>
${list.map((e) => `        <a href="#${e.id}">${esc(e.summary)}</a>`).join('\n')}
      </nav>

      <main class="api-main">
      <section id="overview" class="api-endpoint">
        <h1>Content API</h1>
        <p>${esc(spec.info.description)}</p>
        <dl class="api-facts">
          <dt>Base URL</dt><dd><code>${SERVER}</code></dd>
          <dt>Languages</dt><dd>${LANGS.map((l) => `<code>${l}</code> ${LANG_NAMES[l]}`).join(', ')}</dd>
          <dt>Version</dt><dd>${esc(spec.info.version)}</dd>
          <dt>Auth</dt><dd>None</dd>
          <dt>Spec</dt><dd><a href="v1/openapi.json">OpenAPI 3.1 (openapi.json)</a></dd>
        </dl>
        <p>Every content endpoint returns the same envelope: <code>lang</code>, <code>updated</code> and the resource in <code>data</code>. Ids, years and URLs are the same in every language, so you can join languages on <code>id</code>. Responses carry an <code>ETag</code>: send it back in <code>If-None-Match</code> and an unchanged resource answers <code>304</code> with no body.</p>
        <pre class="api-curl"><code>curl --compressed ${SERVER}/en/profile.json
curl ${SERVER}/de/faq.json | jq '.data.items[].question'</code></pre>
      </section>

${list.map((e) => endpoint(e, components)).join('\n\n')}
      </main>
    </div>
  </body>
</html>
`;
}
