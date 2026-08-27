/**
 * Single source of truth for the cinematic scroll experience.
 *
 * `weight` is the scroll length of a scene expressed in viewport heights. The
 * normalized 0 -> 1 scene ranges AND the DOM section heights are both derived
 * from these weights, so the visual timeline and the document can never drift
 * out of sync.
 */

const SCENES = [
  {
    id: 'intro',
    weight: 1.55,
    mobileWeight: 1.35,
    index: 0,
    nav: null,
    label: 'Intro',
    kicker: 'AI SEO + GEO Agent',
    theme: { bg: '#05070b', accent: '#3b82f6', glow: '#38bdf8' },
  },
  {
    id: 'seo',
    weight: 2.4,
    mobileWeight: 1.9,
    index: 1,
    nav: '01',
    label: 'Search',
    sub: 'SEO',
    kicker: '01 / Search',
    theme: { bg: '#050a14', accent: '#2f6fed', glow: '#4d9dff' },
  },
  {
    id: 'geo',
    weight: 2.6,
    mobileWeight: 2.0,
    index: 2,
    nav: '02',
    label: 'AI Discovery',
    sub: 'GEO',
    kicker: '02 / AI Discovery',
    theme: { bg: '#070a1a', accent: '#5468f0', glow: '#93a7ff' },
  },
  {
    id: 'research',
    weight: 2.4,
    mobileWeight: 1.9,
    index: 3,
    nav: '03',
    label: 'Intelligence',
    sub: 'Research',
    kicker: '03 / Intelligence',
    theme: { bg: '#04101a', accent: '#12b3c8', glow: '#4fe3f0' },
  },
  {
    id: 'content',
    weight: 2.5,
    mobileWeight: 2.0,
    index: 4,
    nav: '04',
    label: 'Creation',
    sub: 'Content',
    kicker: '04 / Creation',
    theme: { bg: '#080b11', accent: '#7f93b5', glow: '#b9cbe6' },
  },
  {
    id: 'publish',
    weight: 2.2,
    mobileWeight: 1.8,
    index: 5,
    nav: '05',
    label: 'Automation',
    sub: 'Publish',
    kicker: '05 / Automation',
    theme: { bg: '#030a1c', accent: '#1d5cf0', glow: '#5aa2ff' },
  },
  {
    id: 'analytics',
    weight: 2.4,
    mobileWeight: 1.9,
    index: 6,
    nav: '06',
    label: 'Performance',
    sub: 'Monitor',
    kicker: '06 / Performance',
    theme: { bg: '#04100f', accent: '#17a97f', glow: '#4fe6b0' },
  },
  {
    id: 'improve',
    weight: 2.3,
    mobileWeight: 1.8,
    index: 7,
    nav: '07',
    label: 'Optimization',
    sub: 'Improve',
    kicker: '07 / Continuous Optimization',
    theme: { bg: '#08091c', accent: '#6a63f2', glow: '#a09bff' },
  },
  {
    id: 'final',
    weight: 2.0,
    mobileWeight: 1.7,
    index: 8,
    nav: null,
    label: 'GetGeoAgent',
    kicker: 'GetGeoAgent',
    theme: { bg: '#04060a', accent: '#3d7dfb', glow: '#7ec8ff' },
  },
];

/**
 * Scene ranges are measured from the real DOM offsets by ScrollController on
 * every refresh, so the mobile weights take effect automatically and there is
 * no second table to keep in sync.
 */
export const scenes = SCENES;

export const navScenes = scenes.filter((scene) => scene.nav);
