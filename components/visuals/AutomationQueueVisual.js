'use client';

import { useRef } from 'react';
import { clamp, lerp, smoothstep, stagger } from '@/lib/animations';
import { useScrollScrub } from './useScrollScrub';
import VisualFrame from './VisualFrame';

/**
 * SEO automation, shown as a queue that refills itself.
 *
 * Tasks are picked up, completed, and the queue does not empty — because new
 * work keeps arriving from monitoring. That "it does not end" quality is the
 * whole point of this page, so the visual is a cycle rather than a pipeline.
 */
const TASKS = [
  { task: 'Expand query space', source: 'discover' },
  { task: 'Reclassify shifted intent', source: 'monitor' },
  { task: 'Fill cluster gap', source: 'plan' },
  { task: 'Add missing internal links', source: 'audit' },
  { task: 'Fix duplicate canonical', source: 'crawl' },
  { task: 'Refresh decaying page', source: 'monitor' },
];

export default function AutomationQueueVisual() {
  const rowRefs = useRef([]);
  const armRef = useRef(null);
  const countRef = useRef(null);
  const refillRef = useRef(null);

  const ref = useScrollScrub((_, t) => {
    TASKS.forEach((_task, i) => {
      const node = rowRefs.current[i];
      if (!node) return;
      const p = stagger(t, i, TASKS.length, 0.08, 0.78);
      const done = smoothstep(0.55, 0.95, p);
      node.style.opacity = (0.3 + smoothstep(0, 0.25, p) * 0.7).toFixed(3);
      node.style.transform = `translateX(${lerp(-8, 0, smoothstep(0, 0.3, p)).toFixed(1)}px)`;
      node.dataset.state = done > 0.6 ? 'done' : p > 0.05 ? 'running' : 'queued';
      const bar = node.querySelector('[data-bar]');
      if (bar) bar.style.transform = `scaleX(${clamp(p * 1.25).toFixed(3)})`;
    });

    if (armRef.current) {
      const slot = clamp(t / 0.82) * (TASKS.length - 1);
      armRef.current.style.transform = `translateY(${(slot * 2.375).toFixed(2)}rem)`;
      armRef.current.style.opacity = (smoothstep(0.02, 0.1, t) * (1 - smoothstep(0.84, 0.92, t))).toFixed(3);
    }

    if (countRef.current) {
      const done = Math.round(clamp(t / 0.82) * TASKS.length);
      countRef.current.textContent = `${done} / ${TASKS.length}`;
    }

    if (refillRef.current) {
      const appear = smoothstep(0.86, 0.98, t);
      refillRef.current.style.opacity = appear.toFixed(3);
      refillRef.current.style.transform = `translateY(${lerp(8, 0, appear).toFixed(1)}px)`;
    }
  });

  return (
    <div ref={ref}>
      <VisualFrame label="Work queue — continuous" note="Product visualization" tall>
        <div className="flex h-full flex-col px-5 py-5 sm:px-7">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              Queue — picked up automatically
            </p>
            <p ref={countRef} className="font-mono text-[10px] tracking-[0.16em] text-muted">
              0 / {TASKS.length}
            </p>
          </div>

          <div className="relative mt-4 flex-1">
            <span
              ref={armRef}
              aria-hidden="true"
              className="absolute -left-1 top-3 h-6 w-0.5 rounded-full bg-[var(--scene-glow)] opacity-0 shadow-[0_0_10px_var(--scene-glow)] transition-none"
            />

            <ul className="space-y-1.5">
              {TASKS.map((item, i) => (
                <li
                  key={item.task}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  data-state="queued"
                  className="group/row relative flex h-8 items-center gap-3 overflow-hidden rounded-[7px] border border-white/8 bg-white/[0.02] px-3 opacity-30"
                >
                  <span
                    data-bar
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-[color-mix(in_srgb,var(--scene-accent)_14%,transparent)]"
                  />
                  <span
                    aria-hidden="true"
                    className="relative size-1.5 shrink-0 rounded-full bg-white/25 group-data-[state=running]/row:bg-[var(--scene-glow)] group-data-[state=done]/row:bg-signal"
                  />
                  <span className="relative flex-1 truncate text-[12.5px] text-ink-soft">{item.task}</span>
                  <span className="relative hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-faint sm:block">
                    {item.source}
                  </span>
                  <span className="relative shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-faint group-data-[state=done]/row:text-signal">
                    <span className="group-data-[state=done]/row:hidden">queued</span>
                    <span className="hidden group-data-[state=done]/row:inline">done</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={refillRef}
            className="mt-4 flex items-center gap-3 rounded-xl border border-[color-mix(in_srgb,var(--scene-glow)_35%,transparent)] bg-[color-mix(in_srgb,var(--scene-accent)_10%,transparent)] px-4 py-3 opacity-0"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-signal shadow-[0_0_10px_var(--color-signal)]" />
            <span className="text-[13px] text-ink-soft">
              Monitoring adds the next batch — the queue never reaches zero
            </span>
          </div>
        </div>
      </VisualFrame>
    </div>
  );
}
