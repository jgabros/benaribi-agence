import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import type { Metadata } from 'next';
import { SectionWrapper, Container } from '@benaribi/ui';
import { LeadMagnetBlock } from '@/components/sections/resources/LeadMagnetBlock';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources' });
  return {
    title: `${t('hero.title')} — Benaribi Agence`,
    description: t('guide.description'),
    alternates: { canonical: `https://benaribi.ma/${locale}/resources/` },
    openGraph: {
      title: t('hero.title'), description: t('guide.description'),
      url: `https://benaribi.ma/${locale}/resources/`,
      siteName: 'Benaribi Agence', type: 'website',
      images: [{ url: '/assets/images/og-home.jpg', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: 'resources.hero' });

  return (
    <>
      <SectionWrapper className="bg-charcoal-black">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-display text-h1 text-off-white mb-3">{t('title')}</h1>
            <p className="font-body text-body text-off-white/60">{t('subtitle')}</p>
          </div>
        </Container>
      </SectionWrapper>
      <LeadMagnetBlock />
    </>
  );
}
