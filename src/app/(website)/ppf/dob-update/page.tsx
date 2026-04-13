import type { Metadata } from "next";
import { getAlternates } from "@/lib/seo";
import PPFDobBackfillForm from "@/components/ppf/PPFDobBackfillForm";

export const metadata: Metadata = {
  title: "PPF 2026 Date of Birth Completion",
  description:
    "Public form for accepted PPF 2026 participants to complete missing date of birth using their registration details.",
  alternates: getAlternates("/ppf/dob-update"),
  robots: {
    index: false,
    follow: false,
  },
};

export default function PPFDobUpdatePage() {
  return <PPFDobBackfillForm />;
}
