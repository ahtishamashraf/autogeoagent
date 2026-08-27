import Container from '@/components/ui/Container';
import PageHero from './PageHero';
import ArticleBody from './ArticleBody';
import TableOfContents from './TableOfContents';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/seo';

export default function LegalPage({ doc, path, description }) {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: doc.title }];

  return (
    <>
      <JsonLd
        id={`${path.replace(/\//g, '')}-graph`}
        data={graph([
          webPageSchema({ path, title: doc.title, description, breadcrumb: true }),
          breadcrumbSchema(breadcrumbs, path),
        ])}
      />

      <PageHero eyebrow="Legal" title={doc.title} lead={doc.lead} breadcrumbs={breadcrumbs} />

      <Container className="pb-20 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <article>
            <p className="text-xs text-faint">
              Last updated{' '}
              <time dateTime={doc.updated}>
                {new Date(doc.updated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </p>
            <ArticleBody blocks={doc.blocks} className="mt-6" />
          </article>
          <aside className="order-first lg:order-last">
            <TableOfContents blocks={doc.blocks} title="Sections" />
          </aside>
        </div>
      </Container>
    </>
  );
}
