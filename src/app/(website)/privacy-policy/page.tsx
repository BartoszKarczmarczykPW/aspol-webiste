"use client";

import Breadcrumb from "@/components/ui/navigation/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const content = t.legalPages.privacy;

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: t.legalPages.breadcrumbHome, href: "/" },
              { label: t.legalPages.breadcrumbPrivacy }
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
                    {paragraph}
                  </p>
                ))}

                {section.details && (
                  <div className="text-gray-700 leading-relaxed space-y-2">
                    {section.details.map((detail, detailIndex) => (
                      <p key={detailIndex}>
                        <strong>{detail.label}:</strong> {detail.value}
                      </p>
                    ))}
                  </div>
                )}

                {section.list && (
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    {section.list.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="text-gray-700 leading-relaxed mt-4">{section.footer}</p>
                )}

                {section.complaint && (
                  <div className="text-gray-700 leading-relaxed">
                    <p className="mt-4">{section.complaint.intro}</p>
                    <div className="space-y-1 mt-2">
                      <p><strong>{section.complaint.name}</strong></p>
                      {section.complaint.lines.map((line, lineIndex) => (
                        <p key={lineIndex}>{line}</p>
                      ))}
                      <p>
                        {section.complaint.websiteLabel}: {" "}
                        <a
                          href={section.complaint.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-700"
                        >
                          {section.complaint.websiteUrl.replace("https://", "")}
                        </a>
                      </p>
                    </div>
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
