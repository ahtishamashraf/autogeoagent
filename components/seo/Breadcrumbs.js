import Link from 'next/link';
import { cn } from '@/lib/cn';

export default function Breadcrumbs({ items, className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('mb-8', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-ink-soft">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="text-muted">
                  {item.label}
                </span>
              )}
              {!isLast ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
