'use client';

import { useRef } from 'react';
import { navScenes } from '@/lib/scene-config';
import { clamp, smoothstep } from '@/lib/animations';
import { useMotionFrame, useSceneIndex } from '@/lib/hooks';
import { cn } from '@/lib/cn';
import { useExperience } from './ScrollController';

const FIRST = navScenes[0].index;
const LAST = navScenes[navScenes.length - 1].index;

/**
 * The scene navigator.
 *
 * Position is read from the same scroll state that drives the visuals, so the
 * navigator can never fall out of sync. Clicking an entry scrolls to that
 * scene; scrolling manually updates the active entry.
 */
export default function SceneNavigation() {
  const active = useSceneIndex();
  const { scrollToScene } = useExperience();
  const railRef = useRef(null);
  const rootRef = useRef(null);

  useMotionFrame((state) => {
    const root = rootRef.current;
    if (!root) return;
    const t = state.rangeIndex + clamp(state.blend);
    // Appears as the hero hands over, leaves before the closing sequence.
    const show =
      smoothstep(0.55, 1.05, t) * (1 - smoothstep(7.75, 8.25, t)) * (1 - state.statement);
    root.style.opacity = show.toFixed(3);
    root.style.visibility = show < 0.01 ? 'hidden' : 'visible';
    root.style.transform = `translate3d(${((1 - show) * -20).toFixed(1)}px, -50%, 0)`;

    if (railRef.current) {
      const span = LAST + 1 - FIRST;
      const progress = clamp((t - FIRST) / span);
      railRef.current.style.transform = `scaleY(${progress.toFixed(4)})`;
    }
  });

  return (
    <nav
      ref={rootRef}
      aria-label="Story scenes"
      className="reduced-hide pointer-events-none fixed left-6 top-1/2 z-30 hidden opacity-0 xl:block"
    >
      <ol className="relative flex flex-col gap-6 pl-6">
        <span
          aria-hidden="true"
          className="absolute left-[3px] top-1 h-[calc(100%-8px)] w-px bg-white/12"
        />
        <span
          ref={railRef}
          aria-hidden="true"
          className="absolute left-[3px] top-1 h-[calc(100%-8px)] w-px origin-top scale-y-0 bg-[var(--scene-glow)] shadow-[0_0_10px_var(--scene-glow)]"
        />

        {navScenes.map((scene) => {
          const isActive = active === scene.index;
          return (
            <li key={scene.id} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  'absolute -left-6 top-[7px] size-[7px] rounded-full border transition-all duration-500',
                  isActive
                    ? 'scale-125 border-[var(--scene-glow)] bg-[var(--scene-glow)] shadow-[0_0_12px_var(--scene-glow)]'
                    : 'border-white/25 bg-void',
                )}
              />
              <button
                type="button"
                onClick={() => scrollToScene(scene.index)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'pointer-events-auto group flex flex-col items-start gap-0.5 text-left transition-opacity duration-500',
                  isActive ? 'opacity-100' : 'opacity-35 hover:opacity-70',
                )}
              >
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-faint">
                    {scene.nav}
                  </span>
                  <span
                    className={cn(
                      'font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-500',
                      isActive ? 'text-[var(--scene-glow)]' : 'text-muted',
                    )}
                  >
                    {scene.label}
                  </span>
                </span>
                <span
                  className={cn(
                    'font-display text-[13px] font-medium tracking-[-0.02em] transition-colors duration-500',
                    isActive ? 'text-ink' : 'text-muted',
                  )}
                >
                  {scene.sub}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="sr-only">
        Use these controls to jump between the scenes of the GetGeoAgent story. Every scene is also
        available as a normal section further down the page.
      </p>
    </nav>
  );
}
