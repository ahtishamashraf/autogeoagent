'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { scenes } from '@/lib/scene-config';
import { clamp, smoothstep } from '@/lib/animations';

const accents = scenes.map((scene) => new THREE.Color(scene.theme.accent));
const glows = scenes.map((scene) => new THREE.Color(scene.theme.glow));
const LAST = scenes.length - 1;

/**
 * Returns mutable THREE.Color instances that track the scroll position.
 * Call `update(state)` inside useFrame — no allocations, no React renders.
 */
export function useSceneTheme() {
  return useMemo(() => {
    const accent = new THREE.Color(accents[0]);
    const glow = new THREE.Color(glows[0]);

    const update = (state) => {
      const i = Math.min(state.rangeIndex, LAST);
      const j = Math.min(i + 1, LAST);
      const t = smoothstep(0.4, 0.95, clamp(state.blend));
      accent.copy(accents[i]).lerp(accents[j], t);
      glow.copy(glows[i]).lerp(glows[j], t);
    };

    return { accent, glow, update };
  }, []);
}

/**
 * Continuous formation value 0..8 for the particle field.
 * Holds on the current shape while a scene's copy is on screen, then morphs
 * across the transition — so any scroll position between two scenes shows a
 * proportionally transformed field.
 */
export const formValue = (state) =>
  Math.min(state.rangeIndex + smoothstep(0.5, 0.96, clamp(state.blend)), LAST);
