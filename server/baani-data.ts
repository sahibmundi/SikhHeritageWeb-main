import type { BaaniRaag } from "@shared/schema";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface BaaniShabad {
  id: string;
  raagName: string;
  gurbani: string;
  vyakhya: string;
}

let baaniShabads: BaaniShabad[] = [];

function loadBaaniShabads(): BaaniShabad[] {
  try {
    const jsonPath = join(__dirname, 'data', 'baani-shabads.json');
    const data = readFileSync(jsonPath, 'utf-8');
    const shabads = JSON.parse(data) as BaaniShabad[];
    console.log(`Loaded ${shabads.length} Baani shabads`);
    return shabads;
  } catch (error) {
    console.error('Error loading Baani shabads:', error);
    return [];
  }
}

baaniShabads = loadBaaniShabads();

export function getBaaniShabads(): BaaniShabad[] {
  return baaniShabads;
}

export function getBaaniText(): string {
  return baaniShabads.map(s => s.gurbani).join('\n\n');
}

export const baaniRaags: BaaniRaag[] = [];
