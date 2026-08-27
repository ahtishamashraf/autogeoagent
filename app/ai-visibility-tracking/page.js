import FeaturePage from '@/components/sections/FeaturePage';
import AiVisibilityVisual from '@/components/visuals/AiVisibilityVisual';
import { aiVisibilityTracking } from '@/content/product/ai-visibility-tracking';
import { buildMetadata } from '@/lib/metadata';

const description =
  'A fixed prompt set checked on a schedule across AI answer surfaces, recording whether you appear, how you are described and who is cited instead.';

export const metadata = buildMetadata({
  title: 'AI Search Visibility Tracking',
  description,
  path: '/ai-visibility-tracking',
  ogKicker: 'AiVisibilityTracking',
  keywords: ['AI visibility tracking', 'AI search visibility', 'LLM visibility monitoring', 'generative search visibility', 'AI citation tracking'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={aiVisibilityTracking}
      description={description}
      related={['/geo-optimization', '/ai-search-optimization', '/seo-monitoring']}
      visual={
        <AiVisibilityVisual />
      }
    />
  );
}
