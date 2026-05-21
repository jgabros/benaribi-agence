'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper, Container } from '@benaribi/ui';

export function FirmStory() {
  const t = useTranslations('about');

  return (
    <SectionWrapper className="bg-off-white">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="font-display text-h1 text-charcoal-black mb-3">
              {t('hero.title')}
            </h1>
            <p className="font-body text-body text-charcoal-black/60">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="space-y-10">
            <article>
              <h2 className="font-display text-h3 text-charcoal-black mb-4">
                {t('story.title')}
              </h2>
              <p className="font-body text-body text-charcoal-black/80 leading-relaxed">
                {t('story.text')}
              </p>
            </article>

            <article>
              <h2 className="font-display text-h3 text-charcoal-black mb-4">
                {t('positioning.title')}
              </h2>
              <p className="font-body text-body text-charcoal-black/80 leading-relaxed">
                {t('positioning.text')}
              </p>
            </article>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
