"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { subscribeToNewsletter } from "@/app/(website)/actions/newsletter";
import { trackEvent } from "@/lib/analytics";
import Reveal from "@/components/ui/Reveal";

const CONTENT = {
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
} as const;

export default function Newsletter() {
  const { language } = useLanguage();
  const { home, text: cmsText } = useSiteContent();
  const [email, setEmail] = useState("");
  const [trapField, setTrapField] = useState("");
  const formStartRef = useRef<number>(0);
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

  const defaults = CONTENT[language] || CONTENT.en;
  const text = {
    ...defaults,
    title: cmsText(home.newsletterTitle, defaults.title),
    description: cmsText(home.newsletterDescription, defaults.description),
    button: cmsText(home.newsletterButton, defaults.button),
  };

  return (
    <section
      className="on-dark dome-top relative overflow-hidden bg-aspol-red pb-20 text-white sm:pb-28"
      aria-label="Newsletter subscription"
    >
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal as="h2" className="display display-lg" text={text.title} />
          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-white/90 sm:text-lg">{text.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-5" aria-busy={status === "loading"}>
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

          <div className="flex items-center gap-2 rounded-full bg-aspol-white p-2 pl-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] focus-within:ring-4 focus-within:ring-white/40">
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
              className="min-w-0 flex-1 bg-transparent py-3 text-base text-aspol-dark placeholder:text-aspol-ink-soft/70 focus:outline-none disabled:opacity-50"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              aria-label={
                status === "loading"
                  ? language === "fr"
                    ? "Envoi en cours"
                    : language === "pl"
                      ? "Wysyłanie"
                      : "Submitting"
                  : text.button
              }
              className="pill pill--dark pill--inline shrink-0 disabled:opacity-60"
            >
              <span className="hidden sm:inline">{status === "loading" ? "…" : text.button}</span>
              <span className="pill__chip" aria-hidden="true">
                {status === "loading" ? (
                  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>

          {status === "success" && (
            <p className="mt-4 flex items-center gap-2 font-semibold" role="status" aria-live="polite" aria-atomic="true">
              <svg className="size-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {text.success}
            </p>
          )}

          {status === "error" && (
            <p className="mt-4 font-semibold" role="alert" aria-live="assertive" aria-atomic="true">
              {text.error}
            </p>
          )}

          <p className="mt-4 text-sm text-white/80">
            {language === "en" && "We respect your privacy. Unsubscribe at any time."}
            {language === "fr" && "Nous respectons votre vie privée. Désabonnez-vous à tout moment."}
            {language === "pl" && "Szanujemy Twoją prywatność. Wypisz się w dowolnym momencie."}
          </p>
        </form>
      </div>
    </section>
  );
}
