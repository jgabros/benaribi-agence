'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper, Container, Card, CardTitle, CardBody } from '@benaribi/ui';

export function TeamSection() {
  const t = useTranslations('about.team');

  return (
    <SectionWrapper className="bg-marble-grey">
      <Container>
        <h2 className="font-display text-h2 text-charcoal-black mb-12 text-center">
          {t('title')}
        </h2>
        <div className="max-w-sm mx-auto">
          <Card>
            <CardTitle as="h3">{t('lead.name')}</CardTitle>
            <CardBody>
              <p className="text-champagne-gold text-caption font-medium mb-2">
                {t('lead.role')}
              </p>
              <p>{t('lead.bio')}</p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </SectionWrapper>
  );
}
