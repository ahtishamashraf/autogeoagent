import FeaturePage from '@/components/sections/FeaturePage';
import ContentCalendarVisual from '@/components/visuals/ContentCalendarVisual';
import { contentPlanner } from '@/content/product/content-planner';
import { buildMetadata } from '@/lib/metadata';

const description =
  'Turn keyword clusters into a sequenced editorial plan: pillars, supporting pages, refreshes and the order that lets internal links actually land.';

export const metadata = buildMetadata({
  title: 'AI SEO Content Planner',
  description,
  path: '/content-planner',
  ogKicker: 'ContentPlanner',
  keywords: ['SEO content planner', 'content planning software', 'topical map', 'content calendar SEO', 'pillar and cluster planning'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={contentPlanner}
      description={description}
      related={['/keyword-research', '/ai-content-writer', '/internal-linking']}
      visual={
        <ContentCalendarVisual />
      }
    />
  );
}
