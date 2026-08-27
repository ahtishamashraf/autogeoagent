/**
 * Deployment environment.
 *
 * Only the production deployment of the canonical domain may be indexed.
 * Preview and branch deployments render `noindex, nofollow` so they never
 * compete with the production domain in search. This is the build-time half of
 * the protection; middleware.js adds the request-time `X-Robots-Tag` header for
 * any non-canonical host.
 */
export const isProductionDeployment =
  process.env.VERCEL_ENV === 'production' || process.env.NEXT_PUBLIC_DEPLOY_ENV === 'production';

/** Deployments that are not production get an explicit noindex directive. */
export const isPreviewDeployment = Boolean(process.env.VERCEL_ENV) && !isProductionDeployment;

export const robotsDirective = isPreviewDeployment
  ? { index: false, follow: false, nocache: true }
  : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    };

export const noIndexDirective = { index: false, follow: false };
