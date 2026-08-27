import { cn } from '@/lib/cn';

/**
 * Shared chrome for interior-page visualizations, so every product page feels
 * like part of the same product even though each one shows something different.
 */
export default function VisualFrame({ label, note, children, className, tall = false }) {
  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-[#070b13]/90',
        'shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_40px_120px_-50px_rgba(0,0,0,0.95)]',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_60%_at_50%_0%,color-mix(in_srgb,var(--scene-accent)_12%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="grid-field-fine pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_70%_at_50%_40%,#000,transparent)]"
      />

      <figcaption className="relative flex items-center justify-between gap-3 border-b border-white/8 px-4 py-2.5">
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          {label}
        </span>
        {note ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
            <span aria-hidden="true" className="size-1 rounded-full bg-current" />
            {note}
          </span>
        ) : null}
      </figcaption>

      <div className={cn('relative', tall ? 'h-[clamp(22rem,46vh,32rem)]' : 'h-[clamp(17rem,34vh,24rem)]')}>
        {children}
      </div>
    </figure>
  );
}
