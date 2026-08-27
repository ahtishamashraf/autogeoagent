'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { experienceState } from '@/lib/experience-store';
import { clamp, lerp, smoothstep } from '@/lib/animations';
import { formValue, useSceneTheme } from './useSceneTheme';
import { particleFragment, particleVertex } from './shaders';

/**
 * ParticleField — the data itself.
 *
 * A single Points object whose particles continuously morph between nine
 * formations: halo, ranked results, neural lattice, topic graph, document
 * lines, publishing stream, performance surface, improvement loop and the
 * final collapse into the core. Nothing here is decorative snow: each shape
 * is the scene's data.
 */

const COUNTS = { 3: 7000, 2: 3800, 1: 1600, 0: 900 };

export default function ParticleField({ quality = 3 }) {
  const points = useRef(null);
  const theme = useSceneTheme();
  const count = COUNTS[quality] ?? COUNTS[2];

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const indices = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      seeds[i] = (i + 1) / count + Math.sin(i * 12.9898) * 0.001;
      indices[i] = i;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute('aIndex', new THREE.BufferAttribute(indices, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
    return geo;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uForm: { value: 0 },
      uSize: { value: quality >= 3 ? 2.15 : 1.85 },
      uSpread: { value: 1 },
      uCollapse: { value: 0 },
      uOpacity: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uAccent: { value: new THREE.Color('#3d7dfb') },
      uGlow: { value: new THREE.Color('#7ec8ff') },
    }),
    [quality],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    const state = experienceState;
    theme.update(state);
    const t = state.rangeIndex + clamp(state.blend);

    uniforms.uTime.value = performance.now() / 1000;
    uniforms.uForm.value = formValue(state);
    uniforms.uAccent.value.copy(theme.accent);
    uniforms.uGlow.value.copy(theme.glow);

    // Fade in with the intro, stay present, collapse into the core at the end.
    const intro = smoothstep(0.15, 0.95, state.intro);
    const collapse = smoothstep(8.25, 8.85, t);
    uniforms.uOpacity.value = lerp(0, 1, intro) * lerp(1, 0.15, collapse);
    uniforms.uCollapse.value = collapse * 0.92;
    uniforms.uSpread.value = lerp(1.35, 1, smoothstep(0, 1.2, t));
    uniforms.uPointer.value.set(state.pointerX, state.pointerY);
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false} renderOrder={0}>
      <shaderMaterial
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
