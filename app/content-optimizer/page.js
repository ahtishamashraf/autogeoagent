import FeaturePage from '@/components/sections/FeaturePage';
import OptimizerVisual from '@/components/visuals/OptimizerVisual';
import { contentOptimizer } from '@/content/product/content-optimizer';
import { buildMetadata } from '@/lib/metadata';

const description =
  'Point the agent at a page you already have. It finds the coverage, structure, entity and linking gaps against the query it should own, and proposes each specific fix.';

export const metadata = buildMetadata({
  title: 'SEO Content Optimization',
  description,
  path: '/content-optimizer',
  ogKicker: 'ContentOptimizer',
  keywords: ['content optimization', 'SEO content optimization', 'AI content optimization', 'content refresh', 'on-page optimization'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={contentOptimizer}
      description={description}
      related={['/seo-audit', '/keyword-research', '/seo-monitoring']}
      visual={
        <OptimizerVisual />
      }
    />
  );
}
