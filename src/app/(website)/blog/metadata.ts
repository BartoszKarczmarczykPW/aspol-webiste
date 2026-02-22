import type { Metadata } from "next";
import { getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Polish Paris Forum",
  description: "Conference news, highlights, and insights from the Polish Paris Forum.",
  alternates: getAlternates("/blog"),
  openGraph: {
    title: "Polish Paris Forum | ASPOL",
    description: "Conference news, highlights, and insights from the Polish Paris Forum.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polish Paris Forum | ASPOL",
    description: "Conference news, highlights, and insights from the Polish Paris Forum.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
