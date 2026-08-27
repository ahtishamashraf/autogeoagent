import FeaturePage from '@/components/sections/FeaturePage';
import CrawlVisual from '@/components/visuals/CrawlVisual';
import { seoAudit } from '@/content/product/seo-audit';
import { buildMetadata } from '@/lib/metadata';

const description =
  'A crawl that ends in an ordered fix list rather than a score — every finding tied to a URL, a change and a reason, sorted by consequence.';

export const metadata = buildMetadata({
  title: 'Automated SEO Audit',
  description,
  path: '/seo-audit',
  ogKicker: 'SeoAudit',
  keywords: ['automated SEO audit', 'SEO audit tool', 'technical SEO audit', 'site audit', 'SEO crawler'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={seoAudit}
      description={description}
      related={['/technical-seo', '/content-optimizer', '/seo-monitoring']}
      visual={
        <CrawlVisual label="Site crawl" />
      }
    />
  );
}
