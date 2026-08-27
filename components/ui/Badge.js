import { cn } from '@/lib/cn';

const tones = {
  default: 'border-white/12 bg-white/[0.04] text-ink-soft',
  accent:
    'border-[color-mix(in_srgb,var(--scene-accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--scene-accent)_12%,transparent)] text-[var(--scene-glow)]',
  signal: 'border-signal/40 bg-signal/10 text-signal',
  violet: 'border-violet/40 bg-violet/10 text-violet-soft',
  muted: 'border-white/8 bg-white/[0.02] text-faint',
};

export default function Badge({ tone = 'default', dot = false, className, children, ...rest }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]',
        tones[tone] || tones.default,
        className,
      )}
      {...rest}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]"
        />
      ) : null}
      {children}
    </span>
  );
}
