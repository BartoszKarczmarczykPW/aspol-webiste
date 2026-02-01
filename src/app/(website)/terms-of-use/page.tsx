"use client";

import Link from "next/link";

import Breadcrumb from "@/components/ui/navigation/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TermsOfUsePage() {
  const { t } = useLanguage();
  const content = t.legalPages.terms;

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: t.legalPages.breadcrumbHome, href: "/" },
              { label: t.legalPages.breadcrumbTerms }
            ]}
          />

          <h1 className="text-5xl font-bold text-gray-900 mb-6 mt-8">{content.title}</h1>
          <p className="text-lg text-gray-600 mb-12">{content.updated}</p>

          <div className="prose prose-lg max-w-none space-y-8">
            {content.sections.map((section, index) => (
              <section key={`${section.title ?? "note"}-${index}`}>
                {section.title && (
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
                )}

                {section.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="text-gray-700 leading-relaxed">
                    {paragraph}{" "}
                    {section.linkText && paragraphIndex === section.paragraphs.length - 1 && (
                      <>
                        <Link href="/privacy-policy" className="text-red-600 hover:text-red-700 underline">
                          {section.linkText}
                        </Link>
                        {section.linkAfter ? ` ${section.linkAfter}` : null}
                      </>
                    )}
                  </p>
                ))}

                {section.list && (
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    {section.list.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.details && (
                  <div className="text-gray-700 space-y-2">
                    {section.details.map((detail, detailIndex) => (
                      <p key={detailIndex}>
                        <strong>{detail.label}:</strong> {detail.value}
                      </p>
                    ))}
                  </div>
                )}

                {section.note && (
                  <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
                    <p className="text-gray-700 text-sm">
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
