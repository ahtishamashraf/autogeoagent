import FeaturePage from '@/components/sections/FeaturePage';
import PipelineVisual from '@/components/visuals/PipelineVisual';
import { seoForSaas } from '@/content/solutions';
import { buildMetadata } from '@/lib/metadata';

const description =
  'SEO and GEO for SaaS companies: own the problem your product solves, cover the buying chain from symptom to pricing, and stay present when assistants build a shortlist.';

export const metadata = buildMetadata({
  title: 'SEO for SaaS',
  description,
  path: '/seo-for-saas',
  ogKicker: 'SaaS',
  keywords: ['SaaS SEO', 'SEO for SaaS companies', 'B2B SaaS content strategy', 'SaaS GEO', 'SaaS comparison pages'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={seoForSaas}
      description={description}
      section="Solutions"
      sectionHref="/seo-for-saas"
      related={['/content-planner', '/ai-visibility-tracking', '/keyword-research']}
      visual={
        <PipelineVisual
          label="SaaS buying chain"
          note="Illustrative — shows how coverage is sequenced, not measured demand"
          payload="Seed: the problem your product solves"
          stages={['Symptom', 'Approach', 'Category', 'Comparison', 'Alternatives', 'Pricing']}
          output="Coverage across every step, not only the last three"
        />
      }
    />
  );
}
