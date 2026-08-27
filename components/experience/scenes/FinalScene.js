'use client';

import { useRef } from 'react';
import { site } from '@/lib/site';
import { useSceneMotion } from '@/lib/hooks';
import { beat, lerp, smoothstep, stagedTime } from '@/lib/animations';
import { usesTopBand } from '@/lib/scene-config';
import Button from '@/components/ui/Button';
import { LogoMark } from '@/components/ui/Logo';
import SceneSection from './SceneSection';

/**
 * Scene 08 — the resolution.
 *
 * Everything the agent built collapses back into the core, the core resolves
 * into the GetGeoAgent mark, and the story lands on a single decision.
 */
export default function FinalScene() {
  const markRef = useRef(null);
  const lineOneRef = useRef(null);
  const lineTwoRef = useRef(null);
  const ctaRef = useRef(null);
  const eyebrowRef = useRef(null);

  const rootRef = useSceneMotion(8, (el, raw, state) => {
    const t = stagedTime(raw, state.stacked || usesTopBand(8));
    if (markRef.current) {
      // The mark forms as the core dissolves, then holds as a watermark.
      const show =
        smoothstep(0.24, 0.46, t) *
        (1 - smoothstep(0.5, 0.72, t) * 0.78) *
        (1 - smoothstep(0.94, 1, t));
      markRef.current.style.opacity = show.toFixed(3);
      markRef.current.style.visibility = show < 0.01 ? 'hidden' : 'visible';
      markRef.current.style.transform = `scale(${lerp(0.4, 1, smoothstep(0.24, 0.5, t))}) rotate(${lerp(-40, 0, smoothstep(0.24, 0.56, t)).toFixed(2)}deg)`;
    }

    if (eyebrowRef.current) {
      const show = smoothstep(0.46, 0.58, t);
      eyebrowRef.current.style.opacity = show.toFixed(3);
    }

    if (lineOneRef.current) {
      const show = beat(t, 0.5, 0.6, 0.68, 0.73);
      lineOneRef.current.style.opacity = show.toFixed(3);
      lineOneRef.current.style.visibility = show < 0.01 ? 'hidden' : 'visible';
      lineOneRef.current.style.transform = `translate3d(0, ${((1 - show) * 22).toFixed(1)}px, 0)`;
      lineOneRef.current.style.filter = show < 0.999 ? `blur(${((1 - show) * 6).toFixed(2)}px)` : 'none';
    }

    if (lineTwoRef.current) {
      const show = smoothstep(0.76, 0.86, t);
      lineTwoRef.current.style.opacity = show.toFixed(3);
      lineTwoRef.current.style.visibility = show < 0.01 ? 'hidden' : 'visible';
      lineTwoRef.current.style.transform = `translate3d(0, ${((1 - show) * 22).toFixed(1)}px, 0)`;
      lineTwoRef.current.style.filter = show < 0.999 ? `blur(${((1 - show) * 6).toFixed(2)}px)` : 'none';
    }

    if (ctaRef.current) {
      const show = smoothstep(0.84, 0.95, t);
      ctaRef.current.style.opacity = show.toFixed(3);
      ctaRef.current.style.visibility = show < 0.01 ? 'hidden' : 'visible';
      ctaRef.current.style.transform = `translate3d(0, ${((1 - show) * 20).toFixed(1)}px, 0)`;
    }
  });

  return (
    <SceneSection id="final">
      <div ref={rootRef} className="relative flex flex-col items-center text-center">
        <span
          ref={markRef}
          aria-hidden="true"
          className="reduced-hide pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
        >
          <LogoMark className="size-[min(46vw,260px)]" />
        </span>

        <p ref={eyebrowRef} className="t-eyebrow opacity-0 motion-reduce:opacity-100">
          GetGeoAgent
        </p>

        <h2 id="final-heading" className="relative mt-6 w-full">
          <span
            ref={lineOneRef}
            className="t-cinema block text-balance text-ink opacity-0 motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0 motion-reduce:opacity-100"
          >
            Your next customer is searching.
          </span>
          <span
            ref={lineTwoRef}
            className="t-cinema block text-balance opacity-0 motion-reduce:mt-4 motion-reduce:opacity-100"
          >
            <span className="t-gradient">Make sure they find you.</span>
          </span>
        </h2>

        <div ref={ctaRef} className="mt-10 opacity-0 motion-reduce:opacity-100">
          <p className="t-body mx-auto max-w-lg text-balance">
            Build visibility across traditional search and the new generation of AI-powered
            discovery.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button href={site.app.signup} size="lg" withArrow>
              Start with GetGeoAgent
            </Button>
            <Button href={site.app.login} variant="secondary" size="lg" magnetic={false}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </SceneSection>
  );
}
