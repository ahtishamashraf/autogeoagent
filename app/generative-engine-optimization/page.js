import LearnArticle from '@/components/sections/LearnArticle';
import { generativeEngineOptimization } from '@/content/learn/generative-engine-optimization';
import { buildMetadata } from '@/lib/metadata';

const description =
  'The full GEO discipline — entity clarity, extractable structure, citability, technical foundations and measurement — and how to run it as a continuous programme.';

export const metadata = buildMetadata({
  title: 'Generative Engine Optimization Explained',
  description,
  path: '/generative-engine-optimization',
  ogKicker: 'Discipline',
  keywords: ['generative engine optimization', 'GEO optimization', 'GEO strategy', 'AI citations', 'entity optimization'],
  type: 'article',
});

export default function Page() {
  return <LearnArticle doc={generativeEngineOptimization} description={description} related={['/what-is-geo', '/ai-search-optimization', '/geo-optimization']} />;
}
