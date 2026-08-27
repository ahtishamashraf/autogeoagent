'use client';

import { stageById } from '@/content/story';
import StoryScene from './StoryScene';

export default function ContentScene() {
  return <StoryScene stage={stageById.content} sceneIndex={4} layout="top-left" />;
}
