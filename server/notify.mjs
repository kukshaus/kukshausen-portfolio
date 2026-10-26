// Calendly webhook → Telegram: a message for every booking and cancellation, marked when an AI booked over MCP.
// Needs CALENDLY_WEBHOOK_SECRET (the subscription's signing key), TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.
import { createHmac, timingSafeEqual } from 'node:crypto';

const MAX_AGE_S = 180;

/** Checks the Calendly-Webhook-Signature header ("t=<unix>,v1=<hex hmac>") against the raw body. */
export function verifySignature(header, raw, secret, now = Date.now()) {
  if (typeof header !== 'string') return false;
  const parts = Object.fromEntries(header.split(',').map((p) => p.split('=', 2).map((x) => x.trim())));
  const t = Number(parts.t);
  if (!Number.isFinite(t) || !parts.v1 || Math.abs(now / 1000 - t) > MAX_AGE_S) return false;
  const expected = createHmac('sha256', secret).update(`${parts.t}.${raw}`).digest();
  const given = Buffer.from(parts.v1, 'hex');
  return given.length === expected.length && timingSafeEqual(given, expected);
}

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const when = (iso, timeZone = 'Europe/Budapest') =>
  new Intl.DateTimeFormat('en-GB', { timeZone, weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(iso));

/** The Telegram text (HTML) for an invitee.created / invitee.canceled payload; null for other events. */
export function message(event, p) {
  if (event !== 'invitee.created' && event !== 'invitee.canceled') return null;
  const viaMcp = p.tracking?.utm_source === 'mcp';
  const source = viaMcp ? `🤖 AI assistant over MCP${p.tracking.utm_content ? ` (${esc(p.tracking.utm_content)})` : ''}` : '🌐 Calendly page / website';
  const ev = p.scheduled_event ?? {};
  const lines =
    event === 'invitee.created'
      ? [`📅 <b>New booking${p.rescheduled ? ' (rescheduled)' : ''}</b>`, `<b>${esc(ev.name ?? 'Meeting')}</b> · ${esc(when(ev.start_time))} (Budapest)`]
      : [`❌ <b>Booking cancelled</b>`, `<b>${esc(ev.name ?? 'Meeting')}</b> · ${esc(when(ev.start_time))} (Budapest)`];
  lines.push(`👤 ${esc(p.name)} · ${esc(p.email)}`, `Source: ${source}`);
  if (p.timezone) lines.push(`Their time zone: ${esc(p.timezone)}`);
  for (const qa of p.questions_and_answers ?? []) if (qa.answer) lines.push('', `💬 ${esc(qa.answer)}`);
  if (event === 'invitee.canceled' && p.cancellation?.reason) lines.push('', `Reason: ${esc(p.cancellation.reason)}`);
  if (event === 'invitee.created' && ev.location?.join_url) lines.push('', `<a href="${esc(ev.location.join_url)}">Join link</a>`);
  return lines.join('\n');
}

export function createNotifier({ secret, botToken, chatId, fetch = globalThis.fetch }) {
  async function telegram(text) {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`telegram ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }

  /** Handles one webhook call; returns the HTTP status to answer. */
  async function handle(signature, raw) {
    if (!verifySignature(signature, raw, secret)) return 401;
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return 400;
    }
    const text = message(body.event, body.payload ?? {});
    if (!text) return 200;
    try {
      await telegram(text);
    } catch (error) {
      // Calendly retries on non-2xx: answer 502 so a Telegram outage does not lose the message.
      console.error('notify:', error.message);
      return 502;
    }
    return 200;
  }

  return { handle, telegram };
}
