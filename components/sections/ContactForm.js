'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Check } from '@/components/ui/Icons';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';
import { track } from '@/lib/analytics';

const TOPICS = ['General', 'Product question', 'Pricing', 'Partnership', 'Support'];

const field =
  'w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-[15px] text-ink placeholder:text-faint transition-colors focus:border-[var(--scene-glow)] focus:outline-none focus:ring-0';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setErrors({});
    setMessage('');

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok && result.ok) {
        // Only on a delivery the server actually confirmed.
        track('contact_submit', { topic: data.topic || 'General' });
        setStatus('sent');
        event.target.reset();
        return;
      }
      if (result.errors) {
        setErrors(result.errors);
        setStatus('idle');
        return;
      }
      setStatus('error');
      setMessage(result.error || 'Something went wrong. Please email us instead.');
    } catch {
      setStatus('error');
      setMessage('We could not reach the server. Please email us instead.');
    }
  };

  if (status === 'sent') {
    return (
      <div className="panel-lift flex flex-col items-start gap-4 p-8" role="status">
        <span className="flex size-10 items-center justify-center rounded-full border border-signal/40 bg-signal/10 text-signal">
          <Check className="size-4" />
        </span>
        <div>
          <p className="t-h4 text-ink">Message sent</p>
          <p className="t-body mt-2 text-[0.9375rem]">
            Thanks — we have your message and will reply to the address you gave us.
          </p>
        </div>
        <Button variant="secondary" size="sm" magnetic={false} onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel-lift p-6 sm:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="t-micro mb-2 block text-faint">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(field, errors.name && 'border-red-400/60')}
            placeholder="Your name"
          />
          {errors.name ? (
            <p id="name-error" className="mt-2 text-xs text-red-300">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="t-micro mb-2 block text-faint">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(field, errors.email && 'border-red-400/60')}
            placeholder="you@company.com"
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-xs text-red-300">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="company" className="t-micro mb-2 block text-faint">
            Company <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={field}
            placeholder="Company name"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="topic" className="t-micro mb-2 block text-faint">
            Topic
          </label>
          <select id="topic" name="topic" className={cn(field, 'appearance-none')} defaultValue="General">
            {TOPICS.map((topic) => (
              <option key={topic} value={topic} className="bg-abyss">
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="t-micro mb-2 block text-faint">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={cn(field, 'resize-y', errors.message && 'border-red-400/60')}
            placeholder="What would you like to know?"
          />
          {errors.message ? (
            <p id="message-error" className="mt-2 text-xs text-red-300">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" size="md" magnetic={false} disabled={status === 'sending'} withArrow>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </Button>
        <p className="text-xs text-faint">
          Or email{' '}
          <a href={`mailto:${site.contactEmail}`} className="link-underline text-ink-soft">
            {site.contactEmail}
          </a>
        </p>
      </div>

      {status === 'error' ? (
        <p role="alert" className="mt-4 rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-200">
          {message}{' '}
          <a href={`mailto:${site.contactEmail}`} className="link-underline">
            {site.contactEmail}
          </a>
        </p>
      ) : null}
    </form>
  );
}
