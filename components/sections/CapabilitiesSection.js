import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionHeading from './SectionHeading';
import { capabilities } from '@/content/capabilities';

/**
 * Capabilities as a specification sheet rather than a grid of cards: a sticky
 * heading on the left, an indexed list of what the agent actually does on the
 * right, separated by hairlines.
 */
/**
 * `limit` keeps the homepage from repeating the full list that /features
 * exists to carry: the homepage shows the first few and links onward.
 */
export default function CapabilitiesSection({ id = 'capabilities', limit, heading, lead }) {
  const shown = limit ? capabilities.slice(0, limit) : capabilities;

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative py-24 lg:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id={`${id}-heading`}
              eyebrow="Platform capabilities"
              title={heading || 'Everything the agent runs, end to end'}
              lead={
                lead ||
                'One workflow instead of a stack of disconnected tools — research, strategy, creation, publishing, measurement and refinement, all reading from the same picture of your site.'
              }
            />
          </div>

          <ol className="border-t border-white/8">
            {shown.map((capability, index) => (
              <li
                key={capability.title}
                className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-b border-white/8 py-6 transition-colors duration-500 hover:bg-white/[0.015] sm:grid-cols-[3.5rem_1fr] sm:gap-x-8 sm:py-7"
              >
                <span className="pt-1 font-mono text-[11px] tracking-[0.14em] text-faint transition-colors duration-500 group-hover:text-[var(--scene-glow)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="t-h4 text-ink">{capability.title}</h3>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                      {capability.tag}
                    </span>
                  </div>
                  <p className="t-body mt-2 max-w-xl">{capability.body}</p>
                </div>
              </li>
            ))}
          </ol>

          {limit && capabilities.length > limit ? (
            <p className="lg:col-start-2">
              <Link href="/features" className="link-underline mt-8 inline-block text-sm text-[var(--scene-glow)]">
                All {capabilities.length} capabilities
              </Link>
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
