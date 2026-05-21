'use client';

import { useTranslations } from 'next-intl';
import { NavigationBar, Logo, Button } from '@benaribi/ui';
import { Link } from '@/lib/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_LINKS = [
  { href: '/' as const, labelKey: 'nav.home' },
  { href: '/services/residential' as const, labelKey: 'nav.residential' },
  { href: '/services/industrial' as const, labelKey: 'nav.industrial' },
  { href: '/services/company-setup' as const, labelKey: 'nav.companySetup' },
  { href: '/investment' as const, labelKey: 'nav.investment' },
  { href: '/about' as const, labelKey: 'nav.about' },
  { href: '/resources' as const, labelKey: 'nav.resources' },
];

export function SiteNav() {
  const t = useTranslations();

  const links = (
    <>
      {NAV_LINKS.map(({ href, labelKey }) => (
        <Link
          key={href}
          href={href}
          className={[
            'text-caption font-body text-off-white/80 hover:text-off-white',
            'transition-colors whitespace-nowrap',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-champagne-gold rounded',
          ].join(' ')}
        >
          {t(labelKey)}
        </Link>
      ))}
    </>
  );

  const action = (
    <div className="flex items-center gap-3">
      <LanguageSwitcher />
      <Link href="/contact">
        <Button size="sm" variant="primary">
          {t('nav.ctaLabel')}
        </Button>
      </Link>
    </div>
  );

  return (
    <NavigationBar
      logo={<Link href="/"><Logo /></Link>}
      links={links}
      action={action}
    />
  );
}
