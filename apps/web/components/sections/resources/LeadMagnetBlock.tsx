'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { EmailGateModal } from '@/components/shared/EmailGateModal';

const PDF_PATH = '/downloads/morocco-investment-guide-2026.pdf';

export function LeadMagnetBlock() {
  const t = useTranslations('resources');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="bg-[#09090b] py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center">

            {/* Badge */}
            <span className="inline-block font-body text-xs uppercase tracking-[0.2em] text-champagne-gold border border-champagne-gold/30 px-4 py-1.5 mb-8">
              {t('guide.badge')}
            </span>

            <div className="gold-line-center mb-8" aria-hidden="true" />

            <h2 className="font-display text-4xl md:text-5xl font-light text-white tracking-tight mb-6 leading-tight">
              {t('guide.title')}
            </h2>

            <p className="font-body text-base text-zinc-400 mb-12 leading-relaxed">
              {t('guide.description')}
            </p>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="bg-champagne-gold text-[#09090b] hover:bg-champagne-gold/90 rounded-none px-10 py-4 uppercase tracking-widest text-sm font-semibold font-body transition-all duration-300 min-h-[44px] cursor-pointer"
            >
              {t('guide.cta')}
            </button>
          </div>
        </div>
      </section>

      {showModal && (
        <EmailGateModal
          source="resources"
          pdfPath={PDF_PATH}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
