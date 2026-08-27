import { routesInGroup } from '@/lib/routes';
import { posts } from '@/content/blog/posts';
import { absoluteUrl, site } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * /llms.txt — a compact, plain-text map of the site for AI systems.
 * Generated from the same route registry the sitemap uses, so it can never
 * drift out of date. Contains only public marketing content.
 */
const section = (title, items) =>
  [`## ${title}`, '', ...items.map((item) => `- [${item.title}](${absoluteUrl(item.path)}): ${item.summary}`), ''].join('\n');

export function GET() {
  const body = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is an AI agent for SEO (Search Engine Optimization) and GEO (Generative Engine Optimization). It runs a continuous loop: research, strategy, content creation, publishing preparation, performance monitoring and continuous improvement. It is designed to improve visibility in search results and AI-generated answers; it does not guarantee rankings or citations.`,
    '',
    `Website: ${site.url}`,
    `Application: ${site.app.url}`,
    '',
    section('Product', routesInGroup('product')),
    section('Learn', routesInGroup('learn')),
    section('Company', routesInGroup('company')),
    '## Blog',
    '',
    ...posts.map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.excerpt}`),
    '',
    section('Legal', routesInGroup('legal')),
    '## Notes',
    '',
    '- Marketing content lives on getgeoagent.com. The product application is hosted separately at app.autogeoagent.com.',
    '- Account pages (login, signup, dashboard) are not part of the public marketing site and are excluded from indexing.',
    '- No customer results, reviews, ratings or pricing figures are published on this site unless explicitly stated on the page itself.',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
