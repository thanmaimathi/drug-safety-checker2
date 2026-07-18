import { ToolDecorator as Tool, z, ExecutionContext, Injectable, Widget } from '@nitrostack/core';
import { VerifyService, ApprovedDrug } from './verify.service.js';

/**
 * Verify Tools
 * 
 * Tools for checking drug authenticity and retrieving drug details
 */
@Injectable({ deps: [VerifyService] })
export class VerifyTools {
  constructor(private verifyService: VerifyService) {}

  @Tool({
    name: 'check-authenticity',
    description: 'Check if a drug formulation is authentic by verifying active ingredients and strength against approved formulations',
    inputSchema: z.object({
      activeIngredients: z.array(z.string()).describe('List of active ingredients in the drug'),
      strength: z.string().describe('Strength of the drug (e.g., "500mg", "10mg")'),
    }),
  })
  async checkAuthenticity(
    input: { activeIngredients: string[]; strength: string },
    context: ExecutionContext
  ): Promise<{ isAuthentic: boolean; matchedDrug: ApprovedDrug | null; warning: string | null }> {
    const result = this.verifyService.checkAuthenticity(input.activeIngredients, input.strength);
    return {
      isAuthentic: result.isAuthentic,
      matchedDrug: result.matchedDrug,
      warning: result.warning,
    };
  }

  @Tool({
    name: 'get-drug-details',
    description: 'Retrieve full details of a drug formulation by its ID',
    inputSchema: z.object({
      drugId: z.string().describe('The unique identifier of the drug'),
    }),
  })
  @Widget({ route: 'safety-report' })
  async getDrugDetails(
    input: { drugId: string },
    context: ExecutionContext
  ): Promise<{ drug?: ApprovedDrug; isAuthentic: boolean; warning: string | null; error?: string; drugId?: string }> {
    const drug = this.verifyService.getDrugDetails(input.drugId);
    if (!drug) {
      return {
        error: 'Drug not found',
        drugId: input.drugId,
        isAuthentic: false,
        warning: null,
      };
    }
    return {
      drug,
      isAuthentic: true,
      warning: null,
    };
  }
}
