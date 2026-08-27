import FeaturePage from '@/components/sections/FeaturePage';
import KeywordGraphVisual from '@/components/visuals/KeywordGraphVisual';
import { keywordResearch } from '@/content/product/keyword-research';
import { buildMetadata } from '@/lib/metadata';

const description =
  'Expand a seed topic into the real query space, classify every query by search intent, cluster them into pages you can own, and map them against your existing site.';

export const metadata = buildMetadata({
  title: 'AI Keyword Research & Clustering',
  description,
  path: '/keyword-research',
  ogKicker: 'KeywordResearch',
  keywords: ['AI keyword research', 'automated keyword research', 'keyword clustering', 'search intent analysis', 'SEO keyword research software'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={keywordResearch}
      description={description}
      related={['/content-planner', '/content-optimizer', '/seo-automation']}
      visual={
        <KeywordGraphVisual />
      }
    />
  );
}
