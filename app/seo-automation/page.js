import ProductArticle from '@/components/sections/ProductArticle';
import WorkflowSection from '@/components/sections/WorkflowSection';
import { seoAutomation } from '@/content/product';
import { buildMetadata } from '@/lib/metadata';

const description =
  'Automate keyword research, search intent analysis, content structure, metadata, internal linking and monitoring with an AI SEO agent that runs continuously.';

export const metadata = buildMetadata({
  title: 'SEO Automation Software',
  description,
  path: '/seo-automation',
  ogKicker: 'SEO Automation',
  keywords: [
    'SEO automation',
    'automated SEO',
    'AI SEO software',
    'automated keyword research',
    'SEO content automation',
    'technical SEO automation',
  ],
});

export default function Page() {
  return (
    <ProductArticle
      doc={seoAutomation}
      description={description}
      related={['/geo-optimization', '/ai-seo-agent', '/how-it-works']}
    >
      <WorkflowSection id="seo-workflow" />
    </ProductArticle>
  );
}
