"use client";

import Link from "next/link";

import Breadcrumb from "@/components/ui/navigation/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TermsOfUsePage() {
  const { t } = useLanguage();
  const content = t.legalPages.terms;

  return (
    <div className="min-h-screen bg-aspol-white text-aspol-dark">
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: t.legalPages.breadcrumbHome, href: "/" },
              { label: t.legalPages.breadcrumbTerms }
            ]}
          />

          <h1 className="display display-lg mb-6 mt-10">{content.title}</h1>
          <p className="mb-12 text-base text-aspol-ink-soft sm:text-lg">{content.updated}</p>

          <div className="article-body max-w-none space-y-10">
            {content.sections.map((section, index) => (
              <section key={`${section.title ?? "note"}-${index}`}>
                {section.title && (
                  <h2 className="display display-md mb-4">{section.title}</h2>
                )}

                {section.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="text-aspol-ink-soft leading-relaxed">
                    {paragraph}{" "}
                    {section.linkText && paragraphIndex === section.paragraphs.length - 1 && (
                      <>
                        <Link href="/privacy-policy" className="text-aspol-navy underline underline-offset-4 hover:text-aspol-red">
                          {section.linkText}
                        </Link>
                        {section.linkAfter ? ` ${section.linkAfter}` : null}
                      </>
                    )}
                  </p>
                ))}

                {section.list && (
                  <ul className="list-disc list-inside space-y-2 text-aspol-ink-soft ml-4">
                    {section.list.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.details && (
                  <div className="text-aspol-ink-soft space-y-2">
                    {section.details.map((detail, detailIndex) => (
                      <p key={detailIndex}>
                        <strong>{detail.label}:</strong> {detail.value}
                      </p>
                    ))}
                  </div>
                )}

                {section.note && (
                  <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
                    <p className="text-aspol-ink-soft text-sm">
                      <strong>{content.noteLabel}:</strong> {section.note}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
