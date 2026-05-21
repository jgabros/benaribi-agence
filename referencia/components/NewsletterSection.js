import { useState } from "react";
import { useLanguage } from "@/LanguageContext";
import translations from "@/translations";
import { useInView } from "@/hooks/useInView";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function NewsletterSection() {
  const { language } = useLanguage();
  const t = translations[language].newsletter;
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/newsletter`, { email });
      if (res.data.message === "already_subscribed") {
        toast.info(t.already);
      } else {
        toast.success(t.success);
      }
      setEmail("");
    } catch (err) {
      toast.error(language === "ar" ? "حدث خطأ" : language === "fr" ? "Une erreur est survenue" : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      data-testid="newsletter-section"
      className="py-24 md:py-32 bg-[#141416] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <div className={inView ? "animate-fade-in-up" : "opacity-0"}>
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.overline}
          </p>
          <h2
            data-testid="newsletter-title"
            className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t.title}
          </h2>
          <div className="gold-line-center mb-6" />
          <p
            className="text-base md:text-lg leading-relaxed text-zinc-400 mb-10"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.subtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          data-testid="newsletter-form"
          className={`flex flex-col sm:flex-row gap-4 max-w-lg mx-auto ${inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}
        >
          <Input
            data-testid="newsletter-email"
            type="email"
            placeholder={t.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-[#09090b] border-white/10 text-white placeholder:text-zinc-600 rounded-none h-14 px-5 focus-visible:ring-[#d4af37]"
          />
          <button
            data-testid="newsletter-submit"
            type="submit"
            disabled={loading}
            className="bg-[#d4af37] text-black hover:bg-[#b5952f] rounded-none px-8 h-14 uppercase tracking-widest text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {t.button}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
