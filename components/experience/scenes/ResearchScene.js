'use client';

import { stageById } from '@/content/story';
import StoryScene from './StoryScene';

export default function ResearchScene() {
  return <StoryScene stage={stageById.research} sceneIndex={3} layout="top-center" />;
}
