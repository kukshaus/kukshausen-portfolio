// API docs page: language switch, live "Send request" and "Copy curl". No dependencies.
import './style.css';

const server = document.body.dataset.server ?? '';
const langSelect = document.querySelector<HTMLSelectElement>('[data-lang]');

const lang = (): string => langSelect?.value ?? 'en';
const resolvePath = (template: string): string => template.replace('{lang}', lang());

/** Point every route, curl line and response label at the chosen language. */
function applyLanguage(): void {
  document.querySelectorAll<HTMLElement>('[data-path]').forEach((el) => {
    el.textContent = server + resolvePath(el.dataset.path ?? '');
  });
  document.querySelectorAll<HTMLElement>('[data-curl]').forEach((el) => {
    el.textContent = `curl ${server}${resolvePath(el.dataset.curl ?? '')}`;
  });
  document.querySelectorAll<HTMLElement>('[data-lang-label]').forEach((el) => {
    if (el.textContent === `(${lang()})`) return;
    el.textContent = `(${lang()})`;
    // The response shown is in the previous language: clear it rather than mislabel it.
    const section = el.closest('section');
    const out = section?.querySelector<HTMLElement>('[data-response]');
    const details = section?.querySelector<HTMLDetailsElement>('details');
    if (out) out.textContent = 'Press "Send request" to load it.';
    if (details) details.open = false;
  });
}

const kb = (bytes: number): string => (bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`);

async function send(button: HTMLButtonElement): Promise<void> {
  const section = button.closest('section');
  const status = section?.querySelector<HTMLElement>('[data-status]');
  const details = section?.querySelector<HTMLDetailsElement>('details');
  const out = section?.querySelector<HTMLElement>('[data-response]');
  if (!section || !status || !details || !out) return;

  button.disabled = true;
  status.textContent = 'Sending…';
  const started = performance.now();
  try {
    // Relative to /api/, so the page works under any base path.
    const response = await fetch(`v1${resolvePath(button.dataset.send ?? '')}`, { cache: 'no-cache' });
    const body = await response.text();
    const ms = Math.round(performance.now() - started);
    let pretty = body;
    try {
      pretty = JSON.stringify(JSON.parse(body), null, 2);
    } catch {
      // Not JSON (an error page): show it as it came.
    }
    out.textContent = pretty;
    details.open = true;
    status.textContent = `${response.status} ${response.statusText || (response.ok ? 'OK' : '')} · ${ms} ms · ${kb(new Blob([body]).size)}`.trim();
    status.dataset.ok = String(response.ok);
  } catch (error) {
    status.textContent = `Request failed: ${error instanceof Error ? error.message : String(error)}`;
    status.dataset.ok = 'false';
  } finally {
    button.disabled = false;
  }
}

async function copyCurl(button: HTMLButtonElement): Promise<void> {
  const text = `curl ${server}${resolvePath(button.dataset.copy ?? '')}`;
  const label = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = 'Copied';
  } catch {
    button.textContent = 'Copy failed';
  }
  setTimeout(() => (button.textContent = label), 1500);
}

// Nothing is stored: the privacy policy promises no cookies and no local storage.
applyLanguage();
langSelect?.addEventListener('change', applyLanguage);

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const sendButton = target.closest<HTMLButtonElement>('[data-send]');
  if (sendButton) void send(sendButton);
  const copyButton = target.closest<HTMLButtonElement>('[data-copy]');
  if (copyButton) void copyCurl(copyButton);
});
