export const chatgptSeo = {
  slug: '/chatgpt-seo',
  eyebrow: 'AI search',
  title: 'ChatGPT SEO: Being Found in AI Answers',
  lead: 'How ChatGPT Search retrieves and cites web pages, what it appears to reward, and the practical work that makes your content a plausible source.',
  updated: '2026-08-27',
  blocks: [
    {
      type: 'answer',
      label: 'Short answer',
      text: 'There is no separate ranking system to game. ChatGPT Search retrieves from the web and synthesises an answer with citations, so the work is making your pages crawlable to its user agent, genuinely useful, unambiguous about what they are, and structured so a passage can be quoted without losing meaning.',
    },
    {
      type: 'callout',
      title: 'No affiliation',
      text: 'GetGeoAgent is not affiliated with, endorsed by or partnered with OpenAI. This page describes publicly documented behaviour and general optimization practice.',
    },
    { type: 'h2', id: 'how-it-works', text: 'How answers with citations get built' },
    {
      type: 'p',
      text: 'The pattern is retrieval followed by synthesis. A question is interpreted, often expanded into several sub-queries; candidate pages are retrieved; passages are selected; and a language model composes an answer from those passages, attributing parts of it to the sources it used.',
    },
    {
      type: 'p',
      text: 'Each stage gives you something to influence. Retrieval rewards ordinary discoverability. Passage selection rewards content that answers a question in a self-contained way. Synthesis rewards clarity. Attribution rewards specificity — a claim only a particular source can support is far more likely to be named.',
    },
    { type: 'h2', id: 'crawler', text: 'Crawler access' },
    {
      type: 'p',
      text: 'OpenAI documents separate user agents for different purposes. **OAI-SearchBot** is the one associated with surfacing sites in search results within ChatGPT. **ChatGPT-User** represents a user-initiated fetch during a conversation. **GPTBot** is the crawler associated with model training. These are distinct controls, and search discoverability is a separate decision from training.',
    },
    {
      type: 'checklist',
      items: [
        'Decide deliberately which agents you allow, rather than inheriting a copied robots.txt.',
        'If you want to be discoverable in ChatGPT Search, do not block OAI-SearchBot.',
        'Verify your robots.txt actually says what you think it says — test it, do not assume.',
        'Remember robots.txt is a public request, not access control.',
      ],
    },
    {
      type: 'p',
      text: 'Allowing a crawler makes you eligible, not selected. No robots directive causes a citation.',
    },
    { type: 'h2', id: 'what-helps', text: 'What appears to help' },
    {
      type: 'steps',
      items: [
        { title: 'Answer in the opening', text: 'Two or three sentences that resolve the question completely. This is the passage most likely to be extracted, and it helps human readers too.' },
        { title: 'Name your entities', text: 'Avoid pronouns where the subject should appear. A passage read in isolation must still be obviously about the right thing.' },
        { title: 'Be specific enough to attribute', text: 'Original data, a named method, a documented process, a stated limitation. Generic advice is paraphrased without credit because a hundred pages say the same thing.' },
        { title: 'Structure for extraction', text: 'Ordered headings, real lists, real tables, an FAQ block. A comparison in a table survives quoting; the same comparison in prose usually does not.' },
        { title: 'Date your claims', text: '"As of 2026" is more quotable than an undated assertion, and it signals maintenance.' },
        { title: 'Stay consistent', text: 'Contradictions between your own pages reduce confidence. Internal agreement is one of the cheapest wins available.' },
      ],
    },
    { type: 'h2', id: 'technical', text: 'Technical prerequisites' },
    {
      type: 'ul',
      items: [
        'Server-rendered HTML — check view-source, not the inspector. Retrieval pipelines may not execute JavaScript.',
        'Fast, stable responses so fetches succeed reliably.',
        'Correct canonicals so signals are not split across URL variants.',
        'Accurate structured data describing what is genuinely on the page.',
        'A current sitemap so new pages are discovered quickly.',
      ],
    },
    { type: 'h2', id: 'measuring', text: 'Measuring it' },
    {
      type: 'p',
      text: 'Fix a set of representative questions, run them on a schedule, and record whether you appear and how you are described. Add referral traffic from assistants as a floor, and watch branded search as a proxy for exposure that produced no click. See [AI visibility tracking](/ai-visibility-tracking).',
    },
    {
      type: 'callout',
      title: 'What nobody can promise',
      text: 'No product or agency can guarantee a ChatGPT citation. Citation sets are unstable, vary by phrasing and session, and change as the system updates. Treat this work as improving probability.',
    },
    {
      type: 'p',
      text: 'The same fundamentals apply across surfaces — see [AI search optimization](/ai-search-optimization) for the comparison, or [what is GEO](/what-is-geo) for the underlying discipline.',
    },
  ],
  faqs: [
    {
      question: 'Does blocking GPTBot remove me from ChatGPT Search?',
      answer:
        'They are documented as separate user agents with separate purposes: GPTBot is associated with model training, while OAI-SearchBot is associated with surfacing sites in search. Blocking one is not the same decision as blocking the other, so set each deliberately.',
    },
    {
      question: 'Is there a ChatGPT ranking factor list?',
      answer:
        'No, and anyone publishing one is guessing. What can be said with confidence is that retrieval depends on ordinary discoverability, and that clear, specific, well-structured pages are easier to use in an answer.',
    },
    {
      question: 'Does llms.txt make ChatGPT cite me?',
      answer:
        'No. It is an emerging convention that offers a clean plain-text map of your important pages. It may aid comprehension; it is not a ranking or citation mechanism.',
    },
    {
      question: 'Do I need different content for ChatGPT than for Google?',
      answer:
        'No. A page that answers its question directly, names its entities clearly and is properly structured serves both. Maintaining separate versions tends to create contradictions that hurt both.',
    },
  ],
};
