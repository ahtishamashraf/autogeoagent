/**
 * The experience store.
 *
 * A single mutable state object is updated once per animation frame by
 * ScrollController. Nothing in here triggers a React render during scroll:
 *  - continuous consumers (WebGL, DOM transforms) subscribe per frame
 *  - discrete consumers (scene navigation) subscribe to scene-index changes
 *
 * Every value is a pure function of the scroll position, which guarantees the
 * whole experience reverses exactly when the user scrolls back up.
 */

import { scenes } from './scene-config';

const SCENE_COUNT = scenes.length;

/**
 * Read once at module load — before any component effect runs — so the very
 * first frame already knows which layout and motion mode it is in.
 */
const initialMedia = (query) =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(query).matches
    : false;

export const experienceState = {
  /** Raw 0 -> 1 progress across the whole cinematic wrapper. */
  progress: 0,
  /** Normalised "story time": (sceneIndex + localProgress) / sceneCount. */
  story: 0,
  /** Per-scene local progress, contiguous and gap-free. */
  local: new Float32Array(SCENE_COUNT),
  /** Index of the scene currently owning the screen (navigation state). */
  sceneIndex: 0,
  /** Index of the scene range the scroll position sits in (visual state). */
  rangeIndex: 0,
  /** Blend factor between sceneIndex and sceneIndex + 1 (0..1). */
  blend: 0,
  /** Signed scroll velocity in px/frame, smoothed. */
  velocity: 0,
  /** 1 down, -1 up. */
  direction: 1,
  /** Pointer position in normalised device coordinates (-1..1). */
  pointerX: 0,
  pointerY: 0,
  /** Load-in progress, 0 -> 1, driven by time rather than scroll. */
  intro: 0,
  /** 0 -> 1: how fully a full-screen statement owns the frame right now. */
  statement: 0,
  /** True below the split-layout breakpoint: copy on top, agent below. */
  stacked: initialMedia('(max-width: 1023px)'),
  /** Set once the controller has measured the document. */
  ready: false,
  /** Rendering budget: 3 = full, 2 = reduced, 1 = minimal, 0 = static. */
  quality: 3,
  reducedMotion: initialMedia('(prefers-reduced-motion: reduce)'),
};

const frameSubscribers = new Set();
const sceneSubscribers = new Set();

/** Subscribe to every animation frame. Returns an unsubscribe function. */
export const onFrame = (fn) => {
  frameSubscribers.add(fn);
  return () => frameSubscribers.delete(fn);
};

/** Subscribe to discrete scene changes (used with useSyncExternalStore). */
export const onSceneChange = (fn) => {
  sceneSubscribers.add(fn);
  return () => sceneSubscribers.delete(fn);
};

export const getSceneIndex = () => experienceState.sceneIndex;
export const getSceneIndexServer = () => 0;

export const emitFrame = (dt) => {
  frameSubscribers.forEach((fn) => fn(experienceState, dt));
};

export const emitSceneChange = () => {
  sceneSubscribers.forEach((fn) => fn(experienceState.sceneIndex));
};

/** Reset to the top-of-page state (used on unmount / reduced motion). */
export const resetExperience = () => {
  experienceState.progress = 0;
  experienceState.story = 0;
  experienceState.local.fill(0);
  experienceState.sceneIndex = 0;
  experienceState.rangeIndex = 0;
  experienceState.blend = 0;
  experienceState.velocity = 0;
  experienceState.ready = false;
};

/** Put every scene into its readable "hold" state — reduced-motion fallback. */
export const staticExperience = () => {
  experienceState.intro = 1;
  experienceState.local.fill(0.5);
  experienceState.progress = 0.5;
  experienceState.story = 0.5;
  experienceState.reducedMotion = true;
  experienceState.ready = true;
};

export const SCENE_COUNT_TOTAL = SCENE_COUNT;
