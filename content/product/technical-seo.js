export const technicalSeo = {
  slug: '/technical-seo',
  eyebrow: 'Technical SEO',
  title: 'Technical SEO, Monitored Continuously',
  lead: 'Crawling, indexing, canonicals, structured data and performance — the foundation everything else depends on, watched for regressions instead of audited once a year.',
  secondaryCta: { label: 'See the SEO audit', href: '/seo-audit' },
  blocks: [
    {
      type: 'answer',
      label: 'What technical SEO covers',
      text: 'Technical SEO is the work of making a site reliably crawlable, indexable and understandable: clean URL structure, correct canonicals, accurate robots and sitemap rules, valid structured data, server-rendered content, and pages that load fast and stably.',
    },
    { type: 'h2', id: 'why-first', text: 'Why it comes before everything else' },
    {
      type: 'p',
      text: 'Content strategy assumes your pages can be reached. If a template ships with a canonical pointing at the homepage, or a release moves rendering client-side, the best content in your market will not save you. Technical problems are cheap to fix and expensive to ignore.',
    },
    {
      type: 'p',
      text: 'This is even more true for generative engines. Many retrieval pipelines do not execute JavaScript, so a page that only renders client-side is not partially visible to them — it is absent.',
    },
    { type: 'h2', id: 'the-pipeline', text: 'The pipeline a page has to survive' },
    {
      type: 'diagram',
      steps: ['Discoverable', 'Crawlable', 'Renderable', 'Indexable', 'Understandable', 'Retrievable'],
      caption: 'Each stage depends on the one before it. A page fails at the first stage it cannot pass.',
    },
    {
      type: 'steps',
      items: [
        { title: 'Discoverable', text: 'Linked internally and present in a current sitemap. Orphan pages are frequently never crawled at all.' },
        { title: 'Crawlable', text: 'Not blocked by robots rules, not behind a redirect chain, returning a 200.' },
        { title: 'Renderable', text: 'Content present in the server response, not assembled after hydration.' },
        { title: 'Indexable', text: 'No conflicting noindex, a self-referencing canonical, no duplicate competing for the same URL.' },
        { title: 'Understandable', text: 'Semantic HTML, ordered headings, accurate structured data, unambiguous entities.' },
        { title: 'Retrievable', text: 'Fast, stable, and clean enough that a passage can be extracted without losing meaning.' },
      ],
    },
    { type: 'h2', id: 'canonicals', text: 'Canonicals and duplication' },
    {
      type: 'p',
      text: 'Duplication is rarely deliberate. It arrives through parameters, pagination, trailing-slash variants, www and non-www serving the same content, and staging hosts that got indexed. Each variant splits the signals that should have accumulated on one URL.',
    },
    {
      type: 'checklist',
      items: [
        'One canonical host, with every other variant permanently redirected to it.',
        'A self-referencing canonical on every indexable page.',
        'One consistent trailing-slash convention across the whole site.',
        'Parameters that do not change content excluded from indexing.',
        'Preview and staging deployments explicitly noindexed.',
      ],
    },
    { type: 'h2', id: 'structured-data', text: 'Structured data that is true' },
    {
      type: 'p',
      text: 'Markup is a description of what is on the page, not an opportunity. Ratings for reviews you do not have, or offers for prices you do not publish, are a manual-action risk and an obvious credibility problem. The useful types are the ones describing what genuinely exists: Organization, WebSite, Article, BreadcrumbList, FAQPage and Product where it applies.',
    },
    { type: 'h2', id: 'performance', text: 'Performance as a search signal' },
    {
      type: 'p',
      text: 'Core Web Vitals matter as a tie-breaker and as a user-experience floor, not as a substitute for relevance. The practical targets are LCP under 2.5 seconds, CLS under 0.1 and INP under 200 milliseconds — and the most common cause of failing them is shipping more JavaScript than the page needs.',
    },
    { type: 'h2', id: 'regressions', text: 'Watching for regressions' },
    {
      type: 'p',
      text: 'Most technical damage is introduced by a deploy, not by neglect. Continuous crawling means a canonical that changed, a robots rule that tightened, or a template that stopped server-rendering shows up as a finding — while the release is still fresh in someone’s mind.',
    },
  ],
  faqs: [
    {
      question: 'Does GetGeoAgent change my site’s technical setup?',
      answer:
        'No. It reports issues, explains the impact and proposes the fix. Template and infrastructure changes belong with your engineering team.',
    },
    {
      question: 'Should I block AI crawlers in robots.txt?',
      answer:
        'That is a business decision. Blocking them protects content from being used in answers, but also removes you from those answers. If AI discovery matters to you, allow the crawlers that power it — see [AI search optimization](/ai-search-optimization).',
    },
    {
      question: 'Does llms.txt replace technical SEO?',
      answer:
        'No. It is a supplementary plain-text map of important pages, not a ranking mechanism. Crawlable, well-structured, server-rendered content is what actually determines whether you can be retrieved.',
    },
  ],
};
