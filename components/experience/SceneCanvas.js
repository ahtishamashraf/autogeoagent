'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import AgentCore from './three/AgentCore';
import ParticleField from './three/ParticleField';
import KeywordGraph from './three/KeywordGraph';
import CameraRig from './CameraRig';

/**
 * The WebGL layer.
 *
 * Deliberately small: three objects, shared geometry, no post-processing and
 * no loaded assets. All the heavy lifting happens in shaders driven by a
 * single scroll uniform.
 */
export default function SceneCanvas({ quality = 3, reducedMotion = false }) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(true);

  // Stop rendering entirely once the experience scrolls out of view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dpr = quality >= 3 ? [1, 1.75] : quality >= 2 ? [1, 1.5] : [1, 1.25];
  const mobile = quality <= 1;

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={dpr}
        frameloop={active ? 'always' : 'never'}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0.15, 13.2], fov: 42, near: 0.1, far: 60 }}
        style={{ pointerEvents: 'none' }}
      >
        <CameraRig mobile={mobile} reducedMotion={reducedMotion} />
        <ParticleField quality={quality} />
        <KeywordGraph quality={quality} />
        <AgentCore quality={quality} />
      </Canvas>
    </div>
  );
}
