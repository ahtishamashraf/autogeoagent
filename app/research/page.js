import Container from '@/components/ui/Container';
import PageHero from '@/components/sections/PageHero';
import ArticleBody from '@/components/sections/ArticleBody';
import RelatedLinks from '@/components/sections/RelatedLinks';
import CtaSection from '@/components/sections/CtaSection';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/seo';
import { buildMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

const description =
  'How we intend to study AI search visibility, and the standard any result published here must meet. No studies published yet — this is the method.';

export const metadata = buildMetadata({
  title: 'Research',
  description,
  path: '/research',
  ogKicker: 'Research',
  keywords: ['AI search research', 'GEO research methodology', 'AI visibility study method'],
});

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' },
  { label: 'Research' },
];

/**
 * Deliberately empty of findings.
 *
 * The page exists so there is a published standard before there is anything to
 * publish against it. Nothing here claims a result, a sample size or a
 * correlation, because no study has been run.
 */
const blocks = [
  {
    type: 'answer',
    label: 'Status',
    text: 'We have not published a study yet. This page sets out the method we will hold ourselves to when we do, so the standard is on record before the first result is.',
  },
  { type: 'h2', id: 'why', text: 'Why this page exists first' },
  {
    type: 'p',
    text: 'A great deal of what circulates as “GEO research” is a screenshot, a small unrepresentative prompt set, or a vendor’s own funnel described as a finding. It spreads because the subject is new and the numbers are memorable. We would rather publish nothing than add to that.',
  },
  { type: 'h2', id: 'standard', text: 'The standard for anything published here' },
  {
    type: 'checklist',
    items: [
      'The exact prompts or queries used, published in full — not summarised.',
      'The surfaces tested, and the dates they were tested on.',
      'How many observations, and how often each was repeated.',
      'The raw variation between runs, not only the average.',
      'What the result does not show, stated as plainly as what it does.',
      'A clear statement where we have a commercial interest in the conclusion.',
    ],
  },
  { type: 'h2', id: 'hard', text: 'What makes this genuinely hard' },
  {
    type: 'steps',
    items: [
      {
        title: 'Answers are not stable',
        text: 'The same prompt can return different sources minutes apart. Any single observation is a sample, and a study that treats one as a fact is measuring noise.',
      },
      {
        title: 'Results are personalised and regional',
        text: 'What one account sees is not what another sees. Without controlling for account state and location, a comparison across brands is not comparing like with like.',
      },
      {
        title: 'The systems change without notice',
        text: 'Retrieval behaviour shifts with model and product updates that are rarely announced. A finding is a statement about a period, not a permanent property.',
      },
      {
        title: 'Correlation is cheap here',
        text: 'Sites that get cited also tend to be established, well-linked and well-structured. Attributing citation to any single tactic usually cannot survive that confound.',
      },
    ],
  },
  { type: 'h2', id: 'own-data', text: 'The research you can do yourself' },
  {
    type: 'p',
    text: 'Your own prompt set, checked on a schedule against your own market, is worth more than any published benchmark. It is specific to your buyers, it controls for your competitors, and you can act on it. That is exactly what [AI visibility tracking](/ai-visibility-tracking) is for.',
  },
  {
    type: 'callout',
    title: 'What we will not do',
    text: 'We will not publish a ranking-factor list for AI answer systems, a claimed citation rate, or a case study built from a single account. If a number here cannot be reproduced from the method we published alongside it, it should not be here.',
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        id="research-graph"
        data={graph([
          webPageSchema({ path: '/research', title: 'Research', description, breadcrumb: true }),
          breadcrumbSchema(breadcrumbs, '/research'),
        ])}
      />

      <PageHero
        eyebrow="Resources — Research"
        title="Research"
        lead={description}
        breadcrumbs={breadcrumbs}
      />

      <Container className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8">
            <p className="t-micro text-faint">No studies published</p>
            <p className="t-body mt-3">
              There is nothing to read here yet, and that is accurate rather than a placeholder. When
              a study meets the standard below it will be listed on this page with its full method.
              Until then, {site.name} publishes guides and definitions, not findings.
            </p>
          </div>
          <ArticleBody blocks={blocks} />
        </div>
      </Container>

      <RelatedLinks paths={['/ai-visibility-tracking', '/generative-engine-optimization', '/blog']} />
      <CtaSection />
    </>
  );
}
