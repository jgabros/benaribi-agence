import { describe, it, expect } from 'vitest';
import { calculateFiscalEstimate, type CalculatorSector } from './calculate';

const sectors: CalculatorSector[] = ['residential', 'industrial', 'company-setup'];

describe('calculateFiscalEstimate — structural validity', () => {
  const tierCases: Array<{ capital: number; expectedTier: string }> = [
    { capital: 50_000, expectedTier: 'small' },
    { capital: 500_000, expectedTier: 'mid' },
    { capital: 5_000_000, expectedTier: 'large' },
  ];

  for (const sector of sectors) {
    for (const { capital, expectedTier } of tierCases) {
      it(`returns valid FiscalResult for ${sector} at €${capital}`, () => {
        const result = calculateFiscalEstimate({ capitalEUR: capital, sector, countryOfOrigin: 'Canada' });

        expect(result.tier).toBe(expectedTier);
        expect(result.exemptions.length).toBeGreaterThan(0);
        expect(result.costEstimateEUR.min).toBeLessThanOrEqual(result.costEstimateEUR.max);
        expect(result.processTimelineWeeks.min).toBeLessThanOrEqual(result.processTimelineWeeks.max);
        expect(result.rulesVersion).toBe('2022-v1');
      });
    }
  }
});

describe('calculateFiscalEstimate — tier boundaries', () => {
  it('assigns "small" for €99,999', () => {
    const r = calculateFiscalEstimate({ capitalEUR: 99_999, sector: 'residential', countryOfOrigin: 'UK' });
    expect(r.tier).toBe('small');
  });

  it('assigns "mid" for €100,000', () => {
    const r = calculateFiscalEstimate({ capitalEUR: 100_000, sector: 'residential', countryOfOrigin: 'UK' });
    expect(r.tier).toBe('mid');
  });

  it('assigns "mid" for €2,000,000', () => {
    const r = calculateFiscalEstimate({ capitalEUR: 2_000_000, sector: 'industrial', countryOfOrigin: 'UK' });
    expect(r.tier).toBe('mid');
  });

  it('assigns "large" for €2,000,001', () => {
    const r = calculateFiscalEstimate({ capitalEUR: 2_000_001, sector: 'industrial', countryOfOrigin: 'UK' });
    expect(r.tier).toBe('large');
  });
});

describe('calculateFiscalEstimate — treaty bonus', () => {
  it('sets hasTreatyBonus=true for France', () => {
    const r = calculateFiscalEstimate({ capitalEUR: 500_000, sector: 'residential', countryOfOrigin: 'France' });
    expect(r.hasTreatyBonus).toBe(true);
  });

  it('sets hasTreatyBonus=true for Spain', () => {
    const r = calculateFiscalEstimate({ capitalEUR: 500_000, sector: 'company-setup', countryOfOrigin: 'Spain' });
    expect(r.hasTreatyBonus).toBe(true);
  });

  it('sets hasTreatyBonus=true for United States', () => {
    const r = calculateFiscalEstimate({ capitalEUR: 1_000_000, sector: 'industrial', countryOfOrigin: 'United States' });
    expect(r.hasTreatyBonus).toBe(true);
  });

  it('sets hasTreatyBonus=false for Morocco', () => {
    const r = calculateFiscalEstimate({ capitalEUR: 500_000, sector: 'residential', countryOfOrigin: 'Morocco' });
    expect(r.hasTreatyBonus).toBe(false);
  });

  it('sets hasTreatyBonus=false for empty string', () => {
    const r = calculateFiscalEstimate({ capitalEUR: 500_000, sector: 'residential', countryOfOrigin: '' });
    expect(r.hasTreatyBonus).toBe(false);
  });

  it('adds treaty exemption to the exemptions list when bonus applies', () => {
    const r = calculateFiscalEstimate({ capitalEUR: 500_000, sector: 'residential', countryOfOrigin: 'Germany' });
    expect(r.exemptions.some((e) => e.label.includes('Convention fiscale'))).toBe(true);
  });
});
