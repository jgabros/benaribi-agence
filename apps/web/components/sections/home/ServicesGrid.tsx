'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';

const ICONS = {
  residential: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  ),
  industrial: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="6" width="20" height="15" rx="1" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <line x1="9.5" y1="13.5" x2="14.5" y2="13.5" />
    </svg>
  ),
  companySetup: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
} as const;

const SERVICE_ROUTES = [
  { key: 'residential',  href: '/services/residential'  as const },
  { key: 'industrial',   href: '/services/industrial'   as const },
  { key: 'companySetup', href: '/services/company-setup' as const },
] as const;

export function ServicesGrid() {
  const t = useTranslations('home.services');

  return (
    <section className="bg-[#0d0d0f] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="flex flex-col items-center mb-16">
          <div className="gold-line-center mb-6" aria-hidden="true" />
          <h2 className="font-display text-4xl md:text-5xl font-light text-white tracking-tight text-center">
            {t('title')}
          </h2>
        </div>

        {/* Grid — 1px gap creates hairline separators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {SERVICE_ROUTES.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="group block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold focus-visible:ring-inset"
            >
              <div className="bg-[#0d0d0f] p-10 h-full flex flex-col gap-6 transition-colors duration-500 group-hover:bg-[#131316]">

                {/* Icon */}
                <div className="text-champagne-gold">
                  {ICONS[key]}
                </div>

                {/* Gold accent line */}
                <div className="gold-line" aria-hidden="true" />

                <h3 className="font-display text-2xl font-light text-white leading-snug">
                  {t(`${key}.title` as Parameters<typeof t>[0])}
                </h3>

                <p className="font-body text-base text-zinc-400 leading-relaxed flex-1">
                  {t(`${key}.description` as Parameters<typeof t>[0])}
                </p>

                {/* Arrow */}
                <div
                  className="text-champagne-gold transition-transform duration-300 group-hover:translate-x-2"
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
