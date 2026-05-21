'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { locales, defaultLocale, type Locale } from '@/i18n';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('preferred-locale') as Locale | null;
    if (saved && locales.includes(saved)) {
      router.replace(`/${saved}/`);
      return;
    }
    const browserLang = navigator.language.slice(0, 2) as Locale;
    const detected = locales.includes(browserLang) ? browserLang : defaultLocale;
    router.replace(`/${detected}/`);
  }, [router]);

  return null;
}
