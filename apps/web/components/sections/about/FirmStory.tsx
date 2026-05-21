'use client';

import { useTranslations } from 'next-intl';

export function FirmStory() {
  const t = useTranslations('about');

  return (
    <>
      {/* Page hero */}
      <section className="bg-[#09090b] py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-champagne-gold mb-6 font-body animate-fade-in-up">
              Benaribi Agence
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight text-white mb-6 animate-fade-in-up delay-200 leading-[1.1]">
              {t('hero.title')}
            </h1>
            <p className="font-body text-base md:text-lg text-zinc-400 max-w-xl animate-fade-in-up delay-400 leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Story content — light section for contrast */}
      <section className="bg-[#F5F3EF] py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto space-y-16">
            <article>
              <div className="gold-line mb-6" aria-hidden="true" />
              <h2 className="font-display text-3xl font-light text-[#1C1C1C] tracking-tight mb-5">
                {t('story.title')}
              </h2>
              <p className="font-body text-base text-[#1C1C1C]/70 leading-relaxed">
                {t('story.text')}
              </p>
            </article>

            <article>
              <div className="gold-line mb-6" aria-hidden="true" />
              <h2 className="font-display text-3xl font-light text-[#1C1C1C] tracking-tight mb-5">
                {t('positioning.title')}
              </h2>
              <p className="font-body text-base text-[#1C1C1C]/70 leading-relaxed">
                {t('positioning.text')}
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
