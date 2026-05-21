'use client';

import { SectionWrapper, Container } from '@benaribi/ui';

interface ServiceBodyProps {
  description: string;
  benefits: string[];
}

export function ServiceBody({ description, benefits }: ServiceBodyProps) {
  return (
    <SectionWrapper className="bg-off-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div>
            <p className="font-body text-body text-charcoal-black/80 leading-relaxed">
              {description}
            </p>
          </div>
          <div>
            <ul className="space-y-4" role="list">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-champagne-gold shrink-0" aria-hidden="true" />
                  <span className="font-body text-body text-charcoal-black/80">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
