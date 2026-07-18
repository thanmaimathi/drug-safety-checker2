import { Injectable } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ApprovedDrug {
  id: string;
  name: string;
  activeIngredients: string[];
  strength: string;
  manufacturer: string;
  imageUrl: string;
  approved: boolean;
  formulation: string;
}

@Injectable()
export class VerifyService {
  private approvedDrugs: ApprovedDrug[] = [];

  constructor() {
    this.loadApprovedDrugs();
  }

  private loadApprovedDrugs() {
    try {
      const fixturesPath = path.join(__dirname, '../../..', 'fixtures', 'approved-drugs.json');
      const data = fs.readFileSync(fixturesPath, 'utf-8');
      this.approvedDrugs = JSON.parse(data);
    } catch (error) {
      this.approvedDrugs = [];
    }
  }

  checkAuthenticity(ingredients: string[], strength: string): {
    isAuthentic: boolean;
    matchedDrug: ApprovedDrug | null;
    warning: string | null;
  } {
    const normalizedIngredients = ingredients.map(i => i.toLowerCase().trim());
    
    const matched = this.approvedDrugs.find(drug => {
      const drugIngredients = drug.activeIngredients.map(i => i.toLowerCase().trim());
      return (
        drugIngredients.length === normalizedIngredients.length &&
        drugIngredients.every(ing => normalizedIngredients.includes(ing)) &&
        drug.strength.toLowerCase() === strength.toLowerCase()
      );
    });

    if (matched) {
      return {
        isAuthentic: true,
        matchedDrug: matched,
        warning: null,
      };
    }

    return {
      isAuthentic: false,
      matchedDrug: null,
      warning: 'No match found in approved formulations. Possible counterfeit or unapproved formulation.',
    };
  }

  getDrugDetails(drugId: string): ApprovedDrug | null {
    return this.approvedDrugs.find(drug => drug.id === drugId) || null;
  }

  getAllDrugs(): ApprovedDrug[] {
    return this.approvedDrugs;
  }
}
