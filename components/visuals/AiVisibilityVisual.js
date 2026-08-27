'use client';

import { useRef } from 'react';
import { lerp, smoothstep, stagger } from '@/lib/animations';
import { useScrollScrub } from './useScrollScrub';
import VisualFrame from './VisualFrame';

/**
 * A fixed prompt set checked across answer surfaces.
 *
 * Prompts flow into abstract engines and each returns one of four outcomes.
 * The outcomes are illustrative — no product can promise a citation, and the
 * label says so.
 */

const PROMPTS = [
  'best SEO automation platform',
  'how to automate SEO',
  'AI SEO tools for SaaS',
];

const ENGINES = [
  { name: 'AI search', result: 'Cited', tone: 'good' },
  { name: 'Chat assistant', result: 'Brand mention', tone: 'ok' },
  { name: 'Generative search', result: 'Competitor cited', tone: 'warn' },
  { name: 'AI overview', result: 'Not mentioned', tone: 'flat' },
];

const TONES = {
  good: 'border-signal/45 bg-signal/12 text-signal',
  ok: 'border-[color-mix(in_srgb,var(--scene-glow)_45%,transparent)] bg-[color-mix(in_srgb,var(--scene-accent)_12%,transparent)] text-[var(--scene-glow)]',
  warn: 'border-violet/40 bg-violet/10 text-violet-soft',
  flat: 'border-white/12 bg-white/[0.03] text-faint',
};

export default function AiVisibilityVisual() {
  const promptRefs = useRef([]);
  const engineRefs = useRef([]);
  const resultRefs = useRef([]);
  const beamRefs = useRef([]);

  const ref = useScrollScrub((_, t) => {
    promptRefs.current.forEach((el, i) => {
      if (!el) return;
      const appear = stagger(t, i, PROMPTS.length, 0, 0.24);
      el.style.opacity = appear.toFixed(3);
      el.style.transform = `translateX(${lerp(-14, 0, appear).toFixed(1)}px)`;
    });

    beamRefs.current.forEach((el, i) => {
      if (!el) return;
      const draw = stagger(t, i, ENGINES.length, 0.24, 0.56);
      el.style.strokeDashoffset = `${(1 - draw) * 200}`;
      el.style.opacity = (draw * 0.9).toFixed(3);
    });

    engineRefs.current.forEach((el, i) => {
      if (!el) return;
      const appear = stagger(t, i, ENGINES.length, 0.3, 0.62);
      el.style.opacity = appear.toFixed(3);
    });

    resultRefs.current.forEach((el, i) => {
      if (!el) return;
      const appear = stagger(t, i, ENGINES.length, 0.62, 0.94);
      el.style.opacity = appear.toFixed(3);
      el.style.transform = `translateY(${lerp(8, 0, appear).toFixed(1)}px)`;
    });
  });

  return (
    <div ref={ref}>
      <VisualFrame label="Prompt set — monthly check" note="Illustrative data" tall>
        <div className="grid h-full grid-cols-1 gap-4 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,15rem)_2.5rem_minmax(0,1fr)]">
          <div className="flex flex-col justify-center gap-2.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">Prompts</p>
            {PROMPTS.map((prompt, i) => (
              <span
                key={prompt}
                ref={(el) => {
                  promptRefs.current[i] = el;
                }}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-ink-soft opacity-0"
              >
                {prompt}
              </span>
            ))}
          </div>

          <svg viewBox="0 0 40 200" className="hidden h-full w-10 lg:block" aria-hidden="true" preserveAspectRatio="none">
            {ENGINES.map((engine, i) => (
              <path
                key={engine.name}
                ref={(el) => {
                  beamRefs.current[i] = el;
                }}
                d={`M0 100 C 20 100, 20 ${26 + i * 50}, 40 ${26 + i * 50}`}
                fill="none"
                stroke="color-mix(in srgb, var(--scene-glow) 50%, transparent)"
                strokeWidth="1"
                strokeDasharray="200"
                style={{ strokeDashoffset: 200, opacity: 0 }}
              />
            ))}
          </svg>

          <div className="flex flex-col justify-center gap-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">Answer surfaces</p>
            {ENGINES.map((engine, i) => (
              <div
                key={engine.name}
                ref={(el) => {
                  engineRefs.current[i] = el;
                }}
                className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 opacity-0"
              >
                <span className="truncate text-[12px] text-ink-soft">{engine.name}</span>
                <span
                  ref={(el) => {
                    resultRefs.current[i] = el;
                  }}
                  className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] opacity-0 ${TONES[engine.tone]}`}
                >
                  {engine.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </VisualFrame>
    </div>
  );
}
