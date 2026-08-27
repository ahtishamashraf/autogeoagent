'use client';

import { useRef } from 'react';
import { clamp, lerp, mapRange, smoothstep, stagger } from '@/lib/animations';
import { useScrollScrub } from './useScrollScrub';
import VisualFrame from './VisualFrame';

/**
 * A crawler walking a site tree and surfacing what it finds.
 *
 * The path is traced node by node; issues appear as the crawler reaches the
 * page they belong to, so the finding is always tied to a location.
 */

const NODES = [
  { id: 'home', label: '/', x: 60, y: 150, depth: 0 },
  { id: 'seo', label: '/seo', x: 200, y: 78, depth: 1 },
  { id: 'geo', label: '/geo', x: 200, y: 150, depth: 1 },
  { id: 'blog', label: '/blog', x: 200, y: 222, depth: 1 },
  { id: 'guide', label: '/seo/guide', x: 360, y: 48, depth: 2 },
  { id: 'audit', label: '/seo/audit', x: 360, y: 108, depth: 2 },
  { id: 'what', label: '/geo/what-is', x: 360, y: 150, depth: 2 },
  { id: 'post', label: '/blog/post', x: 360, y: 222, depth: 2 },
];

const EDGES = [
  ['home', 'seo'], ['home', 'geo'], ['home', 'blog'],
  ['seo', 'guide'], ['seo', 'audit'], ['geo', 'what'], ['blog', 'post'],
];

const ISSUES = [
  { node: 'audit', label: 'Missing meta description', level: 'warn' },
  { node: 'post', label: 'Orphan page — no internal links', level: 'high' },
  { node: 'what', label: 'No structured data', level: 'warn' },
  { node: 'guide', label: 'Duplicate title tag', level: 'high' },
];

const byId = (id) => NODES.find((n) => n.id === id);

export default function CrawlVisual({ label = 'Site crawl', note = 'Product visualization' }) {
  const edgeRefs = useRef([]);
  const nodeRefs = useRef([]);
  const issueRefs = useRef([]);
  const botRef = useRef(null);

  const ref = useScrollScrub((_, t) => {
    const path = clamp(mapRange(t, 0.06, 0.62, 0, EDGES.length));

    EDGES.forEach((edge, i) => {
      const el = edgeRefs.current[i];
      if (!el) return;
      const draw = clamp(path - i);
      el.style.strokeDashoffset = `${(1 - draw) * 300}`;
      el.style.opacity = (0.25 + draw * 0.75).toFixed(3);
    });

    NODES.forEach((node, i) => {
      const el = nodeRefs.current[i];
      if (!el) return;
      const reached = clamp(mapRange(t, 0.04 + node.depth * 0.12, 0.16 + node.depth * 0.14, 0, 1));
      el.style.opacity = (0.3 + reached * 0.7).toFixed(3);
      el.dataset.visited = reached > 0.8 ? 'true' : 'false';
    });

    if (botRef.current) {
      const i = Math.min(Math.floor(path), EDGES.length - 1);
      const local = clamp(path - i);
      const a = byId(EDGES[i][0]);
      const b = byId(EDGES[i][1]);
      botRef.current.setAttribute('cx', lerp(a.x, b.x, local).toFixed(1));
      botRef.current.setAttribute('cy', lerp(a.y, b.y, local).toFixed(1));
      botRef.current.style.opacity = (smoothstep(0.03, 0.1, t) * (1 - smoothstep(0.66, 0.74, t))).toFixed(3);
    }

    issueRefs.current.forEach((el, i) => {
      if (!el) return;
      const appear = stagger(t, i, ISSUES.length, 0.62, 0.96);
      el.style.opacity = appear.toFixed(3);
      el.style.transform = `translateX(${lerp(10, 0, appear).toFixed(1)}px)`;
    });
  });

  return (
    <div ref={ref}>
      <VisualFrame label={label} note={note} tall>
        <div className="grid h-full grid-cols-1 gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,15rem)]">
          <svg viewBox="0 0 460 300" className="h-full w-full" role="img" aria-label="A crawler traversing a site structure and reporting issues per page">
            {EDGES.map((edge, i) => {
              const a = byId(edge[0]);
              const b = byId(edge[1]);
              const mx = (a.x + b.x) / 2;
              return (
                <path
                  key={`${edge[0]}-${edge[1]}`}
                  ref={(el) => {
                    edgeRefs.current[i] = el;
                  }}
                  d={`M${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`}
                  fill="none"
                  stroke="color-mix(in srgb, var(--scene-glow) 45%, transparent)"
                  strokeWidth="1"
                  strokeDasharray="300"
                  style={{ strokeDashoffset: 300, opacity: 0.25 }}
                />
              );
            })}

            {NODES.map((node, i) => (
              <g
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                data-visited="false"
                className="group/node"
                style={{ opacity: 0.3 }}
              >
                <circle cx={node.x} cy={node.y} r="4" className="fill-white/30 group-data-[visited=true]/node:fill-[var(--scene-glow)]" />
                <text x={node.x + 10} y={node.y + 4} className="fill-ink-soft" style={{ font: '400 10.5px var(--font-mono)' }}>
                  {node.label}
                </text>
              </g>
            ))}

            <circle
              ref={botRef}
              r="6"
              fill="none"
              stroke="var(--scene-glow)"
              strokeWidth="1.6"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 6px var(--scene-glow))' }}
            />
          </svg>

          <div className="flex flex-col justify-center gap-1.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">Findings</p>
            {ISSUES.map((issue, i) => (
              <span
                key={issue.label}
                ref={(el) => {
                  issueRefs.current[i] = el;
                }}
                className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 opacity-0"
              >
                <span
                  aria-hidden="true"
                  className={`mt-1.5 size-1.5 shrink-0 rounded-full ${issue.level === 'high' ? 'bg-violet-soft' : 'bg-[var(--scene-glow)]'}`}
                />
                <span className="min-w-0">
                  <span className="block text-[11.5px] leading-snug text-ink-soft">{issue.label}</span>
                  <span className="block font-mono text-[9px] text-faint">{byId(issue.node).label}</span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </VisualFrame>
    </div>
  );
}
