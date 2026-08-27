'use client';

import { useRef } from 'react';
import { lerp, smoothstep, stagger } from '@/lib/animations';
import { useScrollScrub } from './useScrollScrub';
import VisualFrame from './VisualFrame';

/**
 * Clusters become a schedule.
 *
 * Topic clusters on the left resolve into dated slots on the right, with the
 * pillar scheduled first and its supporting pieces sequenced behind it.
 */

const SLOTS = [
  { week: 'Week 1', title: 'Pillar — AI SEO', kind: 'Pillar' },
  { week: 'Week 2', title: 'Automating keyword research', kind: 'Supporting' },
  { week: 'Week 2', title: 'Search intent, explained', kind: 'Supporting' },
  { week: 'Week 3', title: 'AI SEO vs manual SEO', kind: 'Comparison' },
  { week: 'Week 4', title: 'Internal linking at scale', kind: 'Supporting' },
  { week: 'Week 4', title: 'Refresh: SEO audit guide', kind: 'Refresh' },
];

const CLUSTERS = ['AI SEO', 'Automation', 'Content ops'];

export default function ContentCalendarVisual() {
  const clusterRefs = useRef([]);
  const slotRefs = useRef([]);
  const meterRef = useRef(null);

  const ref = useScrollScrub((_, t) => {
    clusterRefs.current.forEach((el, i) => {
      if (!el) return;
      const appear = stagger(t, i, CLUSTERS.length, 0, 0.22);
      const hand = smoothstep(0.34, 0.62, t);
      el.style.opacity = (appear * lerp(1, 0.45, hand)).toFixed(3);
      el.style.transform = `translateX(${lerp(-12, 0, appear).toFixed(1)}px)`;
    });

    slotRefs.current.forEach((el, i) => {
      if (!el) return;
      const appear = stagger(t, i, SLOTS.length, 0.3, 0.9);
      el.style.opacity = appear.toFixed(3);
      el.style.transform = `translateY(${lerp(14, 0, appear).toFixed(1)}px)`;
    });

    if (meterRef.current) {
      const grow = smoothstep(0.34, 0.94, t);
      meterRef.current.style.transform = `scaleX(${grow.toFixed(3)})`;
    }
  });

  return (
    <div ref={ref}>
      <VisualFrame label="Editorial plan" note="Product visualization" tall>
        <div className="grid h-full grid-cols-1 gap-5 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]">
          <div className="flex flex-col justify-center gap-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">Clusters</p>
            {CLUSTERS.map((cluster, i) => (
              <span
                key={cluster}
                ref={(el) => {
                  clusterRefs.current[i] = el;
                }}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-ink-soft opacity-0"
              >
                {cluster}
              </span>
            ))}
            <div className="mt-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">Coverage</p>
              <span className="mt-2 block h-1 w-full overflow-hidden rounded-full bg-white/10">
                <span
                  ref={meterRef}
                  className="block h-full w-full origin-left scale-x-0 bg-[var(--scene-glow)]"
                />
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-faint">Schedule</p>
            <ul className="grid gap-1.5">
              {SLOTS.map((slot, i) => (
                <li
                  key={slot.title}
                  ref={(el) => {
                    slotRefs.current[i] = el;
                  }}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 opacity-0"
                >
                  <span className="w-14 shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                    {slot.week}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12px] text-ink-soft">{slot.title}</span>
                  <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-faint">
                    {slot.kind}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </VisualFrame>
    </div>
  );
}
