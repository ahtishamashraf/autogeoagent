import LearnArticle from '@/components/sections/LearnArticle';
import { aiSearchOptimization } from '@/content/learn/ai-search-optimization';
import { buildMetadata } from '@/lib/metadata';

const description =
  'How AI search surfaces retrieve and generate answers, and how to build visibility across AI Overviews, AI Mode, ChatGPT Search, Gemini, Perplexity and Copilot.';

export const metadata = buildMetadata({
  title: 'AI Search Optimization Guide',
  description,
  path: '/ai-search-optimization',
  ogKicker: 'AI Search',
  keywords: ['AI search optimization', 'AI Overview optimization', 'ChatGPT SEO', 'Gemini SEO', 'Perplexity SEO', 'AI search visibility'],
  type: 'article',
});

export default function Page() {
  return <LearnArticle doc={aiSearchOptimization} description={description} related={['/what-is-geo', '/seo-vs-geo', '/generative-engine-optimization']} />;
}
