'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { scenes, statementWindows } from '@/lib/scene-config';
import { clamp, mixHex, smoothstep } from '@/lib/animations';
import {
  emitFrame,
  emitSceneChange,
  experienceState,
  resetExperience,
  staticExperience,
} from '@/lib/experience-store';
import { usePrefersReducedMotion, useQualityTier } from '@/lib/hooks';
import { getSmoothScroll, registerSmoothScroll } from '@/lib/smooth-scroll';

const ExperienceContext = createContext({
  scrollToScene: () => {},
  scrollToTop: () => {},
  quality: 2,
  reducedMotion: false,
});

export const useExperience = () => useContext(ExperienceContext);

const SCENE_COUNT = scenes.length;
/** Local progress at which the next scene takes over the navigation. */
const NAV_TAKEOVER = 0.18;

export default function ScrollController({ wrapperRef, children }) {
  const reducedMotion = usePrefersReducedMotion();
  const quality = useQualityTier();

  // Absolute document scroll positions for each scene boundary.
  const bounds = useRef(new Float64Array(SCENE_COUNT + 1));
  const sectionTops = useRef(new Float64Array(SCENE_COUNT));
  const lenisRef = useRef(null);
  const themeRef = useRef({ accent: '', glow: '', bg: '' });

  /* ---------------------------------------------------------------- */
  /* Measurement                                                       */
  /* ---------------------------------------------------------------- */
  const measure = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const vh = window.innerHeight;
    experienceState.stacked = window.innerWidth < 1024;
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const sections = wrapper.querySelectorAll('[data-scene-section]');
    if (sections.length !== SCENE_COUNT) return;

    const b = bounds.current;
    const tops = sectionTops.current;

    b[0] = wrapperTop;
    for (let i = 0; i < SCENE_COUNT; i += 1) {
      const el = sections[i];
      const top = el.getBoundingClientRect().top + window.scrollY;
      tops[i] = top;
      if (i > 0) b[i] = top - vh;
    }
    b[SCENE_COUNT] = wrapperTop + wrapper.offsetHeight - vh;

    // Reserve the vertical band the scene headings occupy, measured rather than
    // guessed, so a floating interface can never be laid out underneath a
    // heading. Scenes differ in copy length; the tallest one wins so the
    // interfaces never shift between scenes.
    let band = 0;
    wrapper.querySelectorAll('[data-copy-band]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      const offsetTop = parseFloat(getComputedStyle(el.closest('.story-hold') || el).paddingTop) || 0;
      band = Math.max(band, offsetTop + rect.height);
    });
    if (band > 0) {
      const gap = vh * 0.05;
      const clamped = Math.min(Math.max(band + gap, vh * 0.24), vh * 0.55);
      document.documentElement.style.setProperty('--scene-band', `${Math.round(clamped)}px`);
    }

    // Guarantee a strictly increasing, gap-free timeline even if a browser
    // reports odd sub-pixel geometry.
    for (let i = 1; i <= SCENE_COUNT; i += 1) {
      if (b[i] <= b[i - 1]) b[i] = b[i - 1] + 1;
    }

    experienceState.ready = true;
  }, [wrapperRef]);

  /* ---------------------------------------------------------------- */
  /* Per-frame update                                                  */
  /* ---------------------------------------------------------------- */
  const update = useCallback(
    (scroll, dt) => {
      const b = bounds.current;
      const total = b[SCENE_COUNT] - b[0];
      if (total <= 0) return;

      const progress = clamp((scroll - b[0]) / total);
      const previous = experienceState.progress;
      const delta = progress - previous;

      experienceState.progress = progress;
      experienceState.velocity += (delta * total - experienceState.velocity) * 0.18;
      if (Math.abs(delta) > 1e-6) experienceState.direction = delta > 0 ? 1 : -1;

      const local = experienceState.local;
      let index = 0;

      for (let i = 0; i < SCENE_COUNT; i += 1) {
        const span = b[i + 1] - b[i];
        const t = (scroll - b[i]) / span;
        local[i] = t;
        if (t >= 0 && t < 1) index = i;
        else if (t >= 1 && i === SCENE_COUNT - 1) index = i;
      }
      if (scroll <= b[0]) index = 0;

      // Hand navigation to the incoming scene once its copy is on screen.
      let navIndex = index;
      if (index > 0 && local[index] < NAV_TAKEOVER) navIndex = index - 1;

      experienceState.rangeIndex = index;
      experienceState.blend = clamp(local[index]);

      // Full-screen statements take the frame; chrome fades out for them.
      let statement = 0;
      for (let i = 0; i < statementWindows.length; i += 1) {
        const w = statementWindows[i];
        const t = local[w.scene];
        if (t > w.from && t < w.to) {
          statement = Math.max(
            statement,
            smoothstep(w.from, w.from + 0.06, t) * (1 - smoothstep(w.to - 0.08, w.to, t)),
          );
        }
      }
      experienceState.statement = statement;
      experienceState.story = (index + experienceState.blend) / SCENE_COUNT;

      if (navIndex !== experienceState.sceneIndex) {
        experienceState.sceneIndex = navIndex;
        emitSceneChange();
      }

      // Background / accent colour cross-fade between neighbouring scenes.
      const from = scenes[index].theme;
      const to = scenes[Math.min(index + 1, SCENE_COUNT - 1)].theme;
      // The palette shifts late in each scene so the colour change lands with
      // the content change rather than well ahead of it.
      const mix = smoothstep(0.72, 1, clamp(local[index]));
      const accent = mixHex(from.accent, to.accent, mix);
      const glow = mixHex(from.glow, to.glow, mix);
      const bg = mixHex(from.bg, to.bg, mix);
      const theme = themeRef.current;
      const root = document.documentElement;
      if (accent !== theme.accent) {
        root.style.setProperty('--scene-accent', accent);
        theme.accent = accent;
      }
      if (glow !== theme.glow) {
        root.style.setProperty('--scene-glow', glow);
        theme.glow = glow;
      }
      if (bg !== theme.bg) {
        root.style.setProperty('--scene-bg', bg);
        theme.bg = bg;
      }

      emitFrame(dt);
    },
    [],
  );

  /* ---------------------------------------------------------------- */
  /* Setup                                                             */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (reducedMotion) {
      staticExperience();
      emitFrame(0);
      emitSceneChange();
      document.documentElement.dataset.motion = 'reduced';
      return undefined;
    }

    // React Strict Mode mounts effects twice in development. A second smooth
    // scroller would mean two rAF loops fighting over the same scroll position,
    // so refuse to start one.
    if (getSmoothScroll()) return undefined;

    document.documentElement.dataset.motion = 'full';
    gsap.registerPlugin(ScrollTrigger);
    // Long frames must not be smoothed away: scroll-driven animation has to
    // track the real scroll position, not a interpolated one.
    gsap.ticker.lagSmoothing(0);

    const lenis = new Lenis({
      duration: 1.05,
      lerp: 0.1,
      smoothWheel: true,
      // Native touch scrolling keeps iOS Safari predictable and accessible.
      syncTouch: false,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      autoRaf: false,
    });
    lenisRef.current = lenis;
    // Publish the instance so route changes and anchor links use this one
    // scroll system rather than starting a competing one.
    const unregisterSmoothScroll = registerSmoothScroll(lenis);
    document.documentElement.classList.add('lenis');

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onToggle: (self) => {
        document.documentElement.dataset.experience = self.isActive ? 'active' : 'idle';
      },
    });

    measure();
    ScrollTrigger.addEventListener('refresh', measure);

    // The load-in sequence is time-based, not scroll-based: the agent emerges
    // immediately without a loading screen and without blocking interaction.
    const started = performance.now();
    let last = started;
    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      experienceState.intro = clamp((now - started) / 1700);
      update(window.scrollY || document.documentElement.scrollTop || 0, dt);
    };
    gsap.ticker.add(tick);
    tick();

    const onPointerMove = (event) => {
      experienceState.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      experienceState.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // Re-measure once webfonts settle so scene boundaries stay exact.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener('pointermove', onPointerMove);
      ScrollTrigger.removeEventListener('refresh', measure);
      gsap.ticker.remove(tick);
      gsap.ticker.remove(raf);
      trigger.kill();
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off('scroll', onLenisScroll);
      unregisterSmoothScroll();
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove('lenis');
      delete document.documentElement.dataset.experience;
      resetExperience();
    };
  }, [measure, reducedMotion, update, wrapperRef]);

  /* ---------------------------------------------------------------- */
  /* Same-page anchors keep working with smooth scrolling              */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = event.target.closest?.('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      const lenis = lenisRef.current;
      if (!lenis) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.3 });
      window.history.pushState(null, '', hash);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  /* ---------------------------------------------------------------- */
  /* Imperative navigation                                             */
  /* ---------------------------------------------------------------- */
  const scrollToScene = useCallback(
    (index) => {
      const target = index <= 0 ? bounds.current[0] : sectionTops.current[index];
      if (!Number.isFinite(target)) return;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
      } else {
        window.scrollTo({ top: target, behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    },
    [reducedMotion],
  );

  const scrollToTop = useCallback(() => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [reducedMotion]);

  const value = useMemo(
    () => ({ scrollToScene, scrollToTop, quality, reducedMotion }),
    [quality, reducedMotion, scrollToScene, scrollToTop],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}
