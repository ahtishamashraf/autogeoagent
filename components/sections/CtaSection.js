import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { site } from '@/lib/site';

export default function CtaSection({
  id = 'get-started',
  eyebrow = 'GetGeoAgent',
  title = 'Your next customer is searching.',
  highlight = 'Make sure they find you.',
  body = 'Build visibility across traditional search and the new generation of AI-powered discovery.',
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative overflow-hidden border-t border-white/8 py-28 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(58%_70%_at_50%_110%,color-mix(in_srgb,var(--scene-accent)_26%,transparent),transparent_70%)]"
      />
      <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_60%,#000,transparent)]" />

      <Container className="relative text-center">
        <p className="t-eyebrow">{eyebrow}</p>
        <h2 id={`${id}-heading`} className="t-display mx-auto mt-7 max-w-4xl text-balance text-ink">
          {title}{' '}
          <span className="t-gradient">{highlight}</span>
        </h2>
        <p className="t-lead mx-auto mt-7 max-w-xl">{body}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={site.app.signup} size="lg" withArrow>
            Start with GetGeoAgent
          </Button>
          <Button href={site.app.login} variant="secondary" size="lg" magnetic={false}>
            Login
          </Button>
        </div>
        <p className="mx-auto mt-8 max-w-md text-xs leading-relaxed text-faint">
          GetGeoAgent is designed to improve search and AI visibility. Results depend on your site,
          market and competition — no ranking or citation is guaranteed.
        </p>
      </Container>
    </section>
  );
}
