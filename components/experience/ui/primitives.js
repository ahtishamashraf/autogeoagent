'use client';

import { cn } from '@/lib/cn';

/**
 * Shared chrome for the floating product interfaces.
 * These panels are decorative: the readable copy for every scene lives in the
 * semantic story sections behind them.
 */

export function Frame({ className, children, tone = 'default', ...rest }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border backdrop-blur-xl',
        tone === 'default' && 'border-white/10 bg-[#070b13]/94',
        tone === 'raised' && 'border-white/14 bg-[#0a1019]/95',
        tone === 'deep' && 'border-white/8 bg-[#05080f]/95',
        'shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_40px_120px_-40px_rgba(0,0,0,0.95)]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function FrameBar({ title, right, icon = true }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/8 px-3.5 py-2.5">
      <div className="flex min-w-0 items-center gap-2.5">
        {icon ? (
          <span className="flex gap-1" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-white/18" />
            <span className="size-1.5 rounded-full bg-white/12" />
            <span className="size-1.5 rounded-full bg-white/12" />
          </span>
        ) : null}
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          {title}
        </span>
      </div>
      {right ? <div className="shrink-0 text-[10px] text-faint">{right}</div> : null}
    </div>
  );
}

/**
 * Honesty label used on every simulated interface.
 *
 * `short` is shown where the frame is too narrow for the full wording, so the
 * label is never dropped and never collides with a panel title.
 */
export function DataNote({ children = 'Product visualization', short, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-faint',
        className,
      )}
    >
      <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-current" />
      {short ? (
        <>
          <span className="sm:hidden">{short}</span>
          <span className="hidden sm:inline">{children}</span>
        </>
      ) : (
        children
      )}
    </span>
  );
}

export function MetaChip({ label, value, tone = 'default' }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1">
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">{label}</span>
      <span
        className={cn(
          'font-mono text-[10px] font-medium',
          tone === 'high' && 'text-signal',
          tone === 'mid' && 'text-[var(--scene-glow)]',
          tone === 'default' && 'text-ink-soft',
        )}
      >
        {value}
      </span>
    </span>
  );
}

export function SkeletonLine({ width = '100%', tone = 'muted' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'block h-1.5 rounded-full',
        tone === 'muted' && 'bg-white/10',
        tone === 'bright' && 'bg-white/22',
        tone === 'accent' && 'bg-[color-mix(in_srgb,var(--scene-glow)_45%,transparent)]',
      )}
      style={{ width }}
    />
  );
}

export function StatusDot({ tone = 'idle' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'size-1.5 shrink-0 rounded-full',
        tone === 'idle' && 'bg-white/20',
        tone === 'active' && 'bg-[var(--scene-glow)] shadow-[0_0_8px_var(--scene-glow)]',
        tone === 'done' && 'bg-signal shadow-[0_0_8px_var(--color-signal)]',
      )}
    />
  );
}
