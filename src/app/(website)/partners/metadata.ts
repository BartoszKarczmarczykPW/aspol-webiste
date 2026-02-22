import type { Metadata } from "next";
import { getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Partners",
  description: "Partner with ASPOL to connect with top Polish student talent in France.",
  alternates: getAlternates("/partners"),
  openGraph: {
    title: "Partners | ASPOL",
    description: "Partner with ASPOL to connect with top Polish student talent in France.",
    type: "website",
    url: "/partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners | ASPOL",
    description: "Partner with ASPOL to connect with top Polish student talent in France.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
