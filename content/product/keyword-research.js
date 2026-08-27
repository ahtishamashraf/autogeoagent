export const keywordResearch = {
  slug: '/keyword-research',
  eyebrow: 'Keyword research',
  title: 'AI Keyword Research and Clustering',
  lead: 'Turn one seed topic into a mapped opportunity space: the queries your market actually uses, what each one is asking for, and which pages should own them.',
  secondaryCta: { label: 'See the content planner', href: '/content-planner' },
  blocks: [
    {
      type: 'answer',
      label: 'What it does',
      text: 'GetGeoAgent expands a seed topic into the real query space around it, classifies every query by search intent, groups them into clusters that can be owned by a single page, and maps each cluster against what you have already published.',
    },
    { type: 'h2', id: 'beyond-a-list', text: 'A list of keywords is not research' },
    {
      type: 'p',
      text: 'Most keyword tools return a spreadsheet: thousands of rows sorted by volume, most of which are variations of the same question. That output is not a plan. Deciding what to build from it is the actual work, and it is the part that gets skipped when a quarter gets busy.',
    },
    {
      type: 'p',
      text: 'The agent does that deciding step. Expansion, classification, clustering and gap analysis run as one process, and the output is a set of decisions — build this page, extend that one, leave this alone — rather than raw data you still have to interpret.',
    },
    { type: 'h2', id: 'how-it-works', text: 'How the research runs' },
    {
      type: 'steps',
      items: [
        {
          title: 'Expand the seed',
          text: 'Head terms, long-tail variants, questions, comparisons and the conversational phrasings people type into assistants — because those phrasings increasingly matter as much as classic keywords.',
        },
        {
          title: 'Classify intent',
          text: 'Every query is labelled informational, commercial, transactional or navigational. Intent decides the page type; without it you get one generic article per keyword and none of them satisfy anyone.',
        },
        {
          title: 'Cluster by answer, not by string',
          text: 'Queries a single strong page can satisfy are grouped together. Two phrasings of the same question belong on one page, not on two pages competing with each other.',
        },
        {
          title: 'Map against your site',
          text: 'Each cluster is matched to an existing page where one exists. That immediately exposes cannibalisation — two pages chasing the same cluster — and genuine gaps.',
        },
        {
          title: 'Score the opportunity',
          text: 'Clusters are ranked on how well you could answer them relative to what already ranks, so effort goes where it can realistically win.',
        },
      ],
    },
    { type: 'h2', id: 'intent', text: 'Why intent classification changes the output' },
    {
      type: 'p',
      text: 'Two queries can share a topic and need completely different pages. "What is generative engine optimization" wants a definition and an explanation. "GEO software" wants a product page with a comparison. Publishing an article for the second one is a reliable way to rank for nothing.',
    },
    {
      type: 'table',
      caption: 'How intent determines the page you should build',
      head: ['Intent', 'What the searcher wants', 'What to build'],
      rows: [
        ['Informational', 'To understand something', 'A definitive explainer with a direct opening answer'],
        ['Commercial', 'To evaluate options', 'A comparison, an alternatives page or a category overview'],
        ['Transactional', 'To act now', 'A product, pricing or signup page'],
        ['Navigational', 'To reach a specific place', 'A clear route to that page, not a new article'],
      ],
    },
    { type: 'h2', id: 'clusters', text: 'Clusters, not keywords' },
    {
      type: 'p',
      text: 'A cluster is the unit the agent plans around: one primary question, the supporting questions that belong with it, and the single page best placed to answer them all. Clustering this way prevents the most common self-inflicted SEO problem — a library of near-duplicate posts splitting their own signals.',
    },
    {
      type: 'checklist',
      items: [
        'Every cluster maps to exactly one primary page.',
        'No two pages compete for the same cluster.',
        'Supporting questions live on the page they belong to, or on a linked page that earns its own existence.',
        'Gaps are visible as clusters with no page attached.',
      ],
    },
    { type: 'h2', id: 'ai-queries', text: 'Question phrasings, not just keywords' },
    {
      type: 'p',
      text: 'People ask assistants full questions. "What software can automate SEO for a small marketing team?" is not a keyword, but it is exactly the phrasing an answer engine has to satisfy. The agent collects those phrasings alongside conventional queries, because the same page usually has to serve both. See [AI search optimization](/ai-search-optimization) for how that feeds GEO.',
    },
    { type: 'h2', id: 'what-happens-next', text: 'What happens to the research' },
    {
      type: 'p',
      text: 'Research is only useful if something is built from it. Clusters flow into the [content planner](/content-planner), which turns them into a sequenced plan, and into the [content optimizer](/content-optimizer), which checks whether pages you already have cover their cluster properly.',
    },
    {
      type: 'diagram',
      steps: ['Seed', 'Queries', 'Intent', 'Clusters', 'Opportunities', 'Plan'],
      caption: 'Research output feeds the plan directly rather than stopping at an export.',
    },
  ],
  faqs: [
    {
      question: 'How is this different from a keyword tool?',
      answer:
        'A keyword tool returns data for you to interpret. The agent expands, classifies, clusters and maps queries against your existing pages, then produces a ranked set of decisions about what to build or improve.',
    },
    {
      question: 'Does it find question-style queries for AI search?',
      answer:
        'Yes. Conversational phrasings are collected alongside conventional keywords, because a single well-structured page usually needs to serve both a search results page and an answer engine.',
    },
    {
      question: 'Can it detect keyword cannibalisation?',
      answer:
        'Yes. Mapping clusters onto your existing pages surfaces cases where two pages target the same cluster, which is one of the most common and most fixable causes of flat rankings.',
    },
    {
      question: 'How often does research run?',
      answer:
        'Continuously. Query discovery re-runs on a cycle so new questions appearing in your market are folded into the plan instead of waiting for someone to start a new research project.',
    },
  ],
};
