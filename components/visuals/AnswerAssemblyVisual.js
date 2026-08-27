'use client';

import { useRef } from 'react';
import { clamp, lerp, smoothstep, stagger } from '@/lib/animations';
import { useScrollScrub } from './useScrollScrub';
import VisualFrame from './VisualFrame';

/**
 * GEO, shown as an answer being assembled from passages.
 *
 * Sources are retrieved, specific passages are pulled out of them, and the
 * answer is composed with attributions. The sources are generic labels, not
 * named sites — inventing a citation is exactly the failure this page argues
 * against.
 */
const SOURCES = [
  { label: 'Source A', passage: 'Definition of the term' },
  { label: 'Source B', passage: 'How the process works' },
  { label: 'Source C', passage: 'Comparison of options' },
  { label: 'Source D', passage: 'Limits and caveats' },
];

const ANSWER_LINES = [
  { text: 'Direct definition, stated plainly.', cite: 'A' },
  { text: 'The mechanism, in the order it happens.', cite: 'B' },
  { text: 'Where the options differ, and why.', cite: 'C' },
  { text: 'What the answer does not cover.', cite: 'D' },
];

export default function AnswerAssemblyVisual() {
  const sourceRefs = useRef([]);
  const lineRefs = useRef([]);
  const beamRef = useRef(null);
  const promptRef = useRef(null);

  const ref = useScrollScrub((_, t) => {
    if (promptRef.current) {
      promptRef.current.style.opacity = smoothstep(0, 0.08, t).toFixed(3);
    }

    SOURCES.forEach((_s, i) => {
      const node = sourceRefs.current[i];
      if (!node) return;
      const p = stagger(t, i, SOURCES.length, 0.1, 0.5);
      node.style.opacity = (0.25 + smoothstep(0, 0.4, p) * 0.75).toFixed(3);
      node.dataset.picked = p > 0.6 ? 'true' : 'false';
      const mark = node.querySelector('[data-passage]');
      if (mark) mark.style.transform = `scaleX(${clamp(smoothstep(0.35, 0.9, p)).toFixed(3)})`;
    });

    if (beamRef.current) {
      beamRef.current.style.opacity = (smoothstep(0.3, 0.44, t) * (1 - smoothstep(0.9, 1, t))).toFixed(3);
    }

    ANSWER_LINES.forEach((_l, i) => {
      const node = lineRefs.current[i];
      if (!node) return;
      const p = stagger(t, i, ANSWER_LINES.length, 0.46, 0.94);
      const appear = smoothstep(0, 0.5, p);
      node.style.opacity = appear.toFixed(3);
      node.style.transform = `translateY(${lerp(6, 0, appear).toFixed(1)}px)`;
      const chip = node.querySelector('[data-cite]');
      if (chip) chip.style.opacity = smoothstep(0.55, 0.95, p).toFixed(3);
    });
  });

  return (
    <div ref={ref}>
      <VisualFrame label="Answer assembly" note="Illustrative — not a real engine trace" tall>
        <div className="flex h-full flex-col px-5 py-5 sm:px-7">
          <p ref={promptRef} className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint opacity-0">
            Prompt → retrieve → compose
          </p>

          <div className="relative mt-4 grid flex-1 gap-4 sm:grid-cols-[minmax(0,1fr)_1.5rem_minmax(0,1.25fr)]">
            <ul className="space-y-1.5">
              {SOURCES.map((source, i) => (
                <li
                  key={source.label}
                  ref={(el) => {
                    sourceRefs.current[i] = el;
                  }}
                  data-picked="false"
                  className="group/src relative overflow-hidden rounded-[7px] border border-white/8 bg-white/[0.02] px-3 py-2 opacity-25 data-[picked=true]:border-[color-mix(in_srgb,var(--scene-glow)_45%,transparent)]"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">{source.label}</p>
                  <p className="relative mt-1 text-[12px] leading-snug text-ink-soft">
                    <span
                      data-passage
                      aria-hidden="true"
                      className="absolute -inset-x-1 -inset-y-0.5 origin-left scale-x-0 rounded bg-[color-mix(in_srgb,var(--scene-accent)_22%,transparent)]"
                    />
                    <span className="relative">{source.passage}</span>
                  </p>
                </li>
              ))}
            </ul>

            <div className="hidden items-center justify-center sm:flex">
              <span
                ref={beamRef}
                aria-hidden="true"
                className="h-3/5 w-px bg-gradient-to-b from-transparent via-[var(--scene-glow)] to-transparent opacity-0 shadow-[0_0_10px_var(--scene-glow)]"
              />
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">Generated answer</p>
              <ul className="mt-3 space-y-2.5">
                {ANSWER_LINES.map((line, i) => (
                  <li
                    key={line.text}
                    ref={(el) => {
                      lineRefs.current[i] = el;
                    }}
                    className="flex items-start gap-2 text-[12.5px] leading-snug text-ink-soft opacity-0"
                  >
                    <span className="flex-1">{line.text}</span>
                    <span
                      data-cite
                      className="mt-px shrink-0 rounded-full border border-[color-mix(in_srgb,var(--scene-glow)_45%,transparent)] px-1.5 py-px font-mono text-[9px] text-[var(--scene-glow)] opacity-0"
                    >
                      {line.cite}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-faint">
            Being retrieved is not the same as being cited, and being cited is not the same as being
            clicked. GEO works on the first two; the third depends on the answer.
          </p>
        </div>
      </VisualFrame>
    </div>
  );
}
