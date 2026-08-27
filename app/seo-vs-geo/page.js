import LearnArticle from '@/components/sections/LearnArticle';
import { seoVsGeo } from '@/content/learn/seo-vs-geo';
import { buildMetadata } from '@/lib/metadata';

const description =
  'A side-by-side comparison of search engine optimization and generative engine optimization: what differs, what overlaps, and why GEO extends SEO.';

export const metadata = buildMetadata({
  title: "SEO vs GEO: What's the Difference?",
  description,
  path: '/seo-vs-geo',
  ogKicker: 'Comparison',
  keywords: ['SEO vs GEO', 'GEO vs SEO', 'difference between SEO and GEO', 'generative engine optimization', 'AI search optimization'],
  type: 'article',
});

export default function Page() {
  return <LearnArticle doc={seoVsGeo} description={description} related={['/what-is-geo', '/generative-engine-optimization', '/geo-optimization']} />;
}
