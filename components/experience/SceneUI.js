'use client';

import SearchInterface from './ui/SearchInterface';
import AIAnswerInterface from './ui/AIAnswerInterface';
import ResearchInterface from './ui/ResearchInterface';
import ContentEditor from './ui/ContentEditor';
import PublishingPipeline from './ui/PublishingPipeline';
import AnalyticsDashboard from './ui/AnalyticsDashboard';
import ImproveLoop from './ui/ImproveLoop';

/**
 * The interface layer.
 *
 * These panels are HTML, not WebGL — crisp text, cheap to render and easy to
 * make responsive. They are decorative (the readable copy lives in the story
 * sections), so the whole layer is hidden from assistive technology.
 */
export default function SceneUI() {
  return (
    <div aria-hidden="true" className="reduced-hide pointer-events-none absolute inset-0 xl:left-[11.5rem] xl:right-8">
      {/*
        Every interface is confined to the band below the copy. `--scene-band`
        is measured from the real scene headings by ScrollController, so a panel
        can never be laid out underneath a heading at any viewport size.
        Side-by-side scenes (SEO, GEO) keep the full height on desktop because
        their copy sits in the opposite column.
      */}
      <div className="absolute inset-x-0 bottom-0 top-[var(--scene-band)] lg:top-0">
        <SearchInterface sceneIndex={1} />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[var(--scene-band)] lg:top-0">
        <AIAnswerInterface sceneIndex={2} />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[var(--scene-band)]">
        <ResearchInterface sceneIndex={3} />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[var(--scene-band)]">
        <ContentEditor sceneIndex={4} />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[var(--scene-band)]">
        <PublishingPipeline sceneIndex={5} />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[var(--scene-band)]">
        <AnalyticsDashboard sceneIndex={6} />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[var(--scene-band)]">
        <ImproveLoop sceneIndex={7} />
      </div>
    </div>
  );
}
