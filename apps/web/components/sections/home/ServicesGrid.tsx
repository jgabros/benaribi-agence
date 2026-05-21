'use client';

import { useTranslations } from 'next-intl';
import { SectionWrapper, Container, Card, CardTitle, CardBody } from '@benaribi/ui';
import { Link } from '@/lib/i18n/navigation';

const SERVICE_ROUTES = [
  { key: 'residential', href: '/services/residential' as const },
  { key: 'industrial', href: '/services/industrial' as const },
  { key: 'companySetup', href: '/services/company-setup' as const },
] as const;

export function ServicesGrid() {
  const t = useTranslations('home.services');

  return (
    <SectionWrapper className="bg-marble-grey">
      <Container>
        <h2 className="font-display text-h2 text-charcoal-black mb-12 text-center">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICE_ROUTES.map(({ key, href }) => (
            <Link key={key} href={href} className="block h-full group focus-visible:outline-none">
              <Card className="h-full transition-shadow group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-champagne-gold">
                <CardTitle as="h3">
                  {t(`${key}.title` as Parameters<typeof t>[0])}
                </CardTitle>
                <CardBody>
                  {t(`${key}.description` as Parameters<typeof t>[0])}
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
