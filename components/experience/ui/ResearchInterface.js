'use client';

import { useRef } from 'react';
import { useSceneMotion } from '@/lib/hooks';
import { beat, clamp, lerp, smoothstep, stagedTime, stagger } from '@/lib/animations';
import { usesTopBand } from '@/lib/scene-config';
import { DataNote, Frame, FrameBar, MetaChip } from './primitives';

/**
 * Scene 03 — INTELLIGENCE.
 *
 * Questions travel into the agent, become a topic graph, then reorganise into
 * a structured topical map. All metadata shown is sample visualization data.
 */

/* Placement in container percentages; travel toward the core in pixels. */
const QUESTIONS = [
  { text: 'What is GEO?', left: 14, top: 4, travel: [180, 150] },
  { text: 'How does AI SEO work?', left: 82, top: 12, travel: [-210, 120] },
  { text: 'Best way to automate SEO?', left: 10, top: 88, travel: [200, -180] },
  { text: 'SEO vs GEO?', left: 86, top: 82, travel: [-230, -150] },
];

const CLUSTERS = [
  { label: 'SEO Automation', count: '14 topics' },
  { label: 'AI Search', count: '11 topics' },
  { label: 'GEO', count: '9 topics' },
  { label: 'Content Optimization', count: '12 topics' },
  { label: 'Technical SEO', count: '7 topics' },
];

export default function ResearchInterface({ sceneIndex = 3 }) {
  const questionRefs = useRef([]);
  const inspectorRef = useRef(null);
  const mapRef = useRef(null);
  const clusterRefs = useRef([]);
  const pillarRef = useRef(null);

  const root = useSceneMotion(sceneIndex, (el, raw, state) => {
    const t = stagedTime(raw, state.stacked || usesTopBand(sceneIndex));
    const visible = beat(t, -0.06, 0.22, 0.8, 1);
    el.style.opacity = visible.toFixed(3);
    el.style.visibility = visible < 0.01 ? 'hidden' : 'visible';

    /* --- questions arrive, then are absorbed by the core --------- */
    questionRefs.current.forEach((node, i) => {
      if (!node) return;
      const appear = stagger(t, i, QUESTIONS.length, -0.04, 0.2);
      const absorb = smoothstep(0.24, 0.46, t);
      // Fade faster than they travel: by the time their paths converge on the
      // core they are already gone, so two questions never share a line.
      const dim = smoothstep(0.24, 0.34, t);
      const q = QUESTIONS[i];
      node.style.opacity = (appear * (1 - dim)).toFixed(3);
      node.style.transform = `translate3d(${(q.travel[0] * absorb).toFixed(1)}px, ${(q.travel[1] * absorb).toFixed(1)}px, 0) scale(${lerp(1, 0.55, absorb) * lerp(0.8, 1, appear)})`;
      node.style.filter = `blur(${(absorb * 4).toFixed(2)}px)`;
    });

    /* --- node inspector ------------------------------------------ */
    if (inspectorRef.current) {
      const show = beat(t, 0.36, 0.5, 0.66, 0.78);
      inspectorRef.current.style.opacity = show.toFixed(3);
      inspectorRef.current.style.transform = `translate3d(0, ${((1 - show) * 22).toFixed(1)}px, 0) scale(${lerp(0.94, 1, show)})`;
    }

    /* --- the graph resolves into a topical map ------------------- */
    const mapIn = smoothstep(0.6, 0.78, t);
    const mapOut = smoothstep(0.9, 1, t);
    if (mapRef.current) {
      mapRef.current.style.opacity = (mapIn * (1 - mapOut)).toFixed(3);
      mapRef.current.style.transform = `perspective(1400px) translate3d(0, ${((1 - mapIn) * 34 - mapOut * 40).toFixed(1)}px, ${lerp(-180, 0, mapIn)}px) rotateX(${lerp(9, 0, mapIn)}deg)`;
    }
    if (pillarRef.current) {
      pillarRef.current.style.transform = `translateY(${((1 - mapIn) * -14).toFixed(1)}px)`;
    }
    clusterRefs.current.forEach((node, i) => {
      if (!node) return;
      const appear = stagger(t, i, CLUSTERS.length, 0.66, 0.86);
      node.style.opacity = appear.toFixed(3);
      node.style.transform = `translate3d(0, ${((1 - appear) * 16).toFixed(1)}px, 0)`;
    });
  });

  return (
    <div
      ref={root}
      className="pointer-events-none absolute inset-0 flex items-start justify-center lg:items-center opacity-0"
    >
      <div className="relative w-[min(94vw,960px)]">
        {/* Questions travelling toward the agent */}
        {QUESTIONS.map((question, i) => (
          <span
            key={question.text}
            ref={(el) => {
              questionRefs.current[i] = el;
            }}
            style={{ left: `${question.left}%`, top: `${question.top}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/12 bg-[#080d16]/85 px-3.5 py-1.5 text-[11px] text-ink-soft opacity-0 backdrop-blur-md sm:text-xs"
          >
            {question.text}
          </span>
        ))}

        <div className="grid items-center gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
        {/* Topical map */}
        <div ref={mapRef} className="mx-auto w-[min(94vw,660px)] opacity-0">
          <Frame>
            <FrameBar title="Topical map" right={<DataNote>Product visualization</DataNote>} />
            <div className="px-4 py-5">
              <div ref={pillarRef} className="mx-auto w-fit">
                <span className="t-micro block text-center text-[9px] text-faint">Pillar</span>
                <span className="mt-1.5 block rounded-lg border border-[color-mix(in_srgb,var(--scene-glow)_45%,transparent)] bg-[color-mix(in_srgb,var(--scene-accent)_12%,transparent)] px-4 py-2 text-center font-display text-sm font-semibold text-ink">
                  AI SEO
                </span>
              </div>

              <svg
                viewBox="0 0 660 46"
                className="mt-1 h-8 w-full text-[color-mix(in_srgb,var(--scene-glow)_45%,transparent)]"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                {[66, 198, 330, 462, 594].map((x) => (
                  <path
                    key={x}
                    d={`M330 0 V16 Q330 30 ${x > 330 ? x - 14 : x + 14} 30 H${x} V46`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                ))}
              </svg>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {CLUSTERS.map((cluster, i) => (
                  <span
                    key={cluster.label}
                    ref={(el) => {
                      clusterRefs.current[i] = el;
                    }}
                    className="flex flex-col gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 opacity-0"
                  >
                    <span className="text-[11px] font-medium leading-tight text-ink-soft">
                      {cluster.label}
                    </span>
                    <span className="font-mono text-[9px] text-faint">{cluster.count}</span>
                  </span>
                ))}
              </div>
            </div>
          </Frame>
        </div>

        {/* Node inspector — a column of its own where there is room for one */}
        <div ref={inspectorRef} className="hidden opacity-0 xl:block">
          <Frame tone="deep">
            <FrameBar title="Topic node" right={<DataNote>Sample</DataNote>} icon={false} />
            <div className="px-3.5 py-3">
              <p className="font-display text-sm font-semibold tracking-[-0.02em] text-ink">
                AI SEO Agent
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-faint">
                Informational and commercial overlap. Strong internal link target for the automation
                cluster.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <MetaChip label="Intent" value="Commercial" tone="mid" />
                <MetaChip label="Opportunity" value="High" tone="high" />
                <MetaChip label="Competition" value="Medium" />
                <MetaChip label="Cluster" value="GEO" tone="mid" />
              </div>
            </div>
          </Frame>
        </div>

        </div>
      </div>
    </div>
  );
}
