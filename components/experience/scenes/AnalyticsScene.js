'use client';

import { stageById } from '@/content/story';
import StoryScene from './StoryScene';

export default function AnalyticsScene() {
  return <StoryScene stage={stageById.analytics} sceneIndex={6} layout="top-right" />;
}
