import type { Metadata } from "next";

/** Default social-share card (1200x630 PNG; social crawlers do not render SVG). */
export const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "ASPOL - Building bridges between Poland and France",
};

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
