import Link from 'next/link';
import Container from '@/components/ui/Container';
import PageHero from '@/components/sections/PageHero';
import CtaSection from '@/components/sections/CtaSection';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/seo';
import { posts } from '@/content/blog/posts';
import { absoluteUrl } from '@/lib/site';
import { ArrowRight } from '@/components/ui/Icons';

const description =
  'Research, guides and product thinking on SEO, Generative Engine Optimization and AI search visibility from the GetGeoAgent team.';

export const metadata = buildMetadata({
  title: 'Blog',
  description,
  path: '/blog',
  ogKicker: 'Blog',
  keywords: ['SEO blog', 'GEO blog', 'AI search optimization articles'],
});

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Blog' }];

const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function Page() {
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd
        id="blog-graph"
        data={graph([
          webPageSchema({ path: '/blog', title: 'Blog', description, breadcrumb: true }),
          breadcrumbSchema(breadcrumbs, '/blog'),
          {
            '@type': 'Blog',
            '@id': `${absoluteUrl('/blog')}#blog`,
            name: 'GetGeoAgent Blog',
            description,
            url: absoluteUrl('/blog'),
            blogPost: posts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              url: absoluteUrl(`/blog/${post.slug}`),
              datePublished: post.publishedAt,
              dateModified: post.modifiedAt || post.publishedAt,
            })),
          },
        ])}
      />

      <PageHero
        eyebrow="Blog"
        title="Notes on search that is no longer only search"
        lead={description}
        breadcrumbs={breadcrumbs}
      />

      <Container className="pb-20 lg:pb-28">
        <article className="group border-y border-white/8 py-10">
          <Link href={`/blog/${featured.slug}`} className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16">
            <div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                <span className="text-[var(--scene-glow)]">{featured.category}</span>
                <span aria-hidden="true">/</span>
                <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                <span aria-hidden="true">/</span>
                <span>{featured.readingTime} min read</span>
              </p>
              <h2 className="t-h2 mt-5 max-w-2xl text-balance text-ink transition-colors group-hover:text-[var(--scene-glow)]">
                {featured.title}
              </h2>
            </div>
            <div className="lg:pt-14">
              <p className="t-body">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--scene-glow)]">
                Read article
                <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </article>

        <ul className="grid gap-px overflow-hidden border-b border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-2">
          {rest.map((post) => (
            <li key={post.slug} className="bg-void">
              <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col gap-4 py-8 sm:px-8">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  <span className="text-[var(--scene-glow)]">{post.category}</span>
                  <span aria-hidden="true">/</span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span aria-hidden="true">/</span>
                  <span>{post.readingTime} min</span>
                </p>
                <h2 className="t-h3 text-balance text-ink transition-colors group-hover:text-[var(--scene-glow)]">
                  {post.title}
                </h2>
                <p className="t-body flex-1 text-[0.9rem]">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-[13px] text-[var(--scene-glow)]">
                  Read article
                  <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <CtaSection id="blog-cta" />
    </>
  );
}
