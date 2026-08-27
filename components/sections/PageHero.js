import Container from '@/components/ui/Container';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { cn } from '@/lib/cn';

/**
 * Interior page header. Deliberately quiet next to the homepage experience:
 * the same light and grid, but the content leads.
 */
export default function PageHero({ eyebrow, title, lead, breadcrumbs, children, className }) {
  return (
    <header className={cn('relative overflow-hidden pb-14 pt-[calc(var(--header-h)+3.5rem)] lg:pb-20 lg:pt-[calc(var(--header-h)+6rem)]', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(52%_60%_at_18%_-10%,color-mix(in_srgb,var(--scene-accent)_22%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="grid-field pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_78%)]"
      />

      <Container className="relative">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        {eyebrow ? (
          <p className="t-eyebrow flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block h-px w-6 bg-[var(--scene-glow)] shadow-[0_0_8px_var(--scene-glow)]"
            />
            {eyebrow}
          </p>
        ) : null}
        <h1 className="t-display mt-6 max-w-4xl text-balance text-ink">{title}</h1>
        {lead ? <p className="t-lead mt-7 max-w-2xl text-lg">{lead}</p> : null}
        {children}
      </Container>
    </header>
  );
}
