'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { experienceState } from '@/lib/experience-store';
import { clamp, damp, lerp, smootherstep } from '@/lib/animations';

/**
 * CameraRig — one continuous camera move through the agent.
 *
 * The camera interpolates between the two keyframes bracketing the current
 * scroll position, then damps toward that target so motion stays elegant
 * instead of snapping.
 */

/**
 * Keyframes live on the continuous story axis (0 -> 8, one unit per scene)
 * rather than one per scene, so a shot can be placed exactly where a beat
 * happens — the wide framing for the "SEO + GEO" statement, the slow push into
 * the topic graph — instead of drifting between scene centres.
 */
const KEYFRAMES = [
  { at: 0.0, x: 0.0, y: 0.15, z: 13.2, lookY: 0.0, lookX: -1.75, fov: 42 }, // agent emerges beside the headline
  { at: 0.8, x: 0.0, y: 0.25, z: 10.4, lookY: 0.0, lookX: -0.5, fov: 41 }, // entering the agent
  { at: 1.0, x: 1.35, y: 0.35, z: 9.8, lookY: 0.05, lookX: 0, fov: 40 }, // SEO
  { at: 1.8, x: 0.9, y: 0.3, z: 9.0, lookY: 0.05, lookX: 0, fov: 40 },
  { at: 2.0, x: -1.15, y: 0.2, z: 9.4, lookY: 0.0, lookX: 0, fov: 40 }, // GEO
  { at: 2.45, x: 0.0, y: 0.1, z: 13.0, lookY: 0.0, lookX: 0, fov: 38 }, // wide for "SEO + GEO"
  { at: 3.05, x: 0.0, y: 0.35, z: 11.6, lookY: 0.1, lookX: 0, fov: 40 },
  { at: 3.5, x: 0.25, y: 0.6, z: 5.2, lookY: 0.15, lookX: 0, fov: 47 }, // inside the topic graph
  { at: 3.85, x: 0.4, y: 0.35, z: 8.6, lookY: 0.0, lookX: 0, fov: 42 },
  { at: 4.0, x: 0.85, y: 0.25, z: 8.8, lookY: 0.0, lookX: 0, fov: 40 }, // content
  { at: 5.0, x: 0.0, y: 0.1, z: 9.6, lookY: 0.0, lookX: 0, fov: 38 }, // publish
  { at: 6.0, x: -0.5, y: 0.45, z: 9.2, lookY: 0.05, lookX: 0, fov: 40 }, // analytics
  { at: 7.0, x: 0.0, y: 3.0, z: 9.6, lookY: 1.15, lookX: 0, fov: 44 }, // above the loop
  { at: 8.0, x: 0.0, y: 0.0, z: 7.4, lookY: 0.0, lookX: 0, fov: 40 }, // the mark
];

const LAST = KEYFRAMES.length - 1;

/** Index of the keyframe at or before `t`. */
const frameIndex = (t) => {
  for (let i = LAST; i > 0; i -= 1) {
    if (t >= KEYFRAMES[i].at) return i;
  }
  return 0;
};

export default function CameraRig({ mobile = false, reducedMotion = false }) {
  const { camera, size } = useThree();
  const current = useRef(new THREE.Vector3(0, 0.15, 13.2));
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const state = experienceState;
    const dt = Math.min(delta, 0.05);
    const t = clamp(state.rangeIndex + clamp(state.blend), 0, 8);

    const ai = frameIndex(t);
    const bi = Math.min(ai + 1, LAST);
    const ka = KEYFRAMES[ai];
    const kb = KEYFRAMES[bi];
    const span = kb.at - ka.at;
    const m = span > 0 ? smootherstep(ka.at, kb.at, t) : 1;

    // Below the split-layout breakpoint the story stacks vertically: copy on
    // top, agent below. The camera looks up so the core sits in the lower half
    // instead of behind the headline.
    const aspect = size.width / Math.max(size.height, 1);
    const stacked = size.width < 1024;
    const distanceScale = mobile ? 1.5 : stacked ? 1.3 : aspect < 1.5 ? 1.1 : 1;
    const travel = reducedMotion ? 0.25 : stacked ? 0.5 : 1;

    const distance = lerp(ka.z, kb.z, m) * distanceScale;
    // Aiming above the origin pushes the agent into the lower half of the
    // frame. Scaling the offset by distance keeps that shift constant on
    // screen no matter how close the camera gets.
    const verticalOffset = stacked ? distance * 0.24 : 0;

    target.set(lerp(ka.x, kb.x, m) * travel, lerp(ka.y, kb.y, m) * travel, distance);

    if (!reducedMotion) {
      // A few degrees of parallax — the camera never chases the cursor.
      target.x += state.pointerX * 0.28;
      target.y += -state.pointerY * 0.2;
    }

    const smoothing = reducedMotion ? 40 : 5.5;
    current.current.x = damp(current.current.x, target.x, smoothing, dt);
    current.current.y = damp(current.current.y, target.y, smoothing, dt);
    current.current.z = damp(current.current.z, target.z, smoothing, dt);
    camera.position.copy(current.current);

    look.set(lerp(ka.lookX, kb.lookX, m) * (stacked ? 0 : 1), lerp(ka.lookY, kb.lookY, m) + verticalOffset, 0);
    lookAt.current.x = damp(lookAt.current.x, look.x, smoothing, dt);
    lookAt.current.y = damp(lookAt.current.y, look.y, smoothing, dt);
    lookAt.current.z = damp(lookAt.current.z, look.z, smoothing, dt);
    camera.lookAt(lookAt.current);

    const fov = lerp(ka.fov, kb.fov, m);
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = damp(camera.fov, fov, smoothing, dt);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
