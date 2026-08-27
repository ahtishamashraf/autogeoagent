'use client';

import { useRef } from 'react';
import { lerp, smoothstep, stagger } from '@/lib/animations';
import { useScrollScrub } from './useScrollScrub';
import VisualFrame from './VisualFrame';

/**
 * Seed topic -> queries -> intent -> clusters -> opportunities.
 *
 * One seed fans out into queries, each query is classified by intent, the
 * queries migrate into clusters, and the clusters that are worth building
 * surface as opportunities. Every position is a function of scroll progress.
 */

const QUERIES = [
  { label: 'ai seo software', intent: 'Commercial', cluster: 0 },
  { label: 'automate seo tasks', intent: 'Informational', cluster: 0 },
  { label: 'best ai seo tools', intent: 'Commercial', cluster: 1 },
  { label: 'seo automation guide', intent: 'Informational', cluster: 1 },
  { label: 'ai seo vs manual seo', intent: 'Comparison', cluster: 2 },
  { label: 'seo agent pricing', intent: 'Transactional', cluster: 2 },
];

const CLUSTERS = [
  { label: 'Software', y: 70 },
  { label: 'How-to', y: 152 },
  { label: 'Comparison', y: 234 },
];

const INTENT_COLOR = {
  Commercial: 'var(--scene-glow)',
  Informational: '#7ee3f5',
  Comparison: '#a48bff',
  Transactional: '#33d6a0',
};

export default function KeywordGraphVisual() {
  const nodeRefs = useRef([]);
  const linkRefs = useRef([]);
  const clusterRefs = useRef([]);
  const oppRefs = useRef([]);
  const seedRef = useRef(null);

  const ref = useScrollScrub((_, t) => {
    const seed = smoothstep(0, 0.12, t);
    if (seedRef.current) {
      seedRef.current.style.opacity = seed.toFixed(3);
      seedRef.current.style.transform = `scale(${lerp(0.7, 1, seed)})`;
    }

    const migrate = smoothstep(0.58, 0.84, t);

    QUERIES.forEach((query, i) => {
      const node = nodeRefs.current[i];
      const link = linkRefs.current[i];
      const appear = stagger(t, i, QUERIES.length, 0.12, 0.42);

      if (link) {
        link.style.strokeDashoffset = `${(1 - appear) * 260}`;
        link.style.opacity = (appear * lerp(1, 0.35, migrate)).toFixed(3);
      }
      if (!node) return;

      const fanY = 44 + i * 42;
      const clusterY = CLUSTERS[query.cluster].y + (i % 2 === 0 ? -13 : 13);
      const x = lerp(216, 388, migrate);
      const y = lerp(fanY, clusterY, migrate);

      node.style.opacity = appear.toFixed(3);
      node.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);

      // Intent classification lands before the migration begins, and the
      // label stays after it: the dot colour alone would leave the
      // classification legible only to people who can distinguish the hues,
      // and a reduced-motion reader only ever sees this settled frame.
      const intent = stagger(t, i, QUERIES.length, 0.4, 0.58);
      const badge = node.querySelector('[data-intent]');
      if (badge) badge.style.opacity = (intent * lerp(1, 0.82, migrate)).toFixed(3);
      const dot = node.querySelector('[data-dot]');
      if (dot) dot.style.fill = intent > 0.5 ? INTENT_COLOR[query.intent] : 'rgba(148,176,220,0.45)';
    });

    CLUSTERS.forEach((_, i) => {
      const el = clusterRefs.current[i];
      if (!el) return;
      const appear = stagger(t, i, CLUSTERS.length, 0.62, 0.82);
      el.style.opacity = appear.toFixed(3);
      el.style.transform = `translateX(${lerp(-14, 0, appear).toFixed(1)}px)`;
    });

    oppRefs.current.forEach((el, i) => {
      if (!el) return;
      const appear = stagger(t, i, 3, 0.84, 1);
      el.style.opacity = appear.toFixed(3);
      el.style.transform = `translateX(${lerp(12, 0, appear).toFixed(1)}px)`;
    });
  });

  return (
    <div ref={ref}>
      <VisualFrame label="Keyword discovery" note="Product visualization" tall>
        <svg viewBox="0 0 660 300" className="size-full" role="img" aria-label="A seed topic expanding into queries, classified by intent and grouped into clusters">
          {/* Seed */}
          <g ref={seedRef} style={{ transformOrigin: '64px 150px', opacity: 0 }}>
            <rect x="14" y="132" width="104" height="36" rx="9" fill="color-mix(in srgb, var(--scene-accent) 18%, transparent)" stroke="var(--scene-glow)" strokeWidth="1" />
            <text x="66" y="155" textAnchor="middle" className="fill-ink" style={{ font: '600 12px var(--font-display)' }}>
              AI SEO
            </text>
            <text x="66" y="124" textAnchor="middle" className="fill-[var(--color-faint)]" style={{ font: '500 8px var(--font-mono)', letterSpacing: '0.16em' }}>
              SEED
            </text>
          </g>

          {/* Branches */}
          {QUERIES.map((query, i) => (
            <path
              key={query.label}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              d={`M118 150 C 165 150, 168 ${44 + i * 42}, 214 ${44 + i * 42}`}
              fill="none"
              stroke="color-mix(in srgb, var(--scene-glow) 45%, transparent)"
              strokeWidth="1"
              strokeDasharray="260"
              style={{ strokeDashoffset: 260, opacity: 0 }}
            />
          ))}

          {/* Query nodes */}
          {QUERIES.map((query, i) => (
            <g
              key={query.label}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <circle data-dot cx="0" cy="0" r="3.5" fill="rgba(148,176,220,0.45)" />
              <text x="12" y="4" className="fill-ink-soft" style={{ font: '400 11px var(--font-sans)' }}>
                {query.label}
              </text>
              <text data-intent x="12" y="17" className="fill-[var(--color-faint)]" style={{ font: '500 8px var(--font-mono)', letterSpacing: '0.14em', opacity: 0 }}>
                {query.intent.toUpperCase()}
              </text>
            </g>
          ))}

          {/* Cluster labels */}
          {CLUSTERS.map((cluster, i) => (
            <g
              key={cluster.label}
              ref={(el) => {
                clusterRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect x="352" y={cluster.y - 30} width="180" height="60" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(148,176,220,0.18)" strokeWidth="1" />
              <text x="362" y={cluster.y - 16} className="fill-[var(--color-faint)]" style={{ font: '500 8px var(--font-mono)', letterSpacing: '0.16em' }}>
                CLUSTER
              </text>
            </g>
          ))}

          {/* Opportunities */}
          {['High opportunity', 'Content gap', 'Refresh existing'].map((label, i) => (
            <g
              key={label}
              ref={(el) => {
                oppRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect x="552" y={CLUSTERS[i].y - 13} width="96" height="26" rx="13" fill="color-mix(in srgb, var(--scene-accent) 14%, transparent)" stroke="color-mix(in srgb, var(--scene-glow) 40%, transparent)" strokeWidth="1" />
              <text x="600" y={CLUSTERS[i].y + 4} textAnchor="middle" className="fill-[var(--scene-glow)]" style={{ font: '500 8px var(--font-mono)', letterSpacing: '0.1em' }}>
                {label.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>
      </VisualFrame>
    </div>
  );
}
