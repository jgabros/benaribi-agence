'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button, DarkOverlay } from '@benaribi/ui';
import { Link } from '@/lib/i18n/navigation';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative h-[90vh] min-h-[560px] overflow-hidden bg-charcoal-black">
      {/* Static image fallback — loaded eagerly for LCP */}
      <Image
        src="/assets/images/hero-nador-west-med.jpg"
        alt="Aerial view of Nador West Med port complex"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Video layer — plays on top once loaded */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/assets/video/hero-nador-west-med.mp4" type="video/mp4" />
      </video>

      <DarkOverlay opacity={0.55} />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="font-display text-display text-off-white leading-tight mb-6">
              {t('headline')}
            </h1>
            <p className="font-body text-h4 text-off-white/80 mb-10 leading-relaxed">
              {t('subheadline')}
            </p>
            <Link href="/investment">
              <Button size="lg" variant="primary">
                {t('cta')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
