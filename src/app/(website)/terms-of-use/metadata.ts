import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use and conditions for using the ASPOL website and services",
  openGraph: {
    type: "website",
    title: "Terms of Use | ASPOL",
    description: "Terms of use and conditions for using the ASPOL website and services",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: getAlternates('/terms-of-use'),
  robots: {
    index: true,
    follow: true,
  },
};
