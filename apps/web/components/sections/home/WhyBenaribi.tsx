'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper, Container, Divider } from '@benaribi/ui';

const DIFF_KEYS = ['local', 'fiscal', 'track'] as const;

export function WhyBenaribi() {
  const t = useTranslations('home.whyBenaribi');

  return (
    <SectionWrapper className="bg-charcoal-black">
      <Container>
        <h2 className="font-display text-h2 text-off-white mb-12 text-center">
          {t('title')}
        </h2>
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {DIFF_KEYS.map((key, i) => (
            <div key={key}>
              <p className="font-body text-h4 text-off-white leading-relaxed">
                {t(key)}
              </p>
              {i < DIFF_KEYS.length - 1 && (
                <Divider className="mt-8 border-off-white/10" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
