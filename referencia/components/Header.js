import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/LanguageContext";
import translations from "@/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const langLabels = { en: "EN", fr: "FR", ar: "AR" };

export default function Header() {
  const { language, setLanguage, isRTL } = useLanguage();
  const t = translations[language].nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#hero", label: t.home },
    { href: "#about", label: t.about },
    { href: "#investments", label: t.investments },
    { href: "#properties", label: t.properties },
    { href: "#testimonials", label: t.testimonials },
    { href: "#contact", label: t.contact },
  ];

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-testid="main-header"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <button
          data-testid="logo-button"
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-3 group"
        >
          <span className="text-2xl font-light tracking-tight text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            BENARIBI
          </span>
          <span className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase">
            AGENCE
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10" data-testid="desktop-nav">
          {navLinks.map((link) => (
            <button
              key={link.href}
              data-testid={`nav-${link.href.replace("#", "")}`}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 tracking-wide uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              data-testid="language-switcher"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors border border-white/10 rounded-none px-3 py-2 bg-transparent outline-none"
            >
              <Globe className="w-4 h-4" />
              <span>{langLabels[language]}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-[#141416] border-white/10 rounded-none min-w-[100px]"
              align={isRTL ? "start" : "end"}
            >
              {Object.entries(langLabels).map(([code, label]) => (
                <DropdownMenuItem
                  key={code}
                  data-testid={`lang-${code}`}
                  onClick={() => setLanguage(code)}
                  className={`text-sm cursor-pointer rounded-none ${
                    language === code ? "text-[#d4af37]" : "text-zinc-300"
                  } hover:text-white hover:bg-white/5`}
                >
                  {label === "AR" ? "العربية" : label === "FR" ? "Francais" : "English"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            data-testid="hamburger-menu"
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden glass-nav border-t border-white/10 animate-fade-in"
        >
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                data-testid={`mobile-nav-${link.href.replace("#", "")}`}
                onClick={() => scrollTo(link.href)}
                className="text-left text-base text-zinc-300 hover:text-[#d4af37] transition-colors py-2 uppercase tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
