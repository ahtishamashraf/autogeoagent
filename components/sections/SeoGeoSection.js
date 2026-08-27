import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionHeading from './SectionHeading';
import { ArrowRight } from '@/components/ui/Icons';

export const comparisonRows = [
  { dimension: 'Where you appear', seo: 'Search results pages', geo: 'Generated answers' },
  { dimension: 'What visibility means', seo: 'Ranking position', geo: 'Being used and cited in an answer' },
  { dimension: 'Primary unit', seo: 'Keywords and queries', geo: 'Entities, topics and context' },
  { dimension: 'What the system returns', seo: 'A list of links', geo: 'A synthesised response' },
  { dimension: 'How people arrive', seo: 'Clicks from search', geo: 'Clicks from citations, plus brand recall' },
  { dimension: 'Content that wins', seo: 'Relevant, authoritative pages', geo: 'Clear, complete, quotable passages' },
  { dimension: 'Measurement', seo: 'Rankings, impressions, clicks', geo: 'Mentions, citations, referral patterns' },
];

/**
 * The SEO / GEO relationship, as a real comparison table so it can be read,
 * quoted and cited — including by the systems this page is about.
 */
export default function SeoGeoSection({ id = 'seo-and-geo', withLink = true }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative border-t border-white/8 py-24 lg:py-36"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading
              id={`${id}-heading`}
              eyebrow="SEO + GEO"
              title="Two disciplines, one workflow"
              lead="Search Engine Optimization earns you a position. Generative Engine Optimization earns you a place inside the answer. They share most of their foundations, which is why running them separately wastes effort."
            />
            {withLink ? (
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <Link
                  href="/seo-vs-geo"
                  className="group/link inline-flex items-center gap-2 text-sm text-[var(--scene-glow)]"
                >
                  Full SEO vs GEO comparison
                  <ArrowRight className="size-3.5 transition-transform duration-500 group-hover/link:translate-x-1" />
                </Link>
                <Link
                  href="/what-is-geo"
                  className="group/link inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                >
                  What is GEO?
                  <ArrowRight className="size-3.5 transition-transform duration-500 group-hover/link:translate-x-1" />
                </Link>
              </div>
            ) : null}
          </div>

          <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <caption className="sr-only">
                A comparison of search engine optimization and generative engine optimization
              </caption>
              <thead>
                <tr className="border-b border-white/12">
                  <th scope="col" className="w-[30%] py-3 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                    Dimension
                  </th>
                  <th scope="col" className="w-[35%] py-3 pr-4 font-display text-sm font-semibold text-ink">
                    SEO
                  </th>
                  <th scope="col" className="w-[35%] py-3 font-display text-sm font-semibold text-[var(--scene-glow)]">
                    GEO
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.dimension} className="border-b border-white/8 align-top">
                    <th scope="row" className="py-4 pr-4 text-[13px] font-normal text-faint">
                      {row.dimension}
                    </th>
                    <td className="py-4 pr-4 text-[13.5px] leading-relaxed text-muted">{row.seo}</td>
                    <td className="py-4 text-[13.5px] leading-relaxed text-ink-soft">{row.geo}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-6 max-w-2xl text-[13px] leading-relaxed text-faint">
              GEO does not replace SEO. Generative engines largely retrieve from the same indexed
              web, so the fundamentals that make a page rank are usually what make it citable too.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
