"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-aspol-dark text-white pt-20 pb-10 px-6 border-t border-aspol-navy">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="relative w-32 h-10">
                <Image
                  src="/aspollogo.png"
                  alt="ASPOL"
                  fill
                  sizes="128px"
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Building a prosperous future through Polish-French cooperation since 2017.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="group inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    {t.nav.about}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-aspol-red transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="group inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    {t.nav.events}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-aspol-red transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="group inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    {t.nav.contact}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-aspol-red transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSebv4I-YbT98Y732JaGTqTfxDYpeGQAxUHybgzntkyai_VEwg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    {t.nav.join}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-aspol-red transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/legal-notice"
                  className="group inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    {t.footer.legalNotice}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-aspol-red transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="group inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    {t.footer.privacy}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-aspol-red transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="group inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <span className="relative">
                    {t.footer.terms}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-aspol-red transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base">{t.footer.follow}</h4>
            <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
              <a
                href="https://www.facebook.com/aspologne"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors touch-manipulation active:scale-95"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/aspolska/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors touch-manipulation active:scale-95"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/aspolscpo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors touch-manipulation active:scale-95"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-gray-400 text-sm flex flex-col md:flex-row justify-center items-center gap-2">
          <p>© {currentYear} ASPOL. {t.footer.rights}</p>
          <span className="hidden md:inline text-gray-700">•</span>
          <p className="opacity-60 hover:opacity-100 transition-opacity">
            Designed & Built by <a href="https://www.linkedin.com/in/bartosz-karczmarczyk-4a747432b/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-300 hover:text-white transition-colors">Bartosz Karczmarczyk</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
