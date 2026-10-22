"use client";

import Link from "next/link";

import Breadcrumb from "@/components/ui/navigation/Breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LegalNoticePage() {
  const { t } = useLanguage();
  const content = t.legalPages.legalNotice;

  return (
    <div className="min-h-screen bg-aspol-white text-aspol-dark">
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: t.legalPages.breadcrumbHome, href: "/" },
              { label: t.legalPages.breadcrumbLegal }
            ]}
          />

          <h1 className="display display-lg mb-6 mt-10">{content.title}</h1>
          <p className="mb-12 text-base text-aspol-ink-soft sm:text-lg">{content.updated}</p>

          <div className="article-body max-w-none space-y-10">
            {content.sections.map((section, index) => (
              <section key={`${section.title}-${index}`}>
                <h2 className="display display-md mb-4">{section.title}</h2>

                {section.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="text-aspol-ink-soft leading-relaxed">
                    {paragraph}{" "}
                    {section.linkText && paragraphIndex === section.paragraphs.length - 1 && (
                      <>
                        <Link href="/privacy-policy" className="text-aspol-navy underline underline-offset-4 hover:text-aspol-red">
                          {section.linkText}
                        </Link>
                        .
                      </>
                    )}
                  </p>
                ))}

                {section.details && (
                  <div className="mt-4 space-y-2 text-aspol-ink-soft">
                    {section.details.map((detail, detailIndex) => (
                      <p key={detailIndex}>
                        <strong>{detail.label}:</strong> {detail.value}
                      </p>
                    ))}
                  </div>
                )}

                {section.social && (
                  <div className="mt-4 space-y-2 text-aspol-ink-soft">
                    <p><strong>{t.footer.follow}:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      {section.social.map((item, socialIndex) => (
                        <li key={socialIndex}>
                          {item.label}: {" "}
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-aspol-navy underline underline-offset-4 hover:text-aspol-red">
                            {item.value}
                          </a>
                        </li>
                      ))}
                    </ul>
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
