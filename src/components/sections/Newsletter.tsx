"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { subscribeToNewsletter } from "@/app/(website)/actions/newsletter";
import { trackEvent } from "@/lib/analytics";

export default function Newsletter() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [trapField, setTrapField] = useState("");
  const formStartRef = useRef<number>(0);
  // We use simple state for status to keep the UI responsive, 
  // but call the server action in the background.
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    formStartRef.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("company", trapField);
      formData.append("formStart", String(formStartRef.current));

      const result = await subscribeToNewsletter({}, formData);

      if (result.success) {
        trackEvent("newsletter_subscribe_success", { language });
        setStatus("success");
        setEmail("");
        setTrapField("");
        formStartRef.current = Date.now();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        trackEvent("newsletter_subscribe_error", { language });
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      trackEvent("newsletter_subscribe_error", { language });
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const content = {
    en: {
      title: "Stay Updated",
      description: "Subscribe to our newsletter for the latest events, news, and opportunities",
      placeholder: "Enter your email",
      button: "Subscribe",
      success: "Successfully subscribed!",
      error: "Something went wrong. Please try again.",
    },
    fr: {
      title: "Restez Informé",
      description: "Abonnez-vous à notre newsletter pour les derniers événements, actualités et opportunités",
      placeholder: "Entrez votre email",
      button: "S'abonner",
      success: "Abonnement réussi!",
      error: "Une erreur s'est produite. Veuillez réessayer.",
    },
    pl: {
      title: "Bądź na Bieżąco",
      description: "Zapisz się do naszego newslettera, aby otrzymywać najnowsze wydarzenia, wiadomości i możliwości",
      placeholder: "Wprowadź swój email",
      button: "Zapisz się",
      success: "Pomyślnie zapisano!",
      error: "Coś poszło nie tak. Spróbuj ponownie.",
    },
  };

  const text = content[language] || content.en;

  return (
    <section className="py-16 px-6 bg-linear-to-r from-red-600 to-red-500">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {text.title}
        </h2>
        <p className="text-xl text-red-100 mb-8">
          {text.description}
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto" aria-busy={status === "loading"}>
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="newsletter-company">Company</label>
            <input
              type="text"
              id="newsletter-company"
              name="company"
              value={trapField}
              onChange={(e) => setTrapField(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={text.placeholder}
              disabled={status === "loading"}
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              aria-label={text.placeholder}
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-400 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-white/50 focus:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-transparent hover:border-white/20"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-4 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : (
                text.button
              )}
            </button>
          </div>

          {status === "success" && (
            <p className="mt-4 text-white font-medium flex items-center justify-center" role="status" aria-live="polite" aria-atomic="true">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {text.success}
            </p>
          )}

          {status === "error" && (
            <p className="mt-4 text-white font-medium" role="alert" aria-live="assertive" aria-atomic="true">
              {text.error}
            </p>
          )}
        </form>

        <p className="mt-6 text-sm text-red-100">
          {language === "en" && "We respect your privacy. Unsubscribe at any time."}
          {language === "fr" && "Nous respectons votre vie privée. Désabonnez-vous à tout moment."}
          {language === "pl" && "Szanujemy Twoją prywatność. Wypisz się w dowolnym momencie."}
        </p>
      </div>
    </section>
  );
}
