'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

// Placeholder — swap for local /assets/images/hero-nador-west-med.jpg when available
const HERO_IMAGE =
  'https://static.prod-images.emergentagent.com/jobs/1f30dd09-023e-419c-99be-acb166286b65/images/4cfbf602fd747b7d93583ca9b3896fe45bc03de6a7f8f5a04296d38228a61df4.png';

export function Hero() {
  const t = useTranslations('home.hero');
  const tCommon = useTranslations('common');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#09090b]">
      {/* Background ─ image then video on top */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Aerial view of Nador West Med port complex"
          className="w-full h-full object-cover"
        />
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
        {/* Dual gradient — left-fade for text, bottom-to-top for transition */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/90 via-[#09090b]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 w-full">
        <div className="max-w-2xl">
          {/* Overline */}
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-champagne-gold mb-6 animate-fade-in-up font-body">
            Nador West Med
          </p>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-8 animate-fade-in-up delay-200 leading-[1.1]">
            {t('headline')}
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-zinc-400 mb-12 animate-fade-in-up delay-400 max-w-xl font-body">
            {t('subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-600">
            <Link href="/investment">
              <button
                type="button"
                className="bg-champagne-gold text-[#09090b] hover:bg-champagne-gold/90 rounded-none px-8 py-4 uppercase tracking-widest text-sm font-semibold font-body transition-all duration-300 min-h-[44px] cursor-pointer"
              >
                {t('cta')}
              </button>
            </Link>
            <Link href="/contact">
              <button
                type="button"
                className="bg-transparent border border-white/20 text-white hover:border-champagne-gold hover:text-champagne-gold rounded-none px-8 py-4 uppercase tracking-widest text-sm font-semibold font-body transition-all duration-300 min-h-[44px] cursor-pointer"
              >
                {tCommon('contactUs')}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-zinc-500 hover:text-champagne-gold transition-colors animate-bounce cursor-pointer"
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
