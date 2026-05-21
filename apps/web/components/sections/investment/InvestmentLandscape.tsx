'use client';

import { useTranslations } from 'next-intl';

export function InvestmentLandscape() {
  const t = useTranslations('investment');

  return (
    <>
      {/* Page hero */}
      <section className="bg-[#09090b] py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-champagne-gold mb-6 font-body animate-fade-in-up">
              Benaribi Agence
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 animate-fade-in-up delay-200 leading-[1.1]">
              {t('hero.title')}
            </h1>
            <p className="font-body text-base md:text-lg text-zinc-400 max-w-xl animate-fade-in-up delay-400 leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Landscape content */}
      <section className="bg-[#0d0d0f] py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <div className="gold-line mb-6" aria-hidden="true" />
            <h2 className="font-display text-3xl md:text-4xl font-light text-white tracking-tight">
              {t('landscape.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            <div className="bg-[#0d0d0f] p-10">
              <p className="font-body text-base text-zinc-400 leading-relaxed">
                {t('landscape.charte')}
              </p>
            </div>
            <div className="bg-[#0d0d0f] p-10">
              <p className="font-body text-base text-zinc-400 leading-relaxed">
                {t('landscape.nwm')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
