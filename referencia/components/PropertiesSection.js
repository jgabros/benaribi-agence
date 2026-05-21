import { useState } from "react";
import { useLanguage } from "@/LanguageContext";
import translations from "@/translations";
import { useInView } from "@/hooks/useInView";
import { Search, BedDouble, Maximize2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const properties = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/15531226/pexels-photo-15531226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    type: "villa",
    price: "2,500,000",
    currency: "MAD",
    bedrooms: 5,
    area: "420",
    location: { en: "Nador West Med", fr: "Nador West Med", ar: "ناظور ويست ميد" },
    title: { en: "Villa Mediterranee", fr: "Villa Mediterranee", ar: "فيلا المتوسط" },
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/36676879/pexels-photo-36676879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    type: "penthouse",
    price: "3,200,000",
    currency: "MAD",
    bedrooms: 4,
    area: "310",
    location: { en: "Marina Bay", fr: "Marina Bay", ar: "مارينا باي" },
    title: { en: "Penthouse Azure", fr: "Penthouse Azure", ar: "بنتهاوس أزور" },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1759256243437-9c8f7238c42b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGV4dGVyaW9yJTIwZHVza3xlbnwwfHx8fDE3NzkzODYyODB8MA&ixlib=rb-4.1.0&q=85",
    type: "villa",
    price: "4,800,000",
    currency: "MAD",
    bedrooms: 7,
    area: "650",
    location: { en: "Cap des Trois Fourches", fr: "Cap des Trois Fourches", ar: "رأس ثلاث شعب" },
    title: { en: "Domaine Royal", fr: "Domaine Royal", ar: "الدومين الملكي" },
  },
];

export default function PropertiesSection() {
  const { language } = useLanguage();
  const t = translations[language].properties;
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = properties.filter((p) => {
    const matchesType = typeFilter === "all" || p.type === typeFilter;
    const matchesSearch =
      !searchQuery ||
      p.location[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <section
      id="properties"
      ref={ref}
      data-testid="properties-section"
      className="py-24 md:py-32 bg-[#09090b]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t.overline}
          </p>
          <h2
            data-testid="properties-title"
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

        {/* Search & Filter Bar */}
        <div
          data-testid="property-filters"
          className={`flex flex-col sm:flex-row gap-4 mb-12 ${inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              data-testid="property-search"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#141416] border-white/10 text-white placeholder:text-zinc-600 rounded-none h-12 focus-visible:ring-[#d4af37]"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger
              data-testid="property-type-filter"
              className="w-full sm:w-[200px] bg-[#141416] border-white/10 text-white rounded-none h-12 focus:ring-[#d4af37]"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#141416] border-white/10 rounded-none">
              <SelectItem data-testid="filter-all" value="all" className="text-zinc-300 rounded-none focus:bg-white/5 focus:text-white">
                {t.filterAll}
              </SelectItem>
              <SelectItem data-testid="filter-villa" value="villa" className="text-zinc-300 rounded-none focus:bg-white/5 focus:text-white">
                {t.filterVilla}
              </SelectItem>
              <SelectItem data-testid="filter-apartment" value="apartment" className="text-zinc-300 rounded-none focus:bg-white/5 focus:text-white">
                {t.filterApartment}
              </SelectItem>
              <SelectItem data-testid="filter-penthouse" value="penthouse" className="text-zinc-300 rounded-none focus:bg-white/5 focus:text-white">
                {t.filterPenthouse}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property, i) => (
            <div
              key={property.id}
              data-testid={`property-card-${property.id}`}
              className={`property-card group relative overflow-hidden bg-[#141416] border border-white/5 hover:border-white/20 transition-all duration-500 ${
                inView ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(i + 2) * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title[language]}
                  className="property-card-image w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent opacity-60" />
                <span className="absolute top-4 left-4 bg-[#d4af37] text-black text-xs font-semibold uppercase tracking-wider px-3 py-1.5">
                  {property.type === "villa" ? t.filterVilla : property.type === "apartment" ? t.filterApartment : t.filterPenthouse}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-2xl font-light text-white mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {property.title[language]}
                </h3>
                <p className="text-sm text-zinc-500 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {property.location[language]}
                </p>

                {/* Details */}
                <div className="flex items-center gap-4 mb-6 text-zinc-500">
                  <span className="flex items-center gap-1.5 text-sm">
                    <BedDouble className="w-4 h-4" />
                    {property.bedrooms} {t.bedrooms}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <Maximize2 className="w-4 h-4" />
                    {property.area} m²
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-zinc-600 uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {t.from}
                    </p>
                    <p className="text-xl text-[#d4af37] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {property.price} {property.currency}
                    </p>
                  </div>
                  <button
                    data-testid={`property-details-${property.id}`}
                    className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#d4af37] transition-colors group/btn"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {t.viewDetails}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p data-testid="no-results" className="text-center text-zinc-500 py-16 text-lg">
            {language === "ar" ? "لم يتم العثور على عقارات" : language === "fr" ? "Aucun bien trouve" : "No properties found"}
          </p>
        )}
      </div>
    </section>
  );
}
