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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/aspollogo.png"
              alt="ASPOL"
              width={120}
              height={40}
              className="h-10 w-auto transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/#about"
              className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/#team"
              className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              {t.nav.team}
            </Link>
            <Link
              href="/#events"
              className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              {t.nav.events}
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              {t.nav.blog || "Blog"}
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              {t.nav.contact}
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 border-l border-gray-300 pl-6">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                  language === "en"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("fr")}
                className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                  language === "fr"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage("pl")}
                className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                  language === "pl"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 bg-white/95 backdrop-blur-md rounded-b-lg shadow-lg">
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
                href="/#events"
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
                  className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors touch-manipulation active:scale-95 min-h-11 ${
                    language === "en"
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
                  className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors touch-manipulation active:scale-95 min-h-11 ${
                    language === "fr"
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
                  className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors touch-manipulation active:scale-95 min-h-11 ${
                    language === "pl"
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
