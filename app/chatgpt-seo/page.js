import LearnArticle from '@/components/sections/LearnArticle';
import { chatgptSeo } from '@/content/ai-search/chatgpt-seo';
import { buildMetadata } from '@/lib/metadata';

const description =
  'How ChatGPT Search retrieves and cites pages, how OAI-SearchBot differs from GPTBot, and the practical work that makes your content a plausible source.';

export const metadata = buildMetadata({
  title: 'ChatGPT SEO: How to Be Found in AI Answers',
  description,
  path: '/chatgpt-seo',
  ogKicker: 'AI Search',
  keywords: ['ChatGPT SEO', 'ChatGPT search optimization', 'OAI-SearchBot', 'AI citations', 'ChatGPT visibility'],
  type: 'article',
});

export default function Page() {
  return <LearnArticle doc={chatgptSeo} description={description} related={['/ai-search-optimization', '/generative-engine-optimization', '/ai-visibility-tracking']} />;
}
