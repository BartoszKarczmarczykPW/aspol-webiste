import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Events",
  description: "Discover upcoming ASPOL events, meetups, and initiatives across France.",
  alternates: getAlternates("/events"),
  openGraph: {
    title: "Events | ASPOL",
    description: "Discover upcoming ASPOL events, meetups, and initiatives across France.",
    type: "website",
    url: "/events",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | ASPOL",
    description: "Discover upcoming ASPOL events, meetups, and initiatives across France.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};
