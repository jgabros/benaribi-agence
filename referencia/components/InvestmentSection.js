import { useLanguage } from "@/LanguageContext";
import translations from "@/translations";
import { useInView } from "@/hooks/useInView";
import { TrendingUp, Building2, Users, Briefcase } from "lucide-react";

const INVESTMENT_BG = "https://static.prod-images.emergentagent.com/jobs/1f30dd09-023e-419c-99be-acb166286b65/images/6e7cf5026030ef5a6cf6b6ce05f43be37d3f096844c87a6918ba62dd02657025.png";

const statIcons = [TrendingUp, Building2, Users, Briefcase];

export default function InvestmentSection() {
  const { language } = useLanguage();
  const t = translations[language].investment;
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="investments"
      ref={ref}
      data-testid="investment-section"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img src={INVESTMENT_BG} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[#09090b]/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 md:mb-24 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.overline}
          </p>
          <h2
            data-testid="investment-title"
            className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t.title}
          </h2>
          <div className="gold-line-center mb-6" />
          <p
            className="text-base md:text-lg leading-relaxed text-zinc-400"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {t.stats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <div
                key={i}
                data-testid={`investment-stat-${i}`}
                className={`group relative bg-[#141416] border border-white/5 hover:border-[#d4af37]/30 p-8 md:p-10 transition-all duration-500 ${
                  inView ? "animate-fade-in-up" : "opacity-0"
                } ${i === 0 ? "lg:row-span-1" : ""}`}
                style={{ animationDelay: `${(i + 1) * 150}ms` }}
              >
                <Icon className="w-5 h-5 text-[#d4af37] mb-6 opacity-60 group-hover:opacity-100 transition-opacity" />
                <p
                  className="text-4xl md:text-5xl font-light text-white mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs tracking-[0.15em] uppercase text-zinc-500"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {stat.label}
                </p>
                {/* Gold accent line at bottom */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37] group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
