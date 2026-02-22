import type { Metadata } from "next";
import { getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice and publisher information for ASPOL - Association des Étudiants Polonais en France",
  alternates: getAlternates('/legal-notice'),
  robots: {
    index: true,
    follow: true,
  },
};
