"use client";

import { createContext, use, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePrefetch } from "@/contexts/SanityPrefetchContext";
import {
  getHomePage,
  getSiteSettings,
  type SanityHomePage,
  type SanitySiteSettings,
  type SanityImageWithAlt,
} from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/image";

/** Membership form used when Site Settings has no `joinUrl` yet. */
export const DEFAULT_JOIN_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSebv4I-YbT98Y732JaGTqTfxDYpeGQAxUHybgzntkyai_VEwg/viewform";

type Localized = { en?: string; fr?: string; pl?: string } | null | undefined;

export interface ResolvedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface SiteContent {
  settings: SanitySiteSettings;
  home: SanityHomePage;
  joinUrl: string;
  /** Localized CMS text, or `fallback` when the editor left it empty. */
  text: (value: Localized, fallback: string) => string;
  /** Sanity image resolved to a URL, or `null` so the caller keeps its default photo. */
  image: (img: SanityImageWithAlt | null | undefined, width?: number) => ResolvedImage | null;
}

const SiteContentContext = createContext<SiteContent | undefined>(undefined);

const EMPTY_SETTINGS: SanitySiteSettings = {};
const EMPTY_HOME: SanityHomePage = {};

/**
 * Fetches the two content singletons once for the whole page. While loading, or
 * if Sanity is unreachable / the documents don't exist yet, everything resolves
 * to the built-in defaults so the site never shows blanks.
 */
export function SiteContentProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const prefetch = usePrefetch();
  const [settings, setSettings] = useState<SanitySiteSettings>(prefetch.settings ?? EMPTY_SETTINGS);
  const [home, setHome] = useState<SanityHomePage>(prefetch.home ?? EMPTY_HOME);
  // undefined = the server query failed (retry in the browser); null = the document does not exist yet.
  const hasPrefetch = prefetch.settings !== undefined && prefetch.home !== undefined;

  useEffect(() => {
    if (hasPrefetch) return;
    let active = true;
    Promise.all([getSiteSettings().catch(() => null), getHomePage().catch(() => null)]).then(([s, h]) => {
      if (!active) return;
      if (s) setSettings(s);
      if (h) setHome(h);
    });
    return () => {
      active = false;
    };
  }, [hasPrefetch]);

  const value = useMemo<SiteContent>(
    () => ({
      settings,
      home,
      joinUrl: settings.joinUrl || DEFAULT_JOIN_URL,
      text: (v, fallback) => v?.[language]?.trim() || v?.en?.trim() || fallback,
      image: (img, width = 2000) => {
        if (!img?.asset) return null;
        try {
          const src = urlFor(img as never).width(width).fit("max").auto("format").url();
          const alt = img.alt?.[language] || img.alt?.en || "";
          return { src, alt, width, height: Math.round(width * 0.67) };
        } catch {
          return null;
        }
      },
    }),
    [settings, home, language],
  );

  return <SiteContentContext value={value}>{children}</SiteContentContext>;
}

export function useSiteContent(): SiteContent {
  const ctx = use(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
}
