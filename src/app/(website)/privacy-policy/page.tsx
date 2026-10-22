"use client";

import Breadcrumb from "@/components/ui/navigation/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const content = t.legalPages.privacy;

  return (
    <div className="min-h-screen bg-aspol-white text-aspol-dark">
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: t.legalPages.breadcrumbHome, href: "/" },
              { label: t.legalPages.breadcrumbPrivacy }
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
                    {paragraph}
                  </p>
                ))}

                {section.details && (
                  <div className="text-aspol-ink-soft leading-relaxed space-y-2">
                    {section.details.map((detail, detailIndex) => (
                      <p key={detailIndex}>
                        <strong>{detail.label}:</strong> {detail.value}
                      </p>
                    ))}
                  </div>
                )}

                {section.list && (
                  <ul className="list-disc list-inside space-y-2 text-aspol-ink-soft ml-4">
                    {section.list.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="text-aspol-ink-soft leading-relaxed mt-4">{section.footer}</p>
                )}

                {section.complaint && (
                  <div className="text-aspol-ink-soft leading-relaxed">
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
                          className="text-aspol-navy underline underline-offset-4 hover:text-aspol-red"
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
