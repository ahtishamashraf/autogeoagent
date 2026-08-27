import LearnArticle from '@/components/sections/LearnArticle';
import { perplexitySeo } from '@/content/ai-search/perplexity-seo';
import { buildMetadata } from '@/lib/metadata';

const description =
  'Answer-first engines cite inline, which rewards a specific kind of writing: one claim per sentence, named subjects, and definitions that can be lifted intact.';

export const metadata = buildMetadata({
  title: 'Perplexity SEO: Writing Quotable Pages',
  description,
  path: '/perplexity-seo',
  ogKicker: 'AI Search',
  keywords: ['Perplexity SEO', 'answer engine optimization', 'quotable content', 'AI citations', 'inline citations'],
  type: 'article',
});

export default function Page() {
  return <LearnArticle doc={perplexitySeo} description={description} related={['/chatgpt-seo', '/generative-engine-optimization', '/content-optimizer']} />;
}
