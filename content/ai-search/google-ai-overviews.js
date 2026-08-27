export const googleAiOverviews = {
  slug: '/google-ai-overviews',
  eyebrow: 'AI search',
  title: 'Google AI Overviews and What They Change',
  lead: 'What AI Overviews are, why classic SEO still decides whether you are eligible, and what genuinely changes about content strategy.',
  updated: '2026-08-27',
  blocks: [
    {
      type: 'answer',
      label: 'Short answer',
      text: 'An AI Overview is a generated summary shown above conventional results, built from pages Google has already indexed and judged relevant. There is no separate index and no separate ranking system to optimize for — eligibility comes from ordinary SEO, and inclusion favours pages that answer the query clearly and can be quoted without losing meaning.',
    },
    {
      type: 'callout',
      title: 'No affiliation',
      text: 'GetGeoAgent is not affiliated with or endorsed by Google. This page describes publicly observable behaviour and general practice, not a private ranking formula.',
    },
    { type: 'h2', id: 'what-changed', text: 'What actually changed' },
    {
      type: 'p',
      text: 'Two unhelpful narratives arrived with AI Overviews: that SEO was finished, and that nothing had changed. Both are wrong in instructive ways. Retrieval still happens first, over the same index, using the same relevance and quality signals. What changed is the unit of visibility and the reliability of the click.',
    },
    {
      type: 'steps',
      items: [
        { title: 'The unit moved from page to passage', text: 'Ranking is about a page. Being used in a summary is about a specific passage that resolves the question on its own.' },
        { title: 'Some visibility no longer produces a click', text: 'You can shape a decision without a session. That breaks click-based measurement and makes brand demand a more meaningful signal.' },
        { title: 'Specificity became a competitive advantage', text: 'Generic content gets absorbed without attribution. Original data and named methods give a reason to cite.' },
        { title: 'Internal consistency started to matter more', text: 'When several of your pages are reconciled and contradict each other, confidence drops.' },
      ],
    },
    { type: 'h2', id: 'eligibility', text: 'Eligibility is ordinary SEO' },
    {
      type: 'p',
      text: 'A page that cannot be crawled, is not relevant, or carries no authority is not a candidate. The entire technical and quality foundation remains load-bearing — which is why the practical response to AI Overviews is rarely "do something new" and usually "do the fundamentals properly".',
    },
    {
      type: 'checklist',
      items: [
        'Server-rendered content that does not depend on client-side JavaScript.',
        'Genuine relevance to the query, not keyword proximity.',
        'A logical heading structure with one clear H1.',
        'Accurate structured data describing what is on the page.',
        'Internal links that give the page context within its topic.',
      ],
    },
    { type: 'h2', id: 'what-to-do', text: 'What to change in practice' },
    {
      type: 'ol',
      items: [
        'Rewrite the opening of your highest-intent pages so the answer is in the first paragraph.',
        'Convert your best comparisons from prose into real tables.',
        'Add an FAQ block wherever a page provokes obvious follow-up questions.',
        'Audit your core concepts for consistent naming across the site.',
        'Add a fixed prompt set to your reporting alongside rank tracking.',
      ],
    },
    { type: 'h2', id: 'clicks', text: 'The uncomfortable part' },
    {
      type: 'p',
      text: 'Some informational queries will produce fewer clicks regardless of what you do. The strategic response is to be present in the answer, and to invest more heavily in queries where people still need to reach a site to act — comparisons, pricing, product decisions and anything requiring a login.',
    },
    {
      type: 'callout',
      title: 'Be sceptical of formulas',
      text: 'Google has not published a complete description of how sources are selected for AI Overviews, and observed behaviour changes. Any specific "AI Overview ranking factor" list should be treated as speculation.',
    },
    {
      type: 'p',
      text: 'For the wider discipline, see [generative engine optimization](/generative-engine-optimization). For how the surfaces differ, see [AI search optimization](/ai-search-optimization).',
    },
  ],
  faqs: [
    {
      question: 'Do I need special markup to appear in AI Overviews?',
      answer:
        'No markup causes inclusion. Accurate structured data helps a system understand what a page is and who published it, which is worth doing regardless — but it is not a lever that forces a summary to cite you.',
    },
    {
      question: 'Will AI Overviews reduce my traffic?',
      answer:
        'For some informational queries, plausibly yes. Queries where people need to compare, buy, sign up or use a tool still require a visit. Shifting investment toward those is the practical response.',
    },
    {
      question: 'Should I block Google-Extended?',
      answer:
        'That is a business decision about how your content may be used. It is documented as a separate control from ordinary Googlebot crawling for search. Decide it deliberately rather than by copying someone else’s robots.txt.',
    },
  ],
};
