import LearnArticle from '@/components/sections/LearnArticle';
import { googleAiOverviews } from '@/content/ai-search/google-ai-overviews';
import { buildMetadata } from '@/lib/metadata';

const description =
  'What AI Overviews are, why conventional SEO still decides eligibility, and what genuinely changes about content strategy when answers appear above results.';

export const metadata = buildMetadata({
  title: 'Google AI Overviews: What Changes for SEO',
  description,
  path: '/google-ai-overviews',
  ogKicker: 'AI Search',
  keywords: ['Google AI Overviews', 'AI Overview optimization', 'SGE', 'AI search results', 'Google AI search'],
  type: 'article',
});

export default function Page() {
  return <LearnArticle doc={googleAiOverviews} description={description} related={['/google-ai-mode', '/ai-search-optimization', '/seo-vs-geo']} />;
}
