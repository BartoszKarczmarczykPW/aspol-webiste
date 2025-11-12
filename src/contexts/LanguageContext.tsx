"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Get initial language from localStorage only (always defaults to English)
const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  
  const savedLanguage = localStorage.getItem("aspolLanguage") as Language | null;
  
  if (savedLanguage && ["en", "fr", "pl"].includes(savedLanguage)) {
    return savedLanguage;
  }
  
  // Always default to English (no browser language detection)
  return "en";
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Initialize on mount - use setTimeout to avoid React compiler warning
  useEffect(() => {
    setTimeout(() => {
      const initialLang = getInitialLanguage();
      if (initialLang !== "en") {
        setLanguageState(initialLang);
      }
    }, 0);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem("aspolLanguage", lang);
    }
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
