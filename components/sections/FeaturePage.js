import Container from '@/components/ui/Container';
import PageHero from './PageHero';
import ArticleBody from './ArticleBody';
import TableOfContents from './TableOfContents';
import FaqSection from './FaqSection';
import RelatedLinks from './RelatedLinks';
import CtaSection from './CtaSection';
import Button from '@/components/ui/Button';
import FeatureCta from './FeatureCta';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/seo';
import { site } from '@/lib/site';

/**
 * Shared layout for product and solution pages.
 *
 * Each page supplies its own visualization, so the pages share a design system
 * without sharing content. Everything below the hero is that page's own.
 */
export default function FeaturePage({
  doc,
  description,
  visual,
  related = [],
  section = 'Product',
  sectionHref = '/features',
  children,
}) {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: section, href: sectionHref },
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

      <PageHero eyebrow={doc.eyebrow} title={doc.title} lead={doc.lead} breadcrumbs={breadcrumbs}>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href={site.app.signup} size="lg" withArrow>
            Start Free
          </Button>
          {doc.secondaryCta ? (
            <FeatureCta href={doc.secondaryCta.href} slug={doc.slug} label={doc.secondaryCta.label} />
          ) : null}
        </div>
      </PageHero>

      {visual ? (
        <Container className="pb-16 lg:pb-20">
          <div className="mx-auto max-w-5xl">{visual}</div>
        </Container>
      ) : null}

      <Container className="pb-20 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <article>
            <ArticleBody blocks={doc.blocks} />
          </article>
          <aside className="order-first lg:order-last">
            <TableOfContents blocks={doc.blocks} />
          </aside>
        </div>
      </Container>

      {children}

      {doc.faqs?.length ? (
        <FaqSection id="page-faq" faqs={doc.faqs} eyebrow="FAQ" title="Related questions" />
      ) : null}

      <RelatedLinks paths={related} />
      <CtaSection id="feature-cta" />
    </>
  );
}
