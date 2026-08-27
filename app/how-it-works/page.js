import Container from '@/components/ui/Container';
import PageHero from '@/components/sections/PageHero';
import WorkflowSection from '@/components/sections/WorkflowSection';
import RelatedLinks from '@/components/sections/RelatedLinks';
import CtaSection from '@/components/sections/CtaSection';
import FaqSection from '@/components/sections/FaqSection';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, graph, howToSchema, webPageSchema } from '@/lib/seo';
import { stages } from '@/content/story';
import { site } from '@/lib/site';

const description =
  'The seven stages of the GetGeoAgent loop — research, strategy, creation, publishing, monitoring, improvement and repeat — explained step by step.';

export const metadata = buildMetadata({
  title: 'How It Works',
  description,
  path: '/how-it-works',
  ogKicker: 'Workflow',
  keywords: ['how AI SEO works', 'SEO workflow', 'AI SEO agent workflow', 'SEO automation process'],
});

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'How It Works' }];

const faqs = [
  {
    question: 'How long does a full cycle take?',
    answer:
      'Cycle length depends on the scope of your programme — how many topics the agent covers and how much content it produces. Research and monitoring run continuously; content cycles run on a cadence you configure in the application.',
  },
  {
    question: 'Where does the agent get its research from?',
    answer:
      'It builds a topic model from the queries and questions in your market, the pages already on your site, and the performance data that comes back after publishing. Each cycle refines that model.',
  },
  {
    question: 'Can I intervene at any stage?',
    answer:
      'Yes. The plan, the briefs and the drafts are all reviewable, and nothing publishes without approval.',
  },
  {
    question: 'Does the loop cover GEO as well as SEO?',
    answer:
      'Yes — they run as one workflow. The same topic model and content structure serve both ranking in search results and being usable inside AI-generated answers.',
  },
];

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
            steps: stages.map((stage) => ({ name: stage.heading, text: stage.long })),
          }),
        ])}
      />

      <PageHero
        eyebrow="Workflow"
        title="A loop that does not stop between campaigns"
        lead="Seven stages, each feeding the next. The last one feeds the first, which is what makes the strategy improve instead of expire."
        breadcrumbs={breadcrumbs}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href={site.app.signup} size="lg" withArrow>
            Start Growing
          </Button>
          <Button href="/features" variant="secondary" size="lg" magnetic={false}>
            See all features
          </Button>
        </div>
      </PageHero>

      <Container className="pb-8">
        <ol className="border-t border-white/8">
          {stages.map((stage) => (
            <li
              key={stage.id}
              id={stage.id}
              className="grid scroll-mt-28 gap-x-10 gap-y-4 border-b border-white/8 py-10 lg:grid-cols-[7rem_minmax(0,1fr)_minmax(0,20rem)] lg:py-12"
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-faint">
                {stage.number} / {stage.label}
              </p>
              <div>
                <h2 className="t-h3 text-ink">{stage.heading}</h2>
                <p className="t-body mt-4 max-w-xl">{stage.long}</p>
              </div>
              <ul className="space-y-2 lg:pt-2">
                {stage.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1 shrink-0 rounded-full bg-[var(--scene-glow)]"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>

      <WorkflowSection id="workflow-summary" showLink={false} />
      <FaqSection id="how-faq" faqs={faqs} eyebrow="FAQ" title="How the loop runs" />
      <RelatedLinks paths={['/ai-seo-agent', '/seo-automation', '/geo-optimization']} />
      <CtaSection id="how-cta" />
    </>
  );
}
