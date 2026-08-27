/**
 * Pricing configuration.
 *
 * No prices are published on the marketing site until verified numbers exist.
 * To publish pricing: set `published: true` and fill in `plans`. Every field
 * below is rendered exactly as written — nothing is invented at runtime.
 */

export const pricing = {
  published: false,
  currency: 'USD',
  billingNote: 'Plan details and current pricing are shown when you create an account.',

  /**
   * Example shape for when pricing is published:
   * {
   *   id: 'growth',
   *   name: 'Growth',
   *   price: 149,
   *   interval: 'month',
   *   description: 'For a single site running a continuous SEO and GEO programme.',
   *   features: ['...'],
   *   featured: true,
   *   cta: { label: 'Start Growing', href: site.app.signup },
   * }
   */
  plans: [],

  /** What actually drives cost. Shown when prices are not published. */
  factors: [
    {
      title: 'Sites and topic scope',
      body: 'How many websites the agent works on, and how wide a topic space it researches for each one.',
    },
    {
      title: 'Content volume',
      body: 'How much content the agent drafts, structures and prepares for publishing each cycle.',
    },
    {
      title: 'Cycle frequency',
      body: 'How often the research, optimization and refresh loop runs against your site.',
    },
    {
      title: 'Monitoring depth',
      body: 'How many queries and pages are tracked for search and AI visibility over time.',
    },
  ],

  /** Capabilities included in every plan — product facts, not price claims. */
  included: [
    'Query and topic research',
    'Search intent classification',
    'Topical maps and content clusters',
    'Intent-first content drafting',
    'Semantic coverage checks',
    'Metadata and structured data generation',
    'Internal link recommendations',
    'Pre-publish SEO checks',
    'Search and AI visibility monitoring',
    'Continuous optimization cycles',
  ],
};
