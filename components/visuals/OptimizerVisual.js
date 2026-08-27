'use client';

import { useRef } from 'react';
import { lerp, smoothstep, stagger } from '@/lib/animations';
import { useScrollScrub } from './useScrollScrub';
import VisualFrame from './VisualFrame';

/**
 * An existing page, audited and improved.
 *
 * Gaps are found first, then closed one at a time, and the coverage reading
 * rises as each is resolved. The numbers are illustrative.
 */

const FINDINGS = [
  { label: 'Missing subtopic: entity clarity', fix: 'Section added' },
  { label: 'Answer buried in section 3', fix: 'Answer moved to intro' },
  { label: 'No comparison table', fix: 'Table generated' },
  { label: '2 internal links available', fix: 'Links proposed' },
  { label: 'Metadata below length target', fix: 'Metadata rewritten' },
  { label: 'No FAQ block', fix: 'FAQ drafted' },
];

export default function OptimizerVisual() {
  const rowRefs = useRef([]);
  const fixRefs = useRef([]);
  const scoreRef = useRef(null);
  const arcRef = useRef(null);

  const ref = useScrollScrub((_, t) => {
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const appear = stagger(t, i, FINDINGS.length, 0, 0.4);
      el.style.opacity = appear.toFixed(3);
      el.style.transform = `translateY(${lerp(10, 0, appear).toFixed(1)}px)`;
    });

    fixRefs.current.forEach((el, i) => {
      if (!el) return;
      const fixed = stagger(t, i, FINDINGS.length, 0.42, 0.92);
      el.style.opacity = fixed.toFixed(3);
      el.parentElement?.setAttribute('data-fixed', fixed > 0.6 ? 'true' : 'false');
    });

    const score = smoothstep(0.4, 0.95, t);
    if (scoreRef.current) {
      const value = Math.round(lerp(41, 88, score));
      if (scoreRef.current.textContent !== String(value)) scoreRef.current.textContent = String(value);
    }
    if (arcRef.current) {
      arcRef.current.style.strokeDashoffset = `${(1 - lerp(0.41, 0.88, score)) * 264}`;
    }
  });

  return (
    <div ref={ref}>
      <VisualFrame label="Content optimizer" note="Illustrative data" tall>
        <div className="grid h-full grid-cols-1 gap-5 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,10rem)]">
          <ul className="flex flex-col justify-center gap-1.5">
            {FINDINGS.map((finding, i) => (
              <li
                key={finding.label}
                data-fixed="false"
                className="group/row flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 opacity-0 data-[fixed=true]:border-signal/30"
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-violet-soft group-data-[fixed=true]/row:bg-signal"
                />
                <span className="min-w-0 flex-1 truncate text-[12px] text-muted group-data-[fixed=true]/row:line-through group-data-[fixed=true]/row:decoration-white/25">
                  {finding.label}
                </span>
                <span
                  ref={(el) => {
                    fixRefs.current[i] = el;
                  }}
                  className="shrink-0 rounded-full border border-signal/35 bg-signal/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-signal opacity-0"
                >
                  {finding.fix}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center justify-center">
            <svg viewBox="0 0 100 100" className="size-28" aria-hidden="true">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(148,176,220,0.14)" strokeWidth="6" />
              <circle
                ref={arcRef}
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="var(--scene-glow)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="264"
                strokeDashoffset="264"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <p className="-mt-[4.6rem] text-center">
              <span ref={scoreRef} className="font-display text-2xl font-semibold text-ink">
                41
              </span>
              <span className="block font-mono text-[8.5px] uppercase tracking-[0.16em] text-faint">
                Coverage
              </span>
            </p>
          </div>
        </div>
      </VisualFrame>
    </div>
  );
}
