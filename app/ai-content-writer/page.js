import FeaturePage from '@/components/sections/FeaturePage';
import PipelineVisual from '@/components/visuals/PipelineVisual';
import { aiContentWriter } from '@/content/product/ai-content-writer';
import { buildMetadata } from '@/lib/metadata';

const description =
  'Research-driven AI drafts built from a real brief: target intent, required coverage, named entities, planned internal links and metadata generated alongside the draft.';

export const metadata = buildMetadata({
  title: 'AI Content Writer for SEO',
  description,
  path: '/ai-content-writer',
  ogKicker: 'AiContentWriter',
  keywords: ['AI content writer', 'AI SEO content', 'SEO content generation', 'AI article writer', 'research driven AI content'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={aiContentWriter}
      description={description}
      related={['/content-planner', '/content-optimizer', '/geo-optimization']}
      visual={
        <PipelineVisual
          label="Draft pipeline"
          payload="Brief — “how to automate SEO”"
          stages={['Research', 'Intent', 'Structure', 'Draft', 'Optimize', 'Links', 'Metadata']}
          output="Draft ready for editorial review"
        />
      }
    />
  );
}
