import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, getAlternates } from "@/lib/seo";
import { getInitiativesPage, getResources, type SanityWebinar } from "@/lib/sanity";
import InitiativesView from "@/components/initiatives/InitiativesView";

// Regenerate at most every 5 minutes so finished webinars drop off and Studio edits appear.
export const revalidate = 300;

const description =
  "ASPOL's Mentoring Program for Polish students aspiring to study in France, free webinars and practical guides about life and studies in France.";

export const metadata: Metadata = {
  title: "Our Initiatives",
  description,
  alternates: getAlternates("/initiatives"),
  openGraph: {
    title: "Our Initiatives | ASPOL",
    description,
    type: "website",
    url: "/initiatives",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Initiatives | ASPOL",
    description,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default async function InitiativesPage() {
  // Fetched on the server (cached, revalidate 300s). If Sanity is unreachable the page keeps its built-in copy.
  const [page, resources] = await Promise.all([
    getInitiativesPage().catch(() => null),
    getResources().catch(() => []),
  ]);

  return <InitiativesView page={page} webinars={upcoming(page?.webinars ?? [])} resources={resources ?? []} />;
}

/** Drops finished webinars on the server (so server and browser render the same list) and sorts by date. */
function upcoming(webinars: SanityWebinar[]): SanityWebinar[] {
  const now = Date.now();
  return webinars
    .filter((w) => w.date && new Date(w.date).getTime() + (w.durationMinutes ?? 60) * 60_000 > now)
    .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
}
