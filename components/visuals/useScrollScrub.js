'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Scroll-scrubbed progress for interior pages.
 *
 * Same contract as the cinematic homepage: `apply(el, t)` receives 0 -> 1 as
 * the section passes through the viewport, and the visual is a pure function
 * of it. Stopping halfway leaves the visual halfway; scrolling back reverses.
 *
 * Everything is created inside a gsap.context and reverted on unmount, so a
 * remount — including React Strict Mode's double invocation — can never leave a
 * stale ScrollTrigger behind.
 */
const useLatest = (value) => {
  const ref = useRef(value);
  useIsoLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
};

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useScrollScrub(apply, { start = 'top 80%', end = 'bottom 40%' } = {}) {
  const ref = useRef(null);
  const fn = useLatest(apply);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      // A single settled frame: all content visible, nothing animating.
      fn.current(el, 1);
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start,
        end,
        onUpdate: (self) => fn.current(el, self.progress),
        onRefresh: (self) => fn.current(el, self.progress),
      });
    }, el);

    fn.current(el, 0);
    return () => ctx.revert();
  }, [start, end, fn]);

  return ref;
}

/**
 * A pinned stage: the visual holds while the surrounding copy scrolls past.
 * Used where a page needs a longer, staged sequence rather than a single pass.
 */
export function useStageScrub(apply, { endDistance = '+=180%' } = {}) {
  const ref = useRef(null);
  const fn = useLatest(apply);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      fn.current(el, 1);
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 65%',
        end: endDistance,
        onUpdate: (self) => fn.current(el, self.progress),
        onRefresh: (self) => fn.current(el, self.progress),
      });
    }, el);

    fn.current(el, 0);
    return () => ctx.revert();
  }, [endDistance, fn]);

  return ref;
}
