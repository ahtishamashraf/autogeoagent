import Container from '@/components/ui/Container';
import SectionHeading from './SectionHeading';
import { useCases } from '@/content/capabilities';

export default function UseCasesSection({ id = 'use-cases' }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative border-t border-white/8 py-24 lg:py-36"
    >
      <Container>
        <SectionHeading
          id={`${id}-heading`}
          eyebrow="Use cases"
          title="Built for teams that publish"
          lead="The workflow is the same everywhere. What changes is the topic space the agent works in."
        />

        <div className="mt-14 grid gap-px overflow-hidden border-y border-white/8 bg-white/8 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <article key={useCase.title} className="bg-void px-0 py-8 lg:px-8">
              <h3 className="t-h3 text-ink">{useCase.title}</h3>
              <p className="t-body mt-4">{useCase.body}</p>
              <ul className="mt-6 space-y-2 border-t border-white/8 pt-5">
                {useCase.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1 shrink-0 rounded-full bg-[var(--scene-glow)]"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
