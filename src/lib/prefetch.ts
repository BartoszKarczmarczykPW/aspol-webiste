import {
  getAboutSection,
  getFaqs,
  getHomePage,
  getInitiatives,
  getPartners,
  getSiteSettings,
  getStatistics,
  getTeamMembers,
  getTestimonials,
} from "@/lib/sanity";
import type { Prefetch } from "@/contexts/SanityPrefetchContext";

/**
 * Server-side fetch of everything the shared layout and the home page need. Each query is
 * independent: one failing query only leaves its section to fetch on the client.
 * The queries are cached with `revalidate` (see lib/sanity.ts), so pages stay statically generated.
 */
export async function getPrefetch(): Promise<Prefetch> {
  const safe = <T,>(promise: Promise<T>) => promise.catch(() => undefined);

  const [team, partners, about, statistics, initiatives, testimonials, faqs, settings, home] = await Promise.all([
    safe(getTeamMembers()),
    safe(getPartners()),
    safe(getAboutSection()),
    safe(getStatistics()),
    safe(getInitiatives()),
    safe(getTestimonials()),
    safe(getFaqs()),
    safe(getSiteSettings()),
    safe(getHomePage()),
  ]);

  return {
    team,
    partners,
    about,
    statistics: statistics?.items?.length
      ? [...statistics.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : null,
    initiatives,
    testimonials,
    faqs,
    settings,
    home,
  };
}
