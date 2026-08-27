'use client';

import { useRef } from 'react';
import { stageById } from '@/content/story';
import { useSceneMotion } from '@/lib/hooks';
import { beat, lerp, smoothstep, stagedTime } from '@/lib/animations';
import SceneSection from './SceneSection';
import SceneCopy from './SceneCopy';

/**
 * Scene 07 — CONTINUOUS OPTIMIZATION.
 *
 * The loop closes and the product is restated one word at a time, inside the
 * orbit, before the whole sentence resolves.
 */

const stage = stageById.improve;

const WORDS = [
  { text: 'Research.', in: [0.4, 0.45], out: [0.49, 0.53] },
  { text: 'Create.', in: [0.5, 0.55], out: [0.59, 0.63] },
  { text: 'Rank.', in: [0.6, 0.65], out: [0.69, 0.73] },
  { text: 'Improve.', in: [0.7, 0.75], out: [0.78, 0.82] },
  { text: 'Repeat.', in: [0.79, 0.84], out: [0.86, 0.89] },
];

export default function ImproveScene() {
  const wordRefs = useRef([]);
  const fullRef = useRef(null);

  const rootRef = useSceneMotion(7, (el, raw, state) => {
    const t = stagedTime(raw, state.stacked);
    WORDS.forEach((word, i) => {
      const node = wordRefs.current[i];
      if (!node) return;
      const show = beat(t, word.in[0], word.in[1], word.out[0], word.out[1]);
      node.style.opacity = show.toFixed(3);
      node.style.visibility = show < 0.01 ? 'hidden' : 'visible';
      node.style.transform = `translate3d(0, ${((1 - show) * 18).toFixed(1)}px, 0) scale(${lerp(0.94, 1, show)})`;
      node.style.filter = show < 0.999 ? `blur(${((1 - show) * 5).toFixed(2)}px)` : 'none';
    });

    if (fullRef.current) {
      const show = beat(t, 0.88, 0.93, 0.985, 1.0);
      fullRef.current.style.opacity = show.toFixed(3);
      fullRef.current.style.visibility = show < 0.01 ? 'hidden' : 'visible';
      fullRef.current.style.transform = `translate3d(0, ${((1 - show) * 16).toFixed(1)}px, 0)`;
    }
  });

  return (
    <SceneSection id="improve" align="top">
      <div ref={rootRef} className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <SceneCopy
            sceneIndex={7}
            className="max-w-2xl lg:col-span-6 lg:col-start-4 lg:text-center"
            exit={[0.3, 0.44]}
          >
            <p className="t-eyebrow flex items-center gap-2.5 lg:justify-center">
              <span
                aria-hidden="true"
                className="inline-block h-px w-6 bg-[var(--scene-glow)] shadow-[0_0_8px_var(--scene-glow)]"
              />
              {stage.kicker}
            </p>
            <h2 id="improve-heading" className="t-h2 mt-5 text-ink">
              {stage.heading}
            </h2>
            <p className="t-lead mx-auto mt-5 max-w-xl lg:mt-6">{stage.body}</p>
          </SceneCopy>
        </div>

        <h3 className="pointer-events-none mt-12 text-center motion-safe:fixed motion-safe:inset-x-0 motion-safe:top-[34svh] motion-safe:mt-0 lg:motion-safe:top-[40svh]">
          {WORDS.map((word, i) => (
            <span
              key={word.text}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className="reduced-hide absolute inset-x-0 top-0 block font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] text-ink opacity-0"
            >
              {word.text}
            </span>
          ))}

          <span
            ref={fullRef}
            className="block px-5 font-display text-[clamp(1.5rem,3.4vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.04em] opacity-0 motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0 motion-reduce:opacity-100"
          >
            <span className="t-gradient">Research. Create. Rank. Improve. Repeat.</span>
          </span>
        </h3>
      </div>
    </SceneSection>
  );
}
