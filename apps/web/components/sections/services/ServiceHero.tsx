'use client';

import Image from 'next/image';
import { DarkOverlay } from '@benaribi/ui';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

export function ServiceHero({ title, subtitle, imageSrc, imageAlt }: ServiceHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[360px] overflow-hidden bg-charcoal-black">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <DarkOverlay opacity={0.6} />
      <div className="relative z-10 flex h-full items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
          <h1 className="font-display text-h1 text-off-white mb-3">{title}</h1>
          <p className="font-body text-body text-off-white/75 max-w-xl">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
