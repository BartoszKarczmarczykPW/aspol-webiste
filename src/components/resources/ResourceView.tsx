"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import type { SanityResource } from "@/lib/sanity";
import PageHero from "@/components/layout/PageHero";
import PdfViewer from "@/components/resources/PdfViewer";
import GuideByline from "@/components/resources/GuideByline";

const LABELS = {
  en: { badge: "Guides", back: "All guides" },
  pl: { badge: "Poradniki", back: "Wszystkie poradniki" },
  fr: { badge: "Guides", back: "Tous les guides" },
} as const;

/** One guide: title and description, then the whole PDF readable in the page. */
export default function ResourceView({ resource }: { resource: SanityResource }) {
  const { language } = useLanguage();
  const { text } = useSiteContent();
  const lang = (language in LABELS ? language : "en") as keyof typeof LABELS;
  const l = LABELS[lang];
  const title = text(resource.title, "");
  const description = text(resource.description, "");

  return (
    <div className="min-h-screen bg-aspol-white text-aspol-dark">
      <PageHero
        badge={l.badge}
        title={title}
        subtitle={description || undefined}
        titleClassName="text-[clamp(2.25rem,5.6vw,5rem)]"
        actions={<GuideByline author={resource.author} lang={lang} tone="dark" />}
      />

      <section className="section-pad dome-gap">
        <div className="container-x">
          <Link
            href="/initiatives#resources"
            className="mb-8 inline-flex items-center gap-2 font-semibold text-aspol-navy underline-offset-4 hover:text-aspol-red hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {l.back}
          </Link>
          <PdfViewer url={resource.fileUrl!} title={title} downloadUrl={resource.allowDownload ? resource.fileUrl : null} />
          <GuideByline author={resource.author} lang={lang} className="mt-8" />
        </div>
      </section>
    </div>
  );
}
