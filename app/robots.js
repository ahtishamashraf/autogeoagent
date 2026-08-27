import { site } from '@/lib/site';

/**
 * robots.txt
 *
 * Public content is open to everyone, including AI crawlers — being readable
 * by generative engines is the point of the product. API routes are excluded
 * because they produce no indexable content.
 *
 * robots.txt is a request, not access control: nothing private is protected
 * by this file.
 */
export default function robots() {
  const allowAll = { allow: '/', disallow: ['/api/'] };

  return {
    rules: [
      { userAgent: '*', ...allowAll },
      // Search
      { userAgent: 'Googlebot', ...allowAll },
      { userAgent: 'Bingbot', ...allowAll },
      // AI search and answer engines
      { userAgent: 'Google-Extended', ...allowAll },
      { userAgent: 'OAI-SearchBot', ...allowAll },
      { userAgent: 'ChatGPT-User', ...allowAll },
      { userAgent: 'GPTBot', ...allowAll },
      { userAgent: 'PerplexityBot', ...allowAll },
      { userAgent: 'Perplexity-User', ...allowAll },
      { userAgent: 'ClaudeBot', ...allowAll },
      { userAgent: 'Claude-User', ...allowAll },
      { userAgent: 'Claude-SearchBot', ...allowAll },
      { userAgent: 'Applebot', ...allowAll },
      { userAgent: 'Applebot-Extended', ...allowAll },
      { userAgent: 'CCBot', ...allowAll },
      { userAgent: 'Bytespider', ...allowAll },
      { userAgent: 'meta-externalagent', ...allowAll },
      { userAgent: 'cohere-ai', ...allowAll },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
