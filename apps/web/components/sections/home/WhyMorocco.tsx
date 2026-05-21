'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper, Container } from '@benaribi/ui';

const DATA_KEYS = ['gdp', 'fdi', 'nadWestMed'] as const;

export function WhyMorocco() {
  const t = useTranslations('home.whyMorocco');

  return (
    <SectionWrapper className="bg-off-white">
      <Container>
        <h2 className="font-display text-h2 text-charcoal-black mb-12 text-center">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {DATA_KEYS.map((key) => (
            <article key={key} className="flex flex-col gap-3">
              <div className="w-10 h-1 bg-champagne-gold rounded" aria-hidden="true" />
              <p className="font-body text-body text-charcoal-black/80 leading-relaxed">
                {t(key)}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
