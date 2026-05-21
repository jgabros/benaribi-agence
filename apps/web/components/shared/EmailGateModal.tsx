'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Button, Input } from '@benaribi/ui';
import { captureLeadEmail } from '@/lib/hubspot/client';
import { fireLeadMagnetDownload } from '@/lib/analytics/events';

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export interface EmailGateProps {
  source: 'calculator' | 'resources';
  pdfPath: string;
  onClose: () => void;
}

export function EmailGateModal({ source, pdfPath, onClose }: EmailGateProps) {
  const t = useTranslations('emailGate');
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    await captureLeadEmail({ email: values.email, lead_source: source });
    fireLeadMagnetDownload(source);
    downloadRef.current?.click();
    onClose();
  }

  return (
    <>
      {/* Hidden download anchor */}
      <a ref={downloadRef} href={pdfPath} download className="hidden" aria-hidden="true" />

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-black/70 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-gate-title"
      >
        <div className="bg-off-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label={t('close') as string}
            className={[
              'absolute top-4 right-4 min-h-[44px] min-w-[44px]',
              'flex items-center justify-center rounded text-charcoal-black/50 hover:text-charcoal-black',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold',
            ].join(' ')}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <h2 id="email-gate-title" className="font-display text-h3 text-charcoal-black mb-2">
            {t('title')}
          </h2>
          <p className="font-body text-body text-charcoal-black/70 mb-6">
            {t('description')}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label htmlFor="gate-email" className="block text-caption font-medium text-charcoal-black mb-1">
                {t('emailLabel')}
              </label>
              <Input
                id="gate-email"
                type="email"
                placeholder={t('emailPlaceholder') as string}
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'gate-email-error' : undefined}
                {...register('email')}
              />
              {errors.email && (
                <p id="gate-email-error" role="alert" className="mt-1 text-caption text-red-600">
                  {t('invalidEmail')}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
