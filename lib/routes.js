/**
 * Central route registry. The sitemap, llms.txt, footer and internal-link
 * helpers all read from this list so a new page only has to be declared once.
 */

export const routes = [
  {
    path: '/',
    title: 'AI SEO & GEO Automation Platform',
    group: 'product',
    priority: 1,
    changeFrequency: 'weekly',
    summary:
      'An AI agent that researches search opportunities, creates optimized content and builds visibility across Google and AI answer engines.',
  },
  {
    path: '/features',
    title: 'Platform Features',
    group: 'product',
    priority: 0.9,
    changeFrequency: 'monthly',
    summary: 'Every capability in the GetGeoAgent workflow, from research through continuous optimization.',
  },
  {
    path: '/seo-automation',
    title: 'SEO Automation',
    group: 'product',
    priority: 0.9,
    changeFrequency: 'monthly',
    summary: 'Automate keyword research, technical checks, content strategy, internal linking and monitoring.',
  },
  {
    path: '/geo-optimization',
    title: 'GEO Optimization',
    group: 'product',
    priority: 0.9,
    changeFrequency: 'monthly',
    summary: 'Generative Engine Optimization software for visibility inside AI-generated answers.',
  },
  {
    path: '/ai-seo-agent',
    title: 'AI SEO Agent',
    group: 'product',
    priority: 0.9,
    changeFrequency: 'monthly',
    summary: 'How an autonomous SEO agent differs from a traditional SEO tool.',
  },
  {
    path: '/how-it-works',
    title: 'How It Works',
    group: 'product',
    priority: 0.8,
    changeFrequency: 'monthly',
    summary: 'The seven-stage GetGeoAgent loop: research, strategy, create, publish, monitor, improve, repeat.',
  },
  {
    path: '/pricing',
    title: 'Pricing',
    group: 'product',
    priority: 0.8,
    changeFrequency: 'monthly',
    summary: 'How GetGeoAgent plans are structured and what drives cost.',
  },
  {
    path: '/what-is-geo',
    title: 'What is Generative Engine Optimization?',
    group: 'learn',
    priority: 0.9,
    changeFrequency: 'monthly',
    summary: 'A direct, in-depth explanation of GEO, how it works and how it relates to SEO.',
  },
  {
    path: '/seo-vs-geo',
    title: 'SEO vs GEO',
    group: 'learn',
    priority: 0.9,
    changeFrequency: 'monthly',
    summary: 'A side-by-side comparison of search engine optimization and generative engine optimization.',
  },
  {
    path: '/generative-engine-optimization',
    title: 'Generative Engine Optimization',
    group: 'learn',
    priority: 0.85,
    changeFrequency: 'monthly',
    summary: 'The full GEO discipline: entities, structure, citations, authority and measurement.',
  },
  {
    path: '/ai-search-optimization',
    title: 'AI Search Optimization',
    group: 'learn',
    priority: 0.85,
    changeFrequency: 'monthly',
    summary: 'Optimizing for AI Overviews, AI Mode, ChatGPT Search, Gemini, Perplexity and Copilot.',
  },
  {
    path: '/blog',
    title: 'Blog',
    group: 'learn',
    priority: 0.7,
    changeFrequency: 'weekly',
    summary: 'Research, guides and product thinking on SEO and generative search.',
  },
  {
    path: '/about',
    title: 'About',
    group: 'company',
    priority: 0.6,
    changeFrequency: 'yearly',
    summary: 'Why GetGeoAgent exists and the principles behind the product.',
  },
  {
    path: '/contact',
    title: 'Contact',
    group: 'company',
    priority: 0.6,
    changeFrequency: 'yearly',
    summary: 'Talk to the GetGeoAgent team.',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    group: 'legal',
    priority: 0.3,
    changeFrequency: 'yearly',
    summary: 'How GetGeoAgent handles personal data.',
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service',
    group: 'legal',
    priority: 0.3,
    changeFrequency: 'yearly',
    summary: 'The agreement governing use of GetGeoAgent.',
  },
];

export const routeByPath = routes.reduce((acc, route) => {
  acc[route.path] = route;
  return acc;
}, {});

export const routesInGroup = (group) => routes.filter((route) => route.group === group);

export const navigation = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'SEO Automation', href: '/seo-automation' },
    { label: 'GEO Optimization', href: '/geo-optimization' },
    { label: 'AI SEO Agent', href: '/ai-seo-agent' },
    { label: 'How It Works', href: '/how-it-works' },
  ],
  resources: [
    { label: 'What is GEO?', href: '/what-is-geo' },
    { label: 'SEO vs GEO', href: '/seo-vs-geo' },
    { label: 'Generative Engine Optimization', href: '/generative-engine-optimization' },
    { label: 'AI Search Optimization', href: '/ai-search-optimization' },
    { label: 'Blog', href: '/blog' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ],
};
