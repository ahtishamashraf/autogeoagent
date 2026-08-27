import Experience from '@/components/experience/Experience';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import WhySection from '@/components/sections/WhySection';
import SeoGeoSection from '@/components/sections/SeoGeoSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import PricingSection from '@/components/sections/PricingSection';
import FaqSection from '@/components/sections/FaqSection';
import CtaSection from '@/components/sections/CtaSection';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { faqSchema, graph, softwareSchema, webPageSchema } from '@/lib/seo';
import { homeFaqs } from '@/content/faqs';

export const metadata = buildMetadata({
  title: 'GetGeoAgent — AI SEO & GEO Automation Platform',
  description:
    'Automate SEO and Generative Engine Optimization with an AI agent that researches opportunities, writes optimized content and grows visibility in AI search.',
  path: '/',
  ogTitle: 'Your AI Agent for SEO & GEO',
  ogKicker: 'AI SEO + GEO Agent',
  keywords: [
    'AI SEO agent',
    'SEO automation',
    'automated SEO',
    'GEO optimization',
    'generative engine optimization',
    'AI search optimization',
    'AI search visibility',
    'SEO and GEO platform',
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        id="home-graph"
        data={graph([
          softwareSchema(),
          webPageSchema({
            path: '/',
            title: 'GetGeoAgent — AI SEO & GEO Automation Platform',
            description:
              'An AI agent for SEO and Generative Engine Optimization: research, strategy, content, publishing, monitoring and continuous improvement.',
          }),
          faqSchema(homeFaqs, '/'),
        ])}
      />

      {/* The cinematic scroll experience */}
      <Experience />

      {/* Deeper, crawlable content — not a repeat of the story above */}
      <div className="relative z-10 bg-void">
        <CapabilitiesSection />
        <SeoGeoSection />
        <WhySection />
        <UseCasesSection />
        <PricingSection compact />
        <FaqSection faqs={homeFaqs} lead="What GetGeoAgent does, what it does not claim to do, and how to start." />
        <CtaSection />
      </div>
    </>
  );
}
