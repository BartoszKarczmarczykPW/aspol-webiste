"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs: Record<string, FAQItem[]> = {
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
  };

  const currentFAQs = faqs[language] || faqs.en;

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

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {language === "en" && "Frequently Asked Questions"}
            {language === "fr" && "Questions Fréquentes"}
            {language === "pl" && "Najczęściej Zadawane Pytania"}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {language === "en" && "Find answers to common questions about ASPOL"}
            {language === "fr" && "Trouvez des réponses aux questions courantes sur ASPOL"}
            {language === "pl" && "Znajdź odpowiedzi na najczęstsze pytania dotyczące ASPOL"}
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "en" ? "Search questions..." :
                  language === "fr" ? "Rechercher des questions..." :
                  "Szukaj pytań..."
                }
                className="w-full px-6 py-4 pl-14 text-lg border-2 border-gray-200 rounded-full focus:border-red-600 focus:outline-none transition-colors"
                aria-label={
                  language === "en" ? "Search FAQ" :
                  language === "fr" ? "Rechercher FAQ" :
                  "Wyszukaj FAQ"
                }
              />
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results info */}
        {searchQuery && (
          <div className="mb-6 text-center text-gray-600">
            {filteredFAQs.length} {language === "en" ? "result(s) found" : language === "fr" ? "résultat(s) trouvé(s)" : "znaleziono wynik(ów)"}
          </div>
        )}

        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl text-gray-500">
              {language === "en" && "No questions found matching your search"}
              {language === "fr" && "Aucune question trouvée correspondant à votre recherche"}
              {language === "pl" && "Nie znaleziono pytań pasujących do wyszukiwania"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-red-600 shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            {language === "en" && "Still have questions?"}
            {language === "fr" && "Vous avez encore des questions?"}
            {language === "pl" && "Masz jeszcze pytania?"}
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-105"
          >
            {language === "en" && "Contact Us"}
            {language === "fr" && "Contactez-Nous"}
            {language === "pl" && "Skontaktuj się z Nami"}
          </a>
        </div>
      </div>
    </section>
  );
}
