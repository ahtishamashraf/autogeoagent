'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getSmoothScroll, resetScroll } from '@/lib/smooth-scroll';

/**
 * Every route navigation starts at the top of the page.
 *
 * Three things could otherwise leave a new page scrolled into its middle:
 * the browser's own scroll restoration, Lenis holding an internal position
 * from the previous route, and ScrollTrigger's cached measurements from the
 * cinematic homepage. This resets all three.
 *
 * A deliberate `#hash` is respected — that navigation asked for a position.
 */
export default function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    // Take scroll position away from the browser: we restore it ourselves, and
    // the cinematic homepage measures its own timeline on load.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const lenis = getSmoothScroll();
        if (lenis) lenis.scrollTo(target, { offset: -88, immediate: true, force: true });
        else target.scrollIntoView();
        return undefined;
      }
    }

    resetScroll();

    // Late-arriving layout (fonts, the lazily loaded canvas, sticky measuring)
    // can nudge the document. Two frames is enough to settle without ever
    // fighting a user who has already started scrolling.
    let frame = 0;
    let second = 0;
    frame = requestAnimationFrame(() => {
      if (window.scrollY > 0) resetScroll();
      second = requestAnimationFrame(() => {
        if (window.scrollY > 0) resetScroll();
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(second);
    };
  }, [pathname]);

  return null;
}
