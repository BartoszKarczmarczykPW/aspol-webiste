"use client";

import { createContext, use, type ReactNode } from "react";
import type {
  SanityAboutSection,
  SanityFaq,
  SanityHomePage,
  SanityInitiative,
  SanityPartner,
  SanitySiteSettings,
  SanityTeamMember,
  SanityTestimonial,
} from "@/lib/sanity";

/**
 * Sanity content fetched on the server (see lib/prefetch.ts) and handed to the client sections.
 * It puts the live content into the HTML and removes the dependency on the browser being able to
 * reach Sanity (CORS on preview domains, ad blockers, slow networks). A section that finds its
 * entry missing/null simply fetches on the client like before.
 */
export interface Prefetch {
  team?: SanityTeamMember[] | null;
  partners?: SanityPartner[] | null;
  about?: SanityAboutSection | null;
  statistics?: { value: number; suffix?: string; order?: number; label?: { en?: string; fr?: string; pl?: string } }[] | null;
  initiatives?: SanityInitiative[] | null;
  testimonials?: SanityTestimonial[] | null;
  faqs?: SanityFaq[] | null;
  settings?: SanitySiteSettings | null;
  home?: SanityHomePage | null;
}

const PrefetchContext = createContext<Prefetch>({});

export function SanityPrefetchProvider({ value, children }: { value: Prefetch; children: ReactNode }) {
  return <PrefetchContext value={value}>{children}</PrefetchContext>;
}

export function usePrefetch(): Prefetch {
  return use(PrefetchContext);
}
