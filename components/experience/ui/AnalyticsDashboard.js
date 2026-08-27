'use client';

import { useEffect, useRef } from 'react';
import { useSceneMotion } from '@/lib/hooks';
import { beat, clamp, lerp, smoothstep, stagedTime, stagger } from '@/lib/animations';
import { DataNote, Frame, FrameBar } from './primitives';

/**
 * Scene 06 — PERFORMANCE.
 *
 * Panels sit at different depths so the dashboard reads as a space rather than
 * a wall of cards. Every chart is a function of scroll position, so scrolling
 * back up rewinds the graphs. All numbers are illustrative.
 */

const SERIES = [8, 14, 12, 22, 26, 24, 34, 41, 38, 52, 60, 58, 72, 84];
const BARS = [32, 48, 26, 58, 44, 70, 52, 78];

const TILES = [
  { label: 'Search visibility', value: 31, suffix: '%', prefix: '+', tone: 'signal' },
  { label: 'Keywords improving', value: 42, suffix: '', prefix: '', tone: 'glow' },
  { label: 'Content opportunities', value: 18, suffix: '', prefix: '', tone: 'default' },
];

const MOVERS = [
  { keyword: 'ai seo agent', delta: 9 },
  { keyword: 'seo automation', delta: 6 },
  { keyword: 'generative engine optimization', delta: 4 },
  { keyword: 'ai search visibility', delta: 3 },
];

const chartPath = (values, width, height) => {
  const max = Math.max(...values) * 1.12;
  const step = width / (values.length - 1);
  return values
    .map((value, i) => {
      const x = i * step;
      const y = height - (value / max) * height;
      if (i === 0) return `M${x.toFixed(1)} ${y.toFixed(1)}`;
      const prevX = (i - 1) * step;
      const prevY = height - (values[i - 1] / max) * height;
      const cx = (prevX + x) / 2;
      return `C${cx.toFixed(1)} ${prevY.toFixed(1)} ${cx.toFixed(1)} ${y.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
};

const LINE = chartPath(SERIES, 460, 130);

export default function AnalyticsDashboard({ sceneIndex = 6 }) {
  const lineRef = useRef(null);
  const areaRef = useRef(null);
  const dotRef = useRef(null);
  const tileRefs = useRef([]);
  const valueRefs = useRef([]);
  const barRefs = useRef([]);
  const moverRefs = useRef([]);
  const aiRef = useRef(null);
  const length = useRef(1);

  useEffect(() => {
    if (lineRef.current) length.current = lineRef.current.getTotalLength() || 1;
  }, []);

  const root = useSceneMotion(sceneIndex, (el, raw, state) => {
    const t = stagedTime(raw, state.stacked);
    const visible = beat(t, -0.02, 0.24, 0.78, 1);
    el.style.opacity = visible.toFixed(3);
    el.style.visibility = visible < 0.01 ? 'hidden' : 'visible';

    const enter = smoothstep(0, 0.26, t);
    const exit = smoothstep(0.8, 1, t);
    el.style.transform = `perspective(1700px) translate3d(0, ${((1 - enter) * 40 - exit * 30).toFixed(1)}px, 0)`;

    /* --- line chart draws with the scroll ------------------------ */
    const draw = smoothstep(0.16, 0.72, t);
    if (lineRef.current) {
      lineRef.current.style.strokeDasharray = `${length.current}`;
      lineRef.current.style.strokeDashoffset = `${(length.current * (1 - draw)).toFixed(1)}`;
    }
    if (areaRef.current) {
      areaRef.current.setAttribute('width', (460 * draw).toFixed(1));
    }
    if (dotRef.current && lineRef.current && draw > 0.001) {
      const point = lineRef.current.getPointAtLength(length.current * draw);
      dotRef.current.setAttribute('cx', point.x.toFixed(1));
      dotRef.current.setAttribute('cy', point.y.toFixed(1));
      dotRef.current.style.opacity = draw < 0.999 ? '1' : '0';
    }

    /* --- tiles float at different depths ------------------------- */
    tileRefs.current.forEach((node, i) => {
      if (!node) return;
      const appear = stagger(t, i, TILES.length, 0.1, 0.42);
      const depth = [40, -30, 20][i] || 0;
      node.style.opacity = appear.toFixed(3);
      node.style.transform = `translate3d(0, ${((1 - appear) * 18).toFixed(1)}px, ${(lerp(-140, depth, appear)).toFixed(1)}px)`;
    });

    valueRefs.current.forEach((node, i) => {
      if (!node) return;
      const grow = smoothstep(0.18, 0.62, t);
      const tile = TILES[i];
      const next = `${tile.prefix}${Math.round(tile.value * grow)}${tile.suffix}`;
      if (node.textContent !== next) node.textContent = next;
    });

    /* --- distribution bars --------------------------------------- */
    barRefs.current.forEach((node, i) => {
      if (!node) return;
      const grow = stagger(t, i, BARS.length, 0.3, 0.72);
      node.style.transform = `scaleY(${grow.toFixed(3)})`;
      node.style.opacity = (0.35 + grow * 0.65).toFixed(3);
    });

    /* --- keyword movement ---------------------------------------- */
    moverRefs.current.forEach((node, i) => {
      if (!node) return;
      const appear = stagger(t, i, MOVERS.length, 0.4, 0.78);
      node.style.opacity = appear.toFixed(3);
      node.style.transform = `translate3d(${((1 - appear) * 14).toFixed(1)}px, 0, 0)`;
    });

    if (aiRef.current) {
      const appear = smoothstep(0.52, 0.76, t);
      aiRef.current.style.opacity = appear.toFixed(3);
      aiRef.current.style.transform = `translate3d(0, ${((1 - appear) * 16).toFixed(1)}px, ${(lerp(-120, 60, appear)).toFixed(1)}px)`;
    }
  });

  return (
    <div
      ref={root}
      className="pointer-events-none absolute inset-0 flex items-start justify-center lg:items-center opacity-0"
    >
      <div
        className="grid w-[min(94vw,980px)] gap-3 lg:grid-cols-[1.55fr_1fr]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Visibility trend */}
        <Frame tone="raised" className="order-2 lg:order-1">
          <FrameBar title="Search visibility" right={<DataNote>Illustrative data</DataNote>} />
          <div className="px-4 pb-3 pt-4">
            <div className="grid grid-cols-3 gap-2">
              {TILES.map((tile, i) => (
                <span
                  key={tile.label}
                  ref={(el) => {
                    tileRefs.current[i] = el;
                  }}
                  className="flex flex-col gap-1 rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-2 opacity-0"
                >
                  <span className="truncate font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
                    {tile.label}
                  </span>
                  <span
                    ref={(el) => {
                      valueRefs.current[i] = el;
                    }}
                    className={`font-display text-lg font-semibold tracking-[-0.03em] ${
                      tile.tone === 'signal'
                        ? 'text-signal'
                        : tile.tone === 'glow'
                          ? 'text-[var(--scene-glow)]'
                          : 'text-ink'
                    }`}
                  >
                    0
                  </span>
                </span>
              ))}
            </div>

            <svg viewBox="0 0 460 134" className="mt-4 w-full" aria-hidden="true">
              <defs>
                <linearGradient id="gga-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--scene-glow)" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="var(--scene-glow)" stopOpacity="0" />
                </linearGradient>
                <clipPath id="gga-clip">
                  <rect ref={areaRef} x="0" y="0" width="0" height="134" />
                </clipPath>
              </defs>

              {[0, 32.5, 65, 97.5, 130].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="460"
                  y2={y}
                  stroke="rgba(148,176,220,0.09)"
                  strokeWidth="1"
                />
              ))}

              <g clipPath="url(#gga-clip)">
                <path d={`${LINE} L460 130 L0 130 Z`} fill="url(#gga-area)" />
              </g>

              <path
                ref={lineRef}
                d={LINE}
                fill="none"
                stroke="var(--scene-glow)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                ref={dotRef}
                r="3.5"
                fill="#ffffff"
                stroke="var(--scene-glow)"
                strokeWidth="2"
                style={{ opacity: 0 }}
              />

            </svg>

            {/* Topic distribution */}
            <div className="mt-3 border-t border-white/8 pt-3">
              <p className="t-micro mb-2 text-[9px] text-faint">Topics improving</p>
              <svg viewBox="0 0 460 40" className="h-10 w-full" preserveAspectRatio="none" aria-hidden="true">
                {BARS.map((bar, i) => (
                  <rect
                    key={bar}
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                    x={i * 57 + 12}
                    y={40 - (bar / 100) * 40}
                    width="14"
                    height={(bar / 100) * 40}
                    rx="2"
                    fill="var(--scene-accent)"
                    opacity="0.45"
                    style={{ transformOrigin: `${i * 57 + 19}px 40px`, transform: 'scaleY(0)' }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </Frame>

        {/* Movement + AI visibility */}
        <div className="order-1 hidden space-y-3 lg:order-2 lg:block">
          <Frame tone="deep">
            <FrameBar title="Keyword movement" icon={false} />
            <ul className="px-3.5 py-3">
              {MOVERS.map((mover, i) => (
                <li
                  key={mover.keyword}
                  ref={(el) => {
                    moverRefs.current[i] = el;
                  }}
                  className="flex items-center justify-between gap-3 border-b border-white/6 py-1.5 text-[11.5px] last:border-0 opacity-0"
                >
                  <span className="truncate text-muted">{mover.keyword}</span>
                  <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] text-signal">
                    <svg viewBox="0 0 10 10" className="size-2.5" aria-hidden="true">
                      <path d="M5 8V2m0 0L2 5m3-3 3 3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                    </svg>
                    {mover.delta}
                  </span>
                </li>
              ))}
            </ul>
          </Frame>

          <div ref={aiRef} className="opacity-0">
            <Frame>
              <div className="flex items-center justify-between gap-3 px-3.5 py-3">
                <span>
                  <span className="block font-mono text-[8.5px] uppercase tracking-[0.16em] text-faint">
                    AI visibility
                  </span>
                  <span className="mt-1 block font-display text-base font-semibold tracking-[-0.02em] text-ink">
                    Increasing
                  </span>
                </span>
                <span className="flex items-end gap-1" aria-hidden="true">
                  {[6, 10, 8, 14, 18, 22].map((h, i) => (
                    <span
                      key={h}
                      className="w-1.5 rounded-full bg-[var(--scene-glow)]"
                      style={{ height: `${h}px`, opacity: 0.35 + i * 0.11 }}
                    />
                  ))}
                </span>
              </div>
            </Frame>
          </div>
        </div>
      </div>
    </div>
  );
}
