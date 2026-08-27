'use client';

import { stageById } from '@/content/story';
import StoryScene from './StoryScene';

export default function PublishScene() {
  return <StoryScene stage={stageById.publish} sceneIndex={5} layout="top-left" />;
}
