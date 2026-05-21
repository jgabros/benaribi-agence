'use client';

import { useTranslations } from 'next-intl';

export function TeamSection() {
  const t = useTranslations('about.team');

  return (
    <section className="bg-[#0d0d0f] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="flex flex-col items-center mb-14">
          <div className="gold-line-center mb-6" aria-hidden="true" />
          <h2 className="font-display text-4xl font-light text-white tracking-tight text-center">
            {t('title')}
          </h2>
        </div>

        <div className="max-w-sm mx-auto">
          <div className="border border-white/5 bg-[#09090b] p-10">
            <div className="gold-line mb-8" aria-hidden="true" />
            <h3 className="font-display text-2xl font-light text-white mb-2 leading-snug">
              {t('lead.name')}
            </h3>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-champagne-gold mb-5">
              {t('lead.role')}
            </p>
            <p className="font-body text-sm text-zinc-400 leading-relaxed">
              {t('lead.bio')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
