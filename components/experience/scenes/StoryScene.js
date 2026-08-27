'use client';

import { cn } from '@/lib/cn';
import SceneSection from './SceneSection';
import SceneCopy from './SceneCopy';

/**
 * The standard scene layout: an eyebrow, a heading and one paragraph of real,
 * crawlable copy positioned so the floating interface has room to breathe.
 *
 * Layouts alternate deliberately — left, right, top — so the experience never
 * settles into a repeating template.
 */
export default function StoryScene({ stage, sceneIndex, layout = 'left', children }) {
  const isTop = layout.startsWith('top');

  const eyebrow = (
    <p
      className={cn(
        't-eyebrow flex items-center gap-2.5',
        layout === 'right' && 'lg:justify-end',
        layout === 'top-right' && 'lg:justify-end',
        layout === 'top-center' && 'justify-center',
      )}
    >
      <span
        aria-hidden="true"
        className="inline-block h-px w-6 bg-[var(--scene-glow)] shadow-[0_0_8px_var(--scene-glow)]"
      />
      {stage.kicker}
    </p>
  );

  /* Scenes whose interface fills the lower two thirds get a compact band of
     copy across the top: heading on one side, supporting line on the other. */
  if (isTop) {
    const flip = layout === 'top-right';
    return (
      <SceneSection id={stage.id} align="top">
        <SceneCopy sceneIndex={sceneIndex}>
          <div
            className={cn(
              'grid items-end gap-x-10 gap-y-4 lg:grid-cols-12',
              layout === 'top-center' && 'text-center lg:text-left',
            )}
          >
            <div className={cn('lg:col-span-6', flip ? 'lg:order-2 lg:col-start-7 lg:text-right' : '')}>
              {eyebrow}
              <h2 id={`${stage.id}-heading`} className="t-h3 mt-4 max-w-xl text-ink lg:text-[clamp(1.75rem,3vw,3rem)]">
                {stage.heading}
              </h2>
            </div>
            <div className={cn('lg:col-span-5', flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8')}>
              <p className="t-body max-w-md text-[0.95rem] lg:pb-2">{stage.body}</p>
            </div>
          </div>
          {children}
        </SceneCopy>
      </SceneSection>
    );
  }

  const columnClass = {
    left: 'lg:col-span-5 lg:col-start-1',
    right: 'lg:col-span-5 lg:col-start-8 lg:text-right',
  }[layout];

  return (
    <SceneSection id={stage.id} align="center">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <SceneCopy sceneIndex={sceneIndex} className={cn('max-w-2xl', columnClass)}>
          {eyebrow}
          <h2 id={`${stage.id}-heading`} className="t-h2 mt-5 text-ink">
            {stage.heading}
          </h2>
          <p className={cn('t-lead mt-5 max-w-xl lg:mt-6', layout === 'right' && 'lg:ml-auto')}>
            {stage.body}
          </p>
          {children}
        </SceneCopy>
      </div>
    </SceneSection>
  );
}
