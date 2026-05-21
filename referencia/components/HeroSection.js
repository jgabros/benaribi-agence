import { useLanguage } from "@/LanguageContext";
import translations from "@/translations";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE = "https://static.prod-images.emergentagent.com/jobs/1f30dd09-023e-419c-99be-acb166286b65/images/4cfbf602fd747b7d93583ca9b3896fe45bc03de6a7f8f5a04296d38228a61df4.png";

export default function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" data-testid="hero-section" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Luxury Mediterranean Villa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/90 via-[#09090b]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 w-full">
        <div className="max-w-2xl">
          <p
            data-testid="hero-overline"
            className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-6 animate-fade-in-up"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.overline}
          </p>
          <h1
            data-testid="hero-title"
            className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-8 animate-fade-in-up delay-200 leading-[1.1]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t.title}
          </h1>
          <p
            data-testid="hero-subtitle"
            className="text-base md:text-lg leading-relaxed text-zinc-400 mb-12 animate-fade-in-up delay-400 max-w-xl"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-600">
            <button
              data-testid="hero-cta-primary"
              onClick={() => scrollTo("#properties")}
              className="bg-[#d4af37] text-black hover:bg-[#b5952f] rounded-none px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-all duration-300"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t.cta}
            </button>
            <button
              data-testid="hero-cta-secondary"
              onClick={() => scrollTo("#contact")}
              className="bg-transparent border border-white/20 text-white hover:border-[#d4af37] hover:text-[#d4af37] rounded-none px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-all duration-300"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        data-testid="scroll-indicator"
        onClick={() => scrollTo("#about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-[#d4af37] transition-colors animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
