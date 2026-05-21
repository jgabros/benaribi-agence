'use client';

import { useTranslations } from 'next-intl';

const DATA_KEYS = ['gdp', 'fdi', 'nadWestMed'] as const;

export function WhyMorocco() {
  const t = useTranslations('home.whyMorocco');

  return (
    <section className="bg-[#09090b] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="flex flex-col items-center mb-16">
          <div className="gold-line-center mb-6" aria-hidden="true" />
          <h2 className="font-display text-4xl md:text-5xl font-light text-white tracking-tight text-center">
            {t('title')}
          </h2>
        </div>

        {/* Data points — 1px separators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {DATA_KEYS.map((key) => (
            <article key={key} className="bg-[#09090b] p-10">
              <div className="gold-line mb-8" aria-hidden="true" />
              <p className="font-body text-base text-zinc-400 leading-relaxed">
                {t(key)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
