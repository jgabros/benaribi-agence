import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import type { Metadata } from 'next';
import { FirmStory } from '@/components/sections/about/FirmStory';
import { TeamSection } from '@/components/sections/about/TeamSection';
import { Container, Button } from '@benaribi/ui';
import { Link } from '@/lib/i18n/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.hero' });
  return {
    title: `${t('title')} — Benaribi Agence`,
    description: t('subtitle'),
    alternates: { canonical: `https://benaribi.ma/${locale}/about/` },
    openGraph: {
      title: t('title'), description: t('subtitle'),
      url: `https://benaribi.ma/${locale}/about/`,
      siteName: 'Benaribi Agence', type: 'website',
      images: [{ url: '/assets/images/og-home.jpg', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <>
      <FirmStory />
      <TeamSection />
      <section className="py-16 bg-off-white">
        <Container>
          <div className="text-center">
            <Link href="/contact">
              <Button size="lg">{t('cta')}</Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
