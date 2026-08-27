import { Fragment } from 'react';
import Container from '@/components/ui/Container';
import SectionHeading from './SectionHeading';
import { Check } from '@/components/ui/Icons';
import { pricing } from '@/lib/pricing';
import { cn } from '@/lib/cn';

/**
 * The full plan matrix, generated from lib/pricing.js.
 * Scrolls horizontally on narrow screens rather than wrapping into a shape
 * nobody can read.
 */
function Cell({ value }) {
  if (value === true) {
    return (
      <>
        <Check className="mx-auto size-3.5 text-[var(--scene-glow)]" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span aria-hidden="true" className="text-faint">
          —
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-[13px] text-ink-soft">{value}</span>;
}

export default function PricingComparison({ id = 'compare' }) {
  if (!pricing.published || !pricing.plans.length) return null;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-t border-white/8 py-24 lg:py-32"
    >
      <Container>
        <SectionHeading
          id={`${id}-heading`}
          eyebrow="Compare"
          title="Every plan, side by side"
          lead="What changes between plans is scope: how many sites the agent covers, how much content it produces and how deeply it monitors."
        />

        <div className="mt-12 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">
              Feature comparison across the {pricing.plans.map((p) => p.name).join(', ')} plans
            </caption>
            <thead>
              <tr className="border-b border-white/12">
                <th scope="col" className="w-[34%] py-4 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  Feature
                </th>
                {pricing.plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={cn(
                      'py-4 text-center font-display text-sm font-semibold',
                      plan.featured ? 'text-[var(--scene-glow)]' : 'text-ink',
                    )}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.comparison.map((group) => (
                <Fragment key={group.group}>
                  <tr className="border-b border-white/8">
                    <th
                      scope="colgroup"
                      colSpan={pricing.plans.length + 1}
                      className="pb-2 pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--scene-glow)]"
                    >
                      {group.group}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label} className="border-b border-white/8">
                      <th scope="row" className="py-3.5 pr-4 text-[13.5px] font-normal text-muted">
                        {row.label}
                      </th>
                      {pricing.plans.map((plan) => (
                        <td key={plan.id} className="py-3.5 text-center">
                          <Cell value={row.values[plan.id]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
