'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper, Container, Button, GeometricPattern } from '@benaribi/ui';
import { Link } from '@/lib/i18n/navigation';

export function HomeCTA() {
  const t = useTranslations('home.cta');

  return (
    <SectionWrapper className="relative bg-champagne-gold overflow-hidden">
      {/* Decorative Moroccan arch patterns — dark on gold */}
      <GeometricPattern
        className="absolute -right-16 -top-16 pointer-events-none select-none"
        width={360}
        height={360}
        fill="#1C1C1C"
        opacity={0.08}
      />
      <GeometricPattern
        className="absolute -left-16 -bottom-16 pointer-events-none select-none rotate-180"
        width={280}
        height={280}
        fill="#1C1C1C"
        opacity={0.06}
      />

      <Container>
        <div className="relative text-center max-w-2xl mx-auto">
          <h2 className="font-display text-h2 text-charcoal-black tracking-tight mb-4">
            {t('title')}
          </h2>
          <p className="font-body text-body text-charcoal-black/70 mb-10 leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="bg-charcoal-black text-off-white hover:bg-charcoal-black/90 transition-colors duration-200"
              >
                {t('primary')}
              </Button>
            </Link>
            <Link href="/investment">
              <Button
                variant="secondary"
                size="lg"
                className="border-charcoal-black/50 text-charcoal-black hover:bg-charcoal-black/10 transition-colors duration-200"
              >
                {t('secondary')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
