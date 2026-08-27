export const seoMonitoring = {
  slug: '/seo-monitoring',
  eyebrow: 'Monitoring',
  title: 'SEO Monitoring and Reporting',
  lead: 'Rankings, impressions, clicks and page-level performance in one view — and, more usefully, a short list of what to do about them.',
  secondaryCta: { label: 'See AI visibility tracking', href: '/ai-visibility-tracking' },
  blocks: [
    {
      type: 'answer',
      label: 'What it does',
      text: 'Monitoring tracks how your pages perform in search over time, detects the patterns that matter — a cluster gaining, a page decaying, a new query appearing — and turns each pattern into an action the agent can take in the next cycle.',
    },
    { type: 'h2', id: 'not-a-dashboard', text: 'A dashboard nobody reads is not monitoring' },
    {
      type: 'p',
      text: 'Most SEO reporting stops at description: here is what happened. The gap between that and a decision is where programmes stall. Monitoring here is built to close that gap — every trend it detects maps to something specific: refresh this page, extend this cluster, investigate this drop.',
    },
    { type: 'h2', id: 'what-it-watches', text: 'What it watches' },
    {
      type: 'steps',
      items: [
        { title: 'Keyword movement', text: 'Position changes per query, grouped by cluster so a topic gaining ground is visible as a topic rather than as forty separate rows.' },
        { title: 'Page performance', text: 'Impressions, clicks and click-through rate per URL, from your Search Console connection.' },
        { title: 'Content decay', text: 'Pages sliding gradually over weeks — the pattern that never triggers an alert but accounts for most lost traffic.' },
        { title: 'New queries', text: 'Questions your market started asking that no page of yours currently answers.' },
        { title: 'Cluster health', text: 'Whether a topic is gaining as a whole, which is a better signal than any single keyword.' },
        { title: 'Technical regressions', text: 'Indexability and structure issues introduced by a release, from the continuous crawl.' },
      ],
    },
    { type: 'h2', id: 'decay', text: 'Content decay is the quiet one' },
    {
      type: 'p',
      text: 'A page rarely collapses. It slips one position, then another, and six months later a quarter of your library is quietly underperforming with no single event to point at. Detecting the slope rather than the cliff is the whole job, and it is why decay detection runs against a trend rather than a threshold.',
    },
    {
      type: 'callout',
      title: 'From signal to action',
      text: 'A decaying page is handed to the [content optimizer](/content-optimizer) as a refresh candidate, with the specific gaps that opened up since it was published. A new query with no page becomes an opportunity in the [content planner](/content-planner).',
    },
    { type: 'h2', id: 'honest-reporting', text: 'Reporting that survives a meeting' },
    {
      type: 'ul',
      items: [
        'Trends over time rather than single-day snapshots, which are mostly noise.',
        'Clusters as the primary unit, because that is how the strategy is organised.',
        'Losses reported as clearly as gains — a report that only shows what improved is not a report.',
        'Stated method and limitations, especially for AI visibility, which is directional rather than exact.',
      ],
    },
    { type: 'h2', id: 'both-surfaces', text: 'Both surfaces, one view' },
    {
      type: 'p',
      text: 'Classic search metrics come from Search Console and analytics. AI visibility is measured differently — a fixed prompt set, checked on a schedule — and is directional by nature. Both appear in the same view, clearly distinguished, because pretending they have the same precision would be misleading. See [AI visibility tracking](/ai-visibility-tracking).',
    },
  ],
  faqs: [
    {
      question: 'What data sources does it use?',
      answer:
        'Google Search Console and Google Analytics 4 connections provide search performance data, alongside the agent’s own crawl and its scheduled AI visibility checks.',
    },
    {
      question: 'How often does it update?',
      answer:
        'Search performance follows your connected sources, which typically update daily. Crawl-based checks and AI visibility checks run on their own cycle.',
    },
    {
      question: 'Does it alert me to drops?',
      answer:
        'Detected patterns — including decay and technical regressions — surface as findings with a proposed action, rather than as a raw alert you still have to diagnose.',
    },
  ],
};
