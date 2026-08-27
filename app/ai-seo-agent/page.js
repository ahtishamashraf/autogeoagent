import ProductArticle from '@/components/sections/ProductArticle';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
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
      related={['/seo-automation', '/geo-optimization', '/features']}
    >
      <CapabilitiesSection id="agent-capabilities" />
    </ProductArticle>
  );
}
