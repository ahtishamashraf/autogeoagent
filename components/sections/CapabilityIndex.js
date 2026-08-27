import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionHeading from './SectionHeading';
import { ArrowRight } from '@/components/ui/Icons';
import { navigation, routeByPath } from '@/lib/routes';

/**
 * The index of dedicated capability pages.
 *
 * Titles and summaries come from the route registry, so this list cannot
 * advertise a page that does not exist or describe one inconsistently.
 */
export default function CapabilityIndex({ id = 'capability-index' }) {
  const items = navigation.capabilities.map((item) => routeByPath[item.href]).filter(Boolean);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative border-t border-white/8 py-24 lg:py-32"
    >
      <Container>
        <SectionHeading
          id={`${id}-heading`}
          eyebrow="Capabilities in depth"
          title="Every part of the workflow, on its own page"
          lead="Each capability has a page explaining what it does, how it decides, and what it deliberately leaves to you."
        />

        <ul className="mt-14 grid gap-px overflow-hidden border-y border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={item.path} className="bg-void">
              <Link href={item.path} className="group flex h-full flex-col gap-3 p-7 lg:p-8">
                <span className="font-mono text-[11px] tracking-[0.18em] text-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="t-h4 text-ink transition-colors group-hover:text-[var(--scene-glow)]">
                  {item.title}
                </span>
                <span className="t-body flex-1 text-[0.92rem]">{item.summary}</span>
                <span className="inline-flex items-center gap-2 text-[13px] text-[var(--scene-glow)]">
                  Explore
                  <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
