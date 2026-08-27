import Container from '@/components/ui/Container';
import SectionHeading from './SectionHeading';
import { Plus } from '@/components/ui/Icons';

/**
 * FAQs built on <details>/<summary>: keyboard accessible, works without
 * JavaScript, and fully readable by crawlers and answer engines.
 */
export default function FaqSection({ id = 'faq', faqs, title = 'Questions, answered', eyebrow = 'FAQ', lead }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative border-t border-white/8 py-24 lg:py-36"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id={`${id}-heading`} eyebrow={eyebrow} title={title} lead={lead} />
          </div>

          <div className="border-t border-white/8">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-white/8">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="t-h4 text-ink-soft transition-colors duration-300 group-open:text-ink">
                    {faq.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-white/12 text-muted transition-all duration-500 group-open:rotate-45 group-open:border-[var(--scene-glow)] group-open:text-[var(--scene-glow)]"
                  >
                    <Plus className="size-3" />
                  </span>
                </summary>
                <p className="t-body max-w-2xl pb-6 pr-10">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
