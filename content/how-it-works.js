/**
 * The definitive stage-by-stage description of the loop.
 *
 * Deliberately separate from content/story.js: that file drives the cinematic
 * homepage scenes and is written for motion. This one is written to be read,
 * and it is the only place the full eight-stage sequence is spelled out.
 */

export const loopStages = [
  {
    id: 'discover',
    number: '01',
    label: 'Discover',
    heading: 'Find the queries that exist',
    summary: 'Expand your topic into the real question space, including the questions you never thought to ask.',
    detail:
      'The agent starts from what you sell and the pages you already have, then expands outward: the queries people type, the questions they ask in full sentences, the comparisons they run, and the adjacent subjects that keep appearing next to yours. It is a map of demand, not a keyword export.',
    points: [
      'Seed expansion across your topic space',
      'Question-form queries, not just head terms',
      'Competitor coverage as a signal of what exists',
      'Everything kept as one live picture, not a one-off pull',
    ],
    output: 'A live query space for your market',
  },
  {
    id: 'understand',
    number: '02',
    label: 'Understand',
    heading: 'Work out what each query means',
    summary: 'Classify intent and cluster queries that one page can genuinely satisfy.',
    detail:
      'Two queries that share words can want completely different things. The agent classifies each one by intent — learn, compare, buy, navigate — and groups the ones a single page could answer together. Clusters, not individual keywords, become the unit of work.',
    points: [
      'Intent classification per query',
      'Clustering by what a page would have to do, not by string similarity',
      'Mapping clusters against pages you already have',
      'Gap detection where a cluster has no owner',
    ],
    output: 'Clusters, each with an intent and an owner page',
  },
  {
    id: 'plan',
    number: '03',
    label: 'Plan',
    heading: 'Decide what to build, and in what order',
    summary: 'Turn clusters into a sequenced plan of pillars, supporting pages and refreshes.',
    detail:
      'Coverage beats volume, so the plan is structural: which page is the pillar for a topic, which pages support it, what links between them, and which existing pages are worth improving before anything new is written. Order matters, because a supporting page published before its pillar has nothing to point at.',
    points: [
      'Pillar and supporting-page structure per topic',
      'Refresh-before-create where an existing page is close',
      'Sequencing so links have somewhere to land',
      'A plan you can edit before anything is produced',
    ],
    output: 'A sequenced editorial plan',
  },
  {
    id: 'create',
    number: '04',
    label: 'Create',
    heading: 'Produce a draft from a real brief',
    summary: 'Outline first, built from the intent — then a draft your team edits.',
    detail:
      'Each page starts as a brief: the query it must answer, the intent behind it, the sections a complete answer needs, the entities that must be named clearly, and the internal links it should carry. The draft is generated from that brief. It is a first draft for an editor, not finished copy for a publish button.',
    points: [
      'Intent-first outline before any prose',
      'Coverage checked against the cluster, not a word count',
      'Entities named consistently with the rest of the site',
      'Metadata and structured data drafted alongside the page',
    ],
    output: 'A draft, a brief and the metadata to ship with it',
  },
  {
    id: 'optimize',
    number: '05',
    label: 'Optimize',
    heading: 'Make it answer the question, and be quotable',
    summary: 'The pass that serves ranking and extraction at the same time.',
    detail:
      'The same page has to work for a ranked result and for a system assembling an answer. That means a direct answer near the top, sections that stand on their own, unambiguous naming, and structure a machine can parse. This is where SEO and GEO stop being two workflows.',
    points: [
      'A direct answer to the query, early and self-contained',
      'Sections that make sense lifted out of the page',
      'Structured data that matches what the page actually says',
      'Internal links with anchors that describe the destination',
    ],
    output: 'A page built to rank and to be quoted',
  },
  {
    id: 'publish',
    number: '06',
    label: 'Publish',
    heading: 'Ship it with the technical work already done',
    summary: 'Final checks run as a pipeline, so nothing goes live half-optimized.',
    detail:
      'Optimization is usually lost at the last step, when a page is copied into a CMS and the schema, the canonical and half the internal links are forgotten. Running the checks as a pipeline means what goes live is what was planned.',
    points: [
      'Pre-publish on-page and structure checks',
      'Canonical, metadata and schema attached to the page',
      'Cluster links applied in both directions',
      'Handover to your site, CMS or API — nothing publishes without approval',
    ],
    output: 'A live page with its technical work intact',
  },
  {
    id: 'measure',
    number: '07',
    label: 'Measure',
    heading: 'Watch both surfaces, honestly',
    summary: 'Search performance and AI visibility, observed rather than assumed.',
    detail:
      'Classic search performance is measurable. AI visibility is observable — you find out by asking, on a schedule, and recording what comes back. Both feed the same view, and neither is reported as more certain than it is.',
    points: [
      'Keyword movement and page-level performance over time',
      'A fixed prompt set checked across AI answer surfaces',
      'Presence and description recorded, not just links',
      'Detection of pages that are quietly decaying',
    ],
    output: 'A short list of what moved and what stalled',
  },
  {
    id: 'improve',
    number: '08',
    label: 'Improve',
    heading: 'Feed the result back into the plan',
    summary: 'The measurement changes the next cycle. That is the whole point.',
    detail:
      'Pages that slipped get a refresh. Queries that appeared since the last cycle get added to the map. Clusters that under-performed get restructured rather than expanded. Then the loop runs again — which is why the strategy improves instead of expiring.',
    points: [
      'Refresh and expansion recommendations for decaying pages',
      'New queries folded back into the map',
      'Restructuring where coverage, not quality, was the problem',
      'A strategy that updates itself between cycles',
    ],
    output: 'An updated plan — and back to Discover',
  },
];

export const loopFaqs = [
  {
    question: 'How long does a full cycle take?',
    answer:
      'It depends on the scope you configure — how many topics the agent covers and how much content you approve per cycle. Discover and Measure run continuously; the creation stages run on a cadence you set in the application.',
  },
  {
    question: 'Can I intervene at any stage?',
    answer:
      'Yes. The plan, the briefs and the drafts are all reviewable, and nothing is published without approval.',
  },
  {
    question: 'Does the loop cover GEO as well as SEO?',
    answer:
      'They are one workflow here. The same clusters and the same page structure serve ranking in search results and being usable inside an AI-generated answer — the Optimize stage is where both are handled.',
  },
  {
    question: 'What happens if a stage produces nothing useful?',
    answer:
      'It stops there rather than manufacturing work. If a cluster has no gap worth filling, no page is planned for it. Publishing pages because the schedule said so is how sites end up diluted.',
  },
  {
    question: 'Does this guarantee rankings or AI citations?',
    answer:
      'No. Nobody can guarantee either. The loop makes the work continuous and consistent, which is what you can actually control — outcomes still depend on your site, your market and your competition.',
  },
];
