import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import type { Metadata } from 'next';
import { Hero } from '@/components/sections/home/Hero';
import { ServicesGrid } from '@/components/sections/home/ServicesGrid';
import { WhyMorocco } from '@/components/sections/home/WhyMorocco';
import { WhyBenaribi } from '@/components/sections/home/WhyBenaribi';
import { HomeCTA } from '@/components/sections/home/HomeCTA';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.hero' });
  return {
    title: 'Benaribi Agence — Premium Real Estate & Investment Advisory in Morocco',
    description: t('subheadline'),
    openGraph: {
      title: 'Benaribi Agence',
      description: t('subheadline'),
      url: `https://benaribi.ma/${locale}/`,
      images: [{ url: '/assets/images/og-home.jpg', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyMorocco />
      <WhyBenaribi />
      <HomeCTA />
    </>
  );
}
