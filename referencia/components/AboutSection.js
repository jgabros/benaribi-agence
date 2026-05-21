import { useLanguage } from "@/LanguageContext";
import translations from "@/translations";
import { useInView } from "@/hooks/useInView";

const ABOUT_IMAGE = "https://static.prod-images.emergentagent.com/jobs/1f30dd09-023e-419c-99be-acb166286b65/images/ff3a0e2d2f7d06330ca013c62a6749515aa9ba9e52247e3a84148017fac7c417.png";

export default function AboutSection() {
  const { language } = useLanguage();
  const t = translations[language].about;
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section
      id="about"
      ref={ref}
      data-testid="about-section"
      className="py-24 md:py-32 bg-[#09090b]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
          {/* Image — asymmetric placement */}
          <div className={`lg:col-span-5 ${inView ? "animate-slide-left" : "opacity-0"}`}>
            <div className="relative">
              <div className="absolute -inset-4 border border-[#d4af37]/20" />
              <img
                src={ABOUT_IMAGE}
                alt="Moroccan Architecture Detail"
                data-testid="about-image"
                className="w-full h-[400px] md:h-[520px] object-cover"
              />
              {/* Floating stat card */}
              <div className="absolute -bottom-8 -right-4 md:-right-8 bg-[#141416] border border-white/10 p-6 md:p-8">
                <p className="text-3xl md:text-4xl font-light text-[#d4af37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {t.stat1Value}
                </p>
                <p className="text-xs tracking-[0.15em] uppercase text-zinc-500 mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {t.stat1Label}
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className={`lg:col-span-7 lg:pl-8 ${inView ? "animate-slide-right delay-200" : "opacity-0"}`}>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-6"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t.overline}
            </p>
            <h2
              data-testid="about-title"
              className="text-4xl md:text-5xl font-light tracking-tight text-white mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t.title}
            </h2>
            <div className="gold-line mb-8" />
            <p
              className="text-base md:text-lg leading-relaxed text-zinc-400 mb-6"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t.description}
            </p>
            <p
              className="text-base md:text-lg leading-relaxed text-zinc-500 mb-10"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t.descriptionAlt}
            </p>

            {/* Stats row */}
            <div className="flex gap-12">
              <div>
                <p className="text-3xl md:text-4xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {t.stat2Value}
                </p>
                <p className="text-xs tracking-[0.15em] uppercase text-zinc-500 mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {t.stat2Label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
