'use client';

import { useRef } from 'react';
import { useSceneMotion } from '@/lib/hooks';
import { beat, clamp, lerp, mapRange, smoothstep, stagedTime, stagger } from '@/lib/animations';
import { Check } from '@/components/ui/Icons';
import { DataNote, Frame, FrameBar, SkeletonLine } from './primitives';

/**
 * Scene 05 — AUTOMATION.
 *
 * The finished document passes through the agent's checks and lands on a live
 * page. Endpoints are shown as generic destinations — no third-party platform
 * is claimed as a verified integration.
 */

const STAGES = ['Article', 'SEO check', 'Metadata', 'Schema', 'Internal links', 'Ready'];
const STATUSES = ['Preparing', 'Optimizing', 'Publishing', 'Live'];
const ENDPOINTS = ['Website', 'CMS', 'API', 'Publishing'];

export default function PublishingPipeline({ sceneIndex = 5 }) {
  const stageRefs = useRef([]);
  const railRef = useRef(null);
  const browserRef = useRef(null);
  const statusRef = useRef(null);
  const statusDotRef = useRef(null);
  const docRef = useRef(null);
  const endpointRefs = useRef([]);
  const contentRefs = useRef([]);

  const root = useSceneMotion(sceneIndex, (el, raw, state) => {
    const t = stagedTime(raw, state.stacked);
    const visible = beat(t, -0.02, 0.24, 0.8, 1);
    el.style.opacity = visible.toFixed(3);
    el.style.visibility = visible < 0.01 ? 'hidden' : 'visible';

    const enter = smoothstep(0, 0.26, t);
    el.style.transform = `perspective(1600px) translate3d(0, ${((1 - enter) * 36).toFixed(1)}px, 0)`;

    /* --- pipeline ------------------------------------------------ */
    const flow = smoothstep(0.08, 0.62, t);
    if (railRef.current) railRef.current.style.transform = `scaleY(${flow.toFixed(3)})`;

    stageRefs.current.forEach((node, i) => {
      if (!node) return;
      const start = 0.08 + (i / STAGES.length) * 0.54;
      const active = smoothstep(start, start + 0.03, t);
      const done = smoothstep(start + 0.06, start + 0.09, t);
      node.style.opacity = (0.25 + active * 0.75).toFixed(3);
      node.dataset.done = done > 0.5 ? 'true' : 'false';
    });

    /* --- the document travels down the pipeline ------------------ */
    if (docRef.current) {
      const travel = clamp(mapRange(t, 0.08, 0.64, 0, 1));
      docRef.current.style.transform = `translateY(calc(${travel} * (100% - 26px)))`;
      docRef.current.style.opacity = (smoothstep(0.05, 0.12, t) * (1 - smoothstep(0.64, 0.72, t))).toFixed(3);
    }

    /* --- browser -------------------------------------------------- */
    const browserIn = smoothstep(0.18, 0.42, t);
    if (browserRef.current) {
      browserRef.current.style.opacity = browserIn.toFixed(3);
      const tilt = state.stacked ? 7 : 16;
      browserRef.current.style.transform = `perspective(1500px) rotateY(${lerp(-tilt, 0, browserIn)}deg) rotateX(${lerp(tilt * 0.45, 0, browserIn)}deg) translate3d(0, ${((1 - browserIn) * 30).toFixed(1)}px, ${lerp(-200, 0, browserIn)}px)`;
    }

    contentRefs.current.forEach((node, i) => {
      if (!node) return;
      node.style.opacity = stagger(t, i, contentRefs.current.length, 0.44, 0.78).toFixed(3);
    });

    /* --- status --------------------------------------------------- */
    if (statusRef.current) {
      const step = clamp(
        Math.floor(mapRange(t, 0.3, 0.82, 0, STATUSES.length)),
        0,
        STATUSES.length - 1,
      );
      const label = step === STATUSES.length - 1 ? 'LIVE' : `${STATUSES[step]}...`;
      if (statusRef.current.textContent !== label) statusRef.current.textContent = label;
      statusRef.current.dataset.live = step === STATUSES.length - 1 ? 'true' : 'false';
      if (statusDotRef.current) {
        statusDotRef.current.dataset.live = step === STATUSES.length - 1 ? 'true' : 'false';
      }
    }

    /* --- endpoints ------------------------------------------------ */
    endpointRefs.current.forEach((node, i) => {
      if (!node) return;
      const appear = stagger(t, i, ENDPOINTS.length, 0.5, 0.8);
      node.style.opacity = (appear * 0.9).toFixed(3);
      node.style.transform = `translate3d(0, ${((1 - appear) * 10).toFixed(1)}px, 0)`;
    });
  });

  return (
    <div
      ref={root}
      className="pointer-events-none absolute inset-0 flex items-start justify-center lg:items-center opacity-0"
    >
      <div className="grid w-[min(94vw,980px)] items-center gap-4 lg:grid-cols-[220px_1fr]">
        {/* Pipeline */}
        <Frame tone="deep" className="hidden self-center lg:block">
          <FrameBar title="Publish pipeline" icon={false} />
          <div className="relative px-4 py-4">
            <span
              aria-hidden="true"
              className="absolute left-[26px] top-6 h-[calc(100%-48px)] w-px bg-white/10"
            />
            <span
              ref={railRef}
              aria-hidden="true"
              className="absolute left-[26px] top-6 h-[calc(100%-48px)] w-px origin-top scale-y-0 bg-[var(--scene-glow)] shadow-[0_0_10px_var(--scene-glow)]"
            />
            <span
              ref={docRef}
              aria-hidden="true"
              className="absolute left-[20px] top-6 size-3.5 rounded-[3px] border border-[var(--scene-glow)] bg-[color-mix(in_srgb,var(--scene-accent)_45%,transparent)] opacity-0 shadow-[0_0_14px_var(--scene-glow)]"
            />
            <ol className="relative space-y-3.5">
              {STAGES.map((stage, i) => (
                <li
                  key={stage}
                  ref={(el) => {
                    stageRefs.current[i] = el;
                  }}
                  data-done="false"
                  className="group/stage flex items-center gap-3 pl-1 opacity-25"
                >
                  <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#05080f] text-transparent group-data-[done=true]/stage:border-signal group-data-[done=true]/stage:text-signal">
                    <Check className="size-2.5" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted group-data-[done=true]/stage:text-ink-soft">
                    {stage}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Frame>

        {/* Live site */}
        <div className="relative">
          <div ref={browserRef} className="opacity-0">
            <Frame tone="raised">
              <div className="flex items-center gap-3 border-b border-white/8 px-3.5 py-2.5">
                <span className="flex gap-1" aria-hidden="true">
                  <span className="size-1.5 rounded-full bg-white/18" />
                  <span className="size-1.5 rounded-full bg-white/12" />
                  <span className="size-1.5 rounded-full bg-white/12" />
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1">
                  <span className="truncate font-mono text-[10px] text-faint">
                    yourdomain.com/ai-seo-automation
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <span
                    ref={statusDotRef}
                    data-live="false"
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-[var(--scene-glow)] shadow-[0_0_8px_var(--scene-glow)] data-[live=true]:bg-signal data-[live=true]:shadow-[0_0_10px_var(--color-signal)]"
                  />
                  <span
                    ref={statusRef}
                    data-live="false"
                    className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted data-[live=true]:text-signal"
                  >
                    Preparing...
                  </span>
                </span>
              </div>

              <div className="space-y-3 px-5 py-5 sm:px-8 sm:py-7">
                <span
                  ref={(el) => {
                    contentRefs.current[0] = el;
                  }}
                  className="block opacity-0"
                >
                  <span className="block font-display text-base font-semibold tracking-[-0.03em] text-ink sm:text-lg">
                    How to Automate SEO With an AI Agent
                  </span>
                </span>
                <span
                  ref={(el) => {
                    contentRefs.current[1] = el;
                  }}
                  className="block space-y-1.5 opacity-0"
                >
                  <SkeletonLine width="96%" />
                  <SkeletonLine width="88%" />
                  <SkeletonLine width="72%" />
                </span>
                <span
                  ref={(el) => {
                    contentRefs.current[2] = el;
                  }}
                  className="block space-y-1.5 opacity-0"
                >
                  <SkeletonLine width="40%" tone="bright" />
                  <SkeletonLine width="92%" />
                  <SkeletonLine width="80%" />
                  <SkeletonLine width="60%" tone="accent" />
                </span>
                <span
                  ref={(el) => {
                    contentRefs.current[3] = el;
                  }}
                  className="flex flex-wrap gap-2 pt-1 opacity-0"
                >
                  {ENDPOINTS.map((endpoint, i) => (
                    <span
                      key={endpoint}
                      ref={(el) => {
                        endpointRefs.current[i] = el;
                      }}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-faint opacity-0"
                    >
                      {endpoint}
                    </span>
                  ))}
                </span>
              </div>
            </Frame>
          </div>

          <DataNote className="absolute -bottom-8 left-0">Product visualization</DataNote>
        </div>
      </div>
    </div>
  );
}
