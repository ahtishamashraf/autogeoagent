'use client';

import { useRef } from 'react';
import { clamp, lerp, mapRange, smoothstep, stagger } from '@/lib/animations';
import { useScrollScrub } from './useScrollScrub';
import VisualFrame from './VisualFrame';

/**
 * A generic staged pipeline: a unit of work travels through named stages,
 * each completing as it passes. Reused wherever a page's story is "this goes
 * through these checks" — the stages, label and payload differ per page.
 */
export default function PipelineVisual({ label, note = 'Product visualization', stages, payload, output }) {
  const stageRefs = useRef([]);
  const railRef = useRef(null);
  const tokenRef = useRef(null);
  const outputRef = useRef(null);

  const ref = useScrollScrub((_, t) => {
    const flow = smoothstep(0.06, 0.78, t);
    if (railRef.current) railRef.current.style.transform = `scaleX(${flow.toFixed(3)})`;

    if (tokenRef.current) {
      const travel = clamp(mapRange(t, 0.06, 0.8, 0, 1));
      tokenRef.current.style.left = `calc(${(travel * 100).toFixed(2)}% )`;
      tokenRef.current.style.opacity = (smoothstep(0.02, 0.1, t) * (1 - smoothstep(0.82, 0.9, t))).toFixed(3);
    }

    stages.forEach((_, i) => {
      const node = stageRefs.current[i];
      if (!node) return;
      const start = 0.06 + (i / stages.length) * 0.72;
      const active = smoothstep(start, start + 0.03, t);
      const done = smoothstep(start + 0.07, start + 0.11, t);
      node.style.opacity = (0.28 + active * 0.72).toFixed(3);
      node.dataset.done = done > 0.5 ? 'true' : 'false';
    });

    if (outputRef.current) {
      const appear = smoothstep(0.84, 0.96, t);
      outputRef.current.style.opacity = appear.toFixed(3);
      outputRef.current.style.transform = `translateY(${lerp(10, 0, appear).toFixed(1)}px)`;
    }
  });

  return (
    <div ref={ref}>
      <VisualFrame label={label} note={note}>
        <div className="flex h-full flex-col justify-center px-5 py-6 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{payload}</p>

          <div className="relative mt-6">
            <span aria-hidden="true" className="absolute inset-x-0 top-[7px] h-px bg-white/10" />
            <span
              ref={railRef}
              aria-hidden="true"
              className="absolute inset-x-0 top-[7px] h-px origin-left scale-x-0 bg-[var(--scene-glow)] shadow-[0_0_10px_var(--scene-glow)]"
            />
            <span
              ref={tokenRef}
              aria-hidden="true"
              className="absolute top-0 size-[15px] -translate-x-1/2 rounded-[4px] border border-[var(--scene-glow)] bg-[color-mix(in_srgb,var(--scene-accent)_50%,transparent)] opacity-0 shadow-[0_0_14px_var(--scene-glow)]"
            />

            <ol className="relative grid gap-2" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
              {stages.map((stage, i) => (
                <li
                  key={stage}
                  ref={(el) => {
                    stageRefs.current[i] = el;
                  }}
                  data-done="false"
                  className="group/stage flex flex-col items-start gap-2.5 opacity-30"
                >
                  <span className="flex size-3.5 items-center justify-center rounded-full border border-white/20 bg-[#070b13] group-data-[done=true]/stage:border-signal group-data-[done=true]/stage:bg-signal/25" />
                  <span className="font-mono text-[9px] uppercase leading-tight tracking-[0.14em] text-muted group-data-[done=true]/stage:text-ink-soft">
                    {stage}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div
            ref={outputRef}
            className="mt-7 flex items-center gap-3 rounded-xl border border-[color-mix(in_srgb,var(--scene-glow)_35%,transparent)] bg-[color-mix(in_srgb,var(--scene-accent)_10%,transparent)] px-4 py-3 opacity-0"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-signal shadow-[0_0_10px_var(--color-signal)]" />
            <span className="text-[13px] text-ink-soft">{output}</span>
          </div>
        </div>
      </VisualFrame>
    </div>
  );
}
