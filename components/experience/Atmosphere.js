'use client';

import { useRef } from 'react';
import { useMotionFrame } from '@/lib/hooks';
import { clamp, lerp, smoothstep } from '@/lib/animations';

/**
 * The environment behind the agent: scene-tinted light, a receding grid,
 * film grain and a vignette. Colour comes from CSS variables that
 * ScrollController cross-fades between scenes, so the background changes
 * continuously rather than switching per section.
 */
export default function Atmosphere() {
  const glowRef = useRef(null);
  const gridRef = useRef(null);

  useMotionFrame((state) => {
    if (state.reducedMotion) return;
    const t = state.rangeIndex + clamp(state.blend);
    if (glowRef.current) {
      // The light source drifts as the camera travels through the system.
      const x = 50 + Math.sin(t * 0.7) * 16;
      const y = 44 + Math.cos(t * 0.55) * 12;
      glowRef.current.style.setProperty('--gx', `${x.toFixed(1)}%`);
      glowRef.current.style.setProperty('--gy', `${y.toFixed(1)}%`);
      glowRef.current.style.opacity = lerp(0.55, 0.95, smoothstep(0, 3, t)).toFixed(3);
    }
    if (gridRef.current) {
      const fade = 1 - smoothstep(6.6, 8.4, t);
      gridRef.current.style.opacity = (0.5 + fade * 0.5).toFixed(3);
      gridRef.current.style.transform = `translate3d(0, ${((t % 1) * -32).toFixed(1)}px, 0)`;
    }
  });

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--scene-bg)] transition-none" />

      <div
        ref={glowRef}
        className="absolute inset-0"
        style={{
          '--gx': '50%',
          '--gy': '44%',
          background:
            'radial-gradient(58% 52% at var(--gx) var(--gy), color-mix(in srgb, var(--scene-accent) 26%, transparent) 0%, transparent 68%), radial-gradient(70% 60% at 82% 90%, color-mix(in srgb, var(--scene-glow) 12%, transparent) 0%, transparent 70%)',
        }}
      />

      <div
        ref={gridRef}
        className="grid-field absolute -inset-x-10 -top-10 bottom-0 [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_62%,transparent)]"
      />

      {/* Scrims: keep scene copy legible over the agent without dimming it */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(4,6,10,0.88) 0%, rgba(4,6,10,0.42) 26%, transparent 52%), radial-gradient(120% 78% at 50% 50%, transparent 34%, rgba(3,5,9,0.72) 100%)',
        }}
      />

      <div className="noise absolute inset-0" />
    </div>
  );
}
