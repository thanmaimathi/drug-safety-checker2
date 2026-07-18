import { Injectable } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface DangerousInteraction {
  id: string;
  ingredient1: string;
  ingredient2: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  description: string;
  recommendation: string;
}

@Injectable()
export class InteractService {
  private interactions: DangerousInteraction[] = [];

  constructor() {
    this.loadInteractions();
  }

  private loadInteractions() {
    try {
      const fixturesPath = path.join(__dirname, '../../..', 'fixtures', 'interactions.json');
      const data = fs.readFileSync(fixturesPath, 'utf-8');
      this.interactions = JSON.parse(data);
    } catch (error) {
      this.interactions = [];
    }
  }

  checkInteractions(ingredients: string[]): DangerousInteraction[] {
    const normalizedIngredients = ingredients.map(i => i.toLowerCase().trim());
    const foundInteractions: DangerousInteraction[] = [];
    const seen = new Set<string>();

    for (let i = 0; i < normalizedIngredients.length; i++) {
      for (let j = i + 1; j < normalizedIngredients.length; j++) {
        const ing1 = normalizedIngredients[i];
        const ing2 = normalizedIngredients[j];
        const pairKey = [ing1, ing2].sort().join('|');

        if (seen.has(pairKey)) continue;
        seen.add(pairKey);

        const interaction = this.interactions.find(
          inter =>
            (inter.ingredient1.toLowerCase() === ing1 && inter.ingredient2.toLowerCase() === ing2) ||
            (inter.ingredient1.toLowerCase() === ing2 && inter.ingredient2.toLowerCase() === ing1)
        );

        if (interaction) {
          foundInteractions.push(interaction);
        }
      }
    }

    return foundInteractions;
  }

  getAllInteractions(): DangerousInteraction[] {
    return this.interactions;
  }
}
