import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Contact endpoint.
 *
 * Delivery is configured with environment variables so the form is never a
 * decorative control that silently discards messages:
 *
 *   CONTACT_WEBHOOK_URL   POST the submission as JSON (Slack, Zapier, n8n, CRM)
 *   RESEND_API_KEY        Send an email through Resend
 *   CONTACT_TO_EMAIL      Recipient address for the Resend path
 *   CONTACT_FROM_EMAIL    Verified sender address for the Resend path
 *
 * With none of these set the route returns 501 and the UI tells the visitor to
 * email directly instead of pretending the message was sent.
 */

const MAX = { name: 120, email: 200, company: 160, message: 5000 };

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot — real people leave this empty.
  if (clean(payload.website, 200)) {
    return Response.json({ ok: true });
  }

  const name = clean(payload.name, MAX.name);
  const email = clean(payload.email, MAX.email);
  const company = clean(payload.company, MAX.company);
  const message = clean(payload.message, MAX.message);
  const topic = clean(payload.topic, 60) || 'General';

  const errors = {};
  if (!name) errors.name = 'Please enter your name.';
  if (!email || !isEmail(email)) errors.email = 'Please enter a valid email address.';
  if (message.length < 10) errors.message = 'Please add a little more detail.';

  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const submission = {
    source: site.domain,
    receivedAt: new Date().toISOString(),
    topic,
    name,
    email,
    company,
    message,
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(submission),
    });
    if (!response.ok) {
      return Response.json(
        { ok: false, error: 'We could not deliver your message. Please email us directly.' },
        { status: 502 },
      );
    }
    return Response.json({ ok: true });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (resendKey && to && from) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${resendKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[${site.name}] ${topic} — ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          company ? `Company: ${company}` : null,
          `Topic: ${topic}`,
          '',
          message,
        ]
          .filter(Boolean)
          .join('\n'),
      }),
    });
    if (!response.ok) {
      return Response.json(
        { ok: false, error: 'We could not deliver your message. Please email us directly.' },
        { status: 502 },
      );
    }
    return Response.json({ ok: true });
  }

  return Response.json(
    {
      ok: false,
      error: 'The contact endpoint is not configured yet. Please email us directly.',
      unconfigured: true,
    },
    { status: 501 },
  );
}
