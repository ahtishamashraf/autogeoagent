'use client';

import { useEffect, useRef } from 'react';
import { lerp, smoothstep, stagger } from '@/lib/animations';
import { useScrollScrub } from './useScrollScrub';
import VisualFrame from './VisualFrame';

/**
 * Published pages emitting performance signals.
 *
 * The trend line draws with scroll and the movers arrive behind it, so the
 * chart and the list always tell the same story at any scroll position.
 */

const SERIES = [12, 18, 16, 27, 31, 29, 40, 47, 44, 58, 66, 63, 78, 88];

const MOVERS = [
  { label: 'ai seo agent', delta: '+9', tone: 'up' },
  { label: 'seo automation', delta: '+6', tone: 'up' },
  { label: 'generative engine optimization', delta: '+4', tone: 'up' },
  { label: 'seo audit tool', delta: '-2', tone: 'down' },
];

const path = (values, w, h) => {
  const max = Math.max(...values) * 1.1;
  const step = w / (values.length - 1);
  return values
    .map((v, i) => {
      const x = i * step;
      const y = h - (v / max) * h;
      if (i === 0) return `M${x.toFixed(1)} ${y.toFixed(1)}`;
      const px = (i - 1) * step;
      const py = h - (values[i - 1] / max) * h;
      const cx = (px + x) / 2;
      return `C${cx.toFixed(1)} ${py.toFixed(1)} ${cx.toFixed(1)} ${y.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
};

const LINE = path(SERIES, 420, 130);

export default function MonitoringVisual() {
  const lineRef = useRef(null);
  const areaRef = useRef(null);
  const dotRef = useRef(null);
  const moverRefs = useRef([]);
  const valueRef = useRef(null);
  const length = useRef(1);

  useEffect(() => {
    if (lineRef.current) length.current = lineRef.current.getTotalLength() || 1;
  }, []);

  const ref = useScrollScrub((_, t) => {
    const draw = smoothstep(0.05, 0.72, t);
    if (lineRef.current) {
      lineRef.current.style.strokeDasharray = `${length.current}`;
      lineRef.current.style.strokeDashoffset = `${(length.current * (1 - draw)).toFixed(1)}`;
    }
    if (areaRef.current) areaRef.current.setAttribute('width', (420 * draw).toFixed(1));
    if (dotRef.current && lineRef.current && draw > 0.001) {
      const p = lineRef.current.getPointAtLength(length.current * draw);
      dotRef.current.setAttribute('cx', p.x.toFixed(1));
      dotRef.current.setAttribute('cy', p.y.toFixed(1));
      dotRef.current.style.opacity = draw < 0.999 ? '1' : '0';
    }
    if (valueRef.current) {
      const value = Math.round(lerp(0, 34, draw));
      const next = `+${value}%`;
      if (valueRef.current.textContent !== next) valueRef.current.textContent = next;
    }
    moverRefs.current.forEach((el, i) => {
      if (!el) return;
      const appear = stagger(t, i, MOVERS.length, 0.5, 0.95);
      el.style.opacity = appear.toFixed(3);
      el.style.transform = `translateX(${lerp(10, 0, appear).toFixed(1)}px)`;
    });
  });

  return (
    <div ref={ref}>
      <VisualFrame label="Search visibility — 90 days" note="Illustrative data" tall>
        <div className="grid h-full grid-cols-1 gap-4 px-5 py-5 sm:px-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,15rem)]">
          <div className="flex flex-col justify-center">
            <p className="flex items-baseline gap-2">
              <span ref={valueRef} className="font-display text-2xl font-semibold text-signal">
                +0%
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                visibility
              </span>
            </p>
            <svg viewBox="0 0 420 140" className="mt-3 w-full" aria-hidden="true">
              <defs>
                <linearGradient id="mon-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--scene-glow)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--scene-glow)" stopOpacity="0" />
                </linearGradient>
                <clipPath id="mon-clip">
                  <rect ref={areaRef} x="0" y="0" width="0" height="140" />
                </clipPath>
              </defs>
              {[0, 32.5, 65, 97.5, 130].map((y) => (
                <line key={y} x1="0" y1={y} x2="420" y2={y} stroke="rgba(148,176,220,0.09)" strokeWidth="1" />
              ))}
              <g clipPath="url(#mon-clip)">
                <path d={`${LINE} L420 130 L0 130 Z`} fill="url(#mon-area)" />
              </g>
              <path ref={lineRef} d={LINE} fill="none" stroke="var(--scene-glow)" strokeWidth="2" strokeLinecap="round" />
              <circle ref={dotRef} r="3.5" fill="#fff" stroke="var(--scene-glow)" strokeWidth="2" style={{ opacity: 0 }} />
            </svg>
          </div>

          <div className="flex flex-col justify-center gap-1.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">Movement</p>
            {MOVERS.map((mover, i) => (
              <span
                key={mover.label}
                ref={(el) => {
                  moverRefs.current[i] = el;
                }}
                className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 opacity-0"
              >
                <span className="min-w-0 truncate text-[11.5px] text-muted">{mover.label}</span>
                <span
                  className={`shrink-0 font-mono text-[10px] ${mover.tone === 'up' ? 'text-signal' : 'text-violet-soft'}`}
                >
                  {mover.delta}
                </span>
              </span>
            ))}
          </div>
        </div>
      </VisualFrame>
    </div>
  );
}
