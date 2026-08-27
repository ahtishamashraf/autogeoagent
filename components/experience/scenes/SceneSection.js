'use client';

import { scenes } from '@/lib/scene-config';
import { cn } from '@/lib/cn';

/**
 * A story section.
 *
 * Each section is a real, crawlable <section> with a heading and copy. Its
 * height (expressed in viewport heights) is what creates the scroll distance
 * for the matching scene, and the inner sticky element holds the copy on
 * screen while that scene plays.
 */
export default function SceneSection({ id, children, className, align = 'center' }) {
  const scene = scenes.find((s) => s.id === id);
  if (!scene) return null;

  return (
    <section
      id={id}
      data-scene-section
      data-scene={id}
      aria-labelledby={`${id}-heading`}
      className={cn('story-section', className)}
      style={{ '--w': scene.weight, '--wm': scene.mobileWeight }}
    >
      <div
        className={cn(
          'story-hold',
          align === 'top' && 'items-start pt-[calc(var(--header-h)+3svh)]',
          align === 'bottom' && 'items-end pb-[12svh]',
        )}
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-[11.5rem]">{children}</div>
      </div>
    </section>
  );
}
