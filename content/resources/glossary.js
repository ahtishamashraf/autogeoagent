/**
 * Glossary terms.
 *
 * Definitions only — no statistics, no vendor claims, and nothing that asserts
 * how a specific system ranks or selects content beyond what those systems
 * document publicly. Each term links to the page that covers it in depth.
 */

export const glossaryTerms = [
  {
    term: 'AI Mode',
    group: 'AI search',
    definition:
      'Google’s conversational search experience, where a question can be followed by further questions in the same session and the answer is assembled across several retrievals rather than one ranked list.',
    href: '/google-ai-mode',
  },
  {
    term: 'AI Overview',
    group: 'AI search',
    definition:
      'A generated summary shown above conventional results for some Google queries, assembled from pages the system retrieved and linked alongside the summary.',
    href: '/google-ai-overviews',
  },
  {
    term: 'AI visibility',
    group: 'AI search',
    definition:
      'Whether a brand, product or page appears inside answers produced by AI systems — as a citation, a named entity, or a described option. It is observed by asking, not reported by a rank tracker.',
    href: '/ai-visibility-tracking',
  },
  {
    term: 'Anchor text',
    group: 'SEO',
    definition:
      'The visible, clickable text of a link. Descriptive anchors tell both readers and crawlers what the destination page is about; generic anchors like “click here” tell them nothing.',
    href: '/internal-linking',
  },
  {
    term: 'Canonical URL',
    group: 'Technical',
    definition:
      'The URL a site declares as the preferred version of a page when the same or similar content is reachable at more than one address. Declared with a rel="canonical" link element.',
    href: '/technical-seo',
  },
  {
    term: 'Chunk',
    group: 'AI search',
    definition:
      'A passage-sized piece of a page. Retrieval systems commonly work with chunks rather than whole documents, which is why a self-contained section is easier to surface than an argument spread across a long page.',
    href: '/generative-engine-optimization',
  },
  {
    term: 'Content decay',
    group: 'SEO',
    definition:
      'The gradual loss of traffic or position on a page that once performed, usually because the information aged, competitors published something better, or the query itself changed meaning.',
    href: '/seo-monitoring',
  },
  {
    term: 'Core Web Vitals',
    group: 'Technical',
    definition:
      'Google’s named page-experience metrics: Largest Contentful Paint (loading), Interaction to Next Paint (responsiveness) and Cumulative Layout Shift (visual stability).',
    href: '/technical-seo',
  },
  {
    term: 'Crawl budget',
    group: 'Technical',
    definition:
      'The practical limit on how much of a site a crawler will fetch in a given period. It only becomes a real constraint on large sites, most often ones generating near-infinite URL combinations.',
    href: '/seo-audit',
  },
  {
    term: 'Entity',
    group: 'GEO',
    definition:
      'A distinct thing a search or answer system can recognise and reason about — a company, product, person, place or concept — as opposed to a string of characters that happens to match a query.',
    href: '/generative-engine-optimization',
  },
  {
    term: 'Faceted navigation',
    group: 'Technical',
    definition:
      'Filters on a category listing (size, colour, price) that generate URL combinations. Left unmanaged, they can produce vast numbers of near-duplicate indexable pages.',
    href: '/seo-for-ecommerce',
  },
  {
    term: 'GEO (Generative Engine Optimization)',
    group: 'GEO',
    definition:
      'The practice of making content retrievable, quotable and correctly attributable by systems that generate answers rather than list links. It overlaps heavily with SEO and does not replace it.',
    href: '/what-is-geo',
  },
  {
    term: 'Grounding',
    group: 'AI search',
    definition:
      'Constraining a generated answer to sources retrieved at answer time, so statements can be traced back to a document rather than produced from model memory alone.',
    href: '/gemini-seo',
  },
  {
    term: 'Index',
    group: 'Technical',
    definition:
      'The store of pages a search engine has crawled, processed and made eligible to be returned. A page can be crawled and still not indexed.',
    href: '/technical-seo',
  },
  {
    term: 'Internal linking',
    group: 'SEO',
    definition:
      'Links between pages on the same site. They distribute authority, express how topics relate to one another, and are the main way a crawler discovers pages that are not in the navigation.',
    href: '/internal-linking',
  },
  {
    term: 'Keyword cluster',
    group: 'SEO',
    definition:
      'A group of queries that share an intent closely enough that one page can satisfy all of them. Clusters, not individual keywords, are the unit a page should be built for.',
    href: '/keyword-research',
  },
  {
    term: 'llms.txt',
    group: 'GEO',
    definition:
      'A proposed plain-text file at a site’s root that summarises the site and lists its important pages for AI systems. Adoption is not universal and no system is required to read it.',
    href: '/generative-engine-optimization',
  },
  {
    term: 'NAP consistency',
    group: 'Local',
    definition:
      'Name, address and phone number matching exactly everywhere a business is listed. Inconsistent details make it harder for any system to be confident two listings describe the same business.',
    href: '/seo-for-local-business',
  },
  {
    term: 'Passage',
    group: 'AI search',
    definition:
      'A section of a page that can stand on its own. When answer systems quote a source, they typically quote a passage rather than summarising the whole document.',
    href: '/ai-search-optimization',
  },
  {
    term: 'Pillar page',
    group: 'SEO',
    definition:
      'The comprehensive page for a topic, which links out to more specific pages covering each sub-question and receives links back from them.',
    href: '/content-planner',
  },
  {
    term: 'RAG (Retrieval-Augmented Generation)',
    group: 'AI search',
    definition:
      'A pattern where a system retrieves documents relevant to a question and generates its answer from them. It is why being retrievable matters as much as being well-written.',
    href: '/what-is-geo',
  },
  {
    term: 'Rich result',
    group: 'Technical',
    definition:
      'A search result rendered with extra features — an FAQ expander, a breadcrumb trail, a product panel — driven by structured data on the page.',
    href: '/technical-seo',
  },
  {
    term: 'Robots.txt',
    group: 'Technical',
    definition:
      'A file at a site’s root that tells compliant crawlers which paths they may request. It controls crawling, not indexing, and it is a request rather than an enforcement mechanism.',
    href: '/technical-seo',
  },
  {
    term: 'Schema markup',
    group: 'Technical',
    definition:
      'Structured data using the schema.org vocabulary, usually embedded as JSON-LD, that states in machine-readable form what a page is about.',
    href: '/technical-seo',
  },
  {
    term: 'Search intent',
    group: 'SEO',
    definition:
      'What someone is actually trying to do when they type a query — learn something, compare options, find a specific site, or buy. Matching intent matters more than matching wording.',
    href: '/keyword-research',
  },
  {
    term: 'SERP',
    group: 'SEO',
    definition:
      'Search engine results page. Increasingly a mixed surface of generated summaries, features and conventional links rather than ten blue links.',
    href: '/seo-vs-geo',
  },
  {
    term: 'Topical authority',
    group: 'SEO',
    definition:
      'The depth and coherence of a site’s coverage of a subject. It is built by covering a topic completely and linking it together, not by publishing more pages about more things.',
    href: '/content-planner',
  },
  {
    term: 'Zero-click search',
    group: 'AI search',
    definition:
      'A search that is resolved on the results page, so the user never visits a source. Visibility still occurred; the click did not.',
    href: '/seo-vs-geo',
  },
];

export const glossaryGroups = [...new Set(glossaryTerms.map((t) => t.group))];
