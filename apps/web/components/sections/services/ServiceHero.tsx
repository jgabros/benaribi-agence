'use client';

import Image from 'next/image';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

export function ServiceHero({ title, subtitle, imageSrc, imageAlt }: ServiceHeroProps) {
  return (
    <section className="relative h-[65vh] min-h-[480px] overflow-hidden bg-[#09090b] flex items-end">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Dual gradient — matches home Hero treatment */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/90 via-[#09090b]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/30" />

      {/* Content pinned to bottom-left */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-16">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-champagne-gold mb-4 font-body animate-fade-in-up">
          Benaribi Agence
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4 animate-fade-in-up delay-200 leading-[1.1]">
          {title}
        </h1>
        <p className="font-body text-base md:text-lg text-zinc-400 max-w-xl animate-fade-in-up delay-400 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
