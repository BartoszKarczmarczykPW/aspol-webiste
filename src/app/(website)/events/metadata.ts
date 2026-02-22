import type { Metadata } from "next";
import { getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Events",
  description: "Discover upcoming ASPOL events, meetups, and initiatives across France.",
  alternates: getAlternates("/events"),
  openGraph: {
    title: "Events | ASPOL",
    description: "Discover upcoming ASPOL events, meetups, and initiatives across France.",
    type: "website",
    url: "/events",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | ASPOL",
    description: "Discover upcoming ASPOL events, meetups, and initiatives across France.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
