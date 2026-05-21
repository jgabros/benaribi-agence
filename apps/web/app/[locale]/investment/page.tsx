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
    openGraph: { title: t('title'), description: t('subtitle'), url: `https://benaribi.ma/${locale}/investment/` },
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
