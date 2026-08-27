import LearnArticle from '@/components/sections/LearnArticle';
import { geminiSeo } from '@/content/ai-search/gemini-seo';
import { buildMetadata } from '@/lib/metadata';

const description =
  'What grounding means for content, why verifiable and internally consistent pages are rewarded, and how to make your site usable as evidence.';

export const metadata = buildMetadata({
  title: 'Gemini SEO: Optimizing for Grounded Answers',
  description,
  path: '/gemini-seo',
  ogKicker: 'AI Search',
  keywords: ['Gemini SEO', 'grounded AI answers', 'AI grounding', 'entity consistency', 'verifiable content'],
  type: 'article',
});

export default function Page() {
  return <LearnArticle doc={geminiSeo} description={description} related={['/ai-search-optimization', '/generative-engine-optimization', '/technical-seo']} />;
}
