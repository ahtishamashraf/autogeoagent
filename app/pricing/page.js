import PageHero from '@/components/sections/PageHero';
import PricingSection from '@/components/sections/PricingSection';
import FaqSection from '@/components/sections/FaqSection';
import RelatedLinks from '@/components/sections/RelatedLinks';
import CtaSection from '@/components/sections/CtaSection';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from '@/lib/seo';
import { pricingFaqs } from '@/content/faqs';

const description =
  'How GetGeoAgent plans are structured, what drives cost, and what is included in every plan. Current prices are shown in the application.';

export const metadata = buildMetadata({
  title: 'Pricing',
  description,
  path: '/pricing',
  ogKicker: 'Pricing',
  keywords: ['GetGeoAgent pricing', 'SEO automation pricing', 'AI SEO software pricing'],
});

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Pricing' }];

export default function Page() {
  return (
    <>
      <JsonLd
        id="pricing-graph"
        data={graph([
          webPageSchema({ path: '/pricing', title: 'Pricing', description, breadcrumb: true }),
          breadcrumbSchema(breadcrumbs, '/pricing'),
          faqSchema(pricingFaqs, '/pricing'),
        ])}
      />

      <PageHero
        eyebrow="Pricing"
        title="Pay for the scope of work, not the number of seats"
        lead="Every plan includes the full workflow. What changes is how much ground the agent covers and how often it runs."
        breadcrumbs={breadcrumbs}
      />

      <PricingSection id="plans" />
      <FaqSection id="pricing-faq" faqs={pricingFaqs} eyebrow="Billing" title="Pricing questions" />
      <RelatedLinks paths={['/features', '/how-it-works', '/contact']} />
      <CtaSection id="pricing-cta" />
    </>
  );
}
