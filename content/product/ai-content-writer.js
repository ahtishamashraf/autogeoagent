export const aiContentWriter = {
  slug: '/ai-content-writer',
  eyebrow: 'AI content writer',
  title: 'Research-Driven AI Content for SEO and GEO',
  lead: 'Drafts built from intent analysis and a real brief — structured to rank, structured to be quoted, and written to be edited by a person.',
  secondaryCta: { label: 'See the content planner', href: '/content-planner' },
  blocks: [
    {
      type: 'answer',
      label: 'What it does',
      text: 'The writer drafts from a brief the agent produced: the target query, its intent, the sections a complete answer needs, the entities to name, the internal links to carry and the metadata to ship with. The output is a strong first draft for your team to edit — not a page to publish unread.',
    },
    {
      type: 'callout',
      title: 'This is not a bulk article generator',
      text: 'Producing hundreds of thin pages is a good way to damage a domain. Everything here is built around one page doing one job properly, which is also the only version of AI content that survives contact with a search quality system.',
    },
    { type: 'h2', id: 'the-difference', text: 'What makes a draft good or worthless' },
    {
      type: 'p',
      text: 'The model is not the differentiator. Two drafts from the same model can be wildly different in quality depending on what preceded them. A draft generated from a keyword produces filler. A draft generated from an intent analysis, a competitive read of what already ranks, and an outline of what a complete answer contains produces something worth editing.',
    },
    {
      type: 'table',
      caption: 'What goes into the draft before a word is written',
      head: ['Input', 'Why it matters'],
      rows: [
        ['Target query and intent', 'Decides the page type and the shape of the opening'],
        ['Coverage analysis', 'Identifies the subtopics a complete answer has to include'],
        ['Entity list', 'Keeps naming consistent and unambiguous across the site'],
        ['Internal link targets', 'Links are planned, not bolted on afterwards'],
        ['Existing coverage', 'Prevents writing a page that competes with one you already have'],
      ],
    },
    { type: 'h2', id: 'shape', text: 'The shape of every draft' },
    {
      type: 'steps',
      items: [
        { title: 'Direct answer', text: 'Two or three sentences that resolve the query completely — the passage most likely to be extracted by an answer engine, and the one that keeps human readers on the page.' },
        { title: 'Context', text: 'Why the question matters and what changed to make it worth asking.' },
        { title: 'Mechanism', text: 'How the thing actually works, in named steps or components.' },
        { title: 'Comparison', text: 'A real table wherever the reader is choosing between options.' },
        { title: 'Practice', text: 'What to do, in order, specific enough to act on.' },
        { title: 'Limits', text: 'What this does not solve. Balanced writing is more citable than promotional writing.' },
        { title: 'Follow-ups', text: 'An FAQ covering the questions the page itself raises.' },
      ],
    },
    { type: 'h2', id: 'checks', text: 'Checked before it reaches you' },
    {
      type: 'checklist',
      items: [
        'Semantic coverage against the subtopics the cluster requires.',
        'Entity consistency with the rest of your site.',
        'Internal links resolved to real pages with descriptive anchors.',
        'Heading hierarchy in order, with headings that state a claim.',
        'Metadata and structured data generated alongside the draft.',
      ],
    },
    { type: 'h2', id: 'human', text: 'Where the human stays' },
    {
      type: 'p',
      text: 'The agent does not know your positioning, your roadmap, or which claims your legal team will accept. It removes the repetitive layer — research, structure, metadata, link selection — so the editorial pass is about judgement rather than formatting. Nothing publishes without approval; see [how it works](/how-it-works).',
    },
    { type: 'h2', id: 'geo', text: 'Written for both surfaces' },
    {
      type: 'p',
      text: 'The same structure that ranks also survives extraction by an answer engine: a self-contained opening, unambiguous entities, real tables and lists, and an FAQ. That is why drafting and [GEO optimization](/geo-optimization) are one workflow rather than two.',
    },
  ],
  faqs: [
    {
      question: 'Will AI-written content hurt my rankings?',
      answer:
        'Thin, duplicated content hurts rankings regardless of who or what produced it. What matters is whether the page genuinely satisfies the query. The workflow here is built around intent, coverage and structure, and it assumes human review before publishing.',
    },
    {
      question: 'Is the content unique?',
      answer:
        'Drafts are generated for your brief, your entities and your internal link structure. Because generative models can produce similar phrasing for similar prompts, we do not claim guaranteed uniqueness — the editorial pass is where your voice and your specifics go in.',
    },
    {
      question: 'Can it write about my product accurately?',
      answer:
        'It can only work from what it is given. Product claims are the part you should always review: the agent has no independent knowledge of what your product actually ships.',
    },
    {
      question: 'How many drafts can it produce?',
      answer:
        'Content generation volume depends on your plan. See [pricing](/pricing) for the monthly allowance on each tier.',
    },
  ],
};
