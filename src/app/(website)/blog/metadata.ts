import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polish Paris Forum",
  description: "Conference news, highlights, and insights from the Polish Paris Forum.",
  alternates: {
    canonical: "/blog",
  },
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
