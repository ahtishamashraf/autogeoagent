'use client';

import { clamp } from '@/lib/animations';

/**
 * The eight-stage loop, drawn as a ring.
 *
 * `active` is a plain prop rather than internal state: the page owns which
 * stage is in view, so the ring and the prose can never disagree. The ring is
 * decorative — every stage name it shows is also a heading in the list beside
 * it, so nothing here is the only place a reader can get the information.
 */
export default function LoopDiagram({ stages, active = 0 }) {
  const count = stages.length;
  const R = 38;

  return (
    <div className="relative aspect-square w-full max-w-[22rem]">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.5" />
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke="var(--scene-glow)"
          strokeWidth="0.9"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - clamp((active + 1) / count)}
          className="transition-[stroke-dashoffset] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [filter:drop-shadow(0_0_4px_var(--scene-glow))]"
        />
        {stages.map((stage, i) => {
          const angle = (i / count) * Math.PI * 2;
          const x = 50 + Math.cos(angle) * R;
          const y = 50 + Math.sin(angle) * R;
          const on = i <= active;
          return (
            <circle
              key={stage.id}
              cx={x}
              cy={y}
              r={i === active ? 2.6 : 1.6}
              fill={on ? 'var(--scene-glow)' : '#0b1018'}
              stroke={on ? 'var(--scene-glow)' : 'rgba(255,255,255,0.22)'}
              strokeWidth="0.5"
              className="transition-all duration-500"
              style={{ filter: i === active ? 'drop-shadow(0 0 5px var(--scene-glow))' : 'none' }}
            />
          );
        })}
      </svg>

      {stages.map((stage, i) => {
        // Labels sit outside the ring, rotated back to horizontal.
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const left = 50 + Math.cos(angle) * (R + 11);
        const top = 50 + Math.sin(angle) * (R + 11);
        return (
          <span
            key={stage.id}
            aria-hidden="true"
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] transition-colors duration-500"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              color: i === active ? 'var(--scene-glow)' : i < active ? 'var(--color-muted)' : 'var(--color-faint)',
            }}
          >
            {stage.label}
          </span>
        );
      })}

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-10 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          Stage {stages[active]?.number}
        </span>
        <span className="t-h4 text-balance text-ink">{stages[active]?.label}</span>
        <span className="text-[11px] leading-snug text-muted">{stages[active]?.output}</span>
      </div>
    </div>
  );
}
