import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Partners",
  description: "Partner with ASPOL to connect with top Polish student talent in France.",
  alternates: getAlternates("/partners"),
  openGraph: {
    title: "Partners | ASPOL",
    description: "Partner with ASPOL to connect with top Polish student talent in France.",
    type: "website",
    url: "/partners",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners | ASPOL",
    description: "Partner with ASPOL to connect with top Polish student talent in France.",
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};
