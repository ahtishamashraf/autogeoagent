export const internalLinking = {
  slug: '/internal-linking',
  eyebrow: 'Internal linking',
  title: 'Automated Internal Linking',
  lead: 'The agent reads your whole site at once, works out which pages genuinely relate, and proposes contextual links with anchors that actually describe the destination.',
  secondaryCta: { label: 'See the content planner', href: '/content-planner' },
  blocks: [
    {
      type: 'answer',
      label: 'What it does',
      text: 'GetGeoAgent maps the topical relationships across your site, finds pages that should be connected and are not, proposes links with descriptive anchor text, and surfaces orphan pages that nothing links to. It is the part of SEO that compounds and the part that never gets done by hand.',
    },
    { type: 'h2', id: 'why-it-decays', text: 'Why internal linking degrades on every site' },
    {
      type: 'p',
      text: 'Internal linking is a whole-site problem solved one page at a time. When you publish page forty, you would have to remember pages one through thirty-nine to link it correctly — and go back to update the ones that should now point at it. Nobody does the second part, so link structure decays with every publish.',
    },
    {
      type: 'p',
      text: 'An agent holding the entire site in view does not have that problem. It can evaluate every existing page as a candidate link source each time something new appears.',
    },
    { type: 'h2', id: 'what-it-does', text: 'What the agent proposes' },
    {
      type: 'steps',
      items: [
        {
          title: 'Topical relationships',
          text: 'Which pages are genuinely about related things, based on their content rather than on shared keywords in a URL.',
        },
        {
          title: 'Contextual link placement',
          text: 'Where in the body a link belongs, so it reads as a useful reference rather than a block of related links nobody clicks.',
        },
        {
          title: 'Descriptive anchors',
          text: 'Anchor text that says what the destination is about. "Read more" teaches a crawler nothing and helps a reader less.',
        },
        {
          title: 'Reverse links',
          text: 'The existing pages that should now point at your newest page — the half of the job that is normally skipped.',
        },
        {
          title: 'Orphan detection',
          text: 'Pages nothing links to. They are usually invisible to crawlers and to readers alike.',
        },
        {
          title: 'Cluster reinforcement',
          text: 'Every supporting page links up to its pillar, and the pillar links down to each of them.',
        },
      ],
    },
    { type: 'h2', id: 'why-it-matters', text: 'What internal links actually do' },
    {
      type: 'ul',
      items: [
        '**Discovery.** Crawlers reach pages through links. An orphan page is a page that may never be crawled reliably.',
        '**Context.** Anchor text and surrounding copy tell a search system what the destination page is about.',
        '**Authority distribution.** Links pass signals through your site; a good structure sends them toward the pages that matter commercially.',
        '**Retrieval context.** For generative engines, the pages around a passage help establish whether it is trustworthy — see [generative engine optimization](/generative-engine-optimization).',
        '**Readers.** The unglamorous one: people follow useful links, and pages that answer follow-up questions keep them on the site.',
      ],
    },
    { type: 'h2', id: 'shape', text: 'The shape it builds toward' },
    {
      type: 'diagram',
      steps: ['Pillar', 'Cluster page', 'Supporting answer', 'Back to pillar'],
      caption: 'Every supporting page links up; the pillar links down to each of them.',
    },
    {
      type: 'p',
      text: 'Topical authority behaves much more like a shape than a quantity. Forty unconnected posts do not produce it; twelve deliberately linked ones do. The link graph is what makes a cluster read as a cluster rather than as a pile of pages that happen to share a subject.',
    },
    {
      type: 'callout',
      title: 'Links are proposals, not edits',
      text: 'Every suggested link is reviewable before it is applied. An automated linker that edits live pages unattended is a fast route to broken anchors and links nobody intended.',
    },
  ],
  faqs: [
    {
      question: 'Does it add links to my site automatically?',
      answer:
        'Links are proposed with their placement and anchor text for you to approve. They are applied through the normal publishing flow, not written into live pages unattended.',
    },
    {
      question: 'How does it decide two pages are related?',
      answer:
        'By what the pages are actually about — their topics and entities — rather than by matching keywords in a URL or title, which produces links that look right and read wrong.',
    },
    {
      question: 'Can it find orphan pages?',
      answer:
        'Yes. Pages with no incoming internal links are flagged, along with the pages that would be the most natural sources of a link to them.',
    },
    {
      question: 'Will it over-link my content?',
      answer:
        'Proposals are limited to links that serve the reader at that point in the page. A page stuffed with internal links reads badly and dilutes the value of each one.',
    },
  ],
};
