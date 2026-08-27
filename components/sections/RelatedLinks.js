import Link from 'next/link';
import Container from '@/components/ui/Container';
import { ArrowRight } from '@/components/ui/Icons';
import { routeByPath } from '@/lib/routes';

/**
 * Internal links, rendered from the route registry so descriptions stay
 * consistent with the pages they point at.
 */
export default function RelatedLinks({ paths, title = 'Keep reading', id = 'related' }) {
  const items = paths.map((path) => routeByPath[path]).filter(Boolean);
  if (!items.length) return null;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-t border-white/8 py-20 lg:py-28"
    >
      <Container>
        <h2 id={`${id}-heading`} className="t-micro text-faint">
          {title}
        </h2>
        <ul className="mt-8 grid gap-px overflow-hidden border-y border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.path} className="bg-void">
              <Link href={item.path} className="group flex h-full flex-col gap-3 p-6 lg:p-7">
                <span className="t-h4 text-ink transition-colors group-hover:text-[var(--scene-glow)]">
                  {item.title}
                </span>
                <span className="t-body flex-1 text-[0.9rem]">{item.summary}</span>
                <span className="inline-flex items-center gap-2 text-[13px] text-[var(--scene-glow)]">
                  Read more
                  <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
