export const RULES_VERSION = '2022-v1';

export type CalculatorSector = 'residential' | 'industrial' | 'company-setup';
export type CapitalTier = 'small' | 'mid' | 'large';

export interface FiscalExemption {
  label: string;
  applicable: boolean;
  note?: string;
}

export interface FiscalRuleEntry {
  exemptions: Omit<FiscalExemption, 'applicable'>[];
  costMin: number;
  costMax: number;
  timelineMinWeeks: number;
  timelineMaxWeeks: number;
}

type RuleKey = `${CapitalTier}:${CalculatorSector}`;

export const FISCAL_RULES: Record<RuleKey, FiscalRuleEntry> = {
  'small:residential': {
    exemptions: [
      { label: 'IR sur revenus locatifs : 10,5 % forfaitaire (après abattement 40 %)', note: 'Régime simplifié' },
      { label: 'Pas de taxe sur la fortune immobilière au Maroc' },
    ],
    costMin: 2000,
    costMax: 8000,
    timelineMinWeeks: 4,
    timelineMaxWeeks: 12,
  },
  'small:industrial': {
    exemptions: [
      { label: 'IS standard 20 %', note: 'Taux général' },
      { label: 'Accès aux zones industrielles IDTL selon disponibilité' },
    ],
    costMin: 3000,
    costMax: 10000,
    timelineMinWeeks: 8,
    timelineMaxWeeks: 16,
  },
  'small:company-setup': {
    exemptions: [
      { label: 'IS standard 20 %', note: 'Taux général' },
      { label: 'Obligations CNSS standard' },
      { label: 'Immatriculation OMPIC simplifiée' },
    ],
    costMin: 3000,
    costMax: 10000,
    timelineMinWeeks: 6,
    timelineMaxWeeks: 16,
  },

  'mid:residential': {
    exemptions: [
      { label: 'Pas de taxe sur la fortune immobilière' },
      { label: 'Rapatriement total des capitaux garanti' },
      { label: 'Revenus locatifs : IR réduit après abattement' },
    ],
    costMin: 5000,
    costMax: 20000,
    timelineMinWeeks: 6,
    timelineMaxWeeks: 16,
  },
  'mid:industrial': {
    exemptions: [
      { label: 'IS 0 % pendant 5 ans (zone industrielle IDTL)' },
      { label: 'Remboursement TVA sur équipements industriels' },
      { label: 'Exonération droits de douane sur équipements' },
    ],
    costMin: 8000,
    costMax: 30000,
    timelineMinWeeks: 12,
    timelineMaxWeeks: 26,
  },
  'mid:company-setup': {
    exemptions: [
      { label: 'IS 0 % pendant 5 ans (zone IDTL)' },
      { label: 'Charges sociales réduites en zone franche' },
      { label: 'Exonération TVA sur création' },
    ],
    costMin: 10000,
    costMax: 35000,
    timelineMinWeeks: 8,
    timelineMaxWeeks: 20,
  },

  'large:residential': {
    exemptions: [
      { label: 'Statut HNWI — régime d\'imposition avantageux' },
      { label: 'Rapatriement intégral des capitaux et dividendes' },
      { label: 'Accès aux dispositifs de la Charte 2022 (structurant)' },
    ],
    costMin: 15000,
    costMax: 60000,
    timelineMinWeeks: 12,
    timelineMaxWeeks: 30,
  },
  'large:industrial': {
    exemptions: [
      { label: 'IS 0 % pendant 5 ans (Charte 2022 — Grand Projet)' },
      { label: 'Subventions Charte 2022 selon convention avec l\'État' },
      { label: 'Négociation directe CRI — avantages sur mesure' },
      { label: 'Exonération droits de douane et TVA sur investissements' },
    ],
    costMin: 20000,
    costMax: 80000,
    timelineMinWeeks: 24,
    timelineMaxWeeks: 52,
  },
  'large:company-setup': {
    exemptions: [
      { label: 'IS 0 % jusqu\'à 10 ans (négociation CRI Grand Projet)' },
      { label: 'Subventions Charte 2022 sur convention' },
      { label: 'Charges sociales exonérées en phase d\'amorçage' },
      { label: 'Guichet unique CRI — procédures accélérées' },
    ],
    costMin: 25000,
    costMax: 100000,
    timelineMinWeeks: 16,
    timelineMaxWeeks: 40,
  },
};

// Countries with Morocco bilateral tax treaties (case-insensitive partial match)
export const TREATY_COUNTRIES = [
  'france', 'spain', 'germany', 'belgium', 'netherlands', 'united kingdom', 'uk',
  'united states', 'usa', 'us', 'canada', 'switzerland', 'italy', 'portugal',
  'luxembourg', 'sweden', 'norway', 'denmark', 'austria', 'japan', 'china',
  'uae', 'united arab emirates', 'qatar', 'saudi arabia', 'egypt', 'tunisia',
  'senegal', 'mali', 'ivory coast', 'guinea',
];
