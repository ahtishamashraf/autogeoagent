import { Inter, Sora } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { graph, organizationSchema, websiteSchema } from '@/lib/seo';
import { site } from '@/lib/site';
import { defaultOgImage } from '@/lib/metadata';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — AI SEO & GEO Automation Platform`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  generator: 'Next.js',
  referrer: 'strict-origin-when-cross-origin',
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport = {
  themeColor: '#05070b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang={site.language} className={`${sora.variable} ${inter.variable}`}>
      <body className="antialiased">
        <JsonLd id="site-graph" data={graph([organizationSchema(), websiteSchema()])} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
