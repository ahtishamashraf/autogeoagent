import { routes } from '@/lib/routes';
import { posts } from '@/content/blog/posts';
import { absoluteUrl } from '@/lib/site';

/**
 * sitemap.xml — canonical, indexable pages only.
 * No redirects, no API routes, and nothing that lives on the application
 * domain (login, signup, dashboard).
 */
export default function sitemap() {
  const now = new Date();

  const pages = routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articles = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.modifiedAt || post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  return [...pages, ...articles];
}
