"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useSanityData } from "@/hooks/useSanityData";
import { getFaqs } from "@/lib/sanity";
import { FAQItem } from "@/types";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";

const FAQS: Readonly<Record<string, FAQItem[]>> = {
  en: [
    {
      question: "How can I become a member of ASPOL?",
      answer: "You can join ASPOL by filling out our membership form. Click the 'Join Us' button at the top of the page or in the contact section. Membership is open to all Polish students in France.",
    },
    {
      question: "Do I need to pay to join ASPOL?",
      answer: "No, ASPOL membership is completely free! We believe in building an inclusive community accessible to all Polish students in France.",
    },
    {
      question: "What kind of events does ASPOL organize?",
      answer: "We organize various events including the Paris Polish Forum conference, networking meetups, cultural celebrations, professional development workshops, and social gatherings. Check our Events section for upcoming activities.",
    },
    {
      question: "Can I participate if I'm not a Polish student?",
      answer: "While ASPOL primarily serves Polish students in France, we welcome anyone interested in Polish-French cultural exchange and cooperation to participate in our public events.",
    },
    {
      question: "How can I get involved with the mentoring program?",
      answer: "If you're a Polish student planning to study in France, you can apply for our mentoring program through our contact form. If you're already studying in France and want to become a mentor, reach out to us!",
    },
    {
      question: "Where are ASPOL events held?",
      answer: "Most of our events take place in Paris, including at Sciences Po, various universities, and cultural venues. Specific locations are announced with each event.",
    },
  ],
  fr: [
    {
      question: "Comment puis-je devenir membre d'ASPOL?",
      answer: "Vous pouvez rejoindre ASPOL en remplissant notre formulaire d'adhésion. Cliquez sur le bouton 'Nous Rejoindre' en haut de la page ou dans la section contact. L'adhésion est ouverte à tous les étudiants polonais en France.",
    },
    {
      question: "Dois-je payer pour rejoindre ASPOL?",
      answer: "Non, l'adhésion à ASPOL est entièrement gratuite! Nous croyons en la construction d'une communauté inclusive accessible à tous les étudiants polonais en France.",
    },
    {
      question: "Quel type d'événements ASPOL organise-t-il?",
      answer: "Nous organisons divers événements dont la conférence Paris Polish Forum, des rencontres de networking, des célébrations culturelles, des ateliers de développement professionnel et des rassemblements sociaux. Consultez notre section Événements pour les activités à venir.",
    },
    {
      question: "Puis-je participer si je ne suis pas étudiant polonais?",
      answer: "Bien qu'ASPOL serve principalement les étudiants polonais en France, nous accueillons toute personne intéressée par l'échange culturel et la coopération polono-française à participer à nos événements publics.",
    },
    {
      question: "Comment puis-je m'impliquer dans le programme de mentorat?",
      answer: "Si vous êtes un étudiant polonais prévoyant d'étudier en France, vous pouvez postuler à notre programme de mentorat via notre formulaire de contact. Si vous étudiez déjà en France et souhaitez devenir mentor, contactez-nous!",
    },
    {
      question: "Où se déroulent les événements ASPOL?",
      answer: "La plupart de nos événements ont lieu à Paris, notamment à Sciences Po, dans diverses universités et lieux culturels. Les emplacements spécifiques sont annoncés avec chaque événement.",
    },
  ],
  pl: [
    {
      question: "Jak mogę zostać członkiem ASPOL?",
      answer: "Możesz dołączyć do ASPOL wypełniając nasz formularz członkowski. Kliknij przycisk 'Dołącz do Nas' u góry strony lub w sekcji kontakt. Członkostwo jest otwarte dla wszystkich polskich studentów we Francji.",
    },
    {
      question: "Czy muszę płacić, aby dołączyć do ASPOL?",
      answer: "Nie, członkostwo w ASPOL jest całkowicie darmowe! Wierzymy w budowanie włączającej społeczności dostępnej dla wszystkich polskich studentów we Francji.",
    },
    {
      question: "Jakie wydarzenia organizuje ASPOL?",
      answer: "Organizujemy różne wydarzenia, w tym konferencję Paris Polish Forum, spotkania networkingowe, celebracje kulturalne, warsztaty rozwoju zawodowego i spotkania towarzyskie. Sprawdź naszą sekcję Wydarzenia, aby poznać nadchodzące aktywności.",
    },
    {
      question: "Czy mogę uczestniczyć, jeśli nie jestem polskim studentem?",
      answer: "Chociaż ASPOL służy głównie polskim studentom we Francji, zapraszamy każdego zainteresowanego polsko-francuską wymianą kulturalną i współpracą do udziału w naszych publicznych wydarzeniach.",
    },
    {
      question: "Jak mogę zaangażować się w program mentorski?",
      answer: "Jeśli jesteś polskim studentem planującym studia we Francji, możesz aplikować do naszego programu mentorskiego przez formularz kontaktowy. Jeśli już studiujesz we Francji i chcesz zostać mentorem, skontaktuj się z nami!",
    },
    {
      question: "Gdzie odbywają się wydarzenia ASPOL?",
      answer: "Większość naszych wydarzeń odbywa się w Paryżu, m.in. w Sciences Po, różnych uniwersytetach i miejscach kulturalnych. Konkretne lokalizacje są ogłaszane przy każdym wydarzeniu.",
    },
  ],
} as const;

export default function FAQ() {
  const { language } = useLanguage();
  const { home, text } = useSiteContent();

  // FAQ entries come from Sanity when any are published; otherwise the built-in list is used.
  const { data: cmsFaqs } = useSanityData<FAQItem[] | null>(
    async () => {
      const data = await getFaqs();
      if (!Array.isArray(data) || data.length === 0) return null;
      return data.map((f) => ({
        question: f.question?.[language] || f.question?.en || "",
        answer: f.answer?.[language] || f.answer?.en || "",
      }));
    },
    { fallback: null, deps: [language] },
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentFAQs: readonly FAQItem[] = cmsFaqs || FAQS[language] || FAQS.en;

  // Filter FAQs based on search query
  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return currentFAQs;
    
    const query = searchQuery.toLowerCase();
    return currentFAQs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [currentFAQs, searchQuery]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const heading =
    language === "fr" ? "Questions Fréquentes" : language === "pl" ? "Najczęściej Zadawane Pytania" : "Frequently Asked Questions";
  const subheading =
    language === "fr"
      ? "Trouvez des réponses aux questions courantes sur ASPOL"
      : language === "pl"
        ? "Znajdź odpowiedzi na najczęstsze pytania dotyczące ASPOL"
        : "Find answers to common questions about ASPOL";
  const searchPlaceholder =
    language === "en" ? "Search questions..." : language === "fr" ? "Rechercher des questions..." : "Szukaj pytań...";
  const searchLabel = language === "en" ? "Search FAQ" : language === "fr" ? "Rechercher FAQ" : "Wyszukaj FAQ";

  return (
    <section
      className="section-pad dome-gap relative overflow-hidden bg-aspol-white text-aspol-dark"
      aria-label={language === "en" ? "Frequently asked questions" : language === "fr" ? "Questions fréquentes" : "Najczęściej zadawane pytania"}
    >
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: heading + search (sticks while the list scrolls on desktop) */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal as="h2" className="display text-[clamp(2.1rem,4.4vw,4.25rem)] [overflow-wrap:anywhere]" text={text(home.faqTitle, heading)} />
            <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg">{text(home.faqSubtitle, subheading)}</p>

            <div className="relative mt-8 max-w-md">
              <svg
                className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-aspol-navy"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-full bg-aspol-mist py-4 pl-13 pr-14 text-base text-aspol-dark placeholder:text-aspol-ink-soft/70 transition-shadow focus:shadow-[inset_0_0_0_2px_var(--color-aspol-blue)] focus:outline-none"
                aria-label={searchLabel}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-aspol-navy transition-colors hover:bg-aspol-line"
                  aria-label="Clear search"
                >
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {searchQuery && (
              <p className="mt-4 text-sm font-medium text-aspol-ink-soft" role="status">
                {filteredFAQs.length} {language === "en" ? "result(s) found" : language === "fr" ? "résultat(s) trouvé(s)" : "znaleziono wynik(ów)"}
              </p>
            )}

            <div className="mt-10 hidden lg:block">
              <p className="mb-4 text-base text-aspol-ink-soft">
                {language === "en" && "Still have questions?"}
                {language === "fr" && "Vous avez encore des questions?"}
                {language === "pl" && "Masz jeszcze pytania?"}
              </p>
              <Pill href="#contact" variant="dark">
                {language === "en" && "Contact Us"}
                {language === "fr" && "Contactez-Nous"}
                {language === "pl" && "Skontaktuj się z Nami"}
              </Pill>
            </div>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="lg:col-span-7">
          {filteredFAQs.length === 0 ? (
            <div className="rounded-[2rem] bg-aspol-mist p-10 text-center">
              <p className="display display-sm mb-2">
                {language === "en" && "No results found"}
                {language === "fr" && "Aucun résultat trouvé"}
                {language === "pl" && "Nie znaleziono wyników"}
              </p>
              <p className="text-aspol-ink-soft">
                {language === "en" && "Try adjusting your search terms"}
                {language === "fr" && "Essayez de modifier vos termes de recherche"}
                {language === "pl" && "Spróbuj zmienić słowa kluczowe"}
              </p>
            </div>
          ) : (
            <ul className="border-b border-aspol-line">
              {filteredFAQs.map((faq, index) => {
                const open = openIndex === index;
                return (
                  <li key={index} className="group border-t border-aspol-line">
                    <h3>
                      <button
                        type="button"
                        onClick={() => toggleFAQ(index)}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left sm:py-8"
                        aria-expanded={open}
                        aria-controls={`faq-panel-${index}`}
                        id={`faq-button-${index}`}
                      >
                        <span
                          className={`font-display text-xl font-bold leading-tight transition-colors duration-300 sm:text-2xl ${
                            open ? "text-aspol-blue" : "text-aspol-dark group-hover:text-aspol-blue"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <span
                          className={`relative grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                            open ? "bg-aspol-navy text-white" : "bg-aspol-mist text-aspol-dark group-hover:bg-aspol-line"
                          }`}
                          aria-hidden="true"
                        >
                          <span className="absolute h-0.5 w-4 rounded bg-current" />
                          <span
                            className={`absolute h-4 w-0.5 rounded bg-current transition-transform duration-500 ease-(--ease-out-expo) ${
                              open ? "scale-y-0" : "scale-y-100"
                            }`}
                          />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
                      aria-hidden={!open}
                      inert={!open ? true : undefined}
                      className={`grid transition-[grid-template-rows,opacity] duration-600 ease-(--ease-out-expo) ${
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[62ch] pb-8 text-base leading-relaxed text-aspol-ink-soft sm:text-lg">{faq.answer}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-10 lg:hidden">
            <p className="mb-4 text-base text-aspol-ink-soft">
              {language === "en" && "Still have questions?"}
              {language === "fr" && "Vous avez encore des questions?"}
              {language === "pl" && "Masz jeszcze pytania?"}
            </p>
            <Pill href="#contact" variant="dark">
              {language === "en" && "Contact Us"}
              {language === "fr" && "Contactez-Nous"}
              {language === "pl" && "Skontaktuj się z Nami"}
            </Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
