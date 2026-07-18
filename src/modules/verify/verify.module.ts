import { Module } from '@nitrostack/core';
import { VerifyTools } from './verify.tools.js';
import { VerifyResources } from './verify.resources.js';
import { VerifyPrompts } from './verify.prompts.js';

@Module({
  name: 'verify',
  description: 'TODO: Add description',
  controllers: [VerifyTools, VerifyResources, VerifyPrompts],
})
export class VerifyModule {}
