import ProductArticle from '@/components/sections/ProductArticle';
import PipelineVisual from '@/components/visuals/PipelineVisual';
import { aiSeoAgent } from '@/content/product';
import { buildMetadata } from '@/lib/metadata';

const description =
  'An AI SEO agent runs the whole search workflow — research, strategy, content, publishing and measurement — on a continuous cycle, keeping state between runs.';

export const metadata = buildMetadata({
  title: 'AI SEO Agent',
  description,
  path: '/ai-seo-agent',
  ogKicker: 'AI SEO Agent',
  keywords: [
    'AI SEO agent',
    'AI SEO software',
    'autonomous SEO',
    'SEO agent',
    'AI content strategy',
    'AI search engine optimization',
  ],
});

export default function Page() {
  return (
    <ProductArticle
      doc={aiSeoAgent}
      description={description}
      related={['/how-it-works', '/features', '/seo-automation']}
      visual={
        <PipelineVisual
          label="Agent decision cycle"
          note="Illustrative — depicts the decision sequence"
          payload="State from the last run → what to do next"
          stages={['Observe', 'Compare', 'Decide', 'Act', 'Record']}
          output="A next action chosen from evidence, not from a schedule"
        />
      }
    />
  );
}
