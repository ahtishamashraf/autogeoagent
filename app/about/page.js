import Container from '@/components/ui/Container';
import PageHero from '@/components/sections/PageHero';
import ArticleBody from '@/components/sections/ArticleBody';
import RelatedLinks from '@/components/sections/RelatedLinks';
import CtaSection from '@/components/sections/CtaSection';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, graph, organizationSchema, webPageSchema } from '@/lib/seo';
import { about } from '@/content/product';

const description =
  'GetGeoAgent is an AI agent for SEO and Generative Engine Optimization. Why it exists, the principles behind it, and what the product does today.';

export const metadata = buildMetadata({
  title: 'About',
  description,
  path: '/about',
  ogKicker: 'About',
  keywords: ['about GetGeoAgent', 'AI SEO company', 'GEO software company'],
});

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'About' }];

export default function Page() {
  return (
    <>
      <JsonLd
        id="about-graph"
        data={graph([
          organizationSchema(),
          webPageSchema({ path: '/about', title: 'About', description, breadcrumb: true }),
          breadcrumbSchema(breadcrumbs, '/about'),
        ])}
      />

      <PageHero
        eyebrow={about.eyebrow}
        title={about.title}
        lead={about.lead}
        breadcrumbs={breadcrumbs}
      />

      <Container className="pb-20 lg:pb-28">
        <ArticleBody blocks={about.blocks} />
      </Container>

      <RelatedLinks paths={['/features', '/how-it-works', '/contact']} />
      <CtaSection id="about-cta" />
    </>
  );
}
