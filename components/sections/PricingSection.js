'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SectionHeading from './SectionHeading';
import { Check } from '@/components/ui/Icons';
import { pricing, priceFor } from '@/lib/pricing';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

/**
 * Plan cards with a billing toggle.
 *
 * Prices, features and the comparison matrix all come from lib/pricing.js —
 * nothing about pricing is written inline here.
 */

const format = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: pricing.currency,
    maximumFractionDigits: 0,
  }).format(value);

export default function PricingSection({ id = 'pricing', heading, lead, compact = false }) {
  const [period, setPeriod] = useState('monthly');
  const annual = pricing.annual.enabled;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative border-t border-white/8 py-24 lg:py-32"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id={`${id}-heading`}
            eyebrow="Pricing"
            title={heading || 'Simple plans, scoped to the work'}
            lead={lead || pricing.billingNote}
          />

          {annual ? (
            <div
              role="radiogroup"
              aria-label="Billing period"
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/12 bg-white/[0.03] p-1"
            >
              {[
                { id: 'monthly', label: 'Monthly' },
                { id: 'annual', label: 'Annual' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={period === option.id}
                  onClick={() => {
                    setPeriod(option.id);
                    track('pricing_toggle', { period: option.id });
                  }}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm transition-colors duration-300',
                    period === option.id
                      ? 'bg-white text-void'
                      : 'text-muted hover:text-ink',
                  )}
                >
                  {option.label}
                  {option.id === 'annual' ? (
                    <span
                      className={cn(
                        'ml-2 rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em]',
                        period === 'annual' ? 'bg-void/10 text-void' : 'bg-signal/15 text-signal',
                      )}
                    >
                      {pricing.annual.label}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 lg:grid-cols-4">
          {pricing.plans.map((plan) => {
            const value = priceFor(plan, period);
            return (
              <article
                key={plan.id}
                className={cn(
                  'relative flex flex-col bg-void p-6 lg:p-7',
                  plan.featured && 'bg-[#0a1019]',
                )}
              >
                {plan.featured ? (
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-[var(--scene-glow)]"
                  />
                ) : null}

                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="t-h4 text-ink">{plan.name}</h3>
                  {plan.badge ? (
                    <span className="rounded-full border border-[color-mix(in_srgb,var(--scene-glow)_40%,transparent)] bg-[color-mix(in_srgb,var(--scene-accent)_14%,transparent)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--scene-glow)]">
                      {plan.badge}
                    </span>
                  ) : null}
                </div>

                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  {plan.audience}
                </p>

                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-semibold tracking-[-0.04em] text-ink">
                    {value === 0 ? format(0) : format(value)}
                  </span>
                  <span className="text-sm text-faint">/ month</span>
                </p>
                {annual && period === 'annual' && plan.price > 0 ? (
                  <p className="mt-1.5 text-xs text-muted">
                    Billed annually · {format(value * 12)} per year
                  </p>
                ) : null}
                {plan.price === 0 ? (
                  <p className="mt-1.5 text-xs text-muted">Free plan</p>
                ) : null}

                <p className="t-body mt-5 text-[0.9rem]">{plan.description}</p>

                <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/8 pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                      <Check className="mt-1 size-3.5 shrink-0 text-[var(--scene-glow)]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href={plan.cta.href}
                  variant={plan.featured ? 'primary' : 'secondary'}
                  size="md"
                  className="mt-7 w-full"
                  magnetic={false}
                  onClick={() => track('pricing_cta', { plan: plan.id, period })}
                >
                  {plan.cta.label}
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-faint">{pricing.disclaimer}</p>
          {annual ? (
            <p className="shrink-0 text-xs text-faint">{pricing.annual.note}</p>
          ) : null}
        </div>

        {compact ? (
          <p className="mt-8">
            <Link href="/pricing" className="link-underline text-sm text-[var(--scene-glow)]">
              Compare every plan in detail
            </Link>
          </p>
        ) : null}
      </Container>
    </section>
  );
}
