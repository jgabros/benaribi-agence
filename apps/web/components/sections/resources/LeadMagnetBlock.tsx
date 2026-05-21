'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionWrapper, Container, Button, Badge } from '@benaribi/ui';
import { EmailGateModal } from '@/components/shared/EmailGateModal';

const PDF_PATH = '/downloads/morocco-investment-guide-2026.pdf';

export function LeadMagnetBlock() {
  const t = useTranslations('resources');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SectionWrapper className="bg-off-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="mb-6 inline-block">{t('guide.badge')}</Badge>
            <h2 className="font-display text-h2 text-charcoal-black mb-4">
              {t('guide.title')}
            </h2>
            <p className="font-body text-body text-charcoal-black/70 mb-10 leading-relaxed">
              {t('guide.description')}
            </p>
            <Button size="lg" onClick={() => setShowModal(true)}>
              {t('guide.cta')}
            </Button>
          </div>
        </Container>
      </SectionWrapper>

      {showModal && (
        <EmailGateModal
          source="resources"
          pdfPath={PDF_PATH}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
