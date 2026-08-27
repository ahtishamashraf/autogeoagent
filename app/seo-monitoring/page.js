import FeaturePage from '@/components/sections/FeaturePage';
import MonitoringVisual from '@/components/visuals/MonitoringVisual';
import { seoMonitoring } from '@/content/product/seo-monitoring';
import { buildMetadata } from '@/lib/metadata';

const description =
  'Rankings, impressions, clicks and page-level performance in one view — with content decay detection and a short list of what to do next.';

export const metadata = buildMetadata({
  title: 'SEO Monitoring & Reporting',
  description,
  path: '/seo-monitoring',
  ogKicker: 'SeoMonitoring',
  keywords: ['SEO monitoring', 'rank tracking', 'content decay', 'SEO reporting', 'organic visibility'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={seoMonitoring}
      description={description}
      related={['/ai-visibility-tracking', '/content-optimizer', '/seo-audit']}
      visual={
        <MonitoringVisual />
      }
    />
  );
}
