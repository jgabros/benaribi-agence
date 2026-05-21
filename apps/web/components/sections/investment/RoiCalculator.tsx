'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Input } from '@benaribi/ui';
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
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}

const darkInputClass =
  'rounded-none bg-[#0d0d0f] border-white/10 hover:border-white/20 text-white placeholder:text-zinc-600 focus-visible:ring-champagne-gold focus-visible:ring-offset-0';

const darkSelectBase = [
  'w-full min-h-[44px] px-4 py-2.5 border bg-[#0d0d0f]',
  'font-body text-base text-white rounded-none',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold',
  'transition-colors',
].join(' ');
const darkSelectClass = `${darkSelectBase} border-white/10 hover:border-white/20`;
const darkSelectErrorClass = `${darkSelectBase} border-red-500`;

const labelClass =
  'block text-xs font-medium font-body text-zinc-400 uppercase tracking-widest mb-2';

function ResultsPanel({
  result,
  onDownload,
}: {
  result: FiscalResult;
  onDownload: () => void;
}) {
  const t = useTranslations('investment.calculator');
  const r = useTranslations('investment.calculator.results');

  const tierLabel =
    result.tier === 'small'
      ? r('tierSmall')
      : result.tier === 'mid'
      ? r('tierMid')
      : r('tierLarge');

  return (
    <div className="space-y-8">
      <div>
        <div className="gold-line mb-6" aria-hidden="true" />
        <h3 className="font-display text-3xl font-light text-white mb-2">{r('title')}</h3>
        <p className="text-xs text-zinc-500 font-body uppercase tracking-widest">
          {r('tier')}:{' '}
          <span className="text-champagne-gold">{tierLabel}</span>
        </p>
      </div>

      {/* Exemptions */}
      <div>
        <h4 className="font-body text-xs font-medium text-zinc-400 uppercase tracking-widest mb-4">
          {r('exemptions')}
        </h4>
        <ul className="space-y-3" role="list">
          {result.exemptions.map((ex, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 font-body">
              <div className="shrink-0 mt-2">
                <div className="h-px w-4 bg-champagne-gold" aria-hidden="true" />
              </div>
              {ex.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Cost + Timeline */}
      <div className="grid grid-cols-2 gap-px bg-white/5">
        <div className="bg-[#0d0d0f] p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-body mb-2">
            {r('costRange')}
          </p>
          <p className="font-display text-xl font-light text-white">
            {formatEUR(result.costEstimateEUR.min)} – {formatEUR(result.costEstimateEUR.max)}
          </p>
        </div>
        <div className="bg-[#0d0d0f] p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-body mb-2">
            {r('timeline')}
          </p>
          <p className="font-display text-xl font-light text-white">
            {result.processTimelineWeeks.min}–{result.processTimelineWeeks.max} {r('weeks')}
          </p>
        </div>
      </div>

      {result.hasTreatyBonus && (
        <p className="text-sm font-body text-teal bg-teal/10 px-4 py-3 border border-teal/20">
          {r('treatyBonus')}
        </p>
      )}

      <p className="text-xs text-zinc-600 italic font-body border-t border-white/5 pt-4">
        {t('disclaimer')}
      </p>

      <button
        type="button"
        onClick={onDownload}
        className="bg-champagne-gold text-[#09090b] hover:bg-champagne-gold/90 rounded-none px-8 py-4 uppercase tracking-widest text-sm font-semibold font-body transition-all duration-300 min-h-[44px] cursor-pointer"
      >
        {r('downloadCta')}
      </button>
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
      <section className="bg-[#09090b] py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto">

            <div className="mb-12">
              <div className="gold-line mb-6" aria-hidden="true" />
              <h2 className="font-display text-4xl font-light text-white mb-3 tracking-tight">
                {t('title')}
              </h2>
              <p className="font-body text-base text-zinc-400">{t('subtitle')}</p>
            </div>

            {step === 'inputs' && (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

                {/* Capital */}
                <div>
                  <label htmlFor="calc-capital" className={labelClass}>
                    {t('capital')}
                  </label>
                  <Input
                    id="calc-capital"
                    type="number"
                    min="1"
                    placeholder={t('capitalPlaceholder') as string}
                    className={darkInputClass}
                    {...(errors.capitalEUR
                      ? { state: 'error' as const, errorMessage: t('validation.capitalPositive') as string }
                      : { state: 'default' as const })}
                    {...register('capitalEUR')}
                  />
                </div>

                {/* Sector */}
                <div>
                  <label htmlFor="calc-sector" className={labelClass}>
                    {t('sector')}
                  </label>
                  <select
                    id="calc-sector"
                    aria-invalid={!!errors.sector}
                    className={errors.sector ? darkSelectErrorClass : darkSelectClass}
                    {...register('sector')}
                  >
                    <option value="">{t('sectorPlaceholder')}</option>
                    <option value="residential">{t('sectorResidential')}</option>
                    <option value="industrial">{t('sectorIndustrial')}</option>
                    <option value="company-setup">{t('sectorCompanySetup')}</option>
                  </select>
                  {errors.sector && (
                    <p role="alert" className="mt-1.5 text-caption text-red-500 font-body">
                      {t('validation.sectorRequired')}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="calc-country" className={labelClass}>
                    {t('country')}
                  </label>
                  <Input
                    id="calc-country"
                    type="text"
                    placeholder={t('countryPlaceholder') as string}
                    className={darkInputClass}
                    {...(errors.countryOfOrigin
                      ? { state: 'error' as const, errorMessage: t('validation.countryRequired') as string }
                      : { state: 'default' as const })}
                    {...register('countryOfOrigin')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-champagne-gold text-[#09090b] hover:bg-champagne-gold/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-none px-8 py-4 uppercase tracking-widest text-sm font-semibold font-body transition-all duration-300 min-h-[44px] cursor-pointer"
                >
                  {t('calculate')}
                </button>
              </form>
            )}

            {step === 'results' && result && (
              <ResultsPanel result={result} onDownload={() => setShowModal(true)} />
            )}
          </div>
        </div>
      </section>

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
