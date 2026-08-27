import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ArticleBody from '@/components/sections/ArticleBody';
import TableOfContents from '@/components/sections/TableOfContents';
import CtaSection from '@/components/sections/CtaSection';
import JsonLd from '@/components/seo/JsonLd';
import { ArrowRight } from '@/components/ui/Icons';
import { buildMetadata } from '@/lib/metadata';
import { articleSchema, breadcrumbSchema, graph } from '@/lib/seo';
import { posts, postBySlug, relatedPosts } from '@/content/blog/posts';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return buildMetadata({ title: 'Article not found', path: '/blog', noIndex: true });

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogKicker: post.category,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.modifiedAt || post.publishedAt,
    authors: [post.author],
    keywords: [post.category, 'SEO', 'GEO', 'AI search'],
  });
}

const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default async function Page({ params }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const related = relatedPosts(post.slug);
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ];

  return (
    <>
      <JsonLd
        id="article-graph"
        data={graph([articleSchema(post), breadcrumbSchema(breadcrumbs, `/blog/${post.slug}`)])}
      />

      <article>
        <header className="relative overflow-hidden pb-12 pt-[calc(var(--header-h)+3.5rem)] lg:pt-[calc(var(--header-h)+5rem)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_58%_at_20%_-10%,color-mix(in_srgb,var(--scene-accent)_20%,transparent),transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="grid-field pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]"
          />
          <Container className="relative">
            <Breadcrumbs items={breadcrumbs} />
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              <span className="text-[var(--scene-glow)]">{post.category}</span>
              <span aria-hidden="true">/</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true">/</span>
              <span>{post.readingTime} min read</span>
            </p>
            <h1 className="t-h2 mt-6 max-w-4xl text-balance text-ink">{post.title}</h1>
            <p className="t-lead mt-6 max-w-2xl">{post.excerpt}</p>
            <p className="mt-8 border-t border-white/8 pt-5 text-xs text-faint">
              By {post.author}
              {post.modifiedAt && post.modifiedAt !== post.publishedAt ? (
                <>
                  {' '}
                  · Updated <time dateTime={post.modifiedAt}>{formatDate(post.modifiedAt)}</time>
                </>
              ) : null}
            </p>
          </Container>
        </header>

        <Container className="pb-20 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
            <div>
              <ArticleBody blocks={post.body} />
            </div>
            <aside className="order-first lg:order-last">
              <TableOfContents blocks={post.body} title="Contents" />
            </aside>
          </div>
        </Container>
      </article>

      {related.length ? (
        <section
          aria-labelledby="related-posts-heading"
          className="border-t border-white/8 py-20 lg:py-28"
        >
          <Container>
            <h2 id="related-posts-heading" className="t-micro text-faint">
              More from the blog
            </h2>
            <ul className="mt-8 grid gap-px overflow-hidden border-y border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="bg-void">
                  <Link href={`/blog/${item.slug}`} className="group flex h-full flex-col gap-3 p-6 lg:p-7">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--scene-glow)]">
                      {item.category}
                    </span>
                    <span className="t-h4 text-ink transition-colors group-hover:text-[var(--scene-glow)]">
                      {item.title}
                    </span>
                    <span className="t-body flex-1 text-[0.875rem]">{item.excerpt}</span>
                    <span className="inline-flex items-center gap-2 text-[13px] text-[var(--scene-glow)]">
                      Read
                      <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaSection id="post-cta" />
    </>
  );
}
