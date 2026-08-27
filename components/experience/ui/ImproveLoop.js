'use client';

import { useRef } from 'react';
import { useSceneMotion } from '@/lib/hooks';
import { beat, clamp, lerp, smoothstep, stagedTime, stagger } from '@/lib/animations';
import { DataNote } from './primitives';

/**
 * Scene 07 — CONTINUOUS OPTIMIZATION.
 *
 * Performance data returns to the agent, which reprocesses it and restarts the
 * cycle. The five phases orbit the core; the ring closes as the loop completes.
 */

const PHASES = ['Research', 'Create', 'Publish', 'Measure', 'Improve'];

const MESSAGES = [
  'Analyzing performance',
  'Finding weak pages',
  'Identifying new queries',
  'Updating strategy',
];

const RADIUS = 40; // percentage of the container

export default function ImproveLoop({ sceneIndex = 7 }) {
  const phaseRefs = useRef([]);
  const messageRefs = useRef([]);
  const ringRef = useRef(null);
  const orbitRef = useRef(null);

  const root = useSceneMotion(sceneIndex, (el, raw, state) => {
    const t = stagedTime(raw, state.stacked);
    const visible = beat(t, -0.02, 0.2, 0.82, 1);
    el.style.opacity = visible.toFixed(3);
    el.style.visibility = visible < 0.01 ? 'hidden' : 'visible';

    /* --- processing messages ------------------------------------- */
    messageRefs.current.forEach((node, i) => {
      if (!node) return;
      const appear = stagger(t, i, MESSAGES.length, 0.0, 0.34);
      const fade = smoothstep(0.42, 0.6, t);
      node.style.opacity = (appear * (1 - fade)).toFixed(3);
      node.style.transform = `translate3d(0, ${((1 - appear) * 12).toFixed(1)}px, 0)`;
    });

    /* --- the loop ------------------------------------------------- */
    const loopIn = smoothstep(0.28, 0.56, t);
    const spin = smoothstep(0.3, 1, t) * 72;

    if (orbitRef.current) {
      orbitRef.current.style.opacity = loopIn.toFixed(3);
      orbitRef.current.style.transform = `rotate(${spin.toFixed(2)}deg)`;
    }

    phaseRefs.current.forEach((node, i) => {
      if (!node) return;
      const appear = stagger(t, i, PHASES.length, 0.3, 0.66);
      const angle = (i / PHASES.length) * 360 - 90;
      const r = lerp(RADIUS * 0.4, RADIUS, appear);
      const rad = (angle * Math.PI) / 180;
      const x = Math.cos(rad) * r;
      const y = Math.sin(rad) * r * 0.82;
      node.style.opacity = appear.toFixed(3);
      // Counter-rotate so the labels stay upright while the ring turns.
      node.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}cqw), calc(-50% + ${y.toFixed(2)}cqw), 0) rotate(${(-spin).toFixed(2)}deg)`;
    });

    if (ringRef.current) {
      const close = clamp(smoothstep(0.34, 0.9, t));
      ringRef.current.style.strokeDashoffset = `${(1000 * (1 - close)).toFixed(1)}`;
      ringRef.current.style.opacity = loopIn.toFixed(3);
    }
  });

  return (
    <div
      ref={root}
      className="pointer-events-none absolute inset-0 flex items-start justify-center lg:items-center opacity-0"
    >
      <div
        className="relative aspect-square w-[min(66vw,620px)] sm:w-[min(84vw,620px)]"
        style={{ containerType: 'inline-size' }}
      >
        {/* Closing loop */}
        <svg viewBox="0 0 340 340" className="absolute inset-0 size-full" aria-hidden="true">
          <circle
            cx="170"
            cy="170"
            r="132"
            fill="none"
            stroke="rgba(148,176,220,0.12)"
            strokeWidth="1"
          />
          <circle
            ref={ringRef}
            cx="170"
            cy="170"
            r="132"
            fill="none"
            stroke="var(--scene-glow)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            transform="rotate(-90 170 170)"
            style={{ opacity: 0, filter: 'drop-shadow(0 0 6px var(--scene-glow))' }}
          />
        </svg>

        {/* Orbiting phases */}
        <div ref={orbitRef} className="absolute inset-0 opacity-0">
          {PHASES.map((phase, i) => (
            <span
              key={phase}
              ref={(el) => {
                phaseRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-white/12 bg-[#080d16]/85 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft opacity-0 backdrop-blur-md sm:text-[11px]"
            >
              {phase}
            </span>
          ))}
        </div>

        {/* Processing messages */}
        <div className="absolute inset-x-0 top-full mt-4 flex flex-col items-center gap-1.5 sm:bottom-[8%] sm:top-auto sm:mt-0">
          {MESSAGES.map((message, i) => (
            <span
              key={message}
              ref={(el) => {
                messageRefs.current[i] = el;
              }}
              className="rounded-full border border-white/10 bg-black/45 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted opacity-0 backdrop-blur-md"
            >
              {message}
            </span>
          ))}
        </div>

        <DataNote className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 sm:inline-flex">
          Product visualization
        </DataNote>
      </div>
    </div>
  );
}
