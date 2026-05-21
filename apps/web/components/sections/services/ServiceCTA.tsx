'use client';

import { SectionWrapper, Container, Button } from '@benaribi/ui';
import { Link } from '@/lib/i18n/navigation';

interface ServiceCTAProps {
  label: string;
}

export function ServiceCTA({ label }: ServiceCTAProps) {
  return (
    <SectionWrapper className="bg-charcoal-black">
      <Container>
        <div className="text-center">
          <Link href="/contact">
            <Button size="lg" variant="primary">
              {label}
            </Button>
          </Link>
        </div>
      </Container>
    </SectionWrapper>
  );
}
