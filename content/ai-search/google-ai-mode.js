export const googleAiMode = {
  slug: '/google-ai-mode',
  eyebrow: 'AI search',
  title: 'Google AI Mode and Conversational Search',
  lead: 'How conversational search changes the shape of a session, why topic depth matters more than any single page, and what to build for it.',
  updated: '2026-08-27',
  blocks: [
    {
      type: 'answer',
      label: 'Short answer',
      text: 'AI Mode turns a search into a conversation: one question, a generated answer, then follow-ups that refine it. Optimizing for it is less about a single page ranking and more about whether your site covers a topic completely enough to keep being the useful source as the conversation narrows.',
    },
    {
      type: 'callout',
      title: 'No affiliation',
      text: 'GetGeoAgent is not affiliated with or endorsed by Google. This page describes general practice for conversational search surfaces, not a documented ranking system.',
    },
    { type: 'h2', id: 'the-shape', text: 'The shape of a conversational session' },
    {
      type: 'p',
      text: 'A classic search session is one query, one results page, a click, and possibly a refinement. A conversational session is a chain: a broad question, then a narrower one, then a comparison, then a practical one. Each turn is informed by the last.',
    },
    {
      type: 'diagram',
      steps: ['Broad question', 'Clarification', 'Comparison', 'Specific how-to', 'Decision'],
      caption: 'A conversation narrows. Coverage across the whole chain matters more than one page.',
    },
    {
      type: 'p',
      text: 'This rewards depth in a way single-page optimization does not. If you answer the broad question well but have nothing on the comparison two turns later, you drop out of the conversation exactly when it becomes commercially interesting.',
    },
    { type: 'h2', id: 'what-to-build', text: 'What to build for it' },
    {
      type: 'steps',
      items: [
        { title: 'Map the chain, not the keyword', text: 'For each entry-point question, write down the follow-ups a real person would ask next, and check you have a page for each.' },
        { title: 'Answer each turn on its own page', text: 'One page per question a person would genuinely ask separately, linked into a cluster so the relationship is explicit.' },
        { title: 'Make comparisons explicit', text: 'The comparison turn is where a decision forms. A real table beats three paragraphs of hedging.' },
        { title: 'Cover the practical turn', text: 'The "how do I actually do this" question is often the least contested and the most valuable.' },
        { title: 'Keep entity naming stable', text: 'Across a multi-turn session the system reconciles what it retrieves. Consistent naming makes you easier to keep using.' },
      ],
    },
    { type: 'h2', id: 'coverage', text: 'Coverage beats volume' },
    {
      type: 'p',
      text: 'Ten pages that answer ten consecutive questions in a real decision chain are worth more than fifty pages circling the same broad topic. That is the same principle as topical authority, made more visible by conversational search: the shape of your coverage is what matters, not the count.',
    },
    { type: 'h2', id: 'measuring', text: 'Measuring conversational visibility' },
    {
      type: 'p',
      text: 'Rank tracking does not describe a conversation. Use a prompt set built as chains rather than as isolated questions — the entry point, then the follow-ups — and record where in the chain you stop appearing. That drop-off point is the most actionable thing conversational measurement gives you. See [AI visibility tracking](/ai-visibility-tracking).',
    },
    {
      type: 'p',
      text: 'The underlying content work is the same discipline described in [generative engine optimization](/generative-engine-optimization); this surface simply punishes gaps in coverage faster.',
    },
  ],
  faqs: [
    {
      question: 'Is AI Mode replacing normal search results?',
      answer:
        'It is an additional way of searching rather than a replacement. Classic results still exist and still drive the majority of measurable traffic for most sites, which is why conventional SEO remains the foundation.',
    },
    {
      question: 'How do I optimize for follow-up questions?',
      answer:
        'Write the chain down. For each entry-point question, list what someone would ask next, and make sure a page answers each one directly and links to the others.',
    },
    {
      question: 'Does this need different content from my normal SEO?',
      answer:
        'No, it needs more complete content. The same answer-first, well-structured pages work; what changes is that gaps in the chain become visible much faster.',
    },
  ],
};
