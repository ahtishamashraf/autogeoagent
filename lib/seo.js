import { absoluteUrl, site, socialProfiles } from './site';
import { pricing } from './pricing';

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const SOFTWARE_ID = `${site.url}/#software`;

/**
 * Structured data builders.
 *
 * Nothing here fabricates reviews, ratings, prices, customer counts or awards —
 * those properties are omitted entirely until verified values exist.
 */

/** Stable, URL-safe id for a glossary term. */
export const slugifyTerm = (term) =>
  term
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function organizationSchema() {
  const sameAs = socialProfiles;
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    url: site.url,
    description: site.description,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/icons/logo-mark.svg'),
      width: 512,
      height: 512,
    },
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: site.supportEmail,
        url: absoluteUrl('/contact'),
        availableLanguage: ['English'],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: site.language,
    publisher: { '@id': ORG_ID },
  };
}

export function softwareSchema() {
  return {
    '@type': 'SoftwareApplication',
    '@id': SOFTWARE_ID,
    name: site.name,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Search Engine Optimization Software',
    operatingSystem: 'Web browser',
    url: site.url,
    description: site.description,
    publisher: { '@id': ORG_ID },
    featureList: [
      'Automated keyword and topic research',
      'Search intent analysis',
      'Topical map and content strategy',
      'AI content creation with semantic coverage checks',
      'Internal linking recommendations',
      'Structured data and metadata generation',
      'Publishing workflow',
      'Search and AI visibility monitoring',
      'Continuous content optimization',
    ],
  };
}

export function webPageSchema({ path, title, description, breadcrumb }) {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: site.language,
    ...(breadcrumb ? { breadcrumb: { '@id': `${absoluteUrl(path)}#breadcrumb` } } : {}),
  };
}

export function breadcrumbSchema(items, path) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function faqSchema(faqs, path) {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt || post.publishedAt,
    inLanguage: site.language,
    articleSection: post.category,
    wordCount: post.wordCount,
    author: {
      '@type': 'Organization',
      name: post.author || site.name,
      url: site.url,
    },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    // Only real, published references — never a fabricated citation.
    ...(post.sources?.length
      ? {
          citation: post.sources.map((source) => ({
            '@type': 'CreativeWork',
            name: source.label,
            url: source.href,
          })),
        }
      : {}),
  };
}

export function howToSchema({ name, description, steps, path }) {
  return {
    '@type': 'HowTo',
    '@id': `${absoluteUrl(path)}#howto`,
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Published plans, described as Offers.
 *
 * Only emitted when real prices are published in lib/pricing.js — an Offer
 * with an invented price is worse than no Offer at all.
 */
export function offerCatalogSchema() {
  if (!pricing.published || !pricing.plans.length) return null;
  return {
    '@type': 'OfferCatalog',
    '@id': `${absoluteUrl('/pricing')}#offers`,
    name: `${site.name} plans`,
    url: absoluteUrl('/pricing'),
    itemListElement: pricing.plans.map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      description: plan.description,
      url: absoluteUrl('/pricing'),
      price: plan.price,
      priceCurrency: pricing.currency,
      category: plan.audience,
      availability: 'https://schema.org/InStock',
    })),
  };
}

/**
 * A glossary, described as a DefinedTermSet.
 *
 * Every term is a definition the page actually publishes — nothing is asserted
 * here that a reader cannot read on the page itself.
 */
export function definedTermSetSchema({ path, name, description, terms }) {
  const url = absoluteUrl(path);
  return {
    '@type': 'DefinedTermSet',
    '@id': `${url}#glossary`,
    name,
    description,
    url,
    hasDefinedTerm: terms.map((term) => ({
      '@type': 'DefinedTerm',
      '@id': `${url}#${slugifyTerm(term.term)}`,
      name: term.term,
      description: term.definition,
      inDefinedTermSet: `${url}#glossary`,
    })),
  };
}

/** Wrap a list of node objects into a single @graph document. */
export function graph(nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}
