import type { Metadata } from "next";
import { getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data protection information for ASPOL - GDPR compliant privacy practices",
  alternates: getAlternates('/privacy-policy'),
  robots: {
    index: true,
    follow: true,
  },
};
