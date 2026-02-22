import type { Metadata } from "next";
import { getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use and conditions for using the ASPOL website and services",
  alternates: getAlternates('/terms-of-use'),
  robots: {
    index: true,
    follow: true,
  },
};
