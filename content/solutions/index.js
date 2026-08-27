export const seoForSaas = {
  slug: '/seo-for-saas',
  eyebrow: 'Solutions — SaaS',
  title: 'SEO and GEO for SaaS',
  lead: 'Own the problem your product solves, not just its category name. SaaS buyers search the symptom long before they search the software.',
  secondaryCta: { label: 'See the content planner', href: '/content-planner' },
  blocks: [
    {
      type: 'answer',
      label: 'The core problem',
      text: 'Most SaaS sites over-invest in category terms with brutal competition and under-invest in the problem space where buyers actually start. The queries that convert are usually the symptom ("our keyword research takes three days"), the comparison ("X vs Y"), and the workaround ("how to do X without Y").',
    },
    { type: 'h2', id: 'buying-journey', text: 'The SaaS buying chain' },
    {
      type: 'diagram',
      steps: ['Symptom', 'Approach', 'Category', 'Comparison', 'Alternatives', 'Pricing'],
      caption: 'Buyers move down this chain. Most sites only cover the last three steps.',
    },
    {
      type: 'p',
      text: 'Each step is a different query with a different intent, and the earlier ones are far less contested. A page that answers the symptom question well is often the cheapest durable traffic a SaaS company can build, and it earns the right to introduce the category later on the same page.',
    },
    { type: 'h2', id: 'what-to-build', text: 'What to build, in order' },
    {
      type: 'steps',
      items: [
        { title: 'Problem-space explainers', text: 'The questions people ask before they know a product category exists. Low competition, high relevance, and the natural place to define the category on your terms.' },
        { title: 'Comparison pages', text: '"X vs Y" queries have unambiguous commercial intent. Write them honestly — a comparison that never concedes anything reads as marketing and converts worse.' },
        { title: 'Alternatives pages', text: 'People searching for an alternative to a competitor are mid-switch. This is the highest-intent traffic in SaaS SEO.' },
        { title: 'Integration and use-case pages', text: 'Only where the integration genuinely exists. Publishing pages for integrations you do not ship is a support burden and a trust problem.' },
        { title: 'Documentation-adjacent content', text: 'The "how do I actually do this" queries your docs answer for customers and your site does not answer for prospects.' },
      ],
    },
    { type: 'h2', id: 'geo-for-saas', text: 'Why GEO matters unusually early for SaaS' },
    {
      type: 'p',
      text: 'Software evaluation is exactly the kind of research people now hand to an assistant: "best tools for X", "is X worth it", "alternatives to Y". If a competitor is named in that answer and you are not, you are excluded from the shortlist before your site is ever considered. See [AI visibility tracking](/ai-visibility-tracking).',
    },
    {
      type: 'checklist',
      items: [
        'Category and problem-space coverage that defines the terms clearly.',
        'Comparison pages with real tables rather than paragraphs of hedging.',
        'A consistent description of what your product is, on every page.',
        'Pricing information that is actually on the site, not behind a form.',
        'Documentation that is crawlable, if you want it retrieved.',
      ],
    },
    { type: 'h2', id: 'trap', text: 'The trap' },
    {
      type: 'p',
      text: 'The most common SaaS content failure is a blog of general marketing advice that has nothing to do with the product. It attracts readers who will never buy, and it teaches search systems that your site is about a subject you do not sell. Coverage should radiate from the problem your product solves.',
    },
  ],
  faqs: [
    {
      question: 'Should we write comparison pages against competitors?',
      answer:
        'Yes, if you write them honestly. Comparison queries carry clear commercial intent, and a balanced page that concedes where a competitor is stronger is both more credible to readers and more citable by answer engines.',
    },
    {
      question: 'Is a blog still worth it for SaaS?',
      answer:
        'A blog covering your problem space is worth it. A blog covering general marketing topics because they have search volume is usually a distraction that dilutes what your site is about.',
    },
    {
      question: 'How long before SEO produces pipeline?',
      answer:
        'Longer than paid and shorter than most people fear, and it depends on your domain, competition and publishing rate. Nobody can honestly quote you a date, and you should be wary of anyone who does.',
    },
  ],
};

export const seoForAgencies = {
  slug: '/seo-for-agencies',
  eyebrow: 'Solutions — Agencies',
  title: 'SEO and GEO for Agencies',
  lead: 'Run a consistent method across many client sites without multiplying headcount — and show clients movement they can actually see.',
  secondaryCta: { label: 'See agency pricing', href: '/pricing' },
  blocks: [
    {
      type: 'answer',
      label: 'The core problem',
      text: 'Agency margins are eaten by the repetitive layer: re-running research per client, writing briefs by hand, chasing internal links, and rebuilding the same report every month. That work rewards consistency, not creativity, which makes it the right work to automate.',
    },
    { type: 'h2', id: 'consistency', text: 'A method, applied identically' },
    {
      type: 'p',
      text: 'The difference between a good agency and a scalable one is whether the method survives being executed by different people on different accounts. When research, clustering, briefing and linking follow the same process everywhere, quality stops depending on who happened to pick up the account.',
    },
    {
      type: 'steps',
      items: [
        { title: 'One research method per client', text: 'The same expansion, intent classification and clustering process, run against each client’s own topic space.' },
        { title: 'Briefs that do not vary in quality', text: 'Every brief carries the query, the intent, the required coverage, the entities and the internal links — regardless of who is writing.' },
        { title: 'Link structure maintained, not remembered', text: 'The reverse-link job that never gets done manually across a dozen accounts.' },
        { title: 'Reporting from the same source', text: 'Movement described in clusters, so a client sees a topic gaining rather than forty keyword rows.' },
      ],
    },
    { type: 'h2', id: 'multi-site', text: 'Working across a portfolio' },
    {
      type: 'p',
      text: 'Multiple workspaces keep client data and topic models separate, which matters both commercially and technically: two clients in the same vertical must not end up with the same plan. The Agency plan covers up to ten websites with client organization and priority processing — see [pricing](/pricing).',
    },
    { type: 'h2', id: 'reporting', text: 'Reporting that survives a client meeting' },
    {
      type: 'ul',
      items: [
        'Trends over time rather than single-day snapshots, which are mostly noise.',
        'Clusters as the unit, because that is how the strategy was built.',
        'Losses shown as clearly as gains — selective reporting destroys trust the moment a client checks.',
        'AI visibility reported as directional, with the method stated. See [AI visibility tracking](/ai-visibility-tracking).',
      ],
    },
    {
      type: 'callout',
      title: 'What not to promise',
      text: 'The pressure to promise rankings is highest in agency sales. Search engines and answer engines decide what they surface. Selling a guarantee is a retention problem waiting six months to arrive.',
    },
    { type: 'h2', id: 'where-people-matter', text: 'Where your people still matter' },
    {
      type: 'p',
      text: 'Positioning, editorial judgement, client relationships and the strategic calls that need context the software does not have. Automating the repetitive layer is what creates room for the work clients actually pay a premium for.',
    },
  ],
  faqs: [
    {
      question: 'Can we manage multiple clients in one account?',
      answer:
        'The Agency plan covers up to ten websites with multiple workspaces and client organization, so each client keeps a separate topic model and plan.',
    },
    {
      question: 'Can we white-label reporting?',
      answer:
        'Reporting and export capabilities are shown in the application. We do not advertise white-label features on this site beyond what the product ships — check the current capabilities in your account before promising them to a client.',
    },
    {
      question: 'Does this replace our SEO team?',
      answer:
        'No. It removes the repetitive execution layer. Strategy, editorial quality and the client relationship remain the work your team is paid for.',
    },
  ],
};

export const seoForEcommerce = {
  slug: '/seo-for-ecommerce',
  eyebrow: 'Solutions — Ecommerce',
  title: 'SEO and GEO for Ecommerce',
  lead: 'Category pages, product depth, faceted navigation and the buying-guide layer most stores never build.',
  secondaryCta: { label: 'See technical SEO', href: '/technical-seo' },
  blocks: [
    {
      type: 'answer',
      label: 'The core problem',
      text: 'Ecommerce SEO is dominated by two issues that are technical before they are editorial: category pages that do not say anything, and faceted navigation generating thousands of near-duplicate URLs that split their own signals.',
    },
    { type: 'h2', id: 'categories', text: 'Category pages are the asset' },
    {
      type: 'p',
      text: 'The category page — not the product page — usually carries the commercial query. Yet most category pages are a grid of products and a sentence of boilerplate. A category page that explains how to choose within the category, what the meaningful differences are, and which option suits which buyer, is competing on completely different terms.',
    },
    {
      type: 'checklist',
      items: [
        'A real introduction that answers "how do I choose one of these?"',
        'The buying criteria that actually differentiate products in this category.',
        'A comparison table where the category supports one.',
        'An FAQ covering the questions buyers ask before purchasing.',
        'Internal links to the guides and subcategories that support it.',
      ],
    },
    { type: 'h2', id: 'facets', text: 'Faceted navigation, handled deliberately' },
    {
      type: 'p',
      text: 'Filters multiply URLs. Colour, size, price and sort order combine into a crawl space far larger than your catalogue, most of it near-duplicate. Left alone, it dilutes signals, wastes crawl budget and produces indexing that nobody chose.',
    },
    {
      type: 'table',
      caption: 'A workable facet policy',
      head: ['Facet type', 'Treatment'],
      rows: [
        ['Facets with real search demand', 'Indexable landing page with its own copy'],
        ['Facets with no demand', 'Canonical to the parent category'],
        ['Sort order and pagination parameters', 'Excluded from indexing'],
        ['Combined multi-facet URLs', 'Excluded unless demand is proven'],
      ],
    },
    { type: 'h2', id: 'products', text: 'Product pages that are not the manufacturer description' },
    {
      type: 'p',
      text: 'When fifty retailers publish the same supplier copy, none of them has a reason to rank and none is worth citing. Original specifics — how it is used, what it does not suit, real answers to real customer questions — are what separate a product page from a duplicate.',
    },
    { type: 'h2', id: 'geo', text: 'GEO for ecommerce' },
    {
      type: 'p',
      text: 'Product research is increasingly conversational: "best X for Y", "is X worth it", "what should I look for in X". Those answers are assembled from buying guides and category explainers far more often than from product listings, which is exactly the layer most stores never build. See [AI search optimization](/ai-search-optimization).',
    },
    {
      type: 'callout',
      title: 'Structured data must be true',
      text: 'Product markup with prices, availability and — especially — review ratings must match what is visibly on the page. Ratings for reviews that do not exist are a manual-action risk, not a shortcut.',
    },
  ],
  faqs: [
    {
      question: 'Should every filter combination be indexable?',
      answer:
        'No. Index the facets with genuine search demand and give them their own copy; canonical or exclude the rest. Indexing everything is how a 500-product store ends up with 50,000 near-duplicate URLs.',
    },
    {
      question: 'How do we handle out-of-stock products?',
      answer:
        'Keep the URL and the page if the product is returning, and make availability clear. Deleting pages that have accumulated links and history throws away the asset; the answer depends on whether the product comes back.',
    },
    {
      question: 'Are buying guides worth the effort?',
      answer:
        'They are usually the highest-leverage content an ecommerce site can produce. They capture research-stage demand, they are the natural source for AI answers about a category, and they give category pages something authoritative to link to.',
    },
  ],
};

export const seoForLocalBusiness = {
  slug: '/seo-for-local-business',
  eyebrow: 'Solutions — Local business',
  title: 'SEO and GEO for Local Businesses',
  lead: 'Local search rewards consistency and proximity more than volume. The work is smaller, more specific, and unusually unforgiving of sloppy details.',
  secondaryCta: { label: 'See the SEO audit', href: '/seo-audit' },
  blocks: [
    {
      type: 'answer',
      label: 'The core problem',
      text: 'Local visibility depends on a small number of things done consistently: an accurate business profile, identical name, address and phone details everywhere they appear, service and location pages that are genuinely different from each other, and reviews you actually earned.',
    },
    { type: 'h2', id: 'consistency', text: 'Consistency is the whole game' },
    {
      type: 'p',
      text: 'Local search systems reconcile your business across many sources. An old suite number on one directory, a different phone format on another, a trading name that does not match the registered one — each inconsistency reduces confidence that these listings describe the same business.',
    },
    {
      type: 'checklist',
      items: [
        'One canonical name, address and phone number, character for character.',
        'The same details on your site, your profile and every directory.',
        'Opening hours maintained, including exceptions — stale hours are a trust problem, not a detail.',
        'One page per real location, with content that is genuinely about that location.',
        'LocalBusiness structured data that matches the visible page.',
      ],
    },
    { type: 'h2', id: 'service-pages', text: 'Service and location pages, done properly' },
    {
      type: 'p',
      text: 'The standard failure is a template with the town name swapped: fifty pages, one piece of content, no reason for any of them to rank. If you serve five towns, five pages should describe five genuinely different things — local context, the work you actually do there, the questions those customers ask.',
    },
    {
      type: 'callout',
      title: 'If you cannot write it differently, do not create it',
      text: 'A page that exists only because a town name exists is a doorway page. One strong service page covering your area outperforms twenty templated ones, and carries none of the risk.',
    },
    { type: 'h2', id: 'reviews', text: 'Reviews' },
    {
      type: 'p',
      text: 'Ask for them, respond to them, and never fabricate them. Beyond their direct effect, reviews are one of the few sources of genuinely original content about your business — the specific language customers use is often exactly the language other customers search with.',
    },
    { type: 'h2', id: 'geo-local', text: 'GEO for local' },
    {
      type: 'p',
      text: 'People increasingly ask assistants "who does X near me" and "is X open on Sunday". Those answers are assembled from your profile, your site and third-party sources — so the same consistency work that drives classic local visibility is what makes you usable as an answer. Clear, current, unambiguous details do most of the work.',
    },
    { type: 'h2', id: 'content', text: 'The content that actually helps' },
    {
      type: 'ul',
      items: [
        'Answers to the questions customers ask on the phone, published as pages.',
        'Pricing guidance, even as a range — "how much does X cost" is a high-volume local query.',
        'Genuinely local context: parking, access, area coverage, response times.',
        'Service explainers for anything a customer might not understand before booking.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Do I need a page for every town I serve?',
      answer:
        'Only where you can write something genuinely different for each. Templated location pages with a swapped town name are doorway pages; one strong service-area page is safer and usually performs better.',
    },
    {
      question: 'How important is my business profile?',
      answer:
        'For local queries it is often the primary surface — frequently more visible than your website. Keeping it accurate and current is the highest-return maintenance work in local SEO.',
    },
    {
      question: 'Can GetGeoAgent manage my business profile?',
      answer:
        'The agent works on your website: research, content, structure, internal links and monitoring. Business profile management is a separate system — check the current integrations in your account.',
    },
  ],
};
