"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white border-b border-gray-100 shadow-sm"
        : "bg-white/95 backdrop-blur-sm border-b border-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/aspol-logo-official.png"
              alt="ASPOL - Association of Polish Students in France"
              width={120}
              height={40}
              style={{ width: "auto", height: "auto" }}
              className="h-10 w-auto transition-transform duration-500 hover:opacity-90"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#about"
              className="text-sm font-semibold text-aspol-navy hover:text-aspol-red transition-colors tracking-wide"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/#team"
              className="text-sm font-semibold text-aspol-navy hover:text-aspol-red transition-colors tracking-wide"
            >
              {t.nav.team}
            </Link>
            <Link
              href="/events"
              className="text-sm font-semibold text-aspol-navy hover:text-aspol-red transition-colors tracking-wide"
            >
              {t.nav.events}
            </Link>
            <Link
              href="/blog"
              className="text-sm font-semibold text-aspol-navy hover:text-aspol-red transition-colors tracking-wide"
            >
              {t.nav.blog || "Blog"}
            </Link>
            <Link
              href="/partners"
              className="text-sm font-semibold text-aspol-navy hover:text-aspol-red transition-colors tracking-wide"
            >
              {t.nav.partners || "Partners"}
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-semibold text-aspol-navy hover:text-aspol-red transition-colors tracking-wide"
            >
              {t.nav.contact}
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 border-l border-gray-200 pl-6">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${language === "en"
                  ? "bg-aspol-navy text-white shadow-md shadow-blue-900/10"
                  : "text-gray-500 hover:bg-gray-50 hover:text-aspol-navy"
                  }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${language === "fr"
                  ? "bg-aspol-navy text-white shadow-md shadow-blue-900/10"
                  : "text-gray-500 hover:bg-gray-50 hover:text-aspol-navy"
                  }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage("pl")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${language === "pl"
                  ? "bg-aspol-navy text-white shadow-md shadow-blue-900/10"
                  : "text-gray-500 hover:bg-gray-50 hover:text-aspol-navy"
                  }`}
              >
                PL
              </button>
            </div>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSebv4I-YbT98Y732JaGTqTfxDYpeGQAxUHybgzntkyai_VEwg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-105"
            >
              {t.nav.join}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 min-h-11 min-w-11 touch-manipulation active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="relative z-50 md:hidden mt-4 pb-4 border-t border-gray-200 bg-white backdrop-blur-md rounded-b-lg shadow-xl animate-fade-in">
            <div className="flex flex-col space-y-1 pt-4 px-2">
              <Link
                href="/#about"
                className="text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg touch-manipulation active:bg-gray-100"
                onClick={closeMobileMenu}
              >
                {t.nav.about}
              </Link>
              <Link
                href="/#team"
                className="text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg touch-manipulation active:bg-gray-100"
                onClick={closeMobileMenu}
              >
                {t.nav.team}
              </Link>
              <Link
                href="/events"
                className="text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg touch-manipulation active:bg-gray-100"
                onClick={closeMobileMenu}
              >
                {t.nav.events}
              </Link>
              <Link
                href="/blog"
                className="text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg touch-manipulation active:bg-gray-100"
                onClick={closeMobileMenu}
              >
                {t.nav.blog || "Blog"}
              </Link>
              <Link
                href="/partners"
                className="text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg touch-manipulation active:bg-gray-100"
                onClick={closeMobileMenu}
              >
                {t.nav.partners || "Partners"}
              </Link>
              <Link
                href="/#contact"
                className="text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg touch-manipulation active:bg-gray-100"
                onClick={closeMobileMenu}
              >
                {t.nav.contact}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 pt-3 mt-2 border-t border-gray-200 px-2">
                <button
                  onClick={() => {
                    setLanguage("en");
                    closeMobileMenu();
                  }}
                  className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors touch-manipulation active:scale-95 min-h-11 ${language === "en"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    setLanguage("fr");
                    closeMobileMenu();
                  }}
                  className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors touch-manipulation active:scale-95 min-h-11 ${language === "fr"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  FR
                </button>
                <button
                  onClick={() => {
                    setLanguage("pl");
                    closeMobileMenu();
                  }}
                  className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors touch-manipulation active:scale-95 min-h-11 ${language === "pl"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  PL
                </button>
              </div>

              {/* Mobile Join Button */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSebv4I-YbT98Y732JaGTqTfxDYpeGQAxUHybgzntkyai_VEwg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors text-center"
                onClick={closeMobileMenu}
              >
                {t.nav.join}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
