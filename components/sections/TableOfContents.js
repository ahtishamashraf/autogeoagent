import { cn } from '@/lib/cn';

/** Builds a contents list from the h2 blocks of a page. */
export default function TableOfContents({ blocks, className, title = 'On this page' }) {
  const items = blocks.filter((block) => block.type === 'h2' && block.id);
  if (items.length < 3) return null;

  return (
    <nav aria-label={title} className={cn('lg:sticky lg:top-32', className)}>
      <p className="t-micro text-faint">{title}</p>
      <ul className="mt-4 space-y-2.5 border-l border-white/10 pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block text-[13px] leading-snug text-muted transition-colors hover:text-ink"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
