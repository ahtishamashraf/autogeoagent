'use client';

import { useEffect, useRef, useState } from 'react';
import Container from '@/components/ui/Container';
import LoopDiagram from '@/components/visuals/LoopDiagram';

/**
 * The eight stages, read as a sticky walkthrough.
 *
 * The ring is driven by whichever stage is nearest the middle of the viewport,
 * observed rather than animated on a timeline — so it stays correct when the
 * reader jumps to an anchor, scrolls backwards, or has motion turned off.
 */
export default function LoopWalkthrough({ stages }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean);
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return undefined;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) visible.set(index, entry.intersectionRatio);
          else visible.delete(index);
        });
        if (!visible.size) return;
        // The stage with the most of itself in the band wins; ties go to the
        // earlier stage so reading order and the ring never disagree.
        let best = null;
        let bestRatio = -1;
        visible.forEach((ratio, index) => {
          if (ratio > bestRatio + 0.001 || (Math.abs(ratio - bestRatio) <= 0.001 && best !== null && index < best)) {
            best = index;
            bestRatio = ratio;
          }
        });
        if (best !== null) setActive(best);
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [stages]);

  return (
    <Container className="pb-16 lg:pb-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+3rem)] flex justify-center">
            <LoopDiagram stages={stages} active={active} />
          </div>
        </div>

        <ol className="border-t border-white/8">
          {stages.map((stage, index) => (
            <li
              key={stage.id}
              id={stage.id}
              data-index={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="scroll-mt-28 border-b border-white/8 py-10 lg:py-14"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--scene-glow)]">
                  {stage.number}
                </span>
                <span className="t-micro text-faint">{stage.label}</span>
              </div>

              <h2 className="t-h3 mt-4 text-ink">{stage.heading}</h2>
              <p className="t-body mt-3 max-w-2xl text-[1.02rem]">{stage.summary}</p>
              <p className="t-body mt-4 max-w-2xl">{stage.detail}</p>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {stage.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1 shrink-0 rounded-full bg-[var(--scene-glow)]"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-faint">Output</span>
                <span className="text-[13px] text-ink-soft">{stage.output}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
}
