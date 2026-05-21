import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import type { Metadata } from 'next';
import { SectionWrapper, Container } from '@benaribi/ui';
import { ContactForm } from '@/components/sections/contact/ContactForm';

const WHATSAPP_URL = 'https://wa.me/212676726119';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.hero' });
  return {
    title: `${t('title')} — Benaribi Agence`,
    description: t('subtitle'),
    openGraph: { title: t('title'), description: t('subtitle'), url: `https://benaribi.ma/${locale}/contact/` },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <SectionWrapper className="bg-off-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Form column */}
          <div>
            <h1 className="font-display text-h2 text-charcoal-black mb-2">{t('hero.title')}</h1>
            <p className="font-body text-body text-charcoal-black/60 mb-10">{t('hero.subtitle')}</p>
            <ContactForm />
          </div>

          {/* Alternatives column */}
          <aside>
            <h2 className="font-display text-h4 text-charcoal-black mb-6">
              {t('alternatives.title')}
            </h2>
            <dl className="space-y-6">
              <div>
                <dt className="text-caption font-medium text-champagne-gold uppercase tracking-widest mb-1">
                  {t('alternatives.whatsapp')}
                </dt>
                <dd>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-body text-charcoal-black hover:text-champagne-gold transition-colors"
                  >
                    +212 676 72 61 19
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-caption font-medium text-champagne-gold uppercase tracking-widest mb-1">
                  {t('alternatives.email')}
                </dt>
                <dd>
                  <a
                    href="mailto:contact@benaribi.ma"
                    className="font-body text-body text-charcoal-black hover:text-champagne-gold transition-colors"
                  >
                    contact@benaribi.ma
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-caption font-medium text-champagne-gold uppercase tracking-widest mb-1">
                  {t('alternatives.address')}
                </dt>
                <dd className="font-body text-body text-charcoal-black/80">
                  Nador West Med<br />
                  Nador, Morocco
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>
    </SectionWrapper>
  );
}
