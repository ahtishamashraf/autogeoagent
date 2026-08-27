import FeaturePage from '@/components/sections/FeaturePage';
import PipelineVisual from '@/components/visuals/PipelineVisual';
import { seoForLocalBusiness } from '@/content/solutions';
import { buildMetadata } from '@/lib/metadata';

const description =
  'Local SEO and GEO: consistent business details everywhere, service and location pages that are genuinely different, and answers to what callers ask.';

export const metadata = buildMetadata({
  title: 'SEO for Local Businesses',
  description,
  path: '/seo-for-local-business',
  ogKicker: 'Local',
  keywords: ['local SEO', 'SEO for local business', 'NAP consistency', 'local service pages', 'local business GEO'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={seoForLocalBusiness}
      description={description}
      section="Solutions"
      sectionHref="/seo-for-local-business"
      related={['/technical-seo', '/content-planner', '/ai-visibility-tracking']}
      visual={
        <PipelineVisual
          label="Local consistency check"
          note="Illustrative — depicts the checks, not live listing data"
          payload="Business details → every place they appear"
          stages={['Details', 'Listings', 'Service', 'Location', 'Reviews', 'Schema']}
          output="One consistent set of facts wherever the business is described"
        />
      }
    />
  );
}
