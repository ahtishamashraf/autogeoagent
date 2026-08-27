'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { experienceState } from '@/lib/experience-store';
import { clamp, damp, lerp, smoothstep } from '@/lib/animations';
import { useSceneTheme } from './useSceneTheme';
import {
  glowFragment,
  glowVertex,
  ringFragment,
  ringVertex,
  shellFragment,
  shellVertex,
} from './shaders';

/**
 * AgentCore — the single object that carries the whole story.
 *
 * It is never replaced between scenes. It grows, opens, turns neural, routes
 * data through itself and finally aligns into the brand mark, always driven by
 * scroll position alone.
 */

const RING_CONFIG = [
  { radius: 1.62, tilt: [1.42, 0, 0.28], speed: 0.32, pulses: 3, thickness: 0.009 },
  { radius: 2.1, tilt: [1.05, 0.5, -0.35], speed: -0.24, pulses: 2, thickness: 0.007 },
  { radius: 2.68, tilt: [1.62, -0.4, 0.62], speed: 0.16, pulses: 4, thickness: 0.0055 },
];

export default function AgentCore({ quality = 3 }) {
  const group = useRef(null);
  const shellRef = useRef(null);
  const innerRef = useRef(null);
  const glowRef = useRef(null);
  const latticeRef = useRef(null);
  const ringRefs = useRef([]);
  const ringGroups = useRef([]);
  const theme = useSceneTheme();
  const tilt = useRef({ x: 0, y: 0 });

  const white = useMemo(() => new THREE.Color('#ffffff'), []);
  const detail = quality >= 3 ? 4 : quality >= 2 ? 3 : 2;
  const ringSegments = quality >= 3 ? 180 : quality >= 2 ? 120 : 72;

  const shellUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uEnergy: { value: 0.4 },
      uDeform: { value: 1 },
      uNeural: { value: 0 },
      uAccent: { value: new THREE.Color('#3d7dfb') },
      uGlow: { value: new THREE.Color('#7ec8ff') },
    }),
    [],
  );

  const glowUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#7ec8ff') },
      uIntensity: { value: 0.9 },
    }),
    [],
  );

  const ringUniforms = useMemo(
    () =>
      RING_CONFIG.map((ring) => ({
        uColor: { value: new THREE.Color('#7ec8ff') },
        uTime: { value: 0 },
        uOpacity: { value: 0.5 },
        uSpeed: { value: ring.speed },
        uPulses: { value: ring.pulses },
      })),
    [],
  );

  const geometries = useMemo(() => {
    const shell = new THREE.IcosahedronGeometry(1.1, detail);
    const lattice = new THREE.IcosahedronGeometry(0.82, 1);
    const inner = new THREE.IcosahedronGeometry(0.22, detail);
    const glow = new THREE.PlaneGeometry(4.2, 4.2);
    const rings = RING_CONFIG.map(
      (ring) => new THREE.TorusGeometry(ring.radius, ring.thickness, 3, ringSegments),
    );
    return { shell, lattice, inner, glow, rings };
  }, [detail, ringSegments]);

  useEffect(
    () => () => {
      geometries.shell.dispose();
      geometries.lattice.dispose();
      geometries.inner.dispose();
      geometries.glow.dispose();
      geometries.rings.forEach((ring) => ring.dispose());
    },
    [geometries],
  );

  useFrame((_, delta) => {
    const state = experienceState;
    const dt = Math.min(delta, 0.05);
    theme.update(state);

    const t = state.rangeIndex + clamp(state.blend);
    const time = performance.now() / 1000;

    /* ---- overall presence -------------------------------------- */
    // Intro: the core emerges. Story: it grows as the camera enters.
    const intro = smoothstep(0.05, 0.75, state.intro);
    const growth = lerp(0.8, 1.02, smoothstep(0, 3, t));
    const finale = smoothstep(7.4, 8.6, t);
    const scale = growth * lerp(1, 1.34, finale) * lerp(0.55, 1, intro);

    if (group.current) {
      group.current.scale.setScalar(scale);

      // Slow, deliberate rotation. Faster while the agent is processing.
      const processing = smoothstep(2.6, 3.4, t) * (1 - smoothstep(7.6, 8.4, t));
      group.current.rotation.y += dt * (0.055 + processing * 0.16);

      // A few degrees of cursor tilt — never a cursor-follow.
      tilt.current.x = damp(tilt.current.x, -state.pointerY * 0.09, 3, dt);
      tilt.current.y = damp(tilt.current.y, state.pointerX * 0.11, 3, dt);
      group.current.rotation.x = tilt.current.x + Math.sin(time * 0.22) * 0.03;
      group.current.rotation.z = tilt.current.y * 0.5;
    }

    /* ---- shell -------------------------------------------------- */
    const energy =
      0.35 +
      smoothstep(0.4, 1.4, t) * 0.25 +
      smoothstep(4.4, 5.6, t) * 0.2 +
      finale * 0.35;
    shellUniforms.uTime.value = time;
    shellUniforms.uEnergy.value = energy;
    shellUniforms.uNeural.value = smoothstep(1.5, 2.4, t) * (1 - smoothstep(3.2, 4.0, t));
    // The shell opens as content is routed through the core, then reseals.
    shellUniforms.uDeform.value = lerp(1, 2.3, smoothstep(4.3, 5.2, t) * (1 - smoothstep(6.2, 7.0, t)));
    shellUniforms.uAccent.value.copy(theme.accent);
    shellUniforms.uGlow.value.copy(theme.glow);

    if (latticeRef.current) {
      latticeRef.current.rotation.y += dt * 0.13;
      latticeRef.current.rotation.x -= dt * 0.05;
      latticeRef.current.material.opacity = (0.1 + energy * 0.16) * intro;
      latticeRef.current.material.color.copy(theme.glow);
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= dt * 0.08;
      shellRef.current.rotation.x += dt * 0.02;
      // Aligns with the rings for the closing brand mark.
      shellRef.current.rotation.x = lerp(shellRef.current.rotation.x, 0, finale * 0.12);
    }

    // The agent quiets while a full-screen statement is on the page, so the
    // type stays legible without a scrim over the whole scene.
    const quiet =
      smoothstep(2.4, 2.65, t) * (1 - smoothstep(2.95, 3.15, t)) +
      smoothstep(7.35, 7.55, t) * (1 - smoothstep(7.95, 8.1, t));

    /* ---- inner core & glow -------------------------------------- */
    const pulse = 1 + Math.sin(time * 1.6) * 0.028 + smoothstep(6.4, 7.4, t) * 0.12;
    if (innerRef.current) {
      innerRef.current.scale.setScalar(pulse * lerp(1, 1.25, finale) * lerp(1, 0.45, clamp(quiet)));
      innerRef.current.material.color.copy(theme.glow).lerp(white, 0.55);
    }
    glowUniforms.uColor.value.copy(theme.glow);
    glowUniforms.uIntensity.value =
      (0.2 + energy * 0.2) * lerp(0, 1, intro) * lerp(1, 1.45, finale) * (1 - clamp(quiet) * 0.72);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(lerp(0.9, 1.2, smoothstep(0, 8, t)));
    }

    /* ---- rings --------------------------------------------------- */
    for (let i = 0; i < RING_CONFIG.length; i += 1) {
      const uniforms = ringUniforms[i];
      uniforms.uTime.value = time;
      uniforms.uColor.value.copy(theme.glow);
      // Rings separate as the camera enters the agent, then align at the end.
      const separation = smoothstep(0.2, 1.2, t);
      uniforms.uOpacity.value = lerp(0.34, 0.8, separation) * lerp(1, 1.4, finale) * intro;

      const g = ringGroups.current[i];
      if (!g) continue;
      const cfg = RING_CONFIG[i];
      const align = finale;
      g.rotation.x = lerp(cfg.tilt[0], 1.5708, align);
      g.rotation.y = lerp(cfg.tilt[1] + time * cfg.speed * 0.12, 0, align);
      g.rotation.z = lerp(cfg.tilt[2], 0, align);
      const spread = lerp(0.72, 1, separation);
      g.scale.setScalar(spread * lerp(1, 0.86 + i * 0.05, align));
    }
  });

  return (
    <group ref={group}>
      {/* Energy shell */}
      <mesh ref={shellRef} geometry={geometries.shell} renderOrder={2}>
        <shaderMaterial
          vertexShader={shellVertex}
          fragmentShader={shellFragment}
          uniforms={shellUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Inner lattice — structure, so the core never reads as a plain orb */}
      <lineSegments ref={latticeRef} renderOrder={2}>
        <wireframeGeometry args={[geometries.lattice]} />
        <lineBasicMaterial
          color="#8fc7ff"
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </lineSegments>

      {/* Luminous centre */}
      <mesh ref={innerRef} geometry={geometries.inner} renderOrder={3}>
        <meshBasicMaterial color="#dfefff" toneMapped={false} />
      </mesh>

      {/* Soft halo (cheaper and steadier than post-processing bloom) */}
      <mesh ref={glowRef} geometry={geometries.glow} renderOrder={1}>
        <shaderMaterial
          vertexShader={glowVertex}
          fragmentShader={glowFragment}
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbiting intelligence rings */}
      {RING_CONFIG.map((ring, i) => (
        <group
          key={ring.radius}
          ref={(el) => {
            ringGroups.current[i] = el;
          }}
        >
          <mesh
            geometry={geometries.rings[i]}
            renderOrder={2}
            ref={(el) => {
              ringRefs.current[i] = el;
            }}
          >
            <shaderMaterial
              vertexShader={ringVertex}
              fragmentShader={ringFragment}
              uniforms={ringUniforms[i]}
              transparent
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
