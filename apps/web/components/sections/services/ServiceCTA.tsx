'use client';

import { Link } from '@/lib/i18n/navigation';

interface ServiceCTAProps {
  label: string;
}

export function ServiceCTA({ label }: ServiceCTAProps) {
  return (
    <section className="bg-[#09090b] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        <div className="gold-line-center mb-10" aria-hidden="true" />
        <Link href="/contact">
          <button
            type="button"
            className="bg-champagne-gold text-[#09090b] hover:bg-champagne-gold/90 rounded-none px-10 py-4 uppercase tracking-widest text-sm font-semibold font-body transition-all duration-300 min-h-[44px] cursor-pointer"
          >
            {label}
          </button>
        </Link>
      </div>
    </section>
  );
}
