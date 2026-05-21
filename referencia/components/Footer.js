import { useLanguage } from "@/LanguageContext";
import translations from "@/translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer data-testid="footer" className="border-t border-white/5 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span
              className="text-2xl font-light tracking-tight text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              BENARIBI
            </span>
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase">
              AGENCE
            </span>
          </div>

          {/* Tagline */}
          <p
            className="text-sm text-zinc-600 text-center"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.tagline}
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <button
              data-testid="footer-privacy"
              className="text-xs text-zinc-500 hover:text-[#d4af37] transition-colors uppercase tracking-wider"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t.privacy}
            </button>
            <span className="text-zinc-800">|</span>
            <button
              data-testid="footer-terms"
              className="text-xs text-zinc-500 hover:text-[#d4af37] transition-colors uppercase tracking-wider"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {t.terms}
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-zinc-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
            &copy; {new Date().getFullYear()} Benaribi Agence. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
