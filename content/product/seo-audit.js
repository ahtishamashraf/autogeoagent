export const seoAudit = {
  slug: '/seo-audit',
  eyebrow: 'SEO audit',
  title: 'Automated SEO Audit',
  lead: 'A crawl that produces a prioritised list of fixes tied to specific URLs — not a 400-row export that gets filed and forgotten.',
  secondaryCta: { label: 'See technical SEO', href: '/technical-seo' },
  blocks: [
    {
      type: 'answer',
      label: 'What it does',
      text: 'The agent crawls your site the way a search engine would, records what it can and cannot reach, and reports the issues that are actually costing you visibility — each one tied to the URL it affects and ranked by how much it matters.',
    },
    { type: 'h2', id: 'what-it-checks', text: 'What the audit covers' },
    {
      type: 'table',
      caption: 'Audit areas and the questions each one answers',
      head: ['Area', 'What it answers'],
      rows: [
        ['Indexability', 'Can this page be crawled and indexed at all, and should it be?'],
        ['Metadata', 'Does every page have a unique, accurate title and description?'],
        ['Heading structure', 'Is there one logical H1, and do headings descend in order?'],
        ['Duplication', 'Are several pages competing for the same query?'],
        ['Canonicalisation', 'Does each page point at the URL you actually want indexed?'],
        ['Internal links', 'Which pages are orphaned, and where are links missing?'],
        ['Content quality', 'Is the page thin, or does it genuinely answer its query?'],
        ['Structured data', 'Is the markup present, valid and truthful?'],
        ['Performance signals', 'Do pages render fast enough and stably enough to be a good result?'],
      ],
    },
    { type: 'h2', id: 'prioritised', text: 'Prioritised, not exhaustive' },
    {
      type: 'p',
      text: 'Every crawler can produce a long list. The useful question is which three things to fix this week. Findings are ranked by the size of the problem and the number of pages affected, so a single template-level fix that touches two hundred pages ranks above a one-off typo in a meta description.',
    },
    {
      type: 'ol',
      items: [
        'Issues that block indexing entirely — nothing else matters until these are resolved.',
        'Issues affecting many pages at once, usually template-level.',
        'Issues on pages that already have traffic or rankings to protect.',
        'Issues on pages with clear commercial intent.',
        'Everything else, grouped so it can be handled in batches.',
      ],
    },
    { type: 'h2', id: 'honest', text: 'What an audit cannot tell you' },
    {
      type: 'p',
      text: 'An audit is a technical picture, not a prediction. It can tell you a page is not indexable; it cannot tell you the page would have ranked if it were. Treat findings as removing obstacles rather than as a forecast of results — anyone selling an audit as a traffic projection is guessing.',
    },
    {
      type: 'callout',
      title: 'Fixing is a separate decision',
      text: 'The audit reports and proposes. Content-level fixes flow into the [content optimizer](/content-optimizer); structural fixes belong to your engineering team. Nothing is changed on your site without approval.',
    },
    { type: 'h2', id: 'ai-readability', text: 'Includes AI readability' },
    {
      type: 'p',
      text: 'The same crawl records whether pages render their content server-side, whether robots rules exclude AI crawlers you may want to reach, and whether structured data is present and accurate. Those are increasingly the difference between being retrievable by an answer engine and being invisible to one — see [AI search optimization](/ai-search-optimization).',
    },
    { type: 'h2', id: 'cadence', text: 'Run continuously, not once' },
    {
      type: 'p',
      text: 'A one-off audit describes a site that no longer exists by the time the fixes ship. The crawl re-runs on a cycle, so regressions introduced by a release show up as new findings rather than as an unexplained ranking drop three months later.',
    },
  ],
  faqs: [
    {
      question: 'How is this different from a technical SEO check?',
      answer:
        'The audit is the crawl and its findings. [Technical SEO](/technical-seo) is the wider discipline — crawling, indexing, canonicalisation, structured data, performance — that the findings belong to.',
    },
    {
      question: 'Does it fix issues automatically?',
      answer:
        'No. It reports and proposes. Content fixes can be drafted for review; structural and template changes belong with your engineering team.',
    },
    {
      question: 'How large a site can it crawl?',
      answer:
        'Crawl scope depends on your plan. See [pricing](/pricing) for how many websites each tier covers.',
    },
  ],
};
