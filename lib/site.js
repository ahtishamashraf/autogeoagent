/**
 * Central configuration for GetGeoAgent.
 *
 * Everything that is brand-, legal- or deployment-specific lives here so it can
 * be updated in one place. Values marked NEEDS-CONFIRMATION are intentionally
 * neutral placeholders — they must be replaced with verified information before
 * the site is treated as a legal document.
 */

export const site = {
  name: 'GetGeoAgent',
  shortName: 'GetGeoAgent',
  domain: 'getgeoagent.com',
  url: 'https://getgeoagent.com',
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
  contactEmail: 'hello@getgeoagent.com',
  supportEmail: 'support@getgeoagent.com',
  privacyEmail: 'privacy@getgeoagent.com',

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
