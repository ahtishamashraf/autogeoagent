import Link from 'next/link';
import Container from '@/components/ui/Container';
import PageHero from '@/components/sections/PageHero';
import CtaSection from '@/components/sections/CtaSection';
import JsonLd from '@/components/seo/JsonLd';
import { ArrowRight } from '@/components/ui/Icons';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/seo';
import { buildMetadata } from '@/lib/metadata';
import { routeByPath } from '@/lib/routes';
import { posts } from '@/content/blog/posts';

const description =
  'Guides, definitions and reference material on SEO, Generative Engine Optimization and how AI answer engines retrieve and cite content.';

export const metadata = buildMetadata({
  title: 'Resources',
  description,
  path: '/resources',
  ogKicker: 'Resources',
  keywords: ['SEO resources', 'GEO guides', 'AI search optimization guides', 'generative engine optimization learning'],
});

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Resources' },
];

/**
 * Hub page. Every entry is a page that exists — descriptions come from the
 * route registry so this can never advertise something unpublished.
 */
const shelves = [
  {
    title: 'Start here',
    note: 'The foundations, in the order they make sense.',
    paths: ['/what-is-geo', '/seo-vs-geo', '/generative-engine-optimization', '/ai-search-optimization'],
  },
  {
    title: 'By AI surface',
    note: 'How each answer engine retrieves, and what that implies for a page.',
    paths: ['/chatgpt-seo', '/google-ai-overviews', '/google-ai-mode', '/gemini-seo', '/perplexity-seo'],
  },
  {
    title: 'By business type',
    note: 'The same disciplines, applied where the constraints differ.',
    paths: ['/seo-for-saas', '/seo-for-agencies', '/seo-for-ecommerce', '/seo-for-local-business'],
  },
  {
    title: 'Reference',
    note: 'Look things up, and see what we will and will not claim.',
    paths: ['/glossary', '/research', '/blog'],
  },
];

function Shelf({ shelf }) {
  const items = shelf.paths.map((path) => routeByPath[path]).filter(Boolean);
  if (!items.length) return null;

  return (
    <section aria-labelledby={`shelf-${shelf.title.replace(/\s+/g, '-').toLowerCase()}`} className="mt-16 first:mt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2
          id={`shelf-${shelf.title.replace(/\s+/g, '-').toLowerCase()}`}
          className="t-h3 text-ink"
        >
          {shelf.title}
        </h2>
        <p className="text-sm text-faint">{shelf.note}</p>
      </div>

      <ul className="mt-7 grid gap-px overflow-hidden border-y border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.path} className="bg-void">
            <Link href={item.path} className="group flex h-full flex-col gap-3 p-6 lg:p-7">
              <span className="t-h4 text-ink transition-colors group-hover:text-[var(--scene-glow)]">
                {item.title}
              </span>
              <span className="t-body flex-1 text-[0.9rem]">{item.summary}</span>
              <span className="inline-flex items-center gap-2 text-[13px] text-[var(--scene-glow)]">
                Read
                <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Page() {
  const latest = posts.slice(0, 3);

  return (
    <>
      <JsonLd
        id="resources-graph"
        data={graph([
          webPageSchema({ path: '/resources', title: 'Resources', description, breadcrumb: true }),
          breadcrumbSchema(breadcrumbs, '/resources'),
        ])}
      />

      <PageHero
        eyebrow="Resources"
        title="Learn SEO and GEO properly"
        lead={description}
        breadcrumbs={breadcrumbs}
      />

      <Container className="pb-20 lg:pb-28">
        {shelves.map((shelf) => (
          <Shelf key={shelf.title} shelf={shelf} />
        ))}

        <section aria-labelledby="latest-writing" className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="latest-writing" className="t-h3 text-ink">
              Latest writing
            </h2>
            <Link href="/blog" className="link-underline text-sm text-muted transition-colors hover:text-ink">
              All articles
            </Link>
          </div>

          <ul className="mt-7 grid gap-px overflow-hidden border-y border-white/8 bg-white/8 sm:grid-cols-3">
            {latest.map((post) => (
              <li key={post.slug} className="bg-void">
                <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col gap-3 p-6 lg:p-7">
                  <span className="t-micro text-faint">{post.category}</span>
                  <span className="t-h4 text-ink transition-colors group-hover:text-[var(--scene-glow)]">
                    {post.title}
                  </span>
                  <span className="t-body flex-1 text-[0.9rem]">{post.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <CtaSection />
    </>
  );
}
