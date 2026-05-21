import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider, useLanguage } from "@/LanguageContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import InvestmentSection from "@/components/InvestmentSection";
import PropertiesSection from "@/components/PropertiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

function HomePage() {
  const { isRTL } = useLanguage();

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen bg-[#09090b] text-white overflow-x-hidden">
      <div className="grain-overlay" />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <InvestmentSection />
        <PropertiesSection />
        <TestimonialsSection />
        <ContactSection />
        <NewsletterSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#141416',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            fontFamily: 'Outfit, sans-serif',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
