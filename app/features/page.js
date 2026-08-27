import PageHero from '@/components/sections/PageHero';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import CapabilityIndex from '@/components/sections/CapabilityIndex';
import RelatedLinks from '@/components/sections/RelatedLinks';
import CtaSection from '@/components/sections/CtaSection';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, graph, softwareSchema, webPageSchema } from '@/lib/seo';
import { site } from '@/lib/site';

const description =
  'Every capability in the GetGeoAgent platform: continuous research, intent analysis, topical maps, content creation, structured data, internal links and monitoring.';

export const metadata = buildMetadata({
  title: 'Platform Features',
  description,
  path: '/features',
  ogKicker: 'Platform',
  keywords: [
    'SEO platform features',
    'AI SEO features',
    'content optimization platform',
    'GEO software features',
    'SEO automation platform',
  ],
});

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Features' }];

export default function Page() {
  return (
    <>
      <JsonLd
        id="features-graph"
        data={graph([
          softwareSchema(),
          webPageSchema({
            path: '/features',
            title: 'Platform Features',
            description,
            breadcrumb: true,
          }),
          breadcrumbSchema(breadcrumbs, '/features'),
        ])}
      />

      <PageHero
        eyebrow="Platform"
        title="One agent. The whole search workflow."
        lead="GetGeoAgent replaces a stack of disconnected tools with a single workflow that reads from one picture of your site — and keeps running."
        breadcrumbs={breadcrumbs}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href={site.app.signup} size="lg" withArrow>
            Start Growing
          </Button>
          <Button href="/pricing" variant="secondary" size="lg" magnetic={false}>
            See pricing
          </Button>
        </div>
      </PageHero>

      <CapabilitiesSection />
      <CapabilityIndex />
      <RelatedLinks
        paths={['/how-it-works', '/seo-automation', '/geo-optimization']}
        title="Where these fit together"
      />
      <CtaSection id="features-cta" />
    </>
  );
}
