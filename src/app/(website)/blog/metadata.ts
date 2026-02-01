import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & News",
  description: "Insights, updates, and stories from the ASPOL community in France.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & News | ASPOL",
    description: "Insights, updates, and stories from the ASPOL community in France.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & News | ASPOL",
    description: "Insights, updates, and stories from the ASPOL community in France.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
