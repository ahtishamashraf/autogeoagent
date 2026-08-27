'use client';

import { useRef } from 'react';
import { lerp, smoothstep, stagger } from '@/lib/animations';
import { useScrollScrub } from './useScrollScrub';
import VisualFrame from './VisualFrame';

/**
 * Orphan pages -> discovered relationships -> a linked cluster.
 *
 * Pages start scattered and unconnected. As the agent recognises what each one
 * is about, links are drawn between them and the set resolves into a pillar
 * with supporting pages beneath it.
 */

const PAGES = [
  { label: 'What is GEO?', from: [88, 62], to: [140, 196] },
  { label: 'SEO vs GEO', from: [452, 48], to: [300, 196] },
  { label: 'AI visibility', from: [312, 232], to: [460, 196] },
  { label: 'Entity clarity', from: [122, 214], to: [220, 262] },
  { label: 'Schema basics', from: [500, 188], to: [380, 262] },
];

// index into PAGES; -1 is the pillar
const LINKS = [
  [-1, 0],
  [-1, 1],
  [-1, 2],
  [0, 3],
  [1, 4],
];

const PILLAR = [300, 104];

export default function InternalLinkVisual() {
  const pageRefs = useRef([]);
  const linkRefs = useRef([]);
  const pillarRef = useRef(null);

  const ref = useScrollScrub((_, t) => {
    const organise = smoothstep(0.34, 0.72, t);
    const pillarIn = smoothstep(0.28, 0.46, t);

    if (pillarRef.current) {
      pillarRef.current.style.opacity = pillarIn.toFixed(3);
      pillarRef.current.style.transform = `scale(${lerp(0.86, 1, pillarIn)})`;
    }

    const positions = PAGES.map((page) => [
      lerp(page.from[0], page.to[0], organise),
      lerp(page.from[1], page.to[1], organise),
    ]);

    PAGES.forEach((page, i) => {
      const node = pageRefs.current[i];
      if (!node) return;
      const appear = stagger(t, i, PAGES.length, 0, 0.24);
      node.style.opacity = appear.toFixed(3);
      node.setAttribute('transform', `translate(${positions[i][0].toFixed(1)} ${positions[i][1].toFixed(1)})`);
    });

    LINKS.forEach((link, i) => {
      const el = linkRefs.current[i];
      if (!el) return;
      const draw = stagger(t, i, LINKS.length, 0.42, 0.86);
      const [a, b] = link;
      const start = a === -1 ? PILLAR : positions[a];
      const end = positions[b];
      const mx = (start[0] + end[0]) / 2;
      el.setAttribute('d', `M${start[0].toFixed(1)} ${start[1].toFixed(1)} C ${mx.toFixed(1)} ${start[1].toFixed(1)}, ${mx.toFixed(1)} ${end[1].toFixed(1)}, ${end[0].toFixed(1)} ${end[1].toFixed(1)}`);
      el.style.strokeDashoffset = `${(1 - draw) * 400}`;
      el.style.opacity = draw.toFixed(3);
    });
  });

  return (
    <div ref={ref}>
      <VisualFrame label="Internal link graph" note="Product visualization" tall>
        <svg viewBox="0 0 600 300" className="size-full" role="img" aria-label="Unconnected pages resolving into a linked pillar and cluster structure">
          {LINKS.map((link, i) => (
            <path
              key={`${link[0]}-${link[1]}`}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              fill="none"
              stroke="color-mix(in srgb, var(--scene-glow) 55%, transparent)"
              strokeWidth="1.2"
              strokeDasharray="400"
              style={{ strokeDashoffset: 400, opacity: 0 }}
            />
          ))}

          <g ref={pillarRef} style={{ transformOrigin: '300px 104px', opacity: 0 }}>
            <rect x="232" y="86" width="136" height="38" rx="10" fill="color-mix(in srgb, var(--scene-accent) 20%, transparent)" stroke="var(--scene-glow)" strokeWidth="1.2" />
            <text x="300" y="103" textAnchor="middle" className="fill-[var(--color-faint)]" style={{ font: '500 8px var(--font-mono)', letterSpacing: '0.16em' }}>
              PILLAR
            </text>
            <text x="300" y="117" textAnchor="middle" className="fill-ink" style={{ font: '600 12px var(--font-display)' }}>
              Generative Engine Optimization
            </text>
          </g>

          {PAGES.map((page, i) => (
            <g
              key={page.label}
              ref={(el) => {
                pageRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect x="-58" y="-15" width="116" height="30" rx="8" fill="rgba(10,16,25,0.96)" stroke="rgba(148,176,220,0.24)" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle" className="fill-ink-soft" style={{ font: '400 10.5px var(--font-sans)' }}>
                {page.label}
              </text>
            </g>
          ))}
        </svg>
      </VisualFrame>
    </div>
  );
}
