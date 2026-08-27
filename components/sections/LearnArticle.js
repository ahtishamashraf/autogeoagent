import Container from '@/components/ui/Container';
import PageHero from './PageHero';
import ArticleBody from './ArticleBody';
import TableOfContents from './TableOfContents';
import FaqSection from './FaqSection';
import RelatedLinks from './RelatedLinks';
import CtaSection from './CtaSection';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/seo';

/**
 * Shared layout for the educational resources. One template keeps heading
 * hierarchy, structured data and internal linking consistent across every
 * long-form page.
 */
export default function LearnArticle({ doc, related = [], description }) {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: '/what-is-geo' },
    { label: doc.title },
  ];

  return (
    <>
      <JsonLd
        id={`${doc.slug.replace(/\//g, '')}-graph`}
        data={graph([
          webPageSchema({
            path: doc.slug,
            title: doc.title,
            description: description || doc.lead,
            breadcrumb: true,
          }),
          breadcrumbSchema(breadcrumbs, doc.slug),
          doc.faqs?.length ? faqSchema(doc.faqs, doc.slug) : null,
        ])}
      />

      <PageHero
        eyebrow={doc.eyebrow}
        title={doc.title}
        lead={doc.lead}
        breadcrumbs={breadcrumbs}
      />

      <Container className="pb-20 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <article>
            <ArticleBody blocks={doc.blocks} />
            {doc.updated ? (
              <p className="mt-14 border-t border-white/8 pt-6 text-xs text-faint">
                Last updated{' '}
                <time dateTime={doc.updated}>
                  {new Date(doc.updated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </p>
            ) : null}
          </article>

          <aside className="order-first lg:order-last">
            <TableOfContents blocks={doc.blocks} />
          </aside>
        </div>
      </Container>

      {doc.faqs?.length ? (
        <FaqSection
          id="page-faq"
          faqs={doc.faqs}
          eyebrow="FAQ"
          title="Related questions"
        />
      ) : null}

      <RelatedLinks paths={related} />
      <CtaSection id="learn-cta" />
    </>
  );
}
