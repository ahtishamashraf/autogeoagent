import Link from 'next/link';
import { Check } from '@/components/ui/Icons';
import { cn } from '@/lib/cn';

/**
 * Renders structured content blocks.
 *
 * Content is authored as data rather than markup so every page produces the
 * same clean, semantic HTML — headings in order, real tables, real lists —
 * which is what makes these pages readable by crawlers and answer engines.
 */

function Inline({ text }) {
  if (typeof text !== 'string') return text;
  // Supports **bold** and [label](/href) — enough for editorial copy.
  const nodes = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match = pattern.exec(text);
  let key = 0;
  while (match) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**')) {
      nodes.push(
        <strong key={`b-${key}`} className="font-medium text-ink">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const label = token.slice(1, token.indexOf(']'));
      const href = token.slice(token.indexOf('(') + 1, -1);
      const isExternal = href.startsWith('http');
      nodes.push(
        isExternal ? (
          <a
            key={`l-${key}`}
            href={href}
            rel="noopener"
            className="link-underline text-[var(--scene-glow)]"
          >
            {label}
          </a>
        ) : (
          <Link key={`l-${key}`} href={href} className="link-underline text-[var(--scene-glow)]">
            {label}
          </Link>
        ),
      );
    }
    key += 1;
    last = match.index + token.length;
    match = pattern.exec(text);
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 id={block.id} className="t-h3 mt-16 scroll-mt-28 text-ink first:mt-0">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 id={block.id} className="t-h4 mt-10 scroll-mt-28 text-ink">
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p className="t-body mt-5 text-[1rem] leading-[1.78]">
          <Inline text={block.text} />
        </p>
      );
    case 'lead':
      return (
        <p className="t-lead mt-5 text-[1.0625rem]">
          <Inline text={block.text} />
        </p>
      );
    case 'answer':
      return (
        <div className="mt-6 rounded-2xl border border-[color-mix(in_srgb,var(--scene-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--scene-accent)_8%,transparent)] p-6">
          {block.label ? <p className="t-micro text-[var(--scene-glow)]">{block.label}</p> : null}
          <p className="mt-3 text-[1.0625rem] leading-[1.7] text-ink-soft">
            <Inline text={block.text} />
          </p>
        </div>
      );
    case 'ul':
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[0.975rem] leading-[1.72] text-muted">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1 shrink-0 rounded-full bg-[var(--scene-glow)]"
              />
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case 'checklist':
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[0.975rem] leading-[1.72] text-muted">
              <Check className="mt-1.5 size-3.5 shrink-0 text-[var(--scene-glow)]" />
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="mt-6 space-y-4">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-4 text-[0.975rem] leading-[1.72] text-muted">
              <span className="mt-0.5 font-mono text-[11px] tracking-[0.14em] text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ol>
      );
    case 'steps':
      return (
        <ol className="mt-8 border-t border-white/8">
          {block.items.map((item, i) => (
            <li key={item.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-white/8 py-5">
              <span className="pt-1 font-mono text-[11px] tracking-[0.14em] text-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="block font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
                  {item.title}
                </span>
                <span className="mt-1.5 block text-[0.9375rem] leading-[1.7] text-muted">
                  <Inline text={item.text} />
                </span>
              </span>
            </li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <div className="-mx-5 mt-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            {block.caption ? (
              <caption className="caption-bottom pt-4 text-left text-xs leading-relaxed text-faint">
                {block.caption}
              </caption>
            ) : null}
            <thead>
              <tr className="border-b border-white/12">
                {block.head.map((cell) => (
                  <th
                    key={cell}
                    scope="col"
                    className="py-3 pr-4 font-display text-sm font-semibold text-ink last:pr-0"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-b border-white/8 align-top">
                  {row.map((cell, i) => (
                    <td
                      key={cell}
                      className={cn(
                        'py-4 pr-4 text-[0.9rem] leading-relaxed last:pr-0',
                        i === 0 ? 'text-faint' : 'text-muted',
                      )}
                    >
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout':
      return (
        <aside className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          {block.title ? <p className="t-h4 text-ink">{block.title}</p> : null}
          <p className="t-body mt-2.5 text-[0.9375rem]">
            <Inline text={block.text} />
          </p>
        </aside>
      );
    case 'quote':
      return (
        <blockquote className="mt-8 border-l-2 border-[var(--scene-glow)] pl-6">
          <p className="font-display text-lg leading-[1.5] tracking-[-0.02em] text-ink-soft">
            {block.text}
          </p>
        </blockquote>
      );
    case 'diagram':
      return (
        <figure className="mt-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.015] p-6">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
              {block.steps.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                    {step}
                  </span>
                  {i < block.steps.length - 1 ? (
                    <span aria-hidden="true" className="text-faint">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
          {block.caption ? (
            <figcaption className="mt-3 text-xs text-faint">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    default:
      return null;
  }
}

export default function ArticleBody({ blocks, className }) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {blocks.map((block, i) => (
        <Block key={`${block.type}-${block.id || block.text || i}`} block={block} />
      ))}
    </div>
  );
}
