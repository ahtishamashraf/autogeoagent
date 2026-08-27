import FeaturePage from '@/components/sections/FeaturePage';
import PipelineVisual from '@/components/visuals/PipelineVisual';
import { seoForAgencies } from '@/content/solutions';
import { buildMetadata } from '@/lib/metadata';

const description =
  'SEO and GEO for agencies: run one consistent method across many client sites, keep research and reporting repeatable, and show clients movement they can verify.';

export const metadata = buildMetadata({
  title: 'SEO for Agencies',
  description,
  path: '/seo-for-agencies',
  ogKicker: 'Agencies',
  keywords: ['SEO for agencies', 'agency SEO software', 'white label SEO automation', 'multi-client SEO', 'agency GEO services'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={seoForAgencies}
      description={description}
      section="Solutions"
      sectionHref="/seo-for-agencies"
      related={['/seo-audit', '/seo-monitoring', '/how-it-works']}
      visual={
        <PipelineVisual
          label="One method, many clients"
          note="Illustrative — depicts the repeatable engagement sequence"
          payload="Client site → the same method every time"
          stages={['Audit', 'Research', 'Plan', 'Produce', 'Review', 'Report']}
          output="The same standard applied whoever runs the account"
        />
      }
    />
  );
}
