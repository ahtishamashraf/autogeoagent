import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SectionHeading from './SectionHeading';
import { Check } from '@/components/ui/Icons';
import { pricing } from '@/lib/pricing';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';

/**
 * Pricing.
 *
 * The site never invents a number. Until `pricing.published` is true the
 * section explains how plans are structured and what is included, and sends
 * people to the application for current prices.
 */
export default function PricingSection({ id = 'pricing' }) {
  const hasPlans = pricing.published && pricing.plans.length > 0;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative border-t border-white/8 py-24 lg:py-36"
    >
      <Container>
        <SectionHeading
          id={`${id}-heading`}
          eyebrow="Pricing"
          title={hasPlans ? 'Choose the scope you need' : 'Priced around the work the agent does'}
          lead={
            hasPlans
              ? 'Every plan includes the full workflow. What changes is scope: how many sites, how much content and how often the loop runs.'
              : 'Every plan includes the full workflow. What changes is scope — so the right plan depends on how much ground you want the agent to cover.'
          }
        />

        {hasPlans ? (
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 lg:grid-cols-3">
            {pricing.plans.map((plan) => (
              <div
                key={plan.id}
                className={cn('flex flex-col bg-void p-7', plan.featured && 'bg-abyss')}
              >
                <h3 className="t-h4 text-ink">{plan.name}</h3>
                <p className="t-body mt-2 text-[0.9rem]">{plan.description}</p>
                <p className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: pricing.currency,
                    maximumFractionDigits: 0,
                  }).format(plan.price)}
                  <span className="ml-1 text-sm font-normal text-faint">/{plan.interval}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/8 pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-[13.5px] text-muted">
                      <Check className="mt-1 size-3.5 shrink-0 text-[var(--scene-glow)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  href={plan.cta?.href || site.app.signup}
                  variant={plan.featured ? 'primary' : 'secondary'}
                  size="md"
                  className="mt-7 w-full"
                  magnetic={false}
                >
                  {plan.cta?.label || 'Get Started'}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
            <div>
              <h3 className="t-micro text-faint">What plans are scoped on</h3>
              <dl className="mt-5 border-t border-white/8">
                {pricing.factors.map((factor) => (
                  <div key={factor.title} className="border-b border-white/8 py-5">
                    <dt className="t-h4 text-ink">{factor.title}</dt>
                    <dd className="t-body mt-2 max-w-xl text-[0.9rem]">{factor.body}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="panel-lift h-fit p-7">
              <h3 className="t-h4 text-ink">Included in every plan</h3>
              <ul className="mt-5 space-y-2.5">
                {pricing.included.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                    <Check className="mt-1 size-3.5 shrink-0 text-[var(--scene-glow)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/8 pt-5 text-[13px] leading-relaxed text-faint">
                {pricing.billingNote}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button href={site.app.signup} size="md" withArrow>
                  See current plans
                </Button>
                <Button href="/contact" variant="secondary" size="md" magnetic={false}>
                  Talk to us
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
