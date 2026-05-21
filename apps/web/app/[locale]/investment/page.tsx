import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import type { Metadata } from 'next';
import { InvestmentLandscape } from '@/components/sections/investment/InvestmentLandscape';
import { RoiCalculator } from '@/components/sections/investment/RoiCalculator';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'investment.hero' });
  return {
    title: `${t('title')} — Benaribi Agence`,
    description: t('subtitle'),
    alternates: { canonical: `https://benaribi.ma/${locale}/investment/` },
    openGraph: {
      title: t('title'), description: t('subtitle'),
      url: `https://benaribi.ma/${locale}/investment/`,
      siteName: 'Benaribi Agence', type: 'website',
      images: [{ url: '/assets/images/og-home.jpg', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function InvestmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <InvestmentLandscape />
      <RoiCalculator />
    </>
  );
}
