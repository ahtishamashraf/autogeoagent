/**
 * Registry for the single smooth-scroll instance.
 *
 * Lenis only runs on the cinematic homepage, but global concerns — route
 * changes, anchor links, skip links — need to reach it without importing the
 * homepage tree. Exactly one instance may be registered at a time; registering
 * a second would mean two competing scroll systems, which is the bug this
 * registry exists to prevent.
 */

let instance = null;

export const registerSmoothScroll = (lenis) => {
  instance = lenis;
  return () => {
    if (instance === lenis) instance = null;
  };
};

export const getSmoothScroll = () => instance;

/** Jump to the top through whichever scroll system is currently active. */
export const resetScroll = () => {
  if (typeof window === 'undefined') return;

  const lenis = instance;
  if (lenis) {
    // `immediate` skips the easing, `force` overrides `stop()` and any
    // in-flight programmatic scroll.
    lenis.scrollTo(0, { immediate: true, force: true, lock: false });
  }
  window.scrollTo(0, 0);
};
