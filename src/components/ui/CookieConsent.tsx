"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("aspolCookieConsent");
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("aspolCookieConsent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("aspolCookieConsent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const content = {
    en: {
      message: "We use cookies to enhance your browsing experience and analyze our traffic. By clicking 'Accept', you consent to our use of cookies.",
      accept: "Accept",
      decline: "Decline",
      learnMore: "Learn more",
    },
    fr: {
      message: "Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser notre trafic. En cliquant sur 'Accepter', vous consentez à notre utilisation des cookies.",
      accept: "Accepter",
      decline: "Refuser",
      learnMore: "En savoir plus",
    },
    pl: {
      message: "Używamy plików cookie, aby poprawić Twoje doświadczenia podczas przeglądania i analizować nasz ruch. Klikając 'Akceptuj', wyrażasz zgodę na nasze używanie plików cookie.",
      accept: "Akceptuj",
      decline: "Odrzuć",
      learnMore: "Dowiedz się więcej",
    },
  };

  const text = content[language] || content.en;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start mb-3">
              <svg className="w-6 h-6 text-red-600 mr-3 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-5a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === "en" && "Cookie Notice"}
                  {language === "fr" && "Avis sur les Cookies"}
                  {language === "pl" && "Informacja o Cookies"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {text.message}
                  {" "}
                  <Link href="/privacy-policy" className="text-red-600 hover:text-red-700 underline">
                    {text.learnMore}
                  </Link>
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={declineCookies}
              className="flex-1 md:flex-none px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors"
            >
              {text.decline}
            </button>
            <button
              onClick={acceptCookies}
              className="flex-1 md:flex-none px-6 py-2.5 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors"
            >
              {text.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
