import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Footer } from '@benaribi/ui';
import { locales, type Locale } from '@/i18n';
import { SiteNav } from '@/components/layout/SiteNav';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { AnalyticsProvider } from '@/components/shared/AnalyticsProvider';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://benaribi.ma/${l}/`])
      ),
      canonical: `https://benaribi.ma/${locale}/`,
    },
  };
}

function FooterContent() {
  return (
    <Footer
      columns={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-display text-h4 text-off-white mb-2">Benaribi Agence</p>
            <p className="text-caption text-off-white/60">Premium Real Estate &amp; Investment Advisory</p>
          </div>
          <div>
            <p className="text-caption font-medium text-champagne-gold mb-3 uppercase tracking-widest">Contact</p>
            <ul className="space-y-1 text-caption text-off-white/70">
              <li>Nador West Med, Nador, Morocco</li>
              <li>+212 676 72 61 19</li>
              <li>contact@benaribi.ma</li>
            </ul>
          </div>
          <div>
            <p className="text-caption font-medium text-champagne-gold mb-3 uppercase tracking-widest">Services</p>
            <ul className="space-y-1 text-caption text-off-white/70">
              <li>Residential Real Estate</li>
              <li>Industrial Real Estate</li>
              <li>Company Setup</li>
            </ul>
          </div>
        </div>
      }
      bottomBar={
        <p className="text-caption text-off-white/40 text-center">
          © {new Date().getFullYear()} Benaribi Agence. All rights reserved.
        </p>
      }
    />
  );
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Required for static export — provides locale to next-intl without request headers
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AnalyticsProvider />
      <SiteNav />
      <main id="main-content">{children}</main>
      <FooterContent />
      <WhatsAppButton />
    </NextIntlClientProvider>
  );
}
