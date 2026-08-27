export const generativeEngineOptimization = {
  slug: '/generative-engine-optimization',
  eyebrow: 'Discipline overview',
  title: 'Generative Engine Optimization',
  lead: 'The full discipline: entities, structure, citability, authority and measurement — and how to run it as a repeatable programme rather than a one-off audit.',
  updated: '2026-08-27',
  blocks: [
    {
      type: 'lead',
      text: 'Generative Engine Optimization is the systematic work of making a website legible, trustworthy and quotable to systems that generate answers. This page covers the discipline end to end. For a plain definition, start with [what is GEO](/what-is-geo).',
    },
    { type: 'h2', id: 'foundations', text: 'The four foundations' },
    {
      type: 'p',
      text: 'Almost everything worth doing in GEO falls into one of four buckets. They compound: clarity makes structure more useful, structure makes authority legible, and measurement tells you which of the three to invest in next.',
    },
    {
      type: 'steps',
      items: [
        {
          title: 'Entity clarity',
          text: 'Every important concept, product and organisation on your site should be nameable and consistently described. Ambiguity is the single biggest reason a model paraphrases the consensus instead of citing you.',
        },
        {
          title: 'Extractable structure',
          text: 'Answer-first paragraphs, ordered headings, real lists and real tables. If a passage cannot be lifted without losing meaning, it will not be lifted.',
        },
        {
          title: 'Demonstrable authority',
          text: 'Specificity, provenance and consistency. Named methods, dated figures, clear authorship and agreement across your own pages.',
        },
        {
          title: 'Machine-readable context',
          text: 'Accurate structured data, clean semantic HTML, server-rendered content and a robots policy that does not accidentally exclude the crawlers you want.',
        },
      ],
    },
    { type: 'h2', id: 'entities', text: 'Working with entities' },
    {
      type: 'p',
      text: 'Search systems have modelled entities for years; generative systems depend on them more heavily because an answer has to be about something specific. Practical entity work is unglamorous and effective.',
    },
    {
      type: 'ul',
      items: [
        'Use one canonical name for each concept across the whole site, and introduce synonyms explicitly rather than switching silently.',
        'Give each significant entity a definitional home — a page that says plainly what it is.',
        'Describe relationships between entities in prose, not only through navigation.',
        'Keep organisation details identical everywhere: name, description, contact route, and any profiles you actually maintain.',
        'Mark up entities with structured data so the relationship between a page and its subject is explicit.',
      ],
    },
    { type: 'h2', id: 'structure', text: 'Structuring content for extraction' },
    {
      type: 'p',
      text: 'A useful test: take any section of your page, read it with no surrounding context, and ask whether it still answers something. If it does not, a retrieval system will struggle with it too.',
    },
    {
      type: 'checklist',
      items: [
        'Open every page with a two-to-three sentence direct answer to its main question.',
        'Give each H2 a question or a clear claim rather than a label like "Overview".',
        'Keep paragraphs to a single idea; long paragraphs dilute the passage.',
        'Express comparisons as tables and processes as ordered lists.',
        'Put definitions in their own sentence, in the form "X is ...".',
        'Add an FAQ section covering the follow-up questions the page provokes.',
      ],
    },
    { type: 'h2', id: 'citability', text: 'Being worth citing' },
    {
      type: 'p',
      text: 'Retrieval gets you considered. Citability gets you named. The difference is usually specificity: a model has no reason to attribute a generic claim, because a hundred pages make the same one.',
    },
    {
      type: 'ul',
      items: [
        'Publish something only you can: original data, a named method, a documented process, a real limitation.',
        'State trade-offs explicitly. Balanced, concrete writing is easier to attribute than promotional copy.',
        'Date your claims. "As of 2026" is more quotable than an undated assertion.',
        'Avoid hedging everything — a clear position is more citable than a survey of opinions.',
      ],
    },
    { type: 'h2', id: 'technical', text: 'The technical layer' },
    {
      type: 'p',
      text: 'GEO inherits every technical requirement of SEO and adds a few emphases of its own.',
    },
    {
      type: 'table',
      caption: 'Technical requirements and why they matter for generative retrieval',
      head: ['Requirement', 'Why it matters'],
      rows: [
        ['Server-rendered content', 'Some retrieval pipelines do not execute JavaScript; unrendered content is invisible to them.'],
        ['Fast, stable pages', 'Slow or unstable responses reduce the chance of successful fetching and re-crawling.'],
        ['Correct canonicals', 'Duplicate variants split signals and confuse which URL should be attributed.'],
        ['Accurate structured data', 'Resolves what a page is, who published it and how it relates to other pages.'],
        ['Sitemaps and clean robots rules', 'Ensures discovery and avoids unintentionally excluding AI crawlers you want.'],
        ['Meaningful internal links', 'Descriptive anchors give retrieval systems the context that surrounds a passage.'],
        ['Plain-text summaries', 'Files such as llms.txt give AI systems a compact, unambiguous map of your important pages.'],
      ],
    },
    { type: 'h2', id: 'measurement', text: 'Measuring a GEO programme' },
    {
      type: 'p',
      text: 'GEO measurement is directional, not exact, and it is better to say so than to invent precision. Build a small, stable measurement routine and watch the trend.',
    },
    {
      type: 'steps',
      items: [
        {
          title: 'Fix a prompt set',
          text: 'Twenty to fifty questions that represent real buying and research intent in your market. Keep the wording stable so results are comparable over time.',
        },
        {
          title: 'Check on a schedule',
          text: 'Run the set across the answer engines your audience actually uses. Record presence, position within the source list, and how you are described.',
        },
        {
          title: 'Watch referral behaviour',
          text: 'Track visits attributed to assistants and answer engines. Treat the number as a floor, since much AI exposure produces no referrer at all.',
        },
        {
          title: 'Track brand demand',
          text: 'Rising branded search often reflects exposure that never generated a click.',
        },
        {
          title: 'Audit coverage, not just results',
          text: 'For every question in the set, confirm you have a page that answers it directly. Missing coverage is the most fixable cause of missing citations.',
        },
      ],
    },
    { type: 'h2', id: 'programme', text: 'Running it as a programme' },
    {
      type: 'p',
      text: 'GEO fails as a one-off audit for the same reason SEO does: the web moves. Engines change how they retrieve and synthesise, competitors publish, and your own pages age. The work has to be a loop.',
    },
    {
      type: 'diagram',
      steps: ['Research', 'Strategy', 'Create', 'Publish', 'Measure', 'Improve'],
      caption: 'The continuous cycle GetGeoAgent runs across both SEO and GEO.',
    },
    {
      type: 'p',
      text: 'That loop is the product. [GetGeoAgent](/) maintains the topic model, drafts and structures the content, prepares it for publishing, watches performance on both surfaces and folds what it learns back into the plan. See [how it works](/how-it-works) for the full workflow, or [GEO optimization](/geo-optimization) for the product view.',
    },
  ],
  faqs: [
    {
      question: 'What is the difference between GEO and AEO?',
      answer:
        'Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) describe overlapping work. AEO is often used more broadly, including featured snippets and voice answers; GEO usually refers specifically to AI systems that generate a synthesised response.',
    },
    {
      question: 'Which structured data types matter most for GEO?',
      answer:
        'Organization and WebSite establish who you are, Article or BlogPosting establishes what a page is and when it was published, FAQPage exposes question-and-answer pairs directly, and BreadcrumbList clarifies where a page sits. Accuracy matters far more than quantity.',
    },
    {
      question: 'Does llms.txt help with GEO?',
      answer:
        'It is an emerging convention, not a ranking factor. A well-maintained llms.txt gives AI systems a clean, plain-text map of your most important pages, which can only help comprehension — but it does not replace crawlable, well-structured content.',
    },
    {
      question: 'How often should a GEO programme run?',
      answer:
        'Continuously. At minimum, re-check your prompt set monthly, refresh decaying pages as they are detected, and revisit the topic model as new questions appear in your market.',
    },
  ],
};
