import LearnArticle from '@/components/sections/LearnArticle';
import { googleAiMode } from '@/content/ai-search/google-ai-mode';
import { buildMetadata } from '@/lib/metadata';

const description =
  'How conversational search changes a session, why topic coverage matters more than a single page, and how to map the follow-up questions that decide a purchase.';

export const metadata = buildMetadata({
  title: 'Google AI Mode and Conversational Search',
  description,
  path: '/google-ai-mode',
  ogKicker: 'AI Search',
  keywords: ['Google AI Mode', 'conversational search', 'AI search sessions', 'topical coverage', 'follow-up queries'],
  type: 'article',
});

export default function Page() {
  return <LearnArticle doc={googleAiMode} description={description} related={['/google-ai-overviews', '/ai-search-optimization', '/content-planner']} />;
}
