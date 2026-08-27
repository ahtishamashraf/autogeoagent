'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import {
  experienceState,
  getSceneIndex,
  getSceneIndexServer,
  onFrame,
  onSceneChange,
} from './experience-store';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Run `fn(state, dt)` on every experience frame. The callback also runs once
 * immediately on mount so elements never paint in an un-styled state.
 */
export function useMotionFrame(fn) {
  const ref = useRef(fn);

  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  });

  useIsomorphicLayoutEffect(() => {
    const handler = (state, dt) => ref.current(state, dt);
    handler(experienceState, 0);
    return onFrame(handler);
  }, []);
}

/** Re-renders only when the active scene index changes. */
export function useSceneIndex() {
  return useSyncExternalStore(onSceneChange, getSceneIndex, getSceneIndexServer);
}

/**
 * Media queries read through useSyncExternalStore, so the value is correct on
 * the first client render instead of arriving one paint late.
 */
export function useMediaQuery(query, serverValue = false) {
  const subscribe = useCallback(
    (notify) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener('change', notify);
      return () => mql.removeEventListener('change', notify);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverValue, [serverValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)', false);
}

/** True once past `threshold` pixels of scroll — correct on first paint. */
export function useScrolledPast(threshold = 24) {
  const subscribe = useCallback((notify) => {
    window.addEventListener('scroll', notify, { passive: true });
    return () => window.removeEventListener('scroll', notify);
  }, []);

  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Conservative capability tiering. We deliberately avoid heavy or unreliable
 * hardware fingerprinting — viewport size, pointer type, core count and the
 * reported memory hint are enough to decide how much WebGL work is safe.
 *
 *   3 full   — desktop, fine pointer, plenty of cores
 *   2 medium — desktop and tablets
 *   1 low    — phones
 *   0 static — prefers-reduced-motion
 */
const readTier = () => {
  if (typeof window === 'undefined') return 2;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;

  const width = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  const coarse = window.matchMedia('(pointer: coarse)').matches;

  if (width < 768 || (coarse && width < 1100)) return 1;
  if (width >= 1280 && cores >= 8 && memory >= 4 && !coarse) return 3;
  return 2;
};

export function useQualityTier() {
  const subscribe = useCallback((notify) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    window.addEventListener('resize', notify, { passive: true });
    reduced.addEventListener('change', notify);
    coarse.addEventListener('change', notify);
    return () => {
      window.removeEventListener('resize', notify);
      reduced.removeEventListener('change', notify);
      coarse.removeEventListener('change', notify);
    };
  }, []);

  const tier = useSyncExternalStore(
    subscribe,
    readTier,
    () => 2,
  );

  // Mirror the tier onto the shared state so the WebGL layer can read it
  // without subscribing to React.
  useEffect(() => {
    experienceState.quality = tier;
    experienceState.reducedMotion = tier === 0;
  }, [tier]);

  return tier;
}

export function useIsMobile(breakpoint = 768) {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`, false);
}

/**
 * Scene-relative motion.
 *
 * `apply(el, t, state)` runs every frame with `t` = 0 at the start of the given
 * scene and 1 at its end (negative before, greater than 1 after). Because `t`
 * is derived purely from scroll position, every animation written with this
 * hook reverses exactly.
 */
const MOTION_PROPS = ['opacity', 'visibility', 'transform', 'filter', 'letterSpacing'];

/** Strip only the properties the motion layer writes, leaving layout intact. */
const clearMotionStyles = (root) => {
  const reset = (node) => {
    MOTION_PROPS.forEach((prop) => {
      node.style[prop] = '';
    });
  };
  reset(root);
  root.querySelectorAll('[style]').forEach(reset);
};

export function useSceneMotion(sceneIndex, apply) {
  const ref = useRef(null);
  const fn = useRef(apply);
  const cleared = useRef(false);

  useIsomorphicLayoutEffect(() => {
    fn.current = apply;
  });

  useMotionFrame((state) => {
    const el = ref.current;
    if (!el) return;

    // Under reduced motion nothing is driven by scroll: the stylesheet lays the
    // story out as an ordinary document. We clear rather than merely skip,
    // because the media query resolves one commit after hydration and a frame of
    // scroll-driven styling can land before the preference is known.
    if (state.reducedMotion) {
      if (!cleared.current) {
        cleared.current = true;
        clearMotionStyles(el);
      }
      return;
    }

    cleared.current = false;
    fn.current(el, state.rangeIndex + state.blend - sceneIndex, state);
  });

  return ref;
}
