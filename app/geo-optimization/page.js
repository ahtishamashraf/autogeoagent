import ProductArticle from '@/components/sections/ProductArticle';
import SeoGeoSection from '@/components/sections/SeoGeoSection';
import { geoOptimization } from '@/content/product';
import { buildMetadata } from '@/lib/metadata';

const description =
  'GEO optimization software for AI search: question coverage, entity clarity, answer-ready structure, structured data and AI visibility monitoring.';

export const metadata = buildMetadata({
  title: 'GEO Optimization Software',
  description,
  path: '/geo-optimization',
  ogKicker: 'GEO Optimization',
  keywords: [
    'GEO optimization',
    'GEO software',
    'generative engine optimization',
    'AI search visibility',
    'AI answer optimization',
    'AI citations',
  ],
});

export default function Page() {
  return (
    <ProductArticle
      doc={geoOptimization}
      description={description}
      related={['/what-is-geo', '/ai-search-optimization', '/seo-automation']}
    >
      <SeoGeoSection id="geo-comparison" />
    </ProductArticle>
  );
}
