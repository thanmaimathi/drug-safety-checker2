import { PromptDecorator as Prompt, ExecutionContext } from '@nitrostack/core';

/**
 * Interact Prompts
 * 
 * TODO: Add description
 */
export class InteractPrompts {
  @Prompt({
    name: 'interact-help',
    description: 'TODO: Add description',
  })
  async helpPrompt(args: Record<string, unknown>, context: ExecutionContext) {
    return [
      {
        role: 'user' as const,
        content: {
          type: 'text' as const,
          text: 'TODO: Add prompt content',
        },
      },
    ];
  }
}
