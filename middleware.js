import { NextResponse } from 'next/server';
import { NON_CANONICAL_HOSTS, SITE_HOST, SITE_URL, VERCEL_PRODUCTION_HOST } from '@/lib/site';

/**
 * Host normalisation.
 *
 * One origin serves indexable marketing pages: SITE_URL (www). Everything else
 * either redirects there permanently, or is served with `X-Robots-Tag:
 * noindex, nofollow` so it can never compete with the production domain in
 * search.
 *
 * The apex and legacy brand hosts redirect immediately — they exist only to be
 * forwarded. The Vercel hostname is noindexed by default and redirects only
 * once REDIRECT_VERCEL_HOST=1 is set, so the deployment stays reachable while
 * DNS for the production domain is being wired up.
 *
 * Doing this at the domain level in Vercel is still preferable when available;
 * this middleware guarantees the behaviour regardless of how the project is
 * hosted.
 */

const REDIRECT_HOSTS = new Set(NON_CANONICAL_HOSTS);
const redirectVercelHost = process.env.REDIRECT_VERCEL_HOST === '1';

export function middleware(request) {
  const host = (request.headers.get('host') || '').toLowerCase().split(':')[0];

  // Never touch local development.
  if (!host || host === 'localhost' || host.endsWith('.local') || host.startsWith('127.')) {
    return NextResponse.next();
  }

  const isVercelHost = host.endsWith('.vercel.app');
  const shouldRedirect =
    REDIRECT_HOSTS.has(host) || (isVercelHost && host === VERCEL_PRODUCTION_HOST && redirectVercelHost);

  if (shouldRedirect) {
    const target = new URL(request.nextUrl.pathname + request.nextUrl.search, SITE_URL);
    // 308 preserves the method and is the permanent redirect search engines
    // treat the same way as a 301.
    return NextResponse.redirect(target, 308);
  }

  const response = NextResponse.next();

  // Anything that is not the canonical host must stay out of the index. That
  // covers preview deployments, branch deployments and the production Vercel
  // hostname while the redirect is disabled.
  if (host !== SITE_HOST) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  // Skip Next internals only. robots.txt, sitemap.xml and llms.txt must be
  // normalised too, or the wrong host can advertise itself to crawlers.
  matcher: ['/((?!_next/static|_next/image).*)'],
};
