/**
 * Small, allocation-free math helpers used by every scroll-driven animation.
 * Everything here is a pure function of progress, which is what makes the whole
 * experience perfectly reversible when the user scrolls back up.
 */

export const clamp = (v, min = 0, max = 1) => (v < min ? min : v > max ? max : v);

export const lerp = (a, b, t) => a + (b - a) * t;

export const inverseLerp = (a, b, v) => (b === a ? 0 : (v - a) / (b - a));

/** Map v from [inMin,inMax] to [outMin,outMax] with clamping. */
export const mapRange = (v, inMin, inMax, outMin, outMax) =>
  lerp(outMin, outMax, clamp(inverseLerp(inMin, inMax, v)));

/** Smooth 0 -> 1 ramp between two thresholds. */
export const smoothstep = (edge0, edge1, v) => {
  const t = clamp(inverseLerp(edge0, edge1, v));
  return t * t * (3 - 2 * t);
};

/** Smoother ramp (C2 continuous) — nicer for camera moves. */
export const smootherstep = (edge0, edge1, v) => {
  const t = clamp(inverseLerp(edge0, edge1, v));
  return t * t * t * (t * (t * 6 - 15) + 10);
};

/**
 * A "beat": ramps 0 -> 1 while entering, holds at 1, then ramps back to 0.
 * Used for elements that appear, hold, and leave inside a scene.
 */
export const beat = (v, inStart, inEnd, outStart = 1.1, outEnd = 1.2) =>
  smoothstep(inStart, inEnd, v) * (1 - smoothstep(outStart, outEnd, v));

/** Triangle pulse peaking at `center`. */
export const pulse = (v, center, width) => {
  const d = Math.abs(v - center) / width;
  return clamp(1 - d);
};

export const easeOutCubic = (t) => 1 - Math.pow(1 - clamp(t), 3);
export const easeInCubic = (t) => Math.pow(clamp(t), 3);
export const easeInOutCubic = (t) => {
  const x = clamp(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
export const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * clamp(t)));
export const easeOutBack = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const x = clamp(t);
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

/** Frame-rate independent damping toward a target. */
export const damp = (current, target, lambda, dt) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

/** Staggered ramp for list items: item i of n animating across [start,end]. */
export const stagger = (v, i, n, start, end, overlap = 0.6) => {
  const slot = (end - start) / (n - (n - 1) * overlap || 1);
  const itemStart = start + i * slot * (1 - overlap);
  return smoothstep(itemStart, itemStart + slot, v);
};

/** Hex -> [r,g,b] in 0..1, memoised. */
const hexCache = new Map();
export const hexToRgb = (hex) => {
  if (hexCache.has(hex)) return hexCache.get(hex);
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const int = parseInt(full, 16);
  const rgb = [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
  hexCache.set(hex, rgb);
  return rgb;
};

export const mixHex = (a, b, t) => {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  const to255 = (x) => Math.round(clamp(x) * 255);
  return `rgb(${to255(lerp(r1, r2, t))}, ${to255(lerp(g1, g2, t))}, ${to255(lerp(b1, b2, t))})`;
};

/**
 * Scene time for the interface layer.
 *
 * Where copy and interface share a column, the copy travels up through the
 * interface area for roughly the first third of a scene. Staged scenes wait for
 * that and play their whole arc inside the pinned hold; side-by-side scenes have
 * no conflict and use the raw value.
 */
export const stagedTime = (t, staged) => (staged ? (t - 0.34) / 0.62 : t);

/** Deterministic pseudo-random — stable between server and client renders. */
export const seeded = (seed) => {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};
