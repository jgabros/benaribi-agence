'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper, Container } from '@benaribi/ui';

export function InvestmentLandscape() {
  const t = useTranslations('investment');

  return (
    <SectionWrapper className="bg-off-white">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-h1 text-charcoal-black mb-4">
            {t('hero.title')}
          </h1>
          <p className="font-body text-body text-charcoal-black/60 mb-12">
            {t('hero.subtitle')}
          </p>

          <h2 className="font-display text-h3 text-charcoal-black mb-6">
            {t('landscape.title')}
          </h2>
          <div className="space-y-5">
            <p className="font-body text-body text-charcoal-black/80 leading-relaxed">
              {t('landscape.charte')}
            </p>
            <p className="font-body text-body text-charcoal-black/80 leading-relaxed">
              {t('landscape.nwm')}
            </p>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
