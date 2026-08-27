export const contentOptimizer = {
  slug: '/content-optimizer',
  eyebrow: 'Content optimizer',
  title: 'SEO Content Optimization',
  lead: 'Point the agent at a page you already have. It finds what a complete answer is missing, and proposes the specific changes that close the gap.',
  secondaryCta: { label: 'See the SEO audit', href: '/seo-audit' },
  blocks: [
    {
      type: 'answer',
      label: 'What it does',
      text: 'The optimizer compares an existing page against the cluster it should own: the subtopics a thorough answer covers, the entities it should name, the structure an answer engine can extract, the internal links available to it, and the metadata it ships with. Each gap becomes a specific, reviewable change.',
    },
    { type: 'h2', id: 'existing-pages', text: 'Your best opportunity is usually already published' },
    {
      type: 'p',
      text: 'Teams reach for new content because it feels like progress. But a page ranking at position eleven, with a strong backlink profile and two years of history, is usually a shorter path to traffic than a brand-new page starting from nothing. The optimizer exists to make that path obvious.',
    },
    { type: 'h2', id: 'what-it-checks', text: 'What it checks' },
    {
      type: 'steps',
      items: [
        {
          title: 'Topic coverage',
          text: 'Which subtopics a complete treatment of the query would include, and which of them the page is missing.',
        },
        {
          title: 'Answer position',
          text: 'Whether the page answers its query in the opening, or buries the answer three sections down where no extraction will find it.',
        },
        {
          title: 'Entity clarity',
          text: 'Whether the important concepts are named consistently or referred to with pronouns and internal shorthand.',
        },
        {
          title: 'Structure',
          text: 'Heading hierarchy, whether comparisons are expressed as tables, whether processes are ordered lists, and whether an FAQ block is warranted.',
        },
        {
          title: 'Internal links',
          text: 'Which related pages this one should link to, and which pages should link back to it.',
        },
        {
          title: 'Metadata and schema',
          text: 'Title, description, heading structure and JSON-LD, checked for accuracy rather than presence.',
        },
      ],
    },
    { type: 'h2', id: 'output', text: 'Findings, not a score' },
    {
      type: 'p',
      text: 'A single optimization score tells you nothing actionable. Every finding here names the problem, the location and the proposed change, so the decision in front of you is "accept or reject", not "interpret".',
    },
    {
      type: 'table',
      caption: 'Example findings and the change each one proposes',
      head: ['Finding', 'Proposed change'],
      rows: [
        ['Answer appears in section three', 'Move the direct answer into the opening paragraph'],
        ['Subtopic not covered', 'Add a section covering it, with a suggested heading'],
        ['Comparison written as prose', 'Convert to a table so it survives extraction'],
        ['Two internal links available', 'Insert links with descriptive anchors to the named pages'],
        ['Description below length target', 'Rewrite the meta description'],
        ['No FAQ block', 'Draft an FAQ from the follow-up questions the page raises'],
      ],
    },
    { type: 'h2', id: 'decay', text: 'Finding pages that have slipped' },
    {
      type: 'p',
      text: 'Content decay is quiet. A page loses a position, then another, and nobody notices until a quarter of the library is underperforming. [SEO monitoring](/seo-monitoring) watches for that pattern and hands affected pages to the optimizer automatically, so decaying pages get attention without anyone having to go looking.',
    },
    { type: 'h2', id: 'geo-side', text: 'Optimizing for extraction as well as ranking' },
    {
      type: 'p',
      text: 'The changes that make a page easier for an answer engine to use — a self-contained opening, unambiguous entities, real tables — are the same changes that make it better for a reader who is scanning. That is why the optimizer treats SEO and [GEO](/geo-optimization) as one set of findings rather than two reports.',
    },
  ],
  faqs: [
    {
      question: 'Does it rewrite my page automatically?',
      answer:
        'It proposes specific changes and can draft the new sections, but you approve what is applied. Nothing is rewritten in place without review.',
    },
    {
      question: 'Will it change my brand voice?',
      answer:
        'Proposed sections follow the structure the query needs; voice remains an editorial decision. That is deliberate — the agent has no independent knowledge of how you want to sound.',
    },
    {
      question: 'How is this different from an SEO audit?',
      answer:
        'The [SEO audit](/seo-audit) looks at your site: indexability, technical issues, duplication, structure. The optimizer looks at one page against the query it should own.',
    },
  ],
};
