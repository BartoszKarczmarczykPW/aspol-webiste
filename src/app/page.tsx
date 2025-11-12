"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Statistics from "@/components/Statistics";
import Team from "@/components/Team";
import Events from "@/components/Events";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import CookieConsent from "@/components/CookieConsent";
import StructuredData from "@/components/StructuredData";
import PageLoader from "@/components/PageLoader";
import StickyCTA from "@/components/StickyCTA";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <PageLoader />
      <StructuredData />
      <KeyboardShortcuts />
      <div className="min-h-screen bg-white animate-fade-in">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-red-600 focus:text-white focus:rounded-full focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">
          <Hero />
          <About />
          <Statistics />
          <Team />
          <Events />
          <Testimonials />
          <FAQ />
          <Newsletter />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
        <ScrollProgress />
        <StickyCTA />
        <CookieConsent />
      </div>
    </LanguageProvider>
  );
}
