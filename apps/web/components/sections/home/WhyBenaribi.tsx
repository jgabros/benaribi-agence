'use client';

import { useTranslations } from 'next-intl';

const DIFF_KEYS = ['local', 'fiscal', 'track'] as const;

export function WhyBenaribi() {
  const t = useTranslations('home.whyBenaribi');

  return (
    <section className="bg-[#06060a] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="flex flex-col items-center mb-16">
          <div className="gold-line-center mb-6" aria-hidden="true" />
          <h2 className="font-display text-4xl md:text-5xl font-light text-white tracking-tight text-center">
            {t('title')}
          </h2>
        </div>

        {/* Numbered differentiators */}
        <div className="max-w-3xl mx-auto">
          {DIFF_KEYS.map((key, i) => (
            <div
              key={key}
              className="group flex items-start gap-8 py-10 border-b border-white/5 last:border-0"
            >
              {/* Number */}
              <div className="shrink-0 w-12 pt-0.5">
                <span className="font-display text-4xl font-light text-white/10 group-hover:text-champagne-gold/40 transition-colors duration-500 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Text */}
              <p className="font-body text-base md:text-lg text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition-colors duration-300">
                {t(key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
