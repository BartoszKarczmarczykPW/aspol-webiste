import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, getAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data protection information for ASPOL - GDPR compliant privacy practices",
  openGraph: {
    type: "website",
    title: "Privacy Policy | ASPOL",
    description: "Privacy policy and data protection information for ASPOL - GDPR compliant privacy practices",
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: getAlternates('/privacy-policy'),
  robots: {
    index: true,
    follow: true,
  },
};
