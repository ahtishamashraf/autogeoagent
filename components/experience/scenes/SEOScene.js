'use client';

import { stageById } from '@/content/story';
import StoryScene from './StoryScene';

export default function SEOScene() {
  return <StoryScene stage={stageById.seo} sceneIndex={1} layout="left" />;
}
