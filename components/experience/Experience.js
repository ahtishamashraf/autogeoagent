'use client';

import { useRef } from 'react';
import ScrollController from './ScrollController';
import Atmosphere from './Atmosphere';
import CanvasLayer from './CanvasLayer';
import SceneUI from './SceneUI';
import SceneNavigation from './SceneNavigation';
import SceneProgress from './SceneProgress';
import HeroScene from './scenes/HeroScene';
import SEOScene from './scenes/SEOScene';
import GEOScene from './scenes/GEOScene';
import ResearchScene from './scenes/ResearchScene';
import ContentScene from './scenes/ContentScene';
import PublishScene from './scenes/PublishScene';
import AnalyticsScene from './scenes/AnalyticsScene';
import ImproveScene from './scenes/ImproveScene';
import FinalScene from './scenes/FinalScene';

/**
 * The cinematic experience.
 *
 * One sticky visual environment; nine semantic story sections stacked behind it
 * that create the scroll distance and hold the readable copy. Scroll position
 * is the only input: every camera move, formation, panel and line of type is a
 * pure function of it, so the whole thing reverses on the way back up.
 */
export default function Experience() {
  const wrapperRef = useRef(null);

  return (
    <ScrollController wrapperRef={wrapperRef}>
      <div ref={wrapperRef} className="experience-wrapper">
        <div className="sticky-visual">
          <Atmosphere />
          <CanvasLayer />
          <SceneUI />
        </div>

        <div className="story-scroll">
          <HeroScene />
          <SEOScene />
          <GEOScene />
          <ResearchScene />
          <ContentScene />
          <PublishScene />
          <AnalyticsScene />
          <ImproveScene />
          <FinalScene />
        </div>
      </div>

      <SceneNavigation />
      <SceneProgress />
    </ScrollController>
  );
}
