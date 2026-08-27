'use client';

import { useRef } from 'react';
import { useSceneMotion } from '@/lib/hooks';
import { beat, clamp, lerp, mapRange, smoothstep, stagedTime, stagger } from '@/lib/animations';
import { usesTopBand } from '@/lib/scene-config';
import { DataNote, Frame, FrameBar, StatusDot } from './primitives';
import { site } from '@/lib/site';

/**
 * Scene 02 — AI DISCOVERY.
 *
 * A deliberately generic answer-engine surface: prompt, a generated answer
 * assembling word by word, and the sources it cites. It is not a copy of any
 * specific product's interface, and it is labelled as a simulation because
 * inclusion in AI answers can never be guaranteed.
 */

const PROMPT = 'How can a company automate SEO?';

const ANSWER =
  'Most teams automate the repeatable layer first: query research, intent classification, content structure and internal linking. An AI agent can run that loop continuously, then keep improving pages as search and answer engines change.';

const SOURCES = [
  { name: site.name, path: site.domain, owned: true },
  { name: 'Search operations guide', path: 'industry-guide.com', owned: false },
  { name: 'Content automation study', path: 'research-notes.org', owned: false },
];

const STATES = ['Reading sources', 'Structuring answer', 'Citing sources'];

export default function AIAnswerInterface({ sceneIndex = 2 }) {
  const wordRefs = useRef([]);
  const sourceRefs = useRef([]);
  const stateRefs = useRef([]);
  const cursorRef = useRef(null);
  const promptRef = useRef(null);
  const words = ANSWER.split(' ');

  const root = useSceneMotion(sceneIndex, (el, raw, state) => {
    const t = stagedTime(raw, state.stacked || usesTopBand(sceneIndex));
    const visible = beat(t, 0.02, 0.24, 0.34, 0.46);
    el.style.opacity = visible.toFixed(3);
    el.style.visibility = visible < 0.01 ? 'hidden' : 'visible';

    const enter = smoothstep(0, 0.32, t);
    const exit = smoothstep(0.34, 0.48, t);
    const tilt = state.stacked ? 5 : 13;
    el.style.transform = `perspective(1600px) translate3d(0, ${(1 - enter) * 46 - exit * 54}px, ${lerp(-280, 0, enter) + exit * 220}px) rotateY(${lerp(-tilt, 0, enter) + exit * tilt}deg)`;

    if (promptRef.current) {
      promptRef.current.style.opacity = smoothstep(0.03, 0.14, t).toFixed(3);
    }

    /* --- the answer assembles ----------------------------------- */
    const generation = mapRange(t, 0.14, 0.4, 0, words.length);
    for (let i = 0; i < wordRefs.current.length; i += 1) {
      const word = wordRefs.current[i];
      if (!word) continue;
      const local = clamp(generation - i);
      word.style.opacity = local.toFixed(3);
      word.style.transform = `translateY(${((1 - local) * 6).toFixed(2)}px)`;
      word.style.filter = local < 1 ? `blur(${((1 - local) * 3).toFixed(2)}px)` : 'none';
    }

    if (cursorRef.current) {
      const done = smoothstep(0.38, 0.43, t);
      cursorRef.current.style.opacity = (smoothstep(0.12, 0.17, t) * (1 - done)).toFixed(3);
    }

    /* --- generation states --------------------------------------- */
    stateRefs.current.forEach((node, i) => {
      if (!node) return;
      const start = 0.08 + i * 0.09;
      const active = smoothstep(start, start + 0.05, t);
      const complete = smoothstep(start + 0.09, start + 0.13, t);
      node.style.opacity = (0.28 + active * 0.72).toFixed(3);
      node.dataset.state = complete > 0.5 ? 'done' : active > 0.5 ? 'active' : 'idle';
    });

    /* --- sources ------------------------------------------------- */
    sourceRefs.current.forEach((node, i) => {
      if (!node) return;
      const appear = stagger(t, i, SOURCES.length, 0.38, 0.54);
      node.style.opacity = appear.toFixed(3);
      node.style.transform = `translate3d(0, ${((1 - appear) * 14).toFixed(2)}px, 0)`;
    });
  });

  return (
    <div
      ref={root}
      className="pointer-events-none absolute inset-0 flex items-start justify-center lg:items-center opacity-0 lg:justify-start lg:pl-[3vw]"
    >
      <div className="w-[min(94vw,560px)] lg:w-[min(44vw,580px)]">
        <Frame tone="raised">
          <FrameBar title="AI answer" right={<DataNote short="Simulation">AI visibility simulation</DataNote>} />

          <div ref={promptRef} className="border-b border-white/8 px-4 py-3.5 opacity-0">
            <p className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink sm:text-sm">
              <span
                aria-hidden="true"
                className="mt-1 size-1.5 shrink-0 rounded-full bg-[var(--scene-glow)]"
              />
              {PROMPT}
            </p>
          </div>

          {/* Generation states */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-b border-white/8 px-4 py-2.5">
            {STATES.map((state, i) => (
              <span
                key={state}
                ref={(el) => {
                  stateRefs.current[i] = el;
                }}
                data-state="idle"
                className="group/state flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted opacity-30"
              >
                <StatusDot tone="active" />
                {state}
              </span>
            ))}
          </div>

          {/* Generated answer */}
          <div className="px-4 py-4">
            <p className="text-[13px] leading-[1.75] text-ink-soft sm:text-[13.5px]">
              {words.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  className="inline-block whitespace-pre opacity-0"
                >
                  {word}{' '}
                </span>
              ))}
              <span
                ref={cursorRef}
                aria-hidden="true"
                className="anim-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-[var(--scene-glow)] opacity-0"
              />
            </p>
          </div>

          {/* Sources */}
          <div className="border-t border-white/8 px-4 py-3">
            <p className="t-micro mb-2.5 text-[9px] text-faint">Sources</p>
            <div className="grid gap-1.5 sm:grid-cols-3">
              {SOURCES.map((source, i) => (
                <span
                  key={source.path}
                  ref={(el) => {
                    sourceRefs.current[i] = el;
                  }}
                  className={`flex min-w-0 flex-col gap-1 rounded-lg border px-2.5 py-2 opacity-0 ${
                    source.owned
                      ? 'border-[color-mix(in_srgb,var(--scene-glow)_40%,transparent)] bg-[color-mix(in_srgb,var(--scene-accent)_10%,transparent)]'
                      : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  <span
                    className={`truncate text-[11px] font-medium ${
                      source.owned ? 'text-[var(--scene-glow)]' : 'text-ink-soft'
                    }`}
                  >
                    {source.name}
                  </span>
                  <span className="truncate font-mono text-[9px] text-faint">{source.path}</span>
                </span>
              ))}
            </div>
          </div>
        </Frame>
      </div>
    </div>
  );
}
