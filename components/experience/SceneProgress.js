'use client';

import { useRef } from 'react';
import { navScenes } from '@/lib/scene-config';
import { clamp, smoothstep } from '@/lib/animations';
import { useMotionFrame, useSceneIndex } from '@/lib/hooks';

const FIRST = navScenes[0].index;
const LAST = navScenes[navScenes.length - 1].index;
const byIndex = navScenes.reduce((acc, scene) => {
  acc[scene.index] = scene;
  return acc;
}, {});

/**
 * Compact progress readout for viewports without room for the full navigator.
 */
export default function SceneProgress() {
  const active = useSceneIndex();
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const scene = byIndex[active];

  useMotionFrame((state) => {
    const root = rootRef.current;
    if (!root) return;
    const t = state.rangeIndex + clamp(state.blend);
    const show = smoothstep(0.6, 1.05, t) * (1 - smoothstep(7.7, 8.2, t));
    root.style.opacity = show.toFixed(3);
    root.style.visibility = show < 0.01 ? 'hidden' : 'visible';

    if (barRef.current) {
      const progress = clamp((t - FIRST) / (LAST + 1 - FIRST));
      barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    }
  });

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="reduced-hide pointer-events-none fixed inset-x-0 bottom-0 z-30 opacity-0 xl:hidden"
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center gap-3 px-5 pb-4 sm:px-8">
        <span className="flex items-baseline gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 backdrop-blur-md">
          <span className="font-mono text-[9px] tracking-[0.16em] text-faint">
            {scene?.nav ?? '01'}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--scene-glow)]">
            {scene?.sub ?? 'SEO'}
          </span>
        </span>
        <span className="h-px flex-1 overflow-hidden rounded-full bg-white/12">
          <span
            ref={barRef}
            className="block h-full w-full origin-left scale-x-0 bg-[var(--scene-glow)]"
          />
        </span>
      </div>
    </div>
  );
}
