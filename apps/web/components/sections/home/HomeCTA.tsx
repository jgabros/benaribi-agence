'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper, Container, Button } from '@benaribi/ui';
import { Link } from '@/lib/i18n/navigation';

export function HomeCTA() {
  const t = useTranslations('home.cta');

  return (
    <SectionWrapper className="bg-champagne-gold">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-h2 text-charcoal-black mb-4">
            {t('title')}
          </h2>
          <p className="font-body text-body text-charcoal-black/70 mb-10">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="bg-charcoal-black text-off-white hover:bg-charcoal-black/90">
                {t('primary')}
              </Button>
            </Link>
            <Link href="/investment">
              <Button variant="secondary" size="lg" className="border-charcoal-black text-charcoal-black">
                {t('secondary')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
