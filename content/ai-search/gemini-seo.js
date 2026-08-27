export const geminiSeo = {
  slug: '/gemini-seo',
  eyebrow: 'AI search',
  title: 'Gemini SEO: Optimizing for Grounded AI Answers',
  lead: 'What grounding means, why verifiable and consistent content is rewarded, and how to make your pages usable as evidence.',
  updated: '2026-08-27',
  blocks: [
    {
      type: 'answer',
      label: 'Short answer',
      text: 'Gemini answers are frequently grounded in retrieved sources. Optimizing for that means making your claims verifiable, your entities unambiguous and your pages consistent with each other — so a system checking a statement against your site finds clear support rather than contradictions.',
    },
    {
      type: 'callout',
      title: 'No affiliation',
      text: 'GetGeoAgent is not affiliated with or endorsed by Google. This page describes general practice for grounded answer systems.',
    },
    { type: 'h2', id: 'grounding', text: 'What grounding changes' },
    {
      type: 'p',
      text: 'An ungrounded answer comes from what a model absorbed during training. A grounded answer is assembled from documents retrieved at the moment of asking. The second kind is where optimization has purchase, because your live pages are part of the evidence.',
    },
    {
      type: 'p',
      text: 'That reframes the goal. You are not trying to be memorable to a model; you are trying to be the clearest available evidence for a claim at the moment someone asks about it.',
    },
    { type: 'h2', id: 'evidence', text: 'What makes a page good evidence' },
    {
      type: 'steps',
      items: [
        { title: 'A checkable claim', text: 'A specific statement in a single sentence beats a paragraph of qualifications. Vague content cannot support anything.' },
        { title: 'A visible date', text: 'Undated claims are hard to trust. "As of 2026" carries weight that "currently" does not.' },
        { title: 'A named source', text: 'Where a claim comes from your own data or method, say so explicitly and describe the method.' },
        { title: 'Internal agreement', text: 'If three of your pages describe the same thing differently, none of them is reliable evidence.' },
        { title: 'Unambiguous entities', text: 'One canonical name per concept, introduced explicitly rather than switched silently.' },
      ],
    },
    { type: 'h2', id: 'consistency-audit', text: 'The consistency audit nobody runs' },
    {
      type: 'p',
      text: 'Search your own site for the three or four concepts that matter most to your business and read how each is described on different pages. Most sites find genuine contradictions within minutes — a definition that drifted, a figure that was never updated, a product described two different ways. It is unglamorous work and unusually cheap for the return.',
    },
    {
      type: 'checklist',
      items: [
        'One canonical description per concept, reused rather than rewritten.',
        'A definitional home page for each core concept, linked from every mention.',
        'Figures dated, and stale ones removed rather than left to age.',
        'Organisation details identical everywhere: name, description, contact route.',
        'Structured data that matches the visible page rather than an aspiration.',
      ],
    },
    { type: 'h2', id: 'technical', text: 'Technical prerequisites' },
    {
      type: 'p',
      text: 'Grounding requires retrieval, and retrieval requires ordinary discoverability: server-rendered HTML, sensible robots rules, correct canonicals, a current sitemap. See [technical SEO](/technical-seo) for the full pipeline a page has to survive.',
    },
    {
      type: 'p',
      text: 'The same principles apply across surfaces — compare them in [AI search optimization](/ai-search-optimization).',
    },
  ],
  faqs: [
    {
      question: 'Is there a Gemini-specific optimization technique?',
      answer:
        'Nothing meaningful that is specific to it. Grounded answer systems reward the same things: clear entities, verifiable specific claims, internal consistency and retrievable pages.',
    },
    {
      question: 'Does structured data help with grounded answers?',
      answer:
        'It helps a system resolve what a page is and who published it, which removes ambiguity. It does not force a citation, and inaccurate markup is worse than none.',
    },
    {
      question: 'How do I know if I am being used as a source?',
      answer:
        'Run a fixed prompt set on a schedule and record whether you appear and how you are described. See [AI visibility tracking](/ai-visibility-tracking).',
    },
  ],
};
