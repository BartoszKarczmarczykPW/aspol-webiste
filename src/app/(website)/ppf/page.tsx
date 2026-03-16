import type { Metadata } from "next";
import { getAlternates } from "@/lib/seo";
import PPFRegistration from "@/components/ppf/PPFRegistration";

export const metadata: Metadata = {
  title: "PPF 2026 Registration — Paris Polish Forum",
  description:
    "Register for Paris Polish Forum 2026 (April 17-18). Join Polish students and professionals for two days of conferences and networking in Paris.",
  alternates: getAlternates("/ppf"),
  openGraph: {
    title: "PPF 2026 Registration — Paris Polish Forum",
    description:
      "Register for Paris Polish Forum 2026 (April 17-18). Join Polish students and professionals for two days of conferences and networking in Paris.",
    type: "website",
  },
};

export default function PPFPage() {
  return <PPFRegistration />;
}
