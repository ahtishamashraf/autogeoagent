'use client';

import { useRef } from 'react';
import { stageById } from '@/content/story';
import { useSceneMotion } from '@/lib/hooks';
import { beat, clamp, lerp, smoothstep, stagedTime } from '@/lib/animations';
import SceneSection from './SceneSection';
import SceneCopy from './SceneCopy';

/**
 * Scene 02 — AI DISCOVERY, and the pivot of the whole story.
 *
 * The GEO explanation resolves into the SEO / GEO split, then into three
 * successive statements of the argument. All three phrases are real text in a
 * single heading, so the sequence is readable without JavaScript.
 */

const stage = stageById.geo;

const PHRASES = [
  { text: 'Search Has Changed.', in: [0.62, 0.68], out: [0.72, 0.76] },
  { text: 'Your Strategy Should Too.', in: [0.74, 0.8], out: [0.84, 0.88] },
];

export default function GEOScene() {
  const splitRef = useRef(null);
  const seoSideRef = useRef(null);
  const geoSideRef = useRef(null);
  const phraseRefs = useRef([]);
  const finaleRef = useRef(null);
  const linkRef = useRef(null);

  const stageRef = useSceneMotion(2, (el, raw, state) => {
    const t = stagedTime(raw, state.stacked);
    /* --- the SEO / GEO split ------------------------------------ */
    if (splitRef.current) {
      const show = beat(t, 0.44, 0.54, 0.6, 0.66);
      splitRef.current.style.opacity = show.toFixed(3);
      splitRef.current.style.visibility = show < 0.01 ? 'hidden' : 'visible';
    }
    const spread = smoothstep(0.46, 0.6, t);
    if (seoSideRef.current) {
      seoSideRef.current.style.transform = `translate3d(${lerp(38, 0, spread).toFixed(1)}px, 0, 0)`;
    }
    if (geoSideRef.current) {
      geoSideRef.current.style.transform = `translate3d(${lerp(-38, 0, spread).toFixed(1)}px, 0, 0)`;
    }
    if (linkRef.current) {
      linkRef.current.style.setProperty('--flow', spread.toFixed(3));
    }

    /* --- the three statements ------------------------------------ */
    PHRASES.forEach((phrase, i) => {
      const node = phraseRefs.current[i];
      if (!node) return;
      const show = beat(t, phrase.in[0], phrase.in[1], phrase.out[0], phrase.out[1]);
      node.style.opacity = show.toFixed(3);
      node.style.visibility = show < 0.01 ? 'hidden' : 'visible';
      node.style.transform = `translate3d(0, ${((1 - show) * 26).toFixed(1)}px, 0) scale(${lerp(0.965, 1, show)})`;
      node.style.filter = show < 0.999 ? `blur(${((1 - show) * 6).toFixed(2)}px)` : 'none';
    });

    if (finaleRef.current) {
      const show = beat(t, 0.86, 0.91, 0.98, 1.0);
      finaleRef.current.style.opacity = show.toFixed(3);
      finaleRef.current.style.visibility = show < 0.01 ? 'hidden' : 'visible';
      finaleRef.current.style.transform = `scale(${lerp(0.9, 1, show)})`;
      finaleRef.current.style.letterSpacing = `${lerp(0.06, -0.045, clamp(show)).toFixed(4)}em`;
    }
  });

  return (
    <SceneSection id="geo">
      <div ref={stageRef} className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <SceneCopy
            sceneIndex={2}
            className="max-w-2xl lg:col-span-5 lg:col-start-8 lg:text-right"
            exit={[0.36, 0.48]}
          >
            <p className="t-eyebrow flex items-center gap-2.5 lg:justify-end">
              <span
                aria-hidden="true"
                className="inline-block h-px w-6 bg-[var(--scene-glow)] shadow-[0_0_8px_var(--scene-glow)]"
              />
              {stage.kicker}
            </p>
            <h2 id="geo-heading" className="t-h2 mt-5 text-ink">
              {stage.heading}
            </h2>
            <p className="t-lead mt-5 max-w-xl lg:ml-auto lg:mt-6">{stage.body}</p>
          </SceneCopy>
        </div>

        {/* SEO + GEO */}
        <div
          ref={splitRef}
          className="pointer-events-none opacity-0 motion-safe:fixed motion-safe:inset-x-0 motion-safe:top-1/2 motion-safe:-translate-y-1/2 motion-reduce:opacity-100"
        >
          <div className="mx-auto grid max-w-4xl grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-10">
            <div ref={seoSideRef} className="text-right">
              <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
                SEO
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-muted sm:text-xs">
                Search Engine Optimization
              </p>
            </div>

            <div ref={linkRef} className="relative flex h-16 w-16 items-center justify-center sm:h-24 sm:w-24">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-white/12"
                style={{ transform: 'scale(calc(0.6 + var(--flow, 0) * 0.4))' }}
              />
              <span
                aria-hidden="true"
                className="absolute h-px w-full"
                style={{
                  background:
                    'linear-gradient(to right, transparent, color-mix(in srgb, var(--scene-glow) calc(var(--flow, 0) * 90%), transparent), transparent)',
                }}
              />
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-[var(--scene-glow)] shadow-[0_0_16px_var(--scene-glow)]"
              />
            </div>

            <div ref={geoSideRef}>
              <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
                GEO
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-muted sm:text-xs">
                Generative Engine Optimization
              </p>
            </div>
          </div>
        </div>

        {/* The argument, stated three times */}
        <h3
          id="geo-shift-heading"
          className="pointer-events-none mt-12 text-center motion-safe:fixed motion-safe:inset-x-0 motion-safe:top-1/2 motion-safe:mt-0 motion-safe:-translate-y-1/2"
        >
          {PHRASES.map((phrase, i) => (
            <span
              key={phrase.text}
              ref={(el) => {
                phraseRefs.current[i] = el;
              }}
              className="t-cinema block text-balance px-5 text-ink opacity-0 motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-1/2 motion-safe:-translate-y-1/2 motion-reduce:mt-6 motion-reduce:opacity-100"
            >
              {phrase.text}
            </span>
          ))}

          <span ref={finaleRef} className="block px-5 opacity-0 motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-1/2 motion-safe:-translate-y-1/2 motion-reduce:mt-8 motion-reduce:opacity-100">
            <span className="t-cinema block t-gradient">SEO + GEO</span>
            <span className="mx-auto mt-8 block max-w-xl text-sm font-medium text-ink-soft [text-shadow:0_2px_30px_rgba(3,5,9,0.95)] sm:text-base">
              One platform for traditional and generative search visibility.
            </span>
          </span>
        </h3>
      </div>
    </SceneSection>
  );
}
