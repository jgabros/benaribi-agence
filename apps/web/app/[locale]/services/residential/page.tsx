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
  const t = await getTranslations({ locale, namespace: 'services.residential' });
  return {
    title: `${t('hero.title')} — Benaribi Agence`,
    description: t('body.description'),
    openGraph: { title: t('hero.title'), description: t('body.description'), url: `https://benaribi.ma/${locale}/services/residential/` },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function ResidentialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: 'services.residential' });

  return (
    <>
      <ServiceHero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        imageSrc="/assets/images/service-residential.jpg"
        imageAlt="Luxury residential properties in Morocco"
      />
      <ServiceBody
        description={t('body.description')}
        benefits={t.raw('body.benefits') as string[]}
      />
      <ServiceCTA label={t('cta')} />
    </>
  );
}
