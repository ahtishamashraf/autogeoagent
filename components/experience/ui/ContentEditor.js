'use client';

import { useRef } from 'react';
import { useSceneMotion } from '@/lib/hooks';
import { beat, clamp, lerp, smoothstep, stagedTime, stagger } from '@/lib/animations';
import { Check } from '@/components/ui/Icons';
import { DataNote, Frame, FrameBar } from './primitives';

/**
 * Scene 04 — CREATION.
 *
 * The editorial workflow: intent first, then structure, then the draft.
 * The document assembles block by block as the page scrolls, and collapses
 * back into a single object on the way out.
 */

const STEPS = [
  'Understanding search intent',
  'Researching topic',
  'Building content structure',
  'Writing article',
  'Adding internal links',
  'Generating metadata',
  'Checking semantic coverage',
];

export default function ContentEditor({ sceneIndex = 4 }) {
  const stepRefs = useRef([]);
  const blockRefs = useRef([]);
  const editorRef = useRef(null);
  const progressRef = useRef(null);

  const root = useSceneMotion(sceneIndex, (el, raw, state) => {
    const t = stagedTime(raw, state.stacked);
    const visible = beat(t, 0.0, 0.26, 0.78, 0.98);
    el.style.opacity = visible.toFixed(3);
    el.style.visibility = visible < 0.01 ? 'hidden' : 'visible';

    const enter = smoothstep(0, 0.28, t);
    // On exit the editor closes into a single document object.
    const close = smoothstep(0.8, 1, t);
    el.style.transform = `perspective(1500px) translate3d(0, ${((1 - enter) * 40).toFixed(1)}px, ${lerp(-260, 0, enter)}px) scale(${lerp(0.95, 1, enter) * lerp(1, 0.42, close)}) rotateX(${(close * 8).toFixed(2)}deg)`;

    /* --- workflow steps ------------------------------------------ */
    STEPS.forEach((_, i) => {
      const node = stepRefs.current[i];
      if (!node) return;
      const start = 0.1 + (i / STEPS.length) * 0.6;
      const active = smoothstep(start, start + 0.03, t);
      const done = smoothstep(start + 0.07, start + 0.1, t);
      node.style.opacity = (0.22 + active * 0.78).toFixed(3);
      node.dataset.done = done > 0.5 ? 'true' : 'false';
      node.dataset.active = active > 0.5 && done <= 0.5 ? 'true' : 'false';
    });

    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${clamp(smoothstep(0.1, 0.78, t)).toFixed(3)})`;
    }

    /* --- document blocks ----------------------------------------- */
    const count = blockRefs.current.length;
    blockRefs.current.forEach((node, i) => {
      if (!node) return;
      const appear = stagger(t, i, count, 0.16, 0.8, 0.45);
      node.style.opacity = appear.toFixed(3);
      node.style.transform = `translate3d(0, ${((1 - appear) * 12).toFixed(2)}px, 0)`;
      node.style.filter = appear < 1 ? `blur(${((1 - appear) * 2.5).toFixed(2)}px)` : 'none';
    });

    if (editorRef.current) {
      // The page scrolls itself as the draft grows longer.
      editorRef.current.style.transform = `translateY(${(-smoothstep(0.45, 0.82, t) * 62).toFixed(1)}px)`;
    }
  });

  return (
    <div
      ref={root}
      className="pointer-events-none absolute inset-0 flex items-start justify-center lg:items-center opacity-0"
    >
      <div className="grid w-[min(94vw,940px)] gap-3 lg:grid-cols-[260px_1fr]">
        {/* Workflow rail */}
        <Frame tone="deep" className="hidden self-start lg:block">
          <FrameBar title="Agent workflow" icon={false} />
          <div className="px-3.5 py-3">
            <ol className="space-y-2.5">
              {STEPS.map((step, i) => (
                <li
                  key={step}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-done="false"
                  data-active="false"
                  className="group/step flex items-center gap-2.5 text-[11.5px] text-muted opacity-20 transition-colors"
                >
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-white/15 text-transparent group-data-[active=true]/step:border-[var(--scene-glow)] group-data-[done=true]/step:border-signal group-data-[done=true]/step:bg-signal/15 group-data-[done=true]/step:text-signal">
                    <Check className="size-2.5" />
                  </span>
                  <span className="group-data-[active=true]/step:text-ink group-data-[done=true]/step:text-ink-soft">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-4 h-px w-full overflow-hidden rounded-full bg-white/10">
              <span
                ref={progressRef}
                className="block h-full w-full origin-left scale-x-0 bg-[var(--scene-glow)]"
              />
            </div>
          </div>
        </Frame>

        {/* Editor */}
        <Frame tone="raised" className="overflow-hidden">
          <FrameBar
            title="Draft — ai-seo-automation"
            right={<DataNote>Product visualization</DataNote>}
          />
          <div className="relative h-[38svh] overflow-hidden px-5 py-5 sm:px-7 lg:h-[50svh]">
            <div ref={editorRef} className="space-y-3.5">
              <span ref={(el) => {
                  blockRefs.current[0] = el;
                }} className="block opacity-0">
                <span className="t-micro text-[9px] text-faint">H1</span>
                <span className="mt-1 block font-display text-lg font-semibold tracking-[-0.03em] text-ink sm:text-xl">
                  How to Automate SEO With an AI Agent
                </span>
              </span>

              <span ref={(el) => {
                  blockRefs.current[1] = el;
                }} className="block text-[12.5px] leading-relaxed text-ink-soft opacity-0">
                Automating SEO works best when the repeatable layer — research, structure, metadata
                and internal links — runs continuously instead of in campaigns.
              </span>

              <span ref={(el) => {
                  blockRefs.current[2] = el;
                }} className="block opacity-0">
                <span className="t-micro text-[9px] text-faint">H2</span>
                <span className="mt-1 block font-display text-[15px] font-semibold tracking-[-0.02em] text-ink">
                  What an SEO agent actually automates
                </span>
              </span>

              <span ref={(el) => {
                  blockRefs.current[3] = el;
                }} className="block text-[12.5px] leading-relaxed text-muted opacity-0">
                Start with intent. A query is only worth targeting when the page you can produce
                matches what the searcher expects to find.
              </span>

              <span ref={(el) => {
                  blockRefs.current[4] = el;
                }} className="block overflow-hidden rounded-lg border border-white/10 opacity-0">
                <span className="grid grid-cols-2 border-b border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">
                  <span>Manual workflow</span>
                  <span>Agent workflow</span>
                </span>
                {[
                  ['Monthly keyword export', 'Continuous query discovery'],
                  ['Briefs written by hand', 'Structure from intent analysis'],
                  ['Links added ad hoc', 'Internal links proposed per page'],
                ].map((row) => (
                  <span
                    key={row[0]}
                    className="grid grid-cols-2 border-b border-white/6 px-3 py-1.5 text-[11px] text-muted last:border-0"
                  >
                    <span>{row[0]}</span>
                    <span className="text-ink-soft">{row[1]}</span>
                  </span>
                ))}
              </span>

              <span ref={(el) => {
                  blockRefs.current[5] = el;
                }} className="block text-[12.5px] leading-relaxed text-muted opacity-0">
                Related reading:{' '}
                <span className="text-[var(--scene-glow)] underline decoration-[color-mix(in_srgb,var(--scene-glow)_45%,transparent)] underline-offset-2">
                  What is Generative Engine Optimization?
                </span>
              </span>

              <span ref={(el) => {
                  blockRefs.current[6] = el;
                }} className="block rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 opacity-0">
                <span className="t-micro block text-[9px] text-faint">FAQ</span>
                <span className="mt-1.5 block text-[12px] font-medium text-ink-soft">
                  Does SEO automation replace an SEO team?
                </span>
                <span className="mt-1 block text-[11.5px] leading-relaxed text-muted">
                  No — it removes the repetitive layer so people can spend their time on positioning,
                  product and editorial judgement.
                </span>
              </span>

              <span ref={(el) => {
                  blockRefs.current[7] = el;
                }} className="block rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 font-mono text-[10px] leading-relaxed text-faint opacity-0">
                <span className="block text-[var(--scene-glow)]">title:</span>
                <span className="block">How to Automate SEO With an AI Agent</span>
                <span className="mt-1.5 block text-[var(--scene-glow)]">description:</span>
                <span className="block">
                  A practical guide to automating research, structure, metadata and internal links.
                </span>
                <span className="mt-1.5 block text-[var(--scene-glow)]">schema:</span>
                <span className="block">Article, FAQPage, BreadcrumbList</span>
              </span>
            </div>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b1220] to-transparent"
            />
          </div>
        </Frame>
      </div>
    </div>
  );
}
