'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Input } from '@benaribi/ui';
import { submitContact } from '@/lib/hubspot/client';
import { fireLead } from '@/lib/analytics/events';

const schema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  country: z.string().min(1),
  service_interest: z.enum(['residential', 'industrial', 'company-setup', 'other'] as const),
  budget_range: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const selectBase = [
  'w-full min-h-[44px] px-4 py-2.5 border rounded-none bg-off-white',
  'font-body text-base text-charcoal-black',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold',
  'transition-colors',
].join(' ');
const selectClass = `${selectBase} border-charcoal-black/20 hover:border-charcoal-black/40`;
const selectErrorClass = `${selectBase} border-red-600`;

const labelClass =
  'block text-xs font-medium font-body text-charcoal-black/60 uppercase tracking-widest mb-2';

const inputClass =
  'rounded-none border-charcoal-black/20 hover:border-charcoal-black/40 focus-visible:ring-champagne-gold focus-visible:ring-offset-0';

export function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus('submitting');
    setServerError(null);
    try {
      await submitContact(values);
      setStatus('success');
      fireLead('contact-form');
    } catch {
      setStatus('error');
      setServerError(t('form.error') as string);
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-teal/30 bg-teal/5 px-6 py-10 text-center"
      >
        <div className="gold-line-center mb-4" aria-hidden="true" />
        <p className="font-display text-2xl font-light text-charcoal-black">{t('form.success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {serverError && (
        <div
          role="alert"
          className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 font-body"
        >
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cf-firstname" className={labelClass}>
            {t('form.firstname')}
          </label>
          <Input
            id="cf-firstname"
            type="text"
            autoComplete="given-name"
            className={inputClass}
            {...(errors.firstname
              ? { state: 'error' as const, errorMessage: t('form.required') as string }
              : { state: 'default' as const })}
            {...register('firstname')}
          />
        </div>
        <div>
          <label htmlFor="cf-lastname" className={labelClass}>
            {t('form.lastname')}
          </label>
          <Input
            id="cf-lastname"
            type="text"
            autoComplete="family-name"
            className={inputClass}
            {...(errors.lastname
              ? { state: 'error' as const, errorMessage: t('form.required') as string }
              : { state: 'default' as const })}
            {...register('lastname')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className={labelClass}>
          {t('form.email')}
        </label>
        <Input
          id="cf-email"
          type="email"
          autoComplete="email"
          className={inputClass}
          {...(errors.email
            ? { state: 'error' as const, errorMessage: t('form.invalidEmail') as string }
            : { state: 'default' as const })}
          {...register('email')}
        />
      </div>

      <div>
        <label htmlFor="cf-country" className={labelClass}>
          {t('form.country')}
        </label>
        <Input
          id="cf-country"
          type="text"
          autoComplete="country-name"
          className={inputClass}
          {...(errors.country
            ? { state: 'error' as const, errorMessage: t('form.required') as string }
            : { state: 'default' as const })}
          {...register('country')}
        />
      </div>

      <div>
        <label htmlFor="cf-service" className={labelClass}>
          {t('form.serviceInterest')}
        </label>
        <select
          id="cf-service"
          aria-invalid={!!errors.service_interest}
          className={errors.service_interest ? selectErrorClass : selectClass}
          {...register('service_interest')}
        >
          <option value="residential">{t('form.serviceResidential')}</option>
          <option value="industrial">{t('form.serviceIndustrial')}</option>
          <option value="company-setup">{t('form.serviceCompanySetup')}</option>
          <option value="other">{t('form.serviceOther')}</option>
        </select>
        {errors.service_interest && (
          <p role="alert" className="mt-1.5 text-caption text-red-600 font-body">
            {t('form.required')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-budget" className={labelClass}>
          {t('form.budgetRange')}
        </label>
        <select
          id="cf-budget"
          aria-invalid={!!errors.budget_range}
          className={errors.budget_range ? selectErrorClass : selectClass}
          {...register('budget_range')}
        >
          <option value="0-50000">{t('form.budget50k')}</option>
          <option value="50000-100000">{t('form.budget100k')}</option>
          <option value="100000-500000">{t('form.budget500k')}</option>
          <option value="500000-2000000">{t('form.budget2m')}</option>
          <option value="2000000+">{t('form.budgetLarge')}</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto bg-champagne-gold text-[#09090b] hover:bg-champagne-gold/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-none px-10 py-4 uppercase tracking-widest text-sm font-semibold font-body transition-all duration-300 min-h-[44px] cursor-pointer"
      >
        {status === 'submitting' ? t('form.submitting') : t('form.submit')}
      </button>
    </form>
  );
}
