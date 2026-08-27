export const contentPlanner = {
  slug: '/content-planner',
  eyebrow: 'Content planner',
  title: 'SEO Content Planner',
  lead: 'Turn clusters into a sequenced editorial plan: what to publish, in what order, and how each piece reinforces the pages around it.',
  secondaryCta: { label: 'See keyword research', href: '/keyword-research' },
  blocks: [
    {
      type: 'answer',
      label: 'What it does',
      text: 'The planner converts researched clusters into a dated plan. It decides which page is the pillar, which pieces support it, what order they ship in, and how they link together — so a content calendar is a topical structure rather than a list of due dates.',
    },
    { type: 'h2', id: 'order-matters', text: 'Publishing order is a strategy decision' },
    {
      type: 'p',
      text: 'A cluster published in the wrong order wastes its own momentum. Supporting pieces that arrive before the pillar exists have nothing authoritative to link to, and a pillar that arrives last inherits none of the internal signals it should have accumulated. The planner sequences the pillar first and schedules supporting pieces to reinforce it as they ship.',
    },
    { type: 'h2', id: 'structure', text: 'What a planned cluster looks like' },
    {
      type: 'steps',
      items: [
        {
          title: 'Pillar page',
          text: 'The comprehensive page that defines the topic and answers its broadest question completely. Everything else in the cluster links up to it.',
        },
        {
          title: 'Supporting pages',
          text: 'One page per question a reader would genuinely search separately — not one page per keyword variant.',
        },
        {
          title: 'Comparison and decision pages',
          text: 'Where the cluster contains commercial intent, the pages people read while choosing between options.',
        },
        {
          title: 'Refreshes',
          text: 'Existing pages that already cover part of the cluster and should be extended rather than duplicated.',
        },
        {
          title: 'Link plan',
          text: 'The internal links between all of the above, with the anchors decided before anything is drafted.',
        },
      ],
    },
    { type: 'h2', id: 'briefs', text: 'Every slot carries a brief' },
    {
      type: 'p',
      text: 'A date on a calendar is not a brief. Each planned piece arrives with the query it targets, the intent behind it, the sections a complete answer needs, the entities it must name clearly, the internal links it should carry, and the pages it is meant to reinforce.',
    },
    {
      type: 'callout',
      title: 'Refresh before you republish',
      text: 'A large share of the opportunity in most content libraries sits in pages that already exist. The planner flags decaying and incomplete pages as refresh slots rather than scheduling a near-duplicate — which is how libraries end up cannibalising themselves.',
    },
    { type: 'h2', id: 'capacity', text: 'Planned against real capacity' },
    {
      type: 'p',
      text: 'A plan that assumes unlimited output is a wish list. The planner works to the volume your plan actually supports, so the sequence stays honest and the highest-value clusters ship first rather than everything starting at once and nothing finishing.',
    },
    { type: 'h2', id: 'downstream', text: 'From plan to draft' },
    {
      type: 'p',
      text: 'Approved slots move into the [AI content writer](/ai-content-writer), which drafts from the brief rather than from a keyword, and then through the publishing checks. Performance data returns to the plan through [SEO monitoring](/seo-monitoring), which is what makes the next cycle better than the last.',
    },
  ],
  faqs: [
    {
      question: 'Does the planner write the content?',
      answer:
        'No — it decides what should exist and why. Drafting happens separately in the AI content writer, working from the brief the planner produced.',
    },
    {
      question: 'Can I change the plan?',
      answer:
        'Yes. The plan is a proposal: you can reorder, remove or add slots, and the agent re-sequences the rest of the cluster around your changes.',
    },
    {
      question: 'How does it decide what to refresh instead of write?',
      answer:
        'By mapping each cluster onto your existing pages. Where a page already covers part of a cluster, extending it usually beats publishing a second page that competes with it.',
    },
  ],
};
