import type { Metadata } from "next";

type LanguageCode = "en" | "fr" | "pl";

const SUPPORTED_LANGUAGES: LanguageCode[] = ["en", "fr", "pl"];

export function getAlternates(pathname: string): Metadata["alternates"] {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  const languages = SUPPORTED_LANGUAGES.reduce<Record<LanguageCode, string>>(
    (acc, language) => {
      acc[language] = `${normalizedPath}?lang=${language}`;
      return acc;
    },
    { en: "", fr: "", pl: "" }
  );

  return {
    canonical: normalizedPath,
    languages: {
      ...languages,
      "x-default": normalizedPath,
    },
  };
}
