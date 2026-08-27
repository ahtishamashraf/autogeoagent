import Container from '@/components/ui/Container';
import PageHero from '@/components/sections/PageHero';
import LoopWalkthrough from '@/components/sections/LoopWalkthrough';
import RelatedLinks from '@/components/sections/RelatedLinks';
import CtaSection from '@/components/sections/CtaSection';
import FaqSection from '@/components/sections/FaqSection';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, faqSchema, graph, howToSchema, webPageSchema } from '@/lib/seo';
import { loopFaqs, loopStages } from '@/content/how-it-works';
import { site } from '@/lib/site';

const description =
  'The eight stages of the GetGeoAgent loop — discover, understand, plan, create, optimize, publish, measure, improve — and how the last one feeds the first.';

export const metadata = buildMetadata({
  title: 'How It Works',
  description,
  path: '/how-it-works',
  ogKicker: 'Workflow',
  keywords: [
    'how AI SEO works',
    'SEO workflow',
    'AI SEO agent workflow',
    'SEO automation process',
    'GEO workflow',
  ],
});

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'How It Works' }];

export default function Page() {
  return (
    <>
      <JsonLd
        id="how-graph"
        data={graph([
          webPageSchema({
            path: '/how-it-works',
            title: 'How It Works',
            description,
            breadcrumb: true,
          }),
          breadcrumbSchema(breadcrumbs, '/how-it-works'),
          howToSchema({
            name: 'How GetGeoAgent improves search and AI visibility',
            description,
            path: '/how-it-works',
            steps: loopStages.map((stage) => ({ name: stage.heading, text: stage.detail })),
          }),
          faqSchema(loopFaqs, '/how-it-works'),
        ])}
      />

      <PageHero
        eyebrow="Workflow"
        title="A loop that does not stop between campaigns"
        lead="Eight stages, each feeding the next. The eighth feeds the first, which is the difference between a strategy that improves and one that expires."
        breadcrumbs={breadcrumbs}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href={site.app.signup} size="lg" withArrow>
            Start Free
          </Button>
          <Button href="/features" variant="secondary" size="lg" magnetic={false}>
            See all features
          </Button>
        </div>

        <nav aria-label="Stages" className="mt-10 flex flex-wrap gap-2">
          {loopStages.map((stage) => (
            <a
              key={stage.id}
              href={`#${stage.id}`}
              className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-white/25 hover:text-ink"
            >
              {stage.number} {stage.label}
            </a>
          ))}
        </nav>
      </PageHero>

      <LoopWalkthrough stages={loopStages} />

      <Container className="pb-20 lg:pb-28">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 lg:p-10">
          <h2 className="t-h3 text-ink">Why it is a loop and not a project</h2>
          <p className="t-body mt-4 max-w-3xl">
            Every stage produces something the next stage consumes, and the last one produces an
            updated version of the first stage&rsquo;s input. Run once, it is a content project. Run
            continuously, the plan gets better each cycle because it is built from what actually
            happened last time rather than from what was assumed at the start.
          </p>
          <p className="t-body mt-4 max-w-3xl">
            What this does not do is make outcomes certain. Search results and AI answers depend on
            your site, your market and your competitors, none of which any tool controls. What the
            loop controls is whether the work is done consistently, which is the part that usually
            fails.
          </p>
        </div>
      </Container>

      <FaqSection id="how-faq" faqs={loopFaqs} eyebrow="FAQ" title="How the loop runs" />
      <RelatedLinks paths={['/ai-seo-agent', '/seo-automation', '/geo-optimization']} />
      <CtaSection id="how-cta" />
    </>
  );
}
