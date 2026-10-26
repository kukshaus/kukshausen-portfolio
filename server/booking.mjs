// Booking the 20-minute intro call through Calendly, for the MCP server's booking tools.
// Needs CALENDLY_TOKEN (a Calendly personal access token); without it the tools are not offered.
const API = 'https://api.calendly.com';
const EVENT_SLUG = '20-minute-meeting';
const DAY = 24 * 60 * 60 * 1000;
const SLOT_CACHE_MS = 60 * 1000;
const MAX_SLOTS = 60;
/** Confirmed bookings per client IP and in total, per rolling 24 hours. */
export const LIMITS = { perIp: 3, total: 20 };

export class BookingError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export const isTimeZone = (tz) => {
  try {
    new Intl.DateTimeFormat('en', { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};

/** Milliseconds the zone is ahead of UTC at instant t. */
function offsetMs(t, timeZone) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
      .formatToParts(t)
      .map((x) => [x.type, x.value]),
  );
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - t;
}

/** The instant of 00:00 on date (YYYY-MM-DD) in timeZone. */
function zonedMidnight(date, timeZone) {
  const utc = Date.parse(`${date}T00:00:00Z`);
  const first = utc - offsetMs(utc, timeZone);
  return utc - offsetMs(first, timeZone);
}

const local = (t, timeZone) =>
  new Intl.DateTimeFormat('en-GB', { timeZone, weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(t);

export function createBooking({ token, fetch = globalThis.fetch, now = () => Date.now() }) {
  let eventType; // resolved once: { uri, duration, question, url }
  const slotCache = new Map();
  const booked = []; // { ip, at } of confirmed bookings in the last 24 hours

  async function call(path, init = {}) {
    let res;
    try {
      res = await fetch(API + path, {
        ...init,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(10_000),
      });
    } catch {
      throw new BookingError('unavailable', 'Calendly did not answer, try again in a minute');
    }
    const body = await res.json().catch(() => ({}));
    if (res.ok) return body;
    if (res.status === 429) throw new BookingError('rate_limited', 'Calendly is busy, try again in a minute');
    if (res.status === 400 && JSON.stringify(body).includes('already_filled')) {
      throw new BookingError('slot_taken', 'That time was just taken: call find_free_slots for the current times');
    }
    if (res.status === 400) throw new BookingError('invalid', body.details?.map((d) => d.message).join('; ') || body.message || 'Calendly refused the booking');
    console.error('calendly:', res.status, path, JSON.stringify(body).slice(0, 300));
    throw new BookingError('unavailable', 'Booking is not available right now');
  }

  async function getEventType() {
    if (eventType) return eventType;
    const me = (await call('/users/me')).resource;
    const types = (await call(`/event_types?user=${encodeURIComponent(me.uri)}&active=true`)).collection;
    const et = types.find((t) => t.slug === EVENT_SLUG) ?? types[0];
    if (!et) throw new BookingError('unavailable', 'No bookable meeting type');
    eventType = { uri: et.uri, duration: et.duration, question: et.custom_questions?.find((q) => q.enabled)?.name, url: et.scheduling_url };
    return eventType;
  }

  /** Free start times between from and to (ms); Calendly answers at most 7 days per request. */
  async function availableTimes(from, to, { fresh = false } = {}) {
    const { uri } = await getEventType();
    const times = [];
    for (let start = from; start < to; start += 7 * DAY - 60_000) {
      const end = Math.min(to, start + 7 * DAY - 60_000);
      const key = `${start}|${end}`;
      const hit = slotCache.get(key);
      let page;
      if (!fresh && hit && now() - hit.at < SLOT_CACHE_MS) page = hit.times;
      else {
        const q = `event_type=${encodeURIComponent(uri)}&start_time=${new Date(start).toISOString()}&end_time=${new Date(end).toISOString()}`;
        page = (await call(`/event_type_available_times?${q}`)).collection.filter((s) => s.status === 'available').map((s) => Date.parse(s.start_time));
        slotCache.set(key, { at: now(), times: page });
      }
      times.push(...page);
    }
    return [...new Set(times)].sort((a, b) => a - b);
  }

  async function findSlots({ date, days = 7, timeZone = 'Europe/Budapest' }) {
    const earliest = now() + 60_000;
    // Cache windows on whole minutes so repeated questions within a minute share one Calendly call.
    const floor = (t) => Math.ceil(t / 60_000) * 60_000;
    const from = date ? Math.max(earliest, zonedMidnight(date, timeZone)) : earliest;
    const to = date ? zonedMidnight(date, timeZone) + DAY : earliest + days * DAY;
    const et = await getEventType();
    if (to <= from) return { timeZone, duration: et.duration, bookingUrl: et.url, count: 0, slots: [] };
    const times = await availableTimes(floor(from), floor(to));
    const slots = times.slice(0, MAX_SLOTS).map((t) => ({ start: new Date(t).toISOString(), local: local(t, timeZone) }));
    return { timeZone, duration: et.duration, bookingUrl: et.url, count: slots.length, slots };
  }

  function checkLimits(ip) {
    const since = now() - DAY;
    while (booked.length && booked[0].at < since) booked.shift();
    if (booked.length >= LIMITS.total) throw new BookingError('limit', `Booking limit reached for today: use ${eventType?.url ?? 'the booking page'}`);
    if (ip && booked.filter((b) => b.ip === ip).length >= LIMITS.perIp) throw new BookingError('limit', 'This client already booked the maximum of calls for today');
  }

  /** The booking form has one free-text question: company, topic and notes go into it together. */
  const answer = ({ company, topic, notes, agent }) =>
    [company && `Company: ${company}`, topic && `Topic: ${topic}`, notes, `Booked by an AI assistant over MCP${agent ? ` (${agent})` : ''}.`]
      .filter(Boolean)
      .join('\n');

  async function book({ start, name, email, timeZone = 'Europe/Budapest', company, topic, notes, confirm = false, ip, agent }) {
    const t = Date.parse(start);
    const et = await getEventType();
    const times = await availableTimes(t - 60_000, t + 60_000, { fresh: true });
    if (!times.includes(t)) throw new BookingError('slot_taken', 'That time is not free: call find_free_slots for the current times');
    const summary = {
      start: new Date(t).toISOString(),
      end: new Date(t + et.duration * 60_000).toISOString(),
      local: local(t, timeZone),
      timeZone,
      duration: et.duration,
      name,
      email,
      ...(company ? { company } : {}),
      ...(topic ? { topic } : {}),
    };
    if (!confirm) {
      return { status: 'needs_confirmation', ...summary, next: 'Show these details to the person. Only when they explicitly agree, call book_intro_call again with the same arguments and confirm: true.' };
    }
    checkLimits(ip);
    const body = {
      event_type: et.uri,
      start_time: summary.start,
      invitee: { name, email, timezone: timeZone },
      location: { kind: 'google_conference' },
      ...(et.question ? { questions_and_answers: [{ question: et.question, answer: answer({ company, topic, notes, agent }), position: 0 }] } : {}),
      // Marks the booking as made over MCP; the webhook notification and Calendly's reports show it.
      tracking: { utm_source: 'mcp', utm_medium: 'ai-agent', utm_campaign: null, utm_content: agent ?? null, utm_term: null, salesforce_uuid: null },
    };
    const invitee = (await call('/invitees', { method: 'POST', body: JSON.stringify(body) })).resource;
    booked.push({ ip, at: now() });
    slotCache.clear();
    return { status: 'booked', ...summary, cancelUrl: invitee.cancel_url, rescheduleUrl: invitee.reschedule_url, note: `Calendly emails the invitation with the Google Meet link to ${email}.` };
  }

  return { findSlots, book };
}
