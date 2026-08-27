export const whatIsGeo = {
  slug: '/what-is-geo',
  eyebrow: 'Generative Engine Optimization',
  title: 'What is Generative Engine Optimization?',
  lead: 'A direct answer, then the detail: how GEO works, how it differs from SEO, and what to actually change on your site.',
  updated: '2026-08-27',
  blocks: [
    {
      type: 'answer',
      label: 'Short answer',
      text: 'Generative Engine Optimization, or GEO, is the practice of improving web content so it can be more clearly understood, evaluated and surfaced by AI-powered search and answer systems. Where SEO aims at a position in a list of results, GEO aims at being used — and ideally cited — inside a generated answer.',
    },
    {
      type: 'p',
      text: 'The term describes work that is mostly familiar and partly new. Familiar, because generative engines still retrieve from the indexed web, so crawlability, relevance and authority all still matter. New, because a system that writes an answer needs something different from a system that ranks links: it needs passages it can lift, entities it can resolve without ambiguity, and claims it can attribute to a source.',
    },
    { type: 'h2', id: 'why-it-exists', text: 'Why GEO exists now' },
    {
      type: 'p',
      text: 'For two decades, the unit of search visibility was the blue link. A user typed a query, the engine returned ten results, and the click was the prize. That model is no longer the only one. AI Overviews and AI Mode in Google, ChatGPT Search, Gemini, Perplexity and Copilot all answer directly, and many of them show a short list of sources alongside the answer.',
    },
    {
      type: 'p',
      text: 'The consequence is straightforward: a page can now influence a user without receiving the click that used to prove it. Visibility has to be measured differently, and content has to be written so that a system summarising it does not lose the point.',
    },
    {
      type: 'diagram',
      steps: ['Query', 'Retrieval', 'Synthesis', 'Answer', 'Citations'],
      caption: 'A simplified generative search pipeline. GEO influences the retrieval and synthesis stages.',
    },
    { type: 'h2', id: 'how-it-works', text: 'How generative engines choose sources' },
    {
      type: 'p',
      text: 'Implementations differ, but most generative answer systems follow a broadly similar path. The query is interpreted and often expanded into several sub-queries. Candidate documents are retrieved — frequently from a conventional search index. Passages are extracted and ranked for relevance. A language model then synthesises an answer from those passages and attributes parts of it to the sources it used.',
    },
    {
      type: 'p',
      text: 'Each of those stages gives you something to optimize for. Retrieval rewards the same fundamentals as SEO. Passage extraction rewards content that answers a question in a self-contained way. Synthesis rewards clarity — a paragraph that states a fact plainly is easier to reuse than one that buries it. Attribution rewards content that is specific enough to be worth naming as a source.',
    },
    { type: 'h2', id: 'geo-vs-seo', text: 'GEO compared with SEO' },
    {
      type: 'table',
      caption: 'How SEO and GEO differ across the dimensions that matter in practice',
      head: ['Dimension', 'SEO', 'GEO'],
      rows: [
        ['Target surface', 'Search results pages', 'Generated answers and AI summaries'],
        ['Definition of success', 'Ranking position and clicks', 'Being retrieved, used and cited'],
        ['Primary unit', 'Keywords and queries', 'Entities, topics and context'],
        ['Content shape', 'Pages that satisfy a query', 'Passages that answer a question on their own'],
        ['Authority signal', 'Links and site reputation', 'Consistency, specificity and verifiability'],
        ['Measurement', 'Rankings, impressions, clicks', 'Mentions, citations, referral patterns, brand queries'],
      ],
    },
    {
      type: 'callout',
      title: 'GEO does not replace SEO',
      text: 'Generative engines retrieve from the web. A page that cannot be crawled, is not relevant, or carries no authority will not be retrieved in the first place. Treat GEO as an extension of a working SEO programme, not a substitute for one. See [SEO vs GEO](/seo-vs-geo) for the full comparison.',
    },
    { type: 'h2', id: 'what-to-change', text: 'What to actually change on your site' },
    {
      type: 'steps',
      items: [
        {
          title: 'Answer the question in the first paragraph',
          text: 'Lead with a direct, self-contained answer of two or three sentences. This is the passage most likely to be extracted, and it also improves the page for human readers who are scanning.',
        },
        {
          title: 'Make entities unambiguous',
          text: 'Name your product, company, category and the concepts you discuss consistently. Avoid pronouns and internal shorthand where an entity should appear. If a passage is read in isolation, it should still be obvious what it is about.',
        },
        {
          title: 'Structure the page for extraction',
          text: 'Use a logical heading hierarchy, short paragraphs, real lists and real tables. A comparison expressed as a table is far easier for a model to reuse accurately than the same comparison buried in prose.',
        },
        {
          title: 'Add machine-readable context',
          text: 'Implement accurate structured data — Organization, WebSite, Article, FAQPage, BreadcrumbList and Product where relevant. Schema does not force a citation, but it removes ambiguity about what a page is and who published it.',
        },
        {
          title: 'Be specific enough to be worth citing',
          text: 'Generic advice is interchangeable and rarely attributed. Original data, concrete methods, named trade-offs and clear definitions give a model a reason to point at you rather than paraphrase the consensus.',
        },
        {
          title: 'Keep facts current and consistent',
          text: 'Contradictions between your pages — different definitions, stale figures, conflicting product descriptions — reduce confidence. Consistency across your own site is one of the cheapest GEO wins available.',
        },
        {
          title: 'Build the surrounding cluster',
          text: 'A single page rarely establishes authority on a topic. Supporting pages that cover adjacent questions, linked together with descriptive anchors, make the whole topic more retrievable.',
        },
        {
          title: 'Stay crawlable to AI agents',
          text: 'Check that your robots.txt does not unintentionally block AI crawlers you want to reach you, that server-side rendering delivers your content without JavaScript, and that important text is not locked inside images or canvas elements.',
        },
      ],
    },
    { type: 'h2', id: 'measuring', text: 'How to measure GEO' },
    {
      type: 'p',
      text: 'GEO measurement is less mature than SEO measurement, and honest practice means acknowledging that. There is no universal rank tracker for generated answers, and results vary by user, session and phrasing. What you can do is track directional signals.',
    },
    {
      type: 'ul',
      items: [
        'Prompt monitoring: run a fixed set of representative questions across answer engines on a schedule and record whether you appear.',
        'Referral patterns: watch for traffic from AI assistants and answer engines in your analytics, and treat it as a floor rather than the full picture.',
        'Branded query volume: growing brand searches often indicate exposure that did not produce a direct click.',
        'Coverage audits: check whether your pages actually contain a clean, extractable answer to the questions you want to own.',
      ],
    },
    {
      type: 'callout',
      title: 'Be careful with guarantees',
      text: 'No tool or agency can guarantee inclusion or citation in AI answers. Engines change their retrieval and synthesis behaviour frequently, and citation sets are unstable. Treat GEO as improving the probability of visibility, not securing it.',
    },
    { type: 'h2', id: 'common-mistakes', text: 'Common mistakes' },
    {
      type: 'ul',
      items: [
        '**Publishing volume instead of clarity.** More pages saying the same thing does not make any of them more citable.',
        '**Writing for extraction only.** Content that reads like a summary of itself performs badly with humans, and human engagement still feeds the systems that rank you.',
        '**Ignoring technical foundations.** If a page renders only after client-side JavaScript, some retrieval systems will simply not see it.',
        '**Treating GEO as separate from SEO.** Running two disconnected programmes duplicates research and produces conflicting content.',
        '**Chasing every new surface.** The underlying principles are the same across engines; optimizing per-engine rarely pays off.',
      ],
    },
    { type: 'h2', id: 'getting-started', text: 'A practical starting point' },
    {
      type: 'ol',
      items: [
        'Pick the ten questions you most want to be the answer to.',
        'For each, check whether you have a page that answers it directly in its opening paragraph.',
        'Fix the pages that bury the answer, and write the ones that do not exist.',
        'Add structured data and internal links across the cluster.',
        'Set a monthly check on those ten questions across the answer engines your audience uses.',
      ],
    },
    {
      type: 'p',
      text: 'That loop — research, write, structure, publish, measure, improve — is exactly the workflow [GetGeoAgent](/) automates. You can read the full method in [how it works](/how-it-works), or the deeper discipline overview in [generative engine optimization](/generative-engine-optimization).',
    },
  ],
  faqs: [
    {
      question: 'What does GEO stand for?',
      answer:
        'GEO stands for Generative Engine Optimization: optimizing content so AI-powered answer systems can understand, evaluate and cite it.',
    },
    {
      question: 'Is GEO the same as AEO or AI SEO?',
      answer:
        'The terms overlap heavily. Answer Engine Optimization (AEO) and "AI SEO" are often used to describe the same work. GEO is the term most commonly used for optimizing specifically for generative answer systems.',
    },
    {
      question: 'Does structured data guarantee an AI citation?',
      answer:
        'No. Structured data removes ambiguity about what a page contains and who published it, which helps, but no markup forces an engine to cite a source.',
    },
    {
      question: 'How long does GEO take to show results?',
      answer:
        'It depends on crawl frequency, competition and how much of your content already answers the questions you are targeting. Because generative engines retrieve from search indexes, timelines are broadly similar to SEO rather than instant.',
    },
    {
      question: 'Do I need separate content for SEO and GEO?',
      answer:
        'Usually not. A page that answers a question directly, is well structured and is properly marked up serves both. Maintaining two separate content sets tends to create contradictions that hurt both.',
    },
  ],
};
