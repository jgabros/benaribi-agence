'use client';

interface ServiceBodyProps {
  description: string;
  benefits: string[];
}

export function ServiceBody({ description, benefits }: ServiceBodyProps) {
  return (
    <section className="bg-[#F5F3EF] py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">

          {/* Description */}
          <div>
            <div className="gold-line mb-8" aria-hidden="true" />
            <p className="font-body text-base text-[#1C1C1C]/75 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <ul className="space-y-5" role="list">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="shrink-0 mt-2.5">
                    <div className="h-px w-4 bg-champagne-gold" aria-hidden="true" />
                  </div>
                  <span className="font-body text-base text-[#1C1C1C]/75 leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
