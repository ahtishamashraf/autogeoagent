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
    <div aria-hidden="true" className="reduced-hide pointer-events-none absolute inset-0 xl:left-[10rem] xl:right-8">
      {/* Every interface is confined below the copy: the lower half on small
          screens, and either a side column or the lower two thirds on desktop. */}
      <div className="absolute inset-x-0 bottom-0 top-[42svh] lg:top-0">
        <SearchInterface sceneIndex={1} />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[42svh] lg:top-0">
        <AIAnswerInterface sceneIndex={2} />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[42svh] lg:top-[24svh]">
        <ResearchInterface sceneIndex={3} />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[42svh] lg:top-[22svh]">
        <ContentEditor sceneIndex={4} />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[42svh] lg:top-[22svh]">
        <PublishingPipeline sceneIndex={5} />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[42svh] lg:top-[22svh]">
        <AnalyticsDashboard sceneIndex={6} />
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[42svh] lg:top-0">
        <ImproveLoop sceneIndex={7} />
      </div>
    </div>
  );
}
