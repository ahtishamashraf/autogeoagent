import FeaturePage from '@/components/sections/FeaturePage';
import PipelineVisual from '@/components/visuals/PipelineVisual';
import { seoForEcommerce } from '@/content/solutions';
import { buildMetadata } from '@/lib/metadata';

const description =
  'Ecommerce SEO and GEO: category depth, product detail that answers real questions, faceted navigation that spares crawl budget, and buying guides.';

export const metadata = buildMetadata({
  title: 'SEO for Ecommerce',
  description,
  path: '/seo-for-ecommerce',
  ogKicker: 'Ecommerce',
  keywords: ['ecommerce SEO', 'category page SEO', 'faceted navigation SEO', 'product page optimization', 'ecommerce GEO'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={seoForEcommerce}
      description={description}
      section="Solutions"
      sectionHref="/seo-for-ecommerce"
      related={['/technical-seo', '/seo-audit', '/content-optimizer']}
      visual={
        <PipelineVisual
          label="Catalogue to answer"
          note="Illustrative — shows the order of work, not store performance"
          payload="Catalogue → what a shopper actually asks"
          stages={['Crawl', 'Facets', 'Category', 'Product', 'Guides', 'Schema']}
          output="Indexable pages that answer the question behind the purchase"
        />
      }
    />
  );
}
