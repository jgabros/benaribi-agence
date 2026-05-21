'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import { locales, type Locale } from '@/i18n';
import { cn } from '@benaribi/ui';

const LOCALE_LABELS: Record<Locale, string> = { en: 'EN', fr: 'FR', es: 'ES' };

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: Locale) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', next);
    }
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language switcher">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchLocale(l)}
          aria-pressed={l === locale}
          aria-label={`Switch to ${LOCALE_LABELS[l]}`}
          className={cn(
            'min-h-[44px] min-w-[44px] px-2 rounded text-caption font-body transition-colors',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-champagne-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-black',
            l === locale
              ? 'text-champagne-gold font-medium'
              : 'text-off-white/70 hover:text-off-white'
          )}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
