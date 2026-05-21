import { useState } from "react";
import { useLanguage } from "@/LanguageContext";
import translations from "@/translations";
import { useInView } from "@/hooks/useInView";
import { MapPin, Phone, Mail, CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

export default function ContactSection() {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    if (date) {
      toast.success(`${t.booked} ${date.toLocaleDateString(language === "ar" ? "ar-MA" : language === "fr" ? "fr-FR" : "en-US")}`);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      data-testid="contact-section"
      className="py-24 md:py-32 bg-[#09090b]"
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
            data-testid="contact-title"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Contact Info + Calendar */}
          <div className={`${inView ? "animate-slide-left" : "opacity-0"}`}>
            <div className="space-y-8 mb-12">
              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-[#d4af37]/30 transition-colors">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-zinc-500 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {language === "ar" ? "العنوان" : language === "fr" ? "Adresse" : "Address"}
                  </p>
                  <p data-testid="contact-address" className="text-white text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {t.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-[#d4af37]/30 transition-colors">
                  <Phone className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-zinc-500 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {language === "ar" ? "الهاتف" : language === "fr" ? "Telephone" : "Phone"}
                  </p>
                  <a
                    href={`tel:${t.phone}`}
                    data-testid="contact-phone"
                    className="text-white text-base hover:text-[#d4af37] transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {t.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-[#d4af37]/30 transition-colors">
                  <Mail className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-zinc-500 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </p>
                  <a
                    href={`mailto:${t.email}`}
                    data-testid="contact-email"
                    className="text-white text-base hover:text-[#d4af37] transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {t.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Schedule Visit with Calendar */}
            <div className="border border-white/10 p-6 bg-[#141416]">
              <div className="flex items-center gap-3 mb-4">
                <CalendarDays className="w-5 h-5 text-[#d4af37]" />
                <p className="text-white text-sm uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {t.schedule}
                </p>
              </div>
              <button
                data-testid="schedule-visit-btn"
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full bg-transparent border border-white/10 text-zinc-400 hover:border-[#d4af37] hover:text-[#d4af37] rounded-none px-4 py-3 text-sm transition-all duration-300 mb-4"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {selectedDate
                  ? selectedDate.toLocaleDateString(language === "ar" ? "ar-MA" : language === "fr" ? "fr-FR" : "en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : t.selectDate}
              </button>
              {showCalendar && (
                <div data-testid="consultation-calendar" className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < new Date()}
                    className="border border-white/10 bg-[#09090b] rounded-none"
                    classNames={{
                      day_selected: "bg-[#d4af37] text-black hover:bg-[#b5952f] focus:bg-[#d4af37]",
                      day_today: "bg-white/10 text-white",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className={`${inView ? "animate-slide-right delay-200" : "opacity-0"}`}>
            <div className="relative h-full min-h-[400px] lg:min-h-[500px] border border-white/10">
              <iframe
                data-testid="contact-map"
                title="Benaribi Agence Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105000!2d-2.93!3d35.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd77b5abb31cf4f1%3A0x4a1c318d1a94e6!2sNador%2C+Morocco!5e0!3m2!1sen!2sma!4v1"
                className="w-full h-full absolute inset-0 map-dark"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Map overlay label */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 z-10">
                <p className="text-xs text-[#d4af37] uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Nador West Med
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
