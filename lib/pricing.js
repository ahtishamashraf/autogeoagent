import { site } from './site';

/**
 * Pricing configuration — the single source of truth.
 *
 * Every plan card, comparison row and FAQ answer on the site reads from this
 * file. Nothing about pricing is written inline in a component.
 *
 * NEEDS-CONFIRMATION before launch:
 *  - the four price points below are launch defaults, not verified prices
 *  - `annual.enabled` and `annual.discount` assume annual billing is offered
 *  - every feature listed must exist in the application; remove anything the
 *    product does not actually do rather than shipping a claim you cannot meet
 */

export const pricing = {
  published: true,
  currency: 'USD',

  annual: {
    // Set `enabled: false` to remove the billing toggle entirely.
    enabled: true,
    discount: 0.2,
    label: 'Save 20%',
    note: 'Annual plans are billed once for twelve months.',
  },

  billingNote:
    'Plans are scoped on how many sites the agent works on, how much content it produces and how often its research and optimization cycles run.',

  plans: [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      description: 'See what the agent finds on your site before you commit to anything.',
      audience: 'Trying GetGeoAgent',
      cta: { label: 'Start Free', href: site.app.signup },
      features: [
        '1 website',
        'Website analysis',
        'Limited keyword discovery',
        'Limited SEO and GEO audit',
        'Limited AI visibility checks',
        'Limited content planning',
        'Dashboard access',
      ],
    },
    {
      id: 'starter',
      name: 'Starter',
      price: 39,
      description: 'A complete SEO and GEO programme for one website.',
      audience: 'Individual sites and small businesses',
      cta: { label: 'Start with Starter', href: site.app.signup },
      features: [
        '1 website',
        'Full SEO and GEO audit',
        'Keyword research and clustering',
        'Content planning',
        '10 content generations per month',
        'Optimization recommendations',
        'AI visibility monitoring',
        'Search Console integration',
        'Analytics integration',
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 99,
      featured: true,
      badge: 'Most popular',
      description: 'More sites, more content and a faster optimization cycle.',
      audience: 'Growing companies',
      cta: { label: 'Start with Growth', href: site.app.signup },
      features: [
        'Up to 3 websites',
        'Everything in Starter',
        'Larger keyword limits',
        '30 content generations per month',
        'Advanced content clusters',
        'Advanced AI visibility monitoring',
        'Continuous optimization',
        'Enhanced reporting',
        'Priority support',
      ],
    },
    {
      id: 'agency',
      name: 'Agency',
      price: 249,
      description: 'Run structured programmes across a portfolio of client sites.',
      audience: 'Agencies and multi-site teams',
      cta: { label: 'Start with Agency', href: site.app.signup },
      features: [
        'Up to 10 websites',
        'Everything in Growth',
        '100 content generations per month',
        'Multiple workspaces',
        'Client organization',
        'Priority processing',
        'Agency reporting',
        'Priority support',
      ],
    },
  ],

  /**
   * Comparison matrix. `true` / `false` render as a tick or a dash; a string
   * renders verbatim. Rows describe capabilities the workflow performs — keep
   * them in step with what the application actually ships.
   */
  comparison: [
    {
      group: 'Platform',
      rows: [
        { label: 'Websites', values: { free: '1', starter: '1', growth: '3', agency: '10' } },
        { label: 'Workspaces', values: { free: '1', starter: '1', growth: '1', agency: 'Multiple' } },
        { label: 'Dashboard', values: { free: true, starter: true, growth: true, agency: true } },
        { label: 'Priority processing', values: { free: false, starter: false, growth: false, agency: true } },
      ],
    },
    {
      group: 'SEO',
      rows: [
        { label: 'Keyword research', values: { free: 'Limited', starter: true, growth: true, agency: true } },
        { label: 'SEO audit', values: { free: 'Limited', starter: true, growth: true, agency: true } },
        { label: 'Search intent analysis', values: { free: 'Limited', starter: true, growth: true, agency: true } },
        { label: 'Content planning', values: { free: 'Limited', starter: true, growth: true, agency: true } },
        { label: 'Content optimization', values: { free: false, starter: true, growth: true, agency: true } },
        { label: 'Internal linking', values: { free: false, starter: true, growth: true, agency: true } },
      ],
    },
    {
      group: 'GEO and AI search',
      rows: [
        { label: 'AI search optimization', values: { free: 'Limited', starter: true, growth: true, agency: true } },
        { label: 'AI visibility monitoring', values: { free: 'Limited', starter: true, growth: 'Advanced', agency: 'Advanced' } },
        { label: 'Entity analysis', values: { free: false, starter: true, growth: true, agency: true } },
        { label: 'Citation opportunity analysis', values: { free: false, starter: false, growth: true, agency: true } },
      ],
    },
    {
      group: 'Content',
      rows: [
        { label: 'Content generations / month', values: { free: '—', starter: '10', growth: '30', agency: '100' } },
        { label: 'Metadata and structured data', values: { free: false, starter: true, growth: true, agency: true } },
        { label: 'Content clusters', values: { free: false, starter: true, growth: 'Advanced', agency: 'Advanced' } },
      ],
    },
    {
      group: 'Integrations',
      rows: [
        { label: 'Google Search Console', values: { free: false, starter: true, growth: true, agency: true } },
        { label: 'Google Analytics 4', values: { free: false, starter: true, growth: true, agency: true } },
      ],
    },
    {
      group: 'Support',
      rows: [
        { label: 'Community', values: { free: true, starter: true, growth: true, agency: true } },
        { label: 'Email support', values: { free: false, starter: true, growth: true, agency: true } },
        { label: 'Priority support', values: { free: false, starter: false, growth: true, agency: true } },
        { label: 'Agency reporting', values: { free: false, starter: false, growth: false, agency: true } },
      ],
    },
  ],

  disclaimer:
    'No ranking guarantees. Search engines and AI answer systems decide what they rank and cite; results depend on your market, website, competition and how the recommendations are implemented.',
};

/** Monthly-equivalent price for a plan under the selected billing period. */
export const priceFor = (plan, period) => {
  if (!plan.price) return 0;
  if (period === 'annual' && pricing.annual.enabled) {
    return Math.round(plan.price * (1 - pricing.annual.discount));
  }
  return plan.price;
};

export const planIds = pricing.plans.map((plan) => plan.id);
