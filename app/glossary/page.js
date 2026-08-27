import Container from '@/components/ui/Container';
import PageHero from '@/components/sections/PageHero';
import RelatedLinks from '@/components/sections/RelatedLinks';
import CtaSection from '@/components/sections/CtaSection';
import JsonLd from '@/components/seo/JsonLd';
import Link from 'next/link';
import { breadcrumbSchema, definedTermSetSchema, graph, slugifyTerm, webPageSchema } from '@/lib/seo';
import { buildMetadata } from '@/lib/metadata';
import { glossaryGroups, glossaryTerms } from '@/content/resources/glossary';

const description =
  'Plain definitions of the SEO, GEO and AI-search terms used across this site — what each one means, and where it is covered in depth.';

export const metadata = buildMetadata({
  title: 'SEO & GEO Glossary',
  description,
  path: '/glossary',
  ogKicker: 'Glossary',
  keywords: ['SEO glossary', 'GEO glossary', 'generative engine optimization terms', 'AI search terminology'],
});

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' },
  { label: 'Glossary' },
];

// Alphabetical within the page: a glossary is looked up, not read through.
const sorted = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));

export default function Page() {
  return (
    <>
      <JsonLd
        id="glossary-graph"
        data={graph([
          webPageSchema({ path: '/glossary', title: 'SEO & GEO Glossary', description, breadcrumb: true }),
          breadcrumbSchema(breadcrumbs, '/glossary'),
          definedTermSetSchema({
            path: '/glossary',
            name: 'SEO and GEO glossary',
            description,
            terms: sorted,
          }),
        ])}
      />

      <PageHero
        eyebrow="Resources — Glossary"
        title="SEO & GEO Glossary"
        lead={description}
        breadcrumbs={breadcrumbs}
      >
        <nav aria-label="Glossary categories" className="mt-9 flex flex-wrap gap-2">
          {glossaryGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
            >
              {group}
            </span>
          ))}
        </nav>
      </PageHero>

      <Container className="pb-20 lg:pb-28">
        <dl className="grid gap-px overflow-hidden border-y border-white/8 bg-white/8 sm:grid-cols-2">
          {sorted.map((entry) => (
            <div key={entry.term} id={slugifyTerm(entry.term)} className="flex flex-col gap-3 bg-void p-6 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <dt className="t-h4 text-ink">{entry.term}</dt>
                <span className="mt-1 shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  {entry.group}
                </span>
              </div>
              <dd className="t-body flex-1 text-[0.94rem]">{entry.definition}</dd>
              <Link
                href={entry.href}
                className="link-underline self-start text-[13px] text-[var(--scene-glow)]"
              >
                Read more
              </Link>
            </div>
          ))}
        </dl>
      </Container>

      <RelatedLinks paths={['/what-is-geo', '/seo-vs-geo', '/generative-engine-optimization']} />
      <CtaSection />
    </>
  );
}
