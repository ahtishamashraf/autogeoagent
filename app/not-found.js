import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { LogoMark } from '@/components/ui/Logo';
import { navigation } from '@/lib/routes';
import { site } from '@/lib/site';
import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] items-center overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_55%_at_50%_20%,color-mix(in_srgb,var(--scene-accent)_20%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_40%,#000,transparent)]"
      />

      <Container className="relative text-center">
        <span aria-hidden="true" className="mx-auto mb-10 block w-fit opacity-60">
          <LogoMark className="size-16" />
        </span>

        <p className="t-eyebrow">Error 404</p>
        <h1 className="t-display mx-auto mt-6 max-w-3xl text-balance text-ink">
          Lost in the <span className="t-gradient">Search?</span>
        </h1>
        <p className="t-lead mx-auto mt-6 max-w-lg">
          That page does not exist — it may have moved, or the link may be wrong. Here is the way
          back.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" size="lg" withArrow>
            Return Home
          </Button>
          <Button href={site.app.signup} variant="secondary" size="lg" magnetic={false}>
            Start with GetGeoAgent
          </Button>
        </div>

        <nav aria-label="Popular pages" className="mt-16">
          <p className="t-micro text-faint">Popular pages</p>
          <ul className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[...navigation.product.slice(0, 4), ...navigation.resources.slice(0, 3)].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </div>
  );
}
