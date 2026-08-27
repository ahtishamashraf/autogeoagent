import FeaturePage from '@/components/sections/FeaturePage';
import PipelineVisual from '@/components/visuals/PipelineVisual';
import { technicalSeo } from '@/content/product/technical-seo';
import { buildMetadata } from '@/lib/metadata';

const description =
  'Crawling, indexing, canonicals, structured data and page performance — checked continuously and watched for regressions rather than audited once.';

export const metadata = buildMetadata({
  title: 'Technical SEO Monitoring',
  description,
  path: '/technical-seo',
  ogKicker: 'TechnicalSeo',
  keywords: ['technical SEO', 'crawlability', 'indexability', 'canonical URLs', 'structured data', 'core web vitals'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={technicalSeo}
      description={description}
      related={['/seo-audit', '/internal-linking', '/ai-search-optimization']}
      visual={
        <PipelineVisual
          label="Indexing pipeline"
          payload="A page on your site"
          stages={['Discoverable', 'Crawlable', 'Renderable', 'Indexable', 'Understandable', 'Retrievable']}
          output="Eligible for search and AI retrieval"
        />
      }
    />
  );
}
