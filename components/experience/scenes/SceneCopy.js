'use client';

import { useSceneMotion } from '@/lib/hooks';
import { clamp, lerp, smoothstep } from '@/lib/animations';
import { usesTopBand } from '@/lib/scene-config';
import { cn } from '@/lib/cn';

/**
 * Scroll-driven copy motion.
 *
 * Copy rises into place, holds while its scene plays, then leaves — all as a
 * function of scroll position, so it rewinds exactly when scrolling up.
 */
export default function SceneCopy({
  sceneIndex,
  children,
  className,
  enter = [0.02, 0.3],
  exit = [0.72, 0.97],
  distance = 46,
  as: Tag = 'div',
}) {
  const ref = useSceneMotion(sceneIndex, (el, t, state) => {
    // Where copy shares a column with its interface, the copy fades in early,
    // travels up into place as the section pins, then leaves through the same
    // staging transform the interface uses — so the two stay in step and never
    // occupy the same space.
    const staged = state.stacked || usesTopBand(sceneIndex);
    const [inStart, inEnd] = staged ? [0, 0.18] : enter;
    const [outStart, outEnd] = staged
      ? [0.34 + exit[0] * 0.62, 0.34 + exit[1] * 0.62]
      : exit;
    const inT = smoothstep(inStart, inEnd, t);
    const outT = smoothstep(outStart, outEnd, t);
    const opacity = clamp(inT - outT);
    el.style.opacity = opacity.toFixed(3);
    el.style.visibility = opacity < 0.005 ? 'hidden' : 'visible';
    const y = lerp(distance, 0, inT) - outT * distance * 0.85;
    const blur = (1 - inT) * 7 + outT * 5;
    el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none';
  });

  return (
    <Tag ref={ref} className={cn('scene-copy', className)}>
      {children}
    </Tag>
  );
}
