import {
  FISCAL_RULES,
  RULES_VERSION,
  TREATY_COUNTRIES,
  type CalculatorSector,
  type CapitalTier,
  type FiscalExemption,
} from './fiscal-rules';

export type { CalculatorSector, CapitalTier };

export interface CalculatorInputs {
  capitalEUR: number;
  sector: CalculatorSector;
  countryOfOrigin: string;
}

export interface FiscalResult {
  tier: CapitalTier;
  exemptions: FiscalExemption[];
  costEstimateEUR: { min: number; max: number };
  processTimelineWeeks: { min: number; max: number };
  hasTreatyBonus: boolean;
  rulesVersion: string;
}

function getTier(capitalEUR: number): CapitalTier {
  if (capitalEUR < 100_000) return 'small';
  if (capitalEUR <= 2_000_000) return 'mid';
  return 'large';
}

function hasTreatyBonus(countryOfOrigin: string): boolean {
  const normalized = countryOfOrigin.toLowerCase().trim();
  if (normalized.length < 2) return false;
  return TREATY_COUNTRIES.some((country) => normalized.includes(country) || country.includes(normalized));
}

export function calculateFiscalEstimate(inputs: CalculatorInputs): FiscalResult {
  const tier = getTier(inputs.capitalEUR);
  const ruleKey = `${tier}:${inputs.sector}` as const;
  const rule = FISCAL_RULES[ruleKey];

  const treatyBonus = hasTreatyBonus(inputs.countryOfOrigin);

  const exemptions: FiscalExemption[] = rule.exemptions.map((e) => ({
    ...e,
    applicable: true,
  }));

  if (treatyBonus) {
    exemptions.push({
      label: 'Convention fiscale bilatérale — exonération possible de retenue à la source sur dividendes',
      applicable: true,
      note: 'Vérifier avec un conseil fiscal la convention applicable',
    });
  }

  return {
    tier,
    exemptions,
    costEstimateEUR: { min: rule.costMin, max: rule.costMax },
    processTimelineWeeks: { min: rule.timelineMinWeeks, max: rule.timelineMaxWeeks },
    hasTreatyBonus: treatyBonus,
    rulesVersion: RULES_VERSION,
  };
}
