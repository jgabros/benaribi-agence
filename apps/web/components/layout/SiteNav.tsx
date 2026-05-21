'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_LINKS = [
  { href: '/' as const,                      labelKey: 'nav.home' },
  { href: '/services/residential' as const,  labelKey: 'nav.residential' },
  { href: '/services/industrial' as const,   labelKey: 'nav.industrial' },
  { href: '/services/company-setup' as const, labelKey: 'nav.companySetup' },
  { href: '/investment' as const,             labelKey: 'nav.investment' },
  { href: '/about' as const,                  labelKey: 'nav.about' },
  { href: '/resources' as const,              labelKey: 'nav.resources' },
] as const;

export function SiteNav() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-nav'
          : 'bg-[#09090b]/80 backdrop-blur-sm border-b border-white/5'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" aria-label="Benaribi Agence — home">
          <Image
            src="/images/one-line-white.svg"
            alt="Benaribi Agence"
            width={140}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              className="font-body text-sm text-zinc-400 hover:text-white transition-colors duration-300 tracking-wide uppercase whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold rounded"
            >
              {t(labelKey)}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/contact">
              <button
                type="button"
                className="border border-white/20 text-white hover:border-champagne-gold hover:text-champagne-gold rounded-none px-5 py-2.5 text-xs uppercase tracking-widest font-body transition-all duration-300 min-h-[44px] cursor-pointer"
              >
                {t('nav.ctaLabel')}
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden text-white flex items-center justify-center min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold rounded"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="lg:hidden glass-nav border-t border-white/10 animate-fade-in">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                className="font-body text-base text-zinc-300 hover:text-champagne-gold transition-colors py-3 uppercase tracking-wide border-b border-white/5 last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {t(labelKey)}
              </Link>
            ))}
            <div className="pt-5 flex items-center justify-between">
              <LanguageSwitcher />
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                <button
                  type="button"
                  className="bg-champagne-gold text-[#09090b] rounded-none px-5 py-2.5 text-xs uppercase tracking-widest font-body font-semibold min-h-[44px] cursor-pointer"
                >
                  {t('nav.ctaLabel')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
