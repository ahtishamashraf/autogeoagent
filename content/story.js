/**
 * The GetGeoAgent story.
 *
 * Shared between the cinematic homepage scenes and the /how-it-works page so
 * the narrative stays identical wherever it appears.
 */

export const stages = [
  {
    id: 'seo',
    number: '01',
    kicker: '01 / Search',
    label: 'Search',
    sub: 'SEO',
    heading: 'Rank Where People Search',
    body: 'GetGeoAgent finds organic search opportunities, understands search intent and helps optimize your website around the topics your audience is actively searching for.',
    long: 'Organic search still starts with a query. The agent maps the queries your market actually uses, classifies the intent behind each one, and works out which pages on your site should own them. Where a page does not exist yet, it becomes an opportunity in the plan rather than a note in a spreadsheet.',
    points: [
      'Query discovery across your topic space',
      'Search intent classification per query',
      'Page-to-query mapping and gap detection',
      'On-page and technical recommendations',
    ],
  },
  {
    id: 'geo',
    number: '02',
    kicker: '02 / AI Discovery',
    label: 'AI Discovery',
    sub: 'GEO',
    heading: 'Get Discovered Inside AI Answers',
    body: 'GetGeoAgent helps structure and improve your content for generative search experiences, where people increasingly receive a direct AI-generated answer instead of a list of links.',
    long: 'Generative engines read differently from crawlers. They look for unambiguous entities, self-contained explanations, clear structure and sources worth citing. GEO is the work of making your content easy for those systems to understand, evaluate and quote — without abandoning the fundamentals that make it rank.',
    points: [
      'Entity and topic clarity',
      'Answer-ready content structure',
      'Structured data and machine-readable context',
      'Source and citation signals',
    ],
  },
  {
    id: 'research',
    number: '03',
    kicker: '03 / Intelligence',
    label: 'Intelligence',
    sub: 'Research',
    heading: 'Discover What Your Audience Wants',
    body: 'GetGeoAgent turns topics into opportunities by identifying relevant queries, search intent, content gaps and the related subjects that make a topic complete.',
    long: 'Research is where most SEO programmes quietly fail — it happens once, then ages. The agent keeps a live picture of your topic space: which questions are being asked, which subtopics you have never covered, which competitors own which clusters, and where a single page could serve a whole family of queries.',
    points: [
      'Continuous query and question discovery',
      'Opportunity and competition signals',
      'Content gap analysis against your existing pages',
      'Cluster and pillar recommendations',
    ],
  },
  {
    id: 'content',
    number: '04',
    kicker: '04 / Creation',
    label: 'Creation',
    sub: 'Content',
    heading: 'Turn Opportunities Into Content',
    body: 'Every opportunity becomes a brief, a structure and a draft — built around search intent, topical depth and the questions real readers ask.',
    long: 'The agent starts from intent, not from a word count. It builds an outline that answers the query directly, adds the supporting sections a complete answer needs, proposes internal links to the pages that reinforce the topic, and generates the metadata and structured data the page should ship with. The result is a draft your team edits, not a wall of generated text.',
    points: [
      'Intent-first outlines and briefs',
      'Semantic coverage checks against the topic',
      'Internal link suggestions with real anchors',
      'Metadata and structured data generated with the draft',
    ],
  },
  {
    id: 'publish',
    number: '05',
    kicker: '05 / Automation',
    label: 'Automation',
    sub: 'Publish',
    heading: 'From Strategy to Live Content',
    body: 'Approved content moves through SEO checks, metadata, structured data and internal linking before it reaches your site — so nothing ships half-optimized.',
    long: 'Publishing is where optimization usually gets lost. The agent runs the final checks as a pipeline: on-page review, metadata, schema, internal links, then handover to your site. What goes live is what was planned, with the technical details already in place.',
    points: [
      'Pre-publish SEO and structure checks',
      'Metadata and schema attached to every page',
      'Internal links applied across the cluster',
      'Handover to your website, CMS or API',
    ],
  },
  {
    id: 'analytics',
    number: '06',
    kicker: '06 / Performance',
    label: 'Performance',
    sub: 'Monitor',
    heading: "Understand What's Working",
    body: 'Rankings, impressions, clicks and AI visibility signals flow back into one view, so you can see which topics are moving and which pages need attention.',
    long: 'Measurement closes the loop. The agent tracks how pages perform in classic search results and watches for signals that your content is being surfaced in AI answers, then translates that into a short list: what improved, what stalled, and what to do next.',
    points: [
      'Search visibility and keyword movement',
      'Page-level performance over time',
      'AI visibility signals',
      'A prioritised list of next actions',
    ],
  },
  {
    id: 'improve',
    number: '07',
    kicker: '07 / Continuous Optimization',
    label: 'Optimization',
    sub: 'Improve',
    heading: 'Your Agent Never Stops Improving',
    body: 'Performance data returns to the agent, which updates the strategy, refreshes weak pages and starts the cycle again — continuously, not quarterly.',
    long: 'Search changes constantly, and so does what a good answer looks like. The agent re-reads its own results, finds pages that have slipped, spots queries that have appeared since the last cycle, and folds them back into the plan. The loop is the product.',
    points: [
      'Automatic detection of decaying pages',
      'Refresh and expansion recommendations',
      'New query opportunities folded into the plan',
      'A strategy that updates itself',
    ],
  },
];

export const stageById = stages.reduce((acc, stage) => {
  acc[stage.id] = stage;
  return acc;
}, {});

export const loopSteps = ['Research', 'Create', 'Publish', 'Measure', 'Improve'];
