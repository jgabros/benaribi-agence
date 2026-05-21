'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Button, Input, SectionWrapper, Container } from '@benaribi/ui';
import {
  calculateFiscalEstimate,
  type CalculatorInputs,
  type FiscalResult,
  type CalculatorSector,
} from '@/lib/calculator/calculate';
import { fireCalculatorCompleted } from '@/lib/analytics/events';
import { EmailGateModal } from '@/components/shared/EmailGateModal';

const PDF_PATH = '/downloads/morocco-investment-guide-2026.pdf';

const schema = z.object({
  capitalEUR: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, { message: 'positive' }),
  sector: z.enum(['residential', 'industrial', 'company-setup'] as const),
  countryOfOrigin: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

type Step = 'inputs' | 'results';

function formatEUR(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

function ResultsPanel({
  result,
  onDownload,
}: {
  result: FiscalResult;
  onDownload: () => void;
}) {
  const t = useTranslations('investment.calculator');
  const r = useTranslations('investment.calculator.results');

  const tierLabel = result.tier === 'small'
    ? r('tierSmall')
    : result.tier === 'mid'
    ? r('tierMid')
    : r('tierLarge');

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-h3 text-charcoal-black mb-2">{r('title')}</h3>
        <p className="text-caption text-charcoal-black/50">{r('tier')}: <span className="font-medium text-champagne-gold">{tierLabel}</span></p>
      </div>

      {/* Exemptions */}
      <div>
        <h4 className="font-body text-body font-medium text-charcoal-black mb-3">{r('exemptions')}</h4>
        <ul className="space-y-2" role="list">
          {result.exemptions.map((ex, i) => (
            <li key={i} className="flex items-start gap-2 text-caption text-charcoal-black/80">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-champagne-gold shrink-0" aria-hidden="true" />
              {ex.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Cost + Timeline */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-marble-grey rounded-lg p-4">
          <p className="text-caption text-charcoal-black/60 mb-1">{r('costRange')}</p>
          <p className="font-display text-h4 text-charcoal-black">
            {formatEUR(result.costEstimateEUR.min)} – {formatEUR(result.costEstimateEUR.max)}
          </p>
        </div>
        <div className="bg-marble-grey rounded-lg p-4">
          <p className="text-caption text-charcoal-black/60 mb-1">{r('timeline')}</p>
          <p className="font-display text-h4 text-charcoal-black">
            {result.processTimelineWeeks.min}–{result.processTimelineWeeks.max} {r('weeks')}
          </p>
        </div>
      </div>

      {result.hasTreatyBonus && (
        <p className="text-caption text-teal bg-teal/10 rounded-lg px-4 py-3 border border-teal/20">
          {r('treatyBonus')}
        </p>
      )}

      {/* Disclaimer */}
      <p className="text-caption text-charcoal-black/50 italic border-t border-marble-grey pt-4">
        {t('disclaimer')}
      </p>

      <Button size="lg" onClick={onDownload} className="w-full sm:w-auto">
        {r('downloadCta')}
      </Button>
    </div>
  );
}

export function RoiCalculator() {
  const t = useTranslations('investment.calculator');
  const [step, setStep] = useState<Step>('inputs');
  const [result, setResult] = useState<FiscalResult | null>(null);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function onSubmit(values: FormValues) {
    const inputs: CalculatorInputs = {
      capitalEUR: Number(values.capitalEUR),
      sector: values.sector as CalculatorSector,
      countryOfOrigin: values.countryOfOrigin,
    };
    const r = calculateFiscalEstimate(inputs);
    setResult(r);
    setStep('results');
    fireCalculatorCompleted(inputs.sector);
  }

  return (
    <>
      <SectionWrapper className="bg-marble-grey">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="mb-10">
              <h2 className="font-display text-h2 text-charcoal-black mb-2">
                {t('title')}
              </h2>
              <p className="font-body text-body text-charcoal-black/60">
                {t('subtitle')}
              </p>
            </div>

            {step === 'inputs' && (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                {/* Capital */}
                <div>
                  <label htmlFor="calc-capital" className="block text-caption font-medium text-charcoal-black mb-1">
                    {t('capital')}
                  </label>
                  <Input
                    id="calc-capital"
                    type="number"
                    min="1"
                    placeholder={t('capitalPlaceholder') as string}
                    {...(errors.capitalEUR
                      ? { state: 'error' as const, errorMessage: t('validation.capitalPositive') as string }
                      : { state: 'default' as const })}
                    {...register('capitalEUR')}
                  />
                </div>

                {/* Sector */}
                <div>
                  <label htmlFor="calc-sector" className="block text-caption font-medium text-charcoal-black mb-1">
                    {t('sector')}
                  </label>
                  <select
                    id="calc-sector"
                    aria-invalid={!!errors.sector}
                    className={[
                      'w-full min-h-[44px] px-4 py-2.5 rounded border bg-off-white',
                      'font-body text-body text-charcoal-black',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold',
                      errors.sector ? 'border-red-600' : 'border-marble-grey',
                    ].join(' ')}
                    {...register('sector')}
                  >
                    <option value="">{t('sectorPlaceholder')}</option>
                    <option value="residential">{t('sectorResidential')}</option>
                    <option value="industrial">{t('sectorIndustrial')}</option>
                    <option value="company-setup">{t('sectorCompanySetup')}</option>
                  </select>
                  {errors.sector && (
                    <p role="alert" className="mt-1 text-caption text-red-600">
                      {t('validation.sectorRequired')}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="calc-country" className="block text-caption font-medium text-charcoal-black mb-1">
                    {t('country')}
                  </label>
                  <Input
                    id="calc-country"
                    type="text"
                    placeholder={t('countryPlaceholder') as string}
                    {...(errors.countryOfOrigin
                      ? { state: 'error' as const, errorMessage: t('validation.countryRequired') as string }
                      : { state: 'default' as const })}
                    {...register('countryOfOrigin')}
                  />
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {t('calculate')}
                </Button>
              </form>
            )}

            {step === 'results' && result && (
              <ResultsPanel result={result} onDownload={() => setShowModal(true)} />
            )}
          </div>
        </Container>
      </SectionWrapper>

      {showModal && (
        <EmailGateModal
          source="calculator"
          pdfPath={PDF_PATH}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
