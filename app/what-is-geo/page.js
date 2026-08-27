import LearnArticle from '@/components/sections/LearnArticle';
import { whatIsGeo } from '@/content/learn/what-is-geo';
import { buildMetadata } from '@/lib/metadata';

const description =
  'Generative Engine Optimization (GEO) is the practice of improving content so AI search and answer systems can understand, evaluate and cite it. A complete guide.';

export const metadata = buildMetadata({
  title: 'What is Generative Engine Optimization (GEO)?',
  description,
  path: '/what-is-geo',
  ogKicker: 'Learn',
  keywords: ['what is GEO', 'generative engine optimization', 'GEO meaning', 'GEO vs SEO', 'AI search visibility'],
  type: 'article',
});

export default function Page() {
  return <LearnArticle doc={whatIsGeo} description={description} related={['/seo-vs-geo', '/generative-engine-optimization', '/ai-search-optimization']} />;
}
