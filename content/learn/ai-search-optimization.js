export const aiSearchOptimization = {
  slug: '/ai-search-optimization',
  eyebrow: 'AI search',
  title: 'AI Search Optimization',
  lead: 'How AI-powered search surfaces actually work, what they reward, and how to build visibility across AI Overviews, AI Mode, ChatGPT Search, Gemini, Perplexity and Copilot.',
  updated: '2026-08-27',
  blocks: [
    {
      type: 'answer',
      label: 'Short answer',
      text: 'AI search optimization is the practice of making your content retrievable and usable by search experiences that generate answers rather than only listing links. It combines conventional SEO fundamentals with content that answers questions directly, names entities unambiguously and is structured so passages can be extracted without losing meaning.',
    },
    { type: 'h2', id: 'surfaces', text: 'The surfaces worth understanding' },
    {
      type: 'p',
      text: 'Implementations vary, but they cluster into a few patterns. Knowing which pattern a surface follows tells you what to optimize.',
    },
    {
      type: 'table',
      caption: 'AI search surfaces and what each one rewards',
      head: ['Surface', 'Pattern', 'What it rewards'],
      rows: [
        ['Google AI Overviews', 'Answer generated above conventional results, with source links', 'Pages that already rank well and contain a clean, direct answer'],
        ['Google AI Mode', 'Conversational search over the index with follow-ups', 'Topic depth and coverage of related follow-up questions'],
        ['ChatGPT Search', 'Retrieval plus synthesis with visible citations', 'Specific, current, self-contained passages'],
        ['Gemini', 'Generated answers grounded in retrieved sources', 'Clear entities and consistent, verifiable claims'],
        ['Perplexity', 'Answer-first with prominent inline citations', 'Precise, quotable statements that are easy to attribute'],
        ['Copilot / Bing', 'Answer generated over the Bing index', 'Standard indexation in Bing plus extractable structure'],
      ],
    },
    {
      type: 'callout',
      title: 'One principle across all of them',
      text: 'Every surface in that table retrieves before it generates. Nothing that cannot be crawled, indexed and understood participates in any of them.',
    },
    { type: 'h2', id: 'what-they-reward', text: 'What AI search consistently rewards' },
    {
      type: 'checklist',
      items: [
        'A direct answer in the first paragraph, written to stand alone.',
        'Unambiguous entity naming — no pronouns where the subject should appear.',
        'Genuine depth beneath the answer, so the page is worth retrieving over a summary.',
        'Structure that survives extraction: headings, lists, tables, FAQs.',
        'Accurate, dated facts that agree with the rest of your site.',
        'Internal links that supply context for the passage around it.',
        'Server-rendered HTML that does not require JavaScript to read.',
      ],
    },
    { type: 'h2', id: 'crawlers', text: 'AI crawlers and access' },
    {
      type: 'p',
      text: 'AI systems reach your site through a mix of conventional search crawlers and their own user agents. If you want to be discoverable in AI answers, check that you are not blocking the ones you care about.',
    },
    {
      type: 'ul',
      items: [
        'Review robots.txt for rules that block AI user agents you would rather allow.',
        'Do not use robots.txt as a security measure — it is a public request, not access control.',
        'Confirm important pages return complete HTML without client-side rendering.',
        'Keep sitemaps current so new pages are discovered quickly.',
        'Consider publishing an [llms.txt](/llms.txt) file summarising your key pages in plain text.',
      ],
    },
    { type: 'h2', id: 'content-model', text: 'A content model that works on every surface' },
    {
      type: 'p',
      text: 'Rather than writing per-engine variants, use one page shape that satisfies all of them. It also happens to be a good shape for human readers.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Direct answer', text: 'Two or three sentences that resolve the question completely.' },
        { title: 'Context', text: 'Why the question matters and what changed to make it worth asking.' },
        { title: 'Mechanism', text: 'How the thing actually works, with named steps or components.' },
        { title: 'Comparison', text: 'A table where the reader is choosing between options.' },
        { title: 'Practice', text: 'What to do, in order, with enough specificity to act on.' },
        { title: 'Limits', text: 'What this does not solve, and what could go wrong.' },
        { title: 'Follow-ups', text: 'An FAQ covering the next questions the page raises.' },
      ],
    },
    { type: 'h2', id: 'measurement', text: 'Measuring AI search visibility' },
    {
      type: 'p',
      text: 'There is no equivalent of a rank tracker for generated answers, and results differ between users and sessions. Practical measurement is a stable prompt set checked on a schedule, plus referral and brand-demand trends. Read the full method in [generative engine optimization](/generative-engine-optimization).',
    },
    {
      type: 'callout',
      title: 'No guarantees',
      text: 'Appearing in an AI answer is never guaranteed. Engines change retrieval and synthesis behaviour frequently, and citation sets are unstable. The work improves your probability of visibility, not your certainty of it.',
    },
    {
      type: 'p',
      text: '[GetGeoAgent](/) runs this method continuously: it maintains the question set, checks whether you have coverage, drafts and structures the pages that are missing, and folds performance back into the plan. See [GEO optimization](/geo-optimization) and [SEO automation](/seo-automation) for the product view.',
    },
  ],
  faqs: [
    {
      question: 'Is AI search optimization different from SEO?',
      answer:
        'It builds on SEO. Retrieval still depends on being crawlable, relevant and trusted. What AI search adds is an emphasis on direct answers, unambiguous entities and passage-level structure.',
    },
    {
      question: 'Do I need a different page for each AI engine?',
      answer:
        'No. The engines reward broadly the same qualities. One well-structured, answer-first page with genuine depth serves all of them, and avoids the contradictions that per-engine variants create.',
    },
    {
      question: 'Should I block AI crawlers?',
      answer:
        'That is a business decision. Blocking them protects content from being used for training or answering, but it also removes you from those answers entirely. If discovery in AI search matters to you, allow the crawlers that power it.',
    },
    {
      question: 'How do AI Overviews choose sources?',
      answer:
        'Google has not published a complete description, but AI Overviews draw on its existing index and generally surface pages that already perform well for the query and contain a clear, extractable answer. Strong conventional SEO remains the prerequisite.',
    },
  ],
};
