import Container from '@/components/ui/Container';
import PageHero from '@/components/sections/PageHero';
import PricingSection from '@/components/sections/PricingSection';
import PricingComparison from '@/components/sections/PricingComparison';
import FaqSection from '@/components/sections/FaqSection';
import RelatedLinks from '@/components/sections/RelatedLinks';
import CtaSection from '@/components/sections/CtaSection';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, offerCatalogSchema, webPageSchema } from '@/lib/seo';
import { pricingFaqs } from '@/content/faqs';
import { pricing } from '@/lib/pricing';

const description =
  'GetGeoAgent pricing: a free plan plus Starter, Growth and Agency tiers. Compare websites, content generations, AI visibility monitoring and support.';

export const metadata = buildMetadata({
  title: 'Pricing',
  description,
  path: '/pricing',
  ogKicker: 'Pricing',
  keywords: [
    'GetGeoAgent pricing',
    'SEO automation pricing',
    'AI SEO software pricing',
    'GEO software pricing',
  ],
});

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Pricing' }];

const included = [
  {
    title: 'The whole workflow, on every plan',
    body: 'Research, strategy, content, publishing checks, monitoring and continuous optimization are not gated. Plans change scope, not capability.',
  },
  {
    title: 'Scope is what you pay for',
    body: 'How many websites the agent covers, how much content it produces each month, and how deeply it tracks search and AI visibility.',
  },
  {
    title: 'Start without paying',
    body: 'The Free plan connects one site and runs a limited analysis, so you can judge the output before committing.',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        id="pricing-graph"
        data={graph([
          webPageSchema({ path: '/pricing', title: 'Pricing', description, breadcrumb: true }),
          breadcrumbSchema(breadcrumbs, '/pricing'),
          offerCatalogSchema(),
          faqSchema(pricingFaqs, '/pricing'),
        ])}
      />

      <PageHero
        eyebrow="Pricing"
        title="Pay for scope, not for seats"
        lead="Every plan runs the full SEO and GEO workflow. What changes is how much ground the agent covers and how often it runs."
        breadcrumbs={breadcrumbs}
      />

      <PricingSection id="plans" heading="Choose the scope you need" lead={pricing.billingNote} />

      <Container className="pb-4">
        <div className="grid gap-px overflow-hidden border-y border-white/8 bg-white/8 lg:grid-cols-3">
          {included.map((item) => (
            <div key={item.title} className="bg-void py-8 lg:px-8">
              <h2 className="t-h4 text-ink">{item.title}</h2>
              <p className="t-body mt-3 text-[0.9rem]">{item.body}</p>
            </div>
          ))}
        </div>
      </Container>

      <PricingComparison id="compare" />
      <FaqSection id="pricing-faq" faqs={pricingFaqs} eyebrow="Billing" title="Pricing questions" />
      <RelatedLinks paths={['/features', '/how-it-works', '/contact']} />
      <CtaSection id="pricing-cta" />
    </>
  );
}
