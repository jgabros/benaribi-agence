import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import type { Metadata } from 'next';
import { ServiceHero } from '@/components/sections/services/ServiceHero';
import { ServiceBody } from '@/components/sections/services/ServiceBody';
import { ServiceCTA } from '@/components/sections/services/ServiceCTA';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services.companySetup' });
  return {
    title: `${t('hero.title')} — Benaribi Agence`,
    description: t('body.description'),
    openGraph: { title: t('hero.title'), description: t('body.description'), url: `https://benaribi.ma/${locale}/services/company-setup/` },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function CompanySetupPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: 'services.companySetup' });

  return (
    <>
      <ServiceHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        imageSrc="/assets/images/service-company-setup.jpg"
        imageAlt="Business registration and company setup in Morocco"
      />
      <ServiceBody
        description={t('body.description')}
        benefits={t.raw('body.benefits') as string[]}
      />
      <ServiceCTA label={t('cta')} />
    </>
  );
}
