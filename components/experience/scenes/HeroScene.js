'use client';

import { useRef } from 'react';
import { site } from '@/lib/site';
import { clamp, smoothstep } from '@/lib/animations';
import { useSceneMotion } from '@/lib/hooks';
import Button from '@/components/ui/Button';
import { ArrowDown } from '@/components/ui/Icons';
import SceneSection from './SceneSection';
import { useExperience } from '../ScrollController';

/**
 * Scene 00 — the hero.
 *
 * The load-in is a CSS animation with `fill-mode: backwards`, so it starts on
 * first paint without waiting for JavaScript and hands the element back to the
 * scroll layer the moment it finishes. There is no loading screen, and the
 * headline never depends on the canvas.
 *
 * Scrolling then lifts the headline away and sinks the CTAs while the camera
 * moves in: the transition reads as entering the agent.
 */
export default function HeroScene() {
  const { scrollToScene } = useExperience();
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const secondaryRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const indicatorRef = useRef(null);

  const rootRef = useSceneMotion(0, (el, t) => {
    const p = clamp(t);

    const exitTo = (node, start, end, y, blurOut) => {
      if (!node) return;
      const exit = smoothstep(start, end, p);
      node.style.opacity = (1 - exit).toFixed(3);
      node.style.transform = `translate3d(0, ${(exit * y).toFixed(1)}px, 0)`;
      node.style.filter = exit > 0.01 ? `blur(${(exit * blurOut).toFixed(2)}px)` : 'none';
    };

    exitTo(eyebrowRef.current, 0.1, 0.55, -70, 6);
    exitTo(headlineRef.current, 0.12, 0.72, -96, 8);
    exitTo(secondaryRef.current, 0.1, 0.62, -76, 7);
    exitTo(descriptionRef.current, 0.08, 0.5, -58, 6);
    exitTo(ctaRef.current, 0.04, 0.4, 62, 4);
    exitTo(indicatorRef.current, 0.02, 0.2, 34, 3);
  });

  return (
    <SceneSection id="intro">
      <div ref={rootRef} className="relative">
        <div className="max-w-[42rem] lg:max-w-[38rem]">
          <p ref={eyebrowRef} className="t-eyebrow rise flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block size-1.5 rounded-full bg-[var(--scene-glow)] shadow-[0_0_10px_var(--scene-glow)]"
            />
            AI SEO + GEO Agent
          </p>

          <h1
            ref={headlineRef}
            id="intro-heading"
            className="t-display rise rise-1 mt-6 text-balance text-ink"
          >
            Your AI Agent for
            <span className="block t-gradient">SEO &amp; GEO</span>
          </h1>

          <p
            ref={secondaryRef}
            className="rise rise-2 mt-6 font-display text-lg font-medium tracking-[-0.02em] text-ink-soft sm:text-xl lg:text-2xl"
          >
            Rank in Search. Get Discovered by AI.
          </p>

          <p ref={descriptionRef} className="t-body rise rise-3 mt-5 max-w-xl">
            GetGeoAgent researches opportunities, creates optimized content and continuously
            improves your visibility across search engines and AI discovery.
          </p>

          <div ref={ctaRef} className="rise rise-4 mt-9 flex flex-wrap items-center gap-3">
            <Button href={site.app.signup} size="lg" withArrow>
              Start Growing
            </Button>
            <Button variant="secondary" size="lg" magnetic={false} onClick={() => scrollToScene(1)}>
              See How It Works
            </Button>
          </div>
        </div>

        <div
          ref={indicatorRef}
          className="rise rise-5 pointer-events-none absolute -bottom-[16svh] left-0 hidden items-center gap-3 lg:flex"
        >
          <span className="relative flex size-8 items-center justify-center rounded-full border border-white/15">
            <span
              aria-hidden="true"
              className="anim-ring absolute inset-0 rounded-full border border-[var(--scene-glow)]"
            />
            <ArrowDown className="size-3.5 text-[var(--scene-glow)]" />
          </span>
          <span className="t-micro text-faint">Scroll to enter the agent</span>
        </div>
      </div>
    </SceneSection>
  );
}
