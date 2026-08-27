/**
 * Central configuration.
 *
 * Everything that is brand-, legal- or deployment-specific lives here so it can
 * be updated in one place. Values marked NEEDS-CONFIRMATION are intentionally
 * neutral placeholders — they must be replaced with verified information before
 * the site is treated as a legal document.
 */

/**
 * The one canonical marketing origin. Every canonical, Open Graph URL, sitemap
 * entry, JSON-LD @id and machine-readable link is built from this value — the
 * host is never written out by hand anywhere else in the codebase.
 *
 * `www` is deliberate: the apex, the legacy brand domain and the Vercel
 * hostname all redirect here (see middleware.js).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.autogeoagent.com').replace(
  /\/$/,
  '',
);

export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');

/** Hosts that must never serve indexable marketing pages. */
export const NON_CANONICAL_HOSTS = [
  'autogeoagent.com',
  'getgeoagent.com',
  'www.getgeoagent.com',
];

/** The production Vercel hostname, kept out of search results. */
export const VERCEL_PRODUCTION_HOST = 'autogeoagent.vercel.app';

export const site = {
  // The visible product brand. This is intentionally distinct from the domain:
  // changing where the site is hosted does not rename the product.
  name: 'GetGeoAgent',
  shortName: 'GetGeoAgent',
  domain: SITE_HOST,
  url: SITE_URL,
  locale: 'en_US',
  language: 'en',

  tagline: 'Your AI Agent for SEO & GEO',
  secondaryTagline: 'Rank in Search. Get Discovered by AI.',
  description:
    'GetGeoAgent is an AI agent for SEO and Generative Engine Optimization. It researches opportunities, creates optimized content and continuously improves visibility across search engines and AI answer systems.',

  // The existing product application.
  app: {
    url: 'https://app.autogeoagent.com',
    login: 'https://app.autogeoagent.com/login',
    signup: 'https://app.autogeoagent.com/signup',
  },

  // NEEDS-CONFIRMATION — replace with the verified public contact address.
  contactEmail: 'hello@autogeoagent.com',
  supportEmail: 'support@autogeoagent.com',
  privacyEmail: 'privacy@autogeoagent.com',

  // NEEDS-CONFIRMATION — legal entity details.
  legal: {
    companyName: 'GetGeoAgent',
    legalEntityName: '[Registered company name]',
    registeredAddress: '[Registered business address]',
    jurisdiction: '[Governing jurisdiction]',
    lastUpdated: '2026-08-27',
  },

  // Only list profiles that genuinely exist. Empty entries are skipped in JSON-LD.
  social: {
    x: '',
    linkedin: '',
    github: '',
  },
};

export const appLinks = site.app;

export const socialProfiles = Object.values(site.social).filter(Boolean);

export const absoluteUrl = (path = '/') => {
  if (!path || path === '/') return site.url;
  if (path.startsWith('http')) return path;
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
};
