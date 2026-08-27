'use client';

import { useRef } from 'react';
import { useSceneMotion } from '@/lib/hooks';
import { beat, clamp, lerp, mapRange, smoothstep, stagedTime, stagger } from '@/lib/animations';
import { usesTopBand } from '@/lib/scene-config';
import { DataNote, Frame, FrameBar } from './primitives';

/**
 * Scene 01 — SEARCH.
 *
 * A search results surface where one result climbs the page as the agent
 * optimises it. Rank positions are conceptual, and the interface is labelled
 * as a product visualization rather than a customer outcome.
 */

const QUERY = 'AI SEO automation';

const RESULTS = [
  { title: 'Automating technical SEO at scale', host: 'industry-guide.com' },
  { title: 'Search intent research workflows', host: 'searchnotes.io' },
  { title: 'Content operations for organic growth', host: 'contentops.dev' },
  { title: 'Keyword clustering: a practical method', host: 'seolab.net' },
  { title: 'Measuring search visibility over time', host: 'analytics-weekly.com' },
];

const RANKS = ['#18', '#11', '#7', '#4'];

/* Base placement is expressed in container percentages; the gather motion is
   applied as a pixel transform so the two never fight each other. */
const KEYWORDS = [
  { label: 'AI SEO agent', top: 4, offset: 34, gather: [96, 74] },
  { label: 'automated SEO', top: 28, offset: 96, gather: [120, 40] },
  { label: 'SEO automation', top: 54, offset: 52, gather: [104, -18] },
  { label: 'AI content optimization', top: 78, offset: 118, gather: [136, -60] },
  { label: 'search visibility', top: 98, offset: 26, gather: [92, -96] },
];

export default function SearchInterface({ sceneIndex = 1 }) {
  const charRefs = useRef([]);
  const caretRef = useRef(null);
  const rowRefs = useRef([]);
  const ownerRef = useRef(null);
  const rankRef = useRef(null);
  const keywordRefs = useRef([]);
  const frameRef = useRef(null);
  const offsets = useRef(null);

  const root = useSceneMotion(sceneIndex, (el, raw, state) => {
    const t = stagedTime(raw, state.stacked || usesTopBand(sceneIndex));
    const visible = beat(t, 0.02, 0.34, 0.76, 0.99);
    el.style.opacity = visible.toFixed(3);
    el.style.visibility = visible < 0.01 ? 'hidden' : 'visible';

    // The whole surface arrives from depth and leaves toward the core.
    const enter = smoothstep(0, 0.36, t);
    const exit = smoothstep(0.74, 1, t);
    const z = lerp(-320, 0, enter) + exit * 260;
    const rotY = lerp(14, 0, enter) - exit * 16;
    el.style.transform = `perspective(1600px) translate3d(0, ${(1 - enter) * 40 - exit * 60}px, ${z}px) rotateY(${(rotY * (state.stacked ? 0.4 : 1)).toFixed(2)}deg) scale(${lerp(0.94, 1, enter) * (1 - exit * 0.08)})`;

    /* --- query typing ------------------------------------------- */
    const chars = charRefs.current;
    if (chars.length) {
      if (!offsets.current) {
        offsets.current = chars.map((c) => (c ? c.offsetLeft + c.offsetWidth : 0));
      }
      const typed = mapRange(t, 0.06, 0.3, 0, chars.length);
      for (let i = 0; i < chars.length; i += 1) {
        const c = chars[i];
        if (!c) continue;
        c.style.opacity = i < typed ? '1' : '0';
      }
      if (caretRef.current) {
        const idx = clamp(Math.floor(typed), 0, chars.length - 1);
        const x = offsets.current[idx] || 0;
        caretRef.current.style.transform = `translateX(${x}px)`;
        caretRef.current.style.opacity = t > 0.32 ? '0' : '1';
      }
    }

    /* --- results appear ----------------------------------------- */
    const listIn = smoothstep(0.28, 0.42, t);
    if (frameRef.current) frameRef.current.style.opacity = listIn.toFixed(3);

    // The owned result climbs from position 6 to position 1.
    const climb = smoothstep(0.34, 0.78, t);
    const ownerSlot = lerp(5, 0, climb);

    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      // A tight window means a row is either above or below the climbing
      // result, never sharing its line for long enough to read as overlap.
      const pushed = i + smoothstep(i + 0.62, i + 0.18, ownerSlot);
      row.style.transform = `translate3d(0, calc(${pushed} * var(--row-h)), 0)`;
      row.style.opacity = (0.32 + stagger(t, i, RESULTS.length, 0.28, 0.5) * 0.5).toFixed(3);
    });

    if (ownerRef.current) {
      ownerRef.current.style.transform = `translate3d(0, calc(${ownerSlot} * var(--row-h)), 0)`;
      ownerRef.current.style.opacity = listIn.toFixed(3);
      ownerRef.current.style.setProperty('--lift', climb.toFixed(3));
    }

    if (rankRef.current) {
      const step = clamp(Math.floor(mapRange(t, 0.34, 0.8, 0, RANKS.length)), 0, RANKS.length - 1);
      if (rankRef.current.textContent !== RANKS[step]) rankRef.current.textContent = RANKS[step];
    }

    /* --- keyword cloud gathers into clusters -------------------- */
    keywordRefs.current.forEach((chip, i) => {
      if (!chip) return;
      const appear = stagger(t, i, KEYWORDS.length, 0.12, 0.46);
      const gather = smoothstep(0.5, 0.86, t);
      const k = KEYWORDS[i];
      chip.style.opacity = (appear * (1 - smoothstep(0.86, 1, t))).toFixed(3);
      chip.style.transform = `translate3d(${(k.gather[0] * gather).toFixed(1)}px, ${(k.gather[1] * gather).toFixed(1)}px, 0) scale(${lerp(0.85, 1, appear)})`;
    });
  });

  return (
    <div
      ref={root}
      className="pointer-events-none absolute inset-0 flex items-start justify-center lg:items-center [--serp-row:48px] opacity-0 sm:[--serp-row:56px] lg:justify-end lg:pr-[4vw] lg:[--serp-row:62px]"
      style={{ '--row-h': 'var(--serp-row)' }}
    >
      <div className="relative w-[min(94vw,540px)] lg:w-[min(42vw,560px)]">
        {/* Keyword cloud */}
        {KEYWORDS.map((keyword, i) => (
          <span
            key={keyword.label}
            ref={(el) => {
              keywordRefs.current[i] = el;
            }}
            style={{ top: `${keyword.top}%`, right: '100%', marginRight: `${keyword.offset}px` }}
            className="absolute hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/12 bg-[#080d16]/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-soft opacity-0 backdrop-blur-md 2xl:block"
          >
            {keyword.label}
          </span>
        ))}

        <Frame className="relative">
          <FrameBar title="Search results" right={<DataNote short="Sample">Product visualization</DataNote>} />

          {/* Query bar */}
          <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3.5">
            <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-faint" aria-hidden="true">
              <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <div className="relative min-w-0 flex-1">
              <span className="block whitespace-nowrap text-[13px] text-ink sm:text-sm">
                {QUERY.split('').map((char, i) => (
                  <span
                    key={`${char}-${i}`}
                    ref={(el) => {
                      charRefs.current[i] = el;
                    }}
                    className="inline-block whitespace-pre opacity-0"
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span
                ref={caretRef}
                aria-hidden="true"
                className="absolute left-0 top-1/2 h-[1.1em] w-px -translate-y-1/2 bg-[var(--scene-glow)]"
              />
            </div>
          </div>

          {/* Results */}
          <div
            ref={frameRef}
            className="relative px-3 py-3 opacity-0"
            style={{ height: 'calc(6 * var(--row-h) + 12px)' }}
          >
            {RESULTS.map((result, i) => (
              <div
                key={result.host}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className="absolute inset-x-3 top-3 flex h-[var(--row-h)] items-start gap-3 rounded-lg px-2.5 py-2 opacity-0"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 size-6 shrink-0 rounded-md border border-white/10 bg-white/[0.04]"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] text-faint">{result.host}</span>
                  <span className="mt-0.5 block truncate text-[12.5px] text-ink-soft">
                    {result.title}
                  </span>
                </span>
              </div>
            ))}

            {/* The optimised result */}
            <div
              ref={ownerRef}
              className="absolute inset-x-3 top-3 z-10 flex h-[var(--row-h)] items-start gap-3 rounded-lg border px-2.5 py-2 opacity-0"
              style={{
                backgroundColor: '#0a1019',
                borderColor:
                  'color-mix(in srgb, var(--scene-glow) calc(28% + var(--lift, 0) * 42%), transparent)',
                // Opaque: the climbing result passes over the others, so it must
                // never let their text show through.
                background:
                  'linear-gradient(100deg, color-mix(in srgb, var(--scene-accent) calc(10% + var(--lift, 0) * 12%), #0a1019) 0%, #0a1019 70%)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.02) inset',
              }}
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--scene-glow)_45%,transparent)] bg-[color-mix(in_srgb,var(--scene-accent)_22%,transparent)]"
              >
                <span className="size-1.5 rounded-full bg-[var(--scene-glow)] shadow-[0_0_8px_var(--scene-glow)]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-[11px] text-[var(--scene-glow)]">Your Website</span>
                  <span
                    ref={rankRef}
                    className="rounded border border-white/12 bg-black/40 px-1.5 py-px font-mono text-[9px] tracking-[0.08em] text-ink-soft"
                  >
                    #18
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-[12.5px] font-medium text-ink">
                  AI SEO automation, built as an agent
                </span>
              </span>
            </div>
          </div>
        </Frame>
      </div>
    </div>
  );
}
