import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Polish Paris Forum",
  description: "Conference news, highlights, and insights from the Polish Paris Forum.",
  alternates: getAlternates("/blog"),
  openGraph: {
    title: "Polish Paris Forum | ASPOL",
    description: "Conference news, highlights, and insights from the Polish Paris Forum.",
    type: "website",
    url: "/blog",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polish Paris Forum | ASPOL",
    description: "Conference news, highlights, and insights from the Polish Paris Forum.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};
