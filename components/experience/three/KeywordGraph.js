'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { experienceState } from '@/lib/experience-store';
import { clamp, lerp, seeded, smoothstep } from '@/lib/animations';
import { formValue, useSceneTheme } from './useSceneTheme';
import { linkFragment, linkVertex } from './shaders';

/**
 * KeywordGraph — the structured layer above the particle field.
 *
 * A small number of larger nodes carry the structure a viewer can actually
 * read: keyword clusters, a topical map, a content outline, a publishing
 * pipeline, performance points, then the improvement loop. Connection lines
 * between parents and children carry a travelling signal.
 *
 * Node positions are computed on the CPU because there are few of them and the
 * connection lines need to follow the same coordinates exactly.
 */

const COUNTS = { 3: 56, 2: 40, 1: 22, 0: 18 };
const TAU = Math.PI * 2;

/** Nine formations, mirroring the particle field but structural. */
function nodePosition(form, i, n, rand, time, out) {
  const s = rand.a;
  const s2 = rand.b;
  const s3 = rand.c;

  switch (form) {
    // 0 — intro: a calm orbital shell around the core
    case 0: {
      const ang = (i / n) * TAU + time * 0.06;
      const r = 2.6 + s * 1.4;
      out.set(Math.cos(ang) * r, (s2 - 0.5) * 2.2, Math.sin(ang) * r);
      break;
    }
    // 1 — SEO: a ranked column of results plus a keyword cluster
    case 1: {
      if (i % 3 === 0) {
        const row = Math.floor(i / 3) % 8;
        out.set(1.6 + (s - 0.5) * 0.5, 2.1 - row * 0.55, -0.4 + s3 * 0.8);
      } else {
        const ang = (i / n) * TAU * 1.6;
        const r = 1.1 + s2 * 1.5;
        out.set(-2.4 + Math.cos(ang) * r * 0.7, Math.sin(ang) * r, -0.6 + s * 1.2);
      }
      break;
    }
    // 2 — GEO: layered neural structure resolving into one answer
    case 2: {
      const layer = i % 4;
      const inLayer = Math.floor(i / 4);
      const per = Math.ceil(n / 4);
      const ang = (inLayer / per) * TAU + layer * 0.4 + time * 0.08;
      const r = 1.5 - layer * 0.28;
      out.set(-2.2 + layer * 1.5, Math.cos(ang) * r, Math.sin(ang) * r * 0.8);
      break;
    }
    // 3 — Research: a branching topic graph
    case 3: {
      if (i === 0) {
        out.set(0, 0, 0);
        break;
      }
      const branch = i % 6;
      const depth = Math.floor(i / 6) + 1;
      const ang = (branch / 6) * TAU + depth * 0.28;
      const r = depth * 1.15;
      out.set(
        Math.cos(ang) * r + (s - 0.5) * 0.5,
        (s2 - 0.5) * depth * 0.75,
        Math.sin(ang) * r + (s3 - 0.5) * 0.5,
      );
      break;
    }
    // 4 — Content: clusters resolve into stacked document blocks
    case 4: {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const perCol = Math.ceil(n / 3);
      out.set(
        -2.6 + col * 2.6 + (s - 0.5) * 0.2,
        1.9 - (row / perCol) * 3.8,
        -0.5 + s3 * 1.0,
      );
      break;
    }
    // 5 — Publish: a single directed pipeline through the core
    case 5: {
      const u = i / n;
      const x = -4.0 + u * 8.0;
      // The stream narrows as it passes through the core, then opens again.
      const rad = (0.35 + s * 0.7) * Math.min(1, Math.abs(x) / 2.2 + 0.12);
      const ang = u * TAU * 2.2 + time * 0.25;
      out.set(x, Math.cos(ang) * rad, Math.sin(ang) * rad);
      break;
    }
    // 6 — Analytics: performance points on a rising surface
    case 6: {
      const u = i / n;
      const x = -3.2 + u * 6.4;
      const y = Math.sin(u * 3.1) * 0.55 + u * 1.8 - 0.9;
      out.set(x, y + (s2 - 0.5) * 0.22, -0.5 + s3 * 1.0);
      break;
    }
    // 7 — Improve: phases orbiting the core in a closed loop
    case 7: {
      const ang = (i / n) * TAU + time * 0.22;
      const r = 2.9;
      out.set(Math.cos(ang) * r, Math.sin(ang * 2) * 0.32, Math.sin(ang) * r);
      break;
    }
    // 8 — Final: everything returns to the core
    default: {
      const ang = (i / n) * TAU + time * 0.5;
      const r = 0.55 + s * 0.25;
      out.set(Math.cos(ang) * r, (s2 - 0.5) * 0.6, Math.sin(ang) * r);
      break;
    }
  }
  return out;
}

export default function KeywordGraph({ quality = 3 }) {
  const meshRef = useRef(null);
  const linesRef = useRef(null);
  const theme = useSceneTheme();
  const count = COUNTS[quality] ?? COUNTS[2];

  const data = useMemo(() => {
    const rand = seeded(9137);
    const seeds = Array.from({ length: count }, () => ({
      a: rand(),
      b: rand(),
      c: rand(),
      scale: 0.5 + rand() * 0.9,
    }));

    // A stable parent/child link structure so lines always read as relations.
    const links = [];
    for (let i = 1; i < count; i += 1) {
      const parent = i < 7 ? 0 : Math.max(0, i - 6);
      links.push([parent, i]);
    }
    if (count > 12) {
      for (let i = 0; i < Math.floor(count / 6); i += 1) {
        links.push([(i * 5) % count, (i * 11 + 3) % count]);
      }
    }
    return { seeds, links };
  }, [count]);

  const geometry = useMemo(() => new THREE.OctahedronGeometry(0.038, 0), []);

  const positions = useMemo(
    () => Array.from({ length: count }, () => new THREE.Vector3()),
    [count],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const from = useMemo(() => new THREE.Vector3(), []);
  const to = useMemo(() => new THREE.Vector3(), []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = new Float32Array(data.links.length * 6);
    const aPos = new Float32Array(data.links.length * 2);
    const aLink = new Float32Array(data.links.length * 2);
    data.links.forEach((_, i) => {
      aPos[i * 2] = 0;
      aPos[i * 2 + 1] = 1;
      aLink[i * 2] = i / data.links.length;
      aLink[i * 2 + 1] = i / data.links.length;
    });
    geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    geo.setAttribute('aPos', new THREE.BufferAttribute(aPos, 1));
    geo.setAttribute('aLink', new THREE.BufferAttribute(aLink, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
    return geo;
  }, [data.links]);

  const lineUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#7ec8ff') },
      uTime: { value: 0 },
      uOpacity: { value: 0 },
    }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      lineGeometry.dispose();
    },
    [geometry, lineGeometry],
  );

  useFrame(() => {
    const state = experienceState;
    const mesh = meshRef.current;
    if (!mesh) return;

    theme.update(state);
    const time = performance.now() / 1000;
    const t = state.rangeIndex + clamp(state.blend);
    const f = formValue(state);
    const a = Math.floor(f);
    const b = Math.min(a + 1, 8);
    const mix = f - a;

    const intro = smoothstep(0.25, 1, state.intro);
    const collapse = smoothstep(8.2, 8.8, t);
    const visible = intro * (1 - collapse * 0.85);

    for (let i = 0; i < count; i += 1) {
      const seed = data.seeds[i];
      nodePosition(a, i, count, seed, time, from);
      nodePosition(b, i, count, seed, time, to);
      const eased = mix * mix * (3 - 2 * mix);
      const p = positions[i];
      p.copy(from).lerp(to, eased);
      // Nodes lift out of plane while travelling between formations.
      p.y += Math.sin(eased * Math.PI) * (seed.c - 0.5) * 0.7;
      p.multiplyScalar(lerp(1, 0.12, collapse));

      dummy.position.copy(p);
      dummy.rotation.set(time * 0.4 + i, time * 0.3 + i * 0.7, 0);
      const emphasis = 1 + Math.sin(eased * Math.PI) * 0.6;
      dummy.scale.setScalar(seed.scale * emphasis * lerp(0.2, 1, intro) * lerp(1, 0.4, collapse));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.material.color.copy(theme.glow);
    mesh.material.opacity = visible * 0.8;

    /* ---- connection lines --------------------------------------- */
    const lines = linesRef.current;
    if (lines) {
      const array = lineGeometry.attributes.position.array;
      for (let i = 0; i < data.links.length; i += 1) {
        const [x, y] = data.links[i];
        const p1 = positions[x];
        const p2 = positions[y];
        const o = i * 6;
        array[o] = p1.x;
        array[o + 1] = p1.y;
        array[o + 2] = p1.z;
        array[o + 3] = p2.x;
        array[o + 4] = p2.y;
        array[o + 5] = p2.z;
      }
      lineGeometry.attributes.position.needsUpdate = true;
      lineUniforms.uTime.value = time;
      lineUniforms.uColor.value.copy(theme.accent);
      // Links matter most where relationships are the story.
      const relational =
        0.25 +
        smoothstep(0.6, 1.6, t) * 0.35 +
        smoothstep(2.6, 3.4, t) * 0.4 -
        smoothstep(5.0, 6.0, t) * 0.35;
      lineUniforms.uOpacity.value = clamp(relational) * visible;
    }
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[geometry, undefined, count]}
        frustumCulled={false}
        renderOrder={2}
      >
        <meshBasicMaterial
          color="#7ec8ff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </instancedMesh>

      <lineSegments ref={linesRef} geometry={lineGeometry} frustumCulled={false} renderOrder={1}>
        <shaderMaterial
          vertexShader={linkVertex}
          fragmentShader={linkFragment}
          uniforms={lineUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
