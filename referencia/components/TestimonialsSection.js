import { useLanguage } from "@/LanguageContext";
import translations from "@/translations";
import { useInView } from "@/hooks/useInView";
import { Quote } from "lucide-react";

const testimonials = [
  {
    image: "https://images.pexels.com/photos/7876500/pexels-photo-7876500.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: { en: "Sarah Lahmidi", fr: "Sarah Lahmidi", ar: "سارة الحميدي" },
    role: { en: "International Investor", fr: "Investisseuse Internationale", ar: "مستثمرة دولية" },
    quote: {
      en: "Benaribi Agence transformed my portfolio. Their deep knowledge of the Nador West Med market identified opportunities I would never have found alone. The ROI has exceeded every expectation.",
      fr: "Benaribi Agence a transforme mon portefeuille. Leur connaissance approfondie du marche de Nador West Med a identifie des opportunites que je n'aurais jamais trouvees seule. Le ROI a depasse toutes les attentes.",
      ar: "وكالة بناريبي حولت محفظتي الاستثمارية. معرفتهم العميقة بسوق ناظور ويست ميد كشفت فرصاً لم أكن لأجدها وحدي. العائد على الاستثمار فاق كل التوقعات.",
    },
  },
  {
    image: "https://images.pexels.com/photos/8370429/pexels-photo-8370429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: { en: "Karim Benjelloun", fr: "Karim Benjelloun", ar: "كريم بنجلون" },
    role: { en: "Real Estate Developer", fr: "Promoteur Immobilier", ar: "مطور عقاري" },
    quote: {
      en: "Working with Benaribi has been extraordinary. Their team provides unmatched advisory services, from site selection to final acquisition. They understand luxury real estate at the highest level.",
      fr: "Travailler avec Benaribi a ete extraordinaire. Leur equipe fournit des services de conseil inegales, de la selection du site a l'acquisition finale. Ils comprennent l'immobilier de luxe au plus haut niveau.",
      ar: "العمل مع بناريبي كان استثنائياً. فريقهم يقدم خدمات استشارية لا مثيل لها، من اختيار الموقع إلى الاستحواذ النهائي. يفهمون العقارات الفاخرة على أعلى مستوى.",
    },
  },
];

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const t = translations[language].testimonials;
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="testimonials"
      ref={ref}
      data-testid="testimonials-section"
      className="py-24 md:py-32 bg-[#141416]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 md:mb-24 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.overline}
          </p>
          <h2
            data-testid="testimonials-title"
            className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t.title}
          </h2>
          <div className="gold-line-center mb-6" />
          <p className="text-base md:text-lg leading-relaxed text-zinc-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {t.subtitle}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {testimonials.map((item, i) => (
            <div
              key={i}
              data-testid={`testimonial-card-${i}`}
              className={`relative bg-[#09090b] border border-white/5 p-8 md:p-12 ${
                inView ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(i + 1) * 200}ms` }}
            >
              <Quote className="w-8 h-8 text-[#d4af37]/30 mb-6" />
              <p
                className="text-base md:text-lg leading-relaxed text-zinc-300 mb-8"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                "{item.quote[language]}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name[language]}
                  className="w-14 h-14 object-cover rounded-full border-2 border-[#d4af37]/30"
                />
                <div>
                  <p className="text-white font-medium text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {item.name[language]}
                  </p>
                  <p className="text-zinc-500 text-xs tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {item.role[language]}
                  </p>
                </div>
              </div>
              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#d4af37]/40 to-transparent" />
                <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-[#d4af37]/40 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
