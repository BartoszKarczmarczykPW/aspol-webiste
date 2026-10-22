import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice and publisher information for ASPOL - Association des Étudiants Polonais en France",
  openGraph: {
    type: "website",
    title: "Legal Notice | ASPOL",
    description: "Legal notice and publisher information for ASPOL - Association des Étudiants Polonais en France",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: getAlternates('/legal-notice'),
  robots: {
    index: true,
    follow: true,
  },
};
