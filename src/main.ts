import './style.css';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Wrap every word of the hero headline so each can slide in on its own. */
function splitHeadlineWords(): void {
  const headline = document.querySelector<HTMLElement>('[data-split]');
  if (!headline) return;
  let index = 0;
  for (const node of Array.from(headline.childNodes)) {
    if (node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) continue;
    const fragment = document.createDocumentFragment();
    for (const token of node.textContent.split(/(\s+)/)) {
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        fragment.append(document.createTextNode(' '));
        continue;
      }
      const mask = document.createElement('span');
      mask.className = 'word-mask';
      const word = document.createElement('span');
      word.className = 'word';
      word.style.setProperty('--d', `${150 + index * 60}ms`);
      word.textContent = token;
      mask.append(word);
      fragment.append(mask);
      index += 1;
    }
    node.replaceWith(fragment);
  }
}

/** Reveal anything marked data-reveal once it scrolls into view. */
function observeReveals(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );
  targets.forEach((el) => observer.observe(el));
}

/**
 * Contact form. Posts JSON to Web3Forms when VITE_CONTACT_ACCESS_KEY is set
 * (or to VITE_CONTACT_ENDPOINT), otherwise opens the visitor's mail client
 * with the message prefilled.
 */
function wireContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('#contact-form');
  if (!form) return;
  const status = form.querySelector<HTMLElement>('[data-status]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const accessKey = import.meta.env.VITE_CONTACT_ACCESS_KEY as string | undefined;
  // A Web3Forms access key implies its endpoint; any other endpoint can still be set explicitly.
  const endpoint =
    (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ||
    (accessKey ? 'https://api.web3forms.com/submit' : undefined);
  const recipient = form.dataset.recipient ?? '';
  // The markup has no novalidate so a no-JavaScript submit still validates; with JS we validate ourselves.
  form.noValidate = true;

  const say = (text: string, ok: boolean) => {
    if (!status) return;
    status.textContent = text;
    status.classList.toggle('text-red-700', !ok);
    status.classList.toggle('text-[#073E29]', ok);
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    say('', true);
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    // Honeypot: real visitors never see this field, bots fill it in.
    if (data.botcheck) {
      say(form.dataset.msgThanks ?? 'Thanks!', true);
      form.reset();
      return;
    }
    delete data.botcheck;
    delete data.access_key;
    delete data.from_name;

    if (!endpoint) {
      const subject = encodeURIComponent(`${form.dataset.msgSubject ?? 'Website message from'} ${data.name}: ${data.topic ?? ''}`);
      const body = encodeURIComponent(
        `${data.message}\n\n—\n${data.name}\n${data.email}${data.phone ? `\n${data.phone}` : ''}\nTopic: ${data.topic ?? ''}`,
      );
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      say(form.dataset.msgMailto ?? '', true);
      return;
    }

    if (submit) submit.disabled = true;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(
          accessKey
            ? { access_key: accessKey, subject: `Website message from ${data.name} [${document.documentElement.lang}]: ${data.topic ?? ''}`, from_name: 'kukshausen.me', ...data }
            : data,
        ),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      say(form.dataset.msgThanks ?? 'Thanks!', true);
      form.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      say(form.dataset.msgError ?? 'Failed to send message.', false);
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}

splitHeadlineWords();
observeReveals();
wireContactForm();

// Service cards link to the form with their topic preselected.
document.querySelectorAll<HTMLAnchorElement>('a[data-topic]').forEach((link) => {
  link.addEventListener('click', () => {
    const select = document.querySelector<HTMLSelectElement>('#topic');
    if (select && link.dataset.topic) select.value = link.dataset.topic;
  });
});

// Flip the switch on the next frame so the entrance transitions actually run.
requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));
