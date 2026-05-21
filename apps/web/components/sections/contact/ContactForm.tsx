'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Button, Input } from '@benaribi/ui';
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

const selectClass = [
  'w-full min-h-[44px] px-4 py-2.5 rounded border bg-off-white',
  'font-body text-body text-charcoal-black',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold',
  'border-marble-grey',
].join(' ');

const errorSelectClass = [
  'w-full min-h-[44px] px-4 py-2.5 rounded border bg-off-white',
  'font-body text-body text-charcoal-black',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold',
  'border-red-600',
].join(' ');

export function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
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
        className="rounded-lg bg-teal/10 border border-teal/20 px-6 py-8 text-center"
      >
        <p className="font-display text-h4 text-charcoal-black">{t('form.success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {serverError && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-caption text-red-700">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label={t('form.firstname') as string}
          type="text"
          autoComplete="given-name"
          {...(errors.firstname
            ? { state: 'error' as const, errorMessage: t('form.required') as string }
            : { state: 'default' as const })}
          {...register('firstname')}
        />
        <Input
          label={t('form.lastname') as string}
          type="text"
          autoComplete="family-name"
          {...(errors.lastname
            ? { state: 'error' as const, errorMessage: t('form.required') as string }
            : { state: 'default' as const })}
          {...register('lastname')}
        />
      </div>

      <Input
        label={t('form.email') as string}
        type="email"
        autoComplete="email"
        {...(errors.email
          ? { state: 'error' as const, errorMessage: t('form.invalidEmail') as string }
          : { state: 'default' as const })}
        {...register('email')}
      />

      <div>
        <label htmlFor="contact-country" className="block text-caption font-medium text-charcoal-black mb-1">
          {t('form.country')}
        </label>
        <Input
          id="contact-country"
          type="text"
          autoComplete="country-name"
          {...(errors.country
            ? { state: 'error' as const, errorMessage: t('form.required') as string }
            : { state: 'default' as const })}
          {...register('country')}
        />
      </div>

      <div>
        <label htmlFor="contact-service" className="block text-caption font-medium text-charcoal-black mb-1">
          {t('form.serviceInterest')}
        </label>
        <select
          id="contact-service"
          aria-invalid={!!errors.service_interest}
          className={errors.service_interest ? errorSelectClass : selectClass}
          {...register('service_interest')}
        >
          <option value="residential">{t('form.serviceResidential')}</option>
          <option value="industrial">{t('form.serviceIndustrial')}</option>
          <option value="company-setup">{t('form.serviceCompanySetup')}</option>
          <option value="other">{t('form.serviceOther')}</option>
        </select>
        {errors.service_interest && (
          <p role="alert" className="mt-1 text-caption text-red-600">{t('form.required')}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-budget" className="block text-caption font-medium text-charcoal-black mb-1">
          {t('form.budgetRange')}
        </label>
        <select
          id="contact-budget"
          aria-invalid={!!errors.budget_range}
          className={errors.budget_range ? errorSelectClass : selectClass}
          {...register('budget_range')}
        >
          <option value="0-50000">{t('form.budget50k')}</option>
          <option value="50000-100000">{t('form.budget100k')}</option>
          <option value="100000-500000">{t('form.budget500k')}</option>
          <option value="500000-2000000">{t('form.budget2m')}</option>
          <option value="2000000+">{t('form.budgetLarge')}</option>
        </select>
      </div>

      <Button type="submit" size="lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? t('form.submitting') : t('form.submit')}
      </Button>
    </form>
  );
}
