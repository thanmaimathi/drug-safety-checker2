import { ToolDecorator as Tool, z, ExecutionContext, Injectable } from '@nitrostack/core';
import { InteractService } from './interact.service.js';

/**
 * Interact Tools
 * 
 * Tools for checking drug interactions and summarizing safety.
 */
@Injectable({ deps: [InteractService] })
export class InteractTools {
  constructor(private interactService: InteractService) {}

  @Tool({
    name: 'check-interactions',
    description: 'Check for dangerous interactions between ingredients in a drug formulation',
    inputSchema: z.object({
      ingredients: z.array(z.string()).describe('List of ingredients to check for interactions'),
    }),
  })
  async checkInteractions(input: { ingredients: string[] }, context: ExecutionContext) {
    const interactions = this.interactService.checkInteractions(input.ingredients);

    if (interactions.length === 0) {
      return {
        status: 'safe',
        message: 'No dangerous ingredient interactions detected.',
        interactions: [],
      };
    }

    return {
      status: 'warning',
      message: `Found ${interactions.length} dangerous interaction(s).`,
      interactions: interactions.map(inter => ({
        pair: `${inter.ingredient1} + ${inter.ingredient2}`,
        severity: inter.severity,
        description: inter.description,
        recommendation: inter.recommendation,
      })),
    };
  }

  @Tool({
    name: 'summarize-safety',
    description: 'Combine authenticity check and interaction warnings into a friendly safety summary',
    inputSchema: z.object({
      authenticity_status: z.enum(['authentic', 'counterfeit', 'unknown']).describe('Result from check-authenticity tool'),
      interaction_count: z.number().describe('Number of dangerous interactions found'),
      drug_name: z.string().optional().describe('Name of the drug being checked'),
    }),
  })
  async summarizeSafety(
    input: {
      authenticity_status: 'authentic' | 'counterfeit' | 'unknown';
      interaction_count: number;
      drug_name?: string;
    },
    context: ExecutionContext
  ) {
    const drugName = input.drug_name ? ` (${input.drug_name})` : '';
    let summary = '';
    let overallStatus = 'safe';

    // Authenticity check
    if (input.authenticity_status === 'authentic') {
      summary += `✓ Drug is authentic${drugName}. `;
    } else if (input.authenticity_status === 'counterfeit') {
      summary += `⚠️ COUNTERFEIT ALERT${drugName}. Do not use. `;
      overallStatus = 'danger';
    } else {
      summary += `❓ Drug authenticity unknown${drugName}. `;
      overallStatus = 'warning';
    }

    // Interaction check
    if (input.interaction_count === 0) {
      summary += 'No dangerous ingredient interactions detected.';
    } else if (input.interaction_count === 1) {
      summary += '⚠️ 1 dangerous interaction detected. Consult a pharmacist.';
      if (overallStatus !== 'danger') overallStatus = 'warning';
    } else {
      summary += `⚠️ ${input.interaction_count} dangerous interactions detected. Consult a pharmacist immediately.`;
      if (overallStatus !== 'danger') overallStatus = 'warning';
    }

    return {
      summary,
      overall_status: overallStatus,
      recommendation: this.getRecommendation(overallStatus),
    };
  }

  private getRecommendation(status: string): string {
    switch (status) {
      case 'danger':
        return 'Do not use this drug. Report to health authorities.';
      case 'warning':
        return 'Consult a healthcare professional before use.';
      default:
        return 'Safe to use as directed.';
    }
  }
}
