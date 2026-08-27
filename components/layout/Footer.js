import Link from 'next/link';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { navigation } from '@/lib/routes';
import { site } from '@/lib/site';

const columns = [
  {
    title: 'Platform',
    links: [...navigation.product, { label: 'Pricing', href: '/pricing' }],
  },
  {
    title: 'Capabilities',
    links: navigation.capabilities,
  },
  {
    title: 'Solutions',
    links: navigation.solutions,
  },
  {
    title: 'Learn',
    links: [...navigation.resources, ...navigation.aiSearch],
  },
  {
    title: 'Company',
    links: [...navigation.company, ...navigation.legal],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-void">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 opacity-50 [background:radial-gradient(60%_100%_at_50%_100%,color-mix(in_srgb,var(--scene-accent)_22%,transparent),transparent_70%)]"
      />
      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_3.2fr]">
          <div>
            <Link href="/" aria-label={`${site.name} home`}>
              <Logo markClassName="size-8" />
            </Link>
            <p className="t-body mt-5 max-w-xs">
              An AI agent for SEO and Generative Engine Optimization — built to research, create,
              publish and keep improving your search visibility.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button href={site.app.signup} size="sm" magnetic={false}>
                Create Account
              </Button>
              <Button href={site.app.login} variant="secondary" size="sm" magnetic={false}>
                Login
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="t-micro mb-4 text-faint">{column.title}</p>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="link-underline text-sm text-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-faint">
            &copy; {year} {site.legal.companyName}. All rights reserved.
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-faint">
            Search and AI visibility outcomes depend on your website, market and competition.
            GetGeoAgent is designed to improve visibility — it does not guarantee rankings,
            citations or inclusion in AI-generated answers.
          </p>
        </div>
      </Container>
    </footer>
  );
}
