import { Module } from '@nitrostack/core';
import { InteractTools } from './interact.tools.js';
import { InteractResources } from './interact.resources.js';
import { InteractPrompts } from './interact.prompts.js';

@Module({
  name: 'interact',
  description: 'TODO: Add description',
  controllers: [InteractTools, InteractResources, InteractPrompts],
})
export class InteractModule {}
