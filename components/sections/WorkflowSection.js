import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionHeading from './SectionHeading';
import { stages } from '@/content/story';
import { ArrowRight } from '@/components/ui/Icons';

/**
 * The seven stages of the loop, written out as crawlable content for people
 * who arrive from search rather than from the top of the page.
 */
export default function WorkflowSection({ id = 'how-it-works', showLink = true, detailed = false }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative border-t border-white/8 py-24 lg:py-36"
    >
      <Container>
        <SectionHeading
          id={`${id}-heading`}
          eyebrow="How it works"
          title="A loop, not a campaign"
          lead="GetGeoAgent runs the same seven stages continuously. Each one feeds the next, and the last one feeds the first."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <article key={stage.id} className="group relative bg-void p-6 lg:p-7">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px scale-x-0 bg-[var(--scene-glow)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <p className="font-mono text-[11px] tracking-[0.16em] text-faint">{stage.number}</p>
              <h3 className="t-h4 mt-4 text-ink">{stage.heading}</h3>
              <p className="t-body mt-3 text-[0.9rem]">{detailed ? stage.long : stage.body}</p>
              <ul className="mt-4 space-y-1.5">
                {stage.points.slice(0, detailed ? 4 : 2).map((point) => (
                  <li key={point} className="flex gap-2 text-[13px] leading-relaxed text-muted">
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

          <div className="flex flex-col justify-between bg-void p-6 lg:p-7">
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-faint">08</p>
              <h3 className="t-h4 mt-4 text-ink">Repeat</h3>
              <p className="t-body mt-3 text-[0.9rem]">
                The cycle restarts with everything the agent learned from the last one.
              </p>
            </div>
            {showLink ? (
              <Link
                href="/how-it-works"
                className="group/link mt-6 inline-flex items-center gap-2 text-sm text-[var(--scene-glow)]"
              >
                Read the full workflow
                <ArrowRight className="size-3.5 transition-transform duration-500 group-hover/link:translate-x-1" />
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
