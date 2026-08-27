'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useMotionFrame } from '@/lib/hooks';
import { clamp, lerp, smoothstep } from '@/lib/animations';
import { useExperience } from './ScrollController';

/**
 * WebGL is loaded after the page is interactive, never before. Until it
 * arrives — and permanently for reduced-motion visitors — a CSS-only core
 * stands in, so the hero is complete without a single shader compiling.
 */
const SceneCanvas = dynamic(() => import('./SceneCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function CanvasLayer() {
  const { quality, reducedMotion } = useExperience();
  const [enabled, setEnabled] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return undefined;
    // Give the browser a beat to paint and settle the hero first.
    const idle =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(() => setEnabled(true), { timeout: 1200 })
        : window.setTimeout(() => setEnabled(true), 400);
    return () => {
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, [reducedMotion]);

  useMotionFrame((state) => {
    const el = wrapRef.current;
    if (!el) return;
    if (state.reducedMotion) {
      el.style.opacity = '';
      return;
    }
    const t = state.rangeIndex + clamp(state.blend);
    // The core dissolves as it resolves into the brand mark.
    const handover = smoothstep(8.2, 8.6, t);
    el.style.opacity = lerp(1, 0.08, handover).toFixed(3);
  });

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {/* Static core — the first thing painted, and the reduced-motion visual */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: enabled ? 0 : 1, transition: 'opacity 900ms ease' }}
      >
        <span
          className="block size-[min(52vw,420px)] rounded-full lg:translate-x-[18%]"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--scene-glow) 85%, transparent) 0%, color-mix(in srgb, var(--scene-accent) 42%, transparent) 26%, transparent 62%)',
            filter: 'blur(6px)',
          }}
        />
        <span
          className="absolute block size-[min(52vw,420px)] rounded-full border border-white/10 lg:translate-x-[18%]"
          style={{ transform: 'rotate(-28deg) scaleY(0.35)' }}
        />
      </div>

      {enabled ? <SceneCanvas quality={quality} reducedMotion={reducedMotion} /> : null}
    </div>
  );
}
