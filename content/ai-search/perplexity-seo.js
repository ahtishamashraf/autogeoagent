export const perplexitySeo = {
  slug: '/perplexity-seo',
  eyebrow: 'AI search',
  title: 'Perplexity SEO: Writing Quotable Pages',
  lead: 'Answer-first engines cite inline and prominently. That rewards a specific kind of writing — and it is the same writing that serves human readers who are scanning.',
  updated: '2026-08-27',
  blocks: [
    {
      type: 'answer',
      label: 'Short answer',
      text: 'Perplexity-style engines answer first and cite inline, which puts unusual weight on individual quotable sentences. The work is writing pages where a single sentence can be lifted, attributed and still be correct — supported by the depth that makes the page worth retrieving in the first place.',
    },
    {
      type: 'callout',
      title: 'No affiliation',
      text: 'GetGeoAgent is not affiliated with or endorsed by Perplexity. This page describes general practice for answer-first citation engines.',
    },
    { type: 'h2', id: 'quotability', text: 'Quotability is a writing property' },
    {
      type: 'p',
      text: 'Most business writing hedges. Claims get wrapped in qualifiers, spread across three sentences, and attached to a subject mentioned two paragraphs earlier. That style is nearly impossible to quote accurately, so it gets paraphrased into the consensus and loses its attribution.',
    },
    {
      type: 'table',
      caption: 'The same claim, written two ways',
      head: ['Hard to quote', 'Easy to quote'],
      rows: [
        ['"It can often be the case that this approach tends to help."', '"Answer-first pages are cited more often than pages that bury the answer."'],
        ['"As mentioned above, it has several benefits."', '"Internal linking improves crawl discovery, context and authority distribution."'],
        ['"Results may vary depending on many factors."', '"Results depend on market, site quality and competition; no tool can guarantee rankings."'],
      ],
    },
    { type: 'h2', id: 'practice', text: 'How to write for it' },
    {
      type: 'steps',
      items: [
        { title: 'One claim per sentence', text: 'A sentence carrying two ideas cannot be quoted without distorting one of them.' },
        { title: 'Name the subject in the sentence', text: 'Not "it" or "this approach". The sentence has to survive being read alone.' },
        { title: 'Put the definition in its own sentence', text: 'The form "X is …" is directly extractable; a definition spread across a paragraph is not.' },
        { title: 'Front-load the section', text: 'The first sentence under a heading should answer the heading.' },
        { title: 'Take a position', text: 'A clear stance is more citable than a survey of everyone else’s opinions.' },
        { title: 'Keep the depth', text: 'Quotable sentences get you attributed; depth is what gets you retrieved. You need both.' },
      ],
    },
    { type: 'h2', id: 'structure', text: 'Structure that survives extraction' },
    {
      type: 'checklist',
      items: [
        'A direct answer in the opening two or three sentences.',
        'Headings that state a claim or ask a question, not labels like "Overview".',
        'Comparisons as tables; processes as ordered lists.',
        'One idea per paragraph.',
        'An FAQ covering the follow-up questions the page raises.',
      ],
    },
    { type: 'h2', id: 'not-thin', text: 'Do not write for extraction only' },
    {
      type: 'p',
      text: 'A page written purely to be quoted reads like a summary of itself, performs badly with human readers, and loses the engagement that feeds the systems ranking it. Answer first, then earn the position with genuine depth beneath.',
    },
    {
      type: 'p',
      text: 'This is the same discipline described in [generative engine optimization](/generative-engine-optimization), applied to a surface where citation is unusually visible.',
    },
  ],
  faqs: [
    {
      question: 'Do citation-heavy engines favour any particular site type?',
      answer:
        'In practice they favour pages that state things clearly and specifically. Being large or old helps with retrieval, but a precise, well-structured page from a smaller site is frequently the more quotable source.',
    },
    {
      question: 'Should I add a summary box to every page?',
      answer:
        'An opening that answers the question directly does the same job and reads better. A separate summary box that repeats the page tends to produce duplication rather than clarity.',
    },
    {
      question: 'How do I track whether I am cited?',
      answer:
        'A fixed prompt set, checked on a schedule, recording presence and description. See [AI visibility tracking](/ai-visibility-tracking).',
    },
  ],
};
