import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionHeading from './SectionHeading';
import { ArrowRight } from '@/components/ui/Icons';
import { site } from '@/lib/site';

/**
 * The positioning section: what is different about running the work as one
 * continuous agent instead of a stack of tools.
 *
 * Every claim here is about how the product works, not about results it
 * produces — there is no outcome promised on this page that the product
 * cannot control.
 */
const reasons = [
  {
    number: '01',
    title: 'One picture of your site, not seven',
    text: 'Research, planning, drafting, linking and monitoring read from the same topic model. A tool stack makes you the integration layer; here the stages already share what they know.',
    href: '/features',
    link: 'See the platform',
  },
  {
    number: '02',
    title: 'SEO and GEO as one pass',
    text: 'The structure that makes a page rank and the structure that makes it quotable inside an AI answer are mostly the same structure. Running them as separate projects duplicates the work and produces two half-answers.',
    href: '/seo-vs-geo',
    link: 'SEO vs GEO',
  },
  {
    number: '03',
    title: 'Continuous, not quarterly',
    text: 'The research does not go stale between audits, because it never stops. Pages that slip are detected as they slip rather than at the next review.',
    href: '/how-it-works',
    link: 'How the loop runs',
  },
  {
    number: '04',
    title: 'Editable at every stage',
    text: 'The plan, the briefs and the drafts are all reviewable, and nothing publishes without approval. Automation decides what to work on; you decide what ships.',
    href: '/ai-seo-agent',
    link: 'What the agent does',
  },
  {
    number: '05',
    title: 'AI visibility is observed, not guessed',
    text: 'A fixed prompt set, checked on a schedule, with the answer recorded. No tool can read an AI system’s ranking factors, so the honest method is to ask and log what came back.',
    href: '/ai-visibility-tracking',
    link: 'How tracking works',
  },
  {
    number: '06',
    title: 'No promises anyone can keep',
    text: `${site.name} is built to make the work continuous and consistent. It does not guarantee rankings, citations or inclusion in AI answers, because nothing does — and a vendor that says otherwise is selling you the part they do not control.`,
    href: '/pricing',
    link: 'What plans include',
  },
];

export default function WhySection({ id = 'why' }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative border-t border-white/8 py-24 lg:py-36"
    >
      <Container>
        <SectionHeading
          id={`${id}-heading`}
          eyebrow={`Why ${site.name}`}
          title="Built as one workflow, because search is one workflow"
          lead="Most search programmes fail on continuity rather than on ideas. The tooling is fragmented, the research ages, and the loop never closes. This is what is different here."
        />

        <ul className="mt-14 grid gap-px overflow-hidden border-y border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <li key={reason.number} className="flex flex-col gap-4 bg-void p-7 lg:p-9">
              <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--scene-glow)]">
                {reason.number}
              </span>
              <h3 className="t-h4 text-ink">{reason.title}</h3>
              <p className="t-body flex-1 text-[0.94rem]">{reason.text}</p>
              <Link
                href={reason.href}
                className="group/link inline-flex items-center gap-2 self-start text-[13px] text-muted transition-colors hover:text-ink"
              >
                {reason.link}
                <ArrowRight className="size-3.5 transition-transform duration-500 group-hover/link:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
