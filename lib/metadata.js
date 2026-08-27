import { absoluteUrl, site } from './site';
import { noIndexDirective, robotsDirective } from './deployment';

const ogUrl = ({ title, kicker, accent }) => {
  const params = new URLSearchParams();
  if (title) params.set('title', title);
  if (kicker) params.set('kicker', kicker);
  if (accent) params.set('accent', accent);
  const query = params.toString();
  return `/api/og${query ? `?${query}` : ''}`;
};

const DEFAULT_OG = ogUrl({});

/**
 * Build a complete Next.js Metadata object for a page.
 * Every page receives its own canonical on the production domain — never the
 * application domain.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image,
  ogTitle,
  ogKicker,
  ogAccent,
  type = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
} = {}) {
  const url = absoluteUrl(path);
  // The root layout supplies the "| GetGeoAgent" template, so pages pass their
  // bare title and only the home page overrides it with an absolute value.
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`;
  const resolvedImage = image || ogUrl({ title: ogTitle || title, kicker: ogKicker, accent: ogAccent });
  const ogImage = resolvedImage.startsWith('http') ? resolvedImage : absoluteUrl(resolvedImage);

  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} — ${site.name}` }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    // Preview deployments are noindexed regardless of the page's own intent.
    robots: noIndex ? noIndexDirective : robotsDirective,
  };
}

export const defaultOgImage = DEFAULT_OG;
export { ogUrl };
