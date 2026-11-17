"use client";

import { createContext, use, useEffect, useSyncExternalStore, ReactNode } from "react";
import { translations, Language } from "@/lib/translations";

const VALID_LANGUAGES: ReadonlySet<string> = new Set(["en", "fr", "pl"]);
const STORAGE_KEY = "aspolLanguage" as const;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

// The saved choice lives in localStorage; this tiny store lets React read it
// safely. The server (and the hydration pass) always see English, then React
// switches to the saved language right after hydration without a mismatch.
// Reading localStorage during the first render used to make every FR/PL visit
// fail hydration and re-render the whole page.
const listeners = new Set<() => void>();
let memoryLanguage: Language | null = null; // used when storage is blocked

function readSavedLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && VALID_LANGUAGES.has(saved)) return saved as Language;
  } catch {
    // Storage blocked (private mode, disabled cookies).
  }
  return memoryLanguage ?? "en";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange(); // language changed in another tab
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function saveLanguage(lang: Language) {
  memoryLanguage = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  listeners.forEach((notify) => notify());
}

const getServerLanguage = (): Language => "en";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, readSavedLanguage, getServerLanguage);

  // Keep <html lang> in sync with the selected language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = saveLanguage;

  const value: LanguageContextType = {
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

export function useLanguage(): LanguageContextType {
  const context = use(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
