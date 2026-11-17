"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { onOpenCookieSettings, setConsent, useConsent } from "@/lib/consent";
import Pill from "@/components/ui/Pill";

const CONTENT = {
  en: {
    title: "Cookies",
    body: "We use necessary cookies to keep the site working and to remember your language. With your consent, we also load external content such as Google Maps, which sets its own cookies.",
    policy: "Privacy Policy",
    accept: "Accept all",
    necessary: "Necessary only",
  },
  fr: {
    title: "Cookies",
    body: "Nous utilisons des cookies nécessaires au fonctionnement du site et pour mémoriser votre langue. Avec votre accord, nous chargeons aussi des contenus externes comme Google Maps, qui dépose ses propres cookies.",
    policy: "Politique de confidentialité",
    accept: "Tout accepter",
    necessary: "Nécessaires uniquement",
  },
  pl: {
    title: "Pliki cookie",
    body: "Używamy niezbędnych plików cookie, aby strona działała i pamiętała wybrany język. Za Twoją zgodą wczytujemy też treści zewnętrzne, np. Mapy Google, które zapisują własne pliki cookie.",
    policy: "Polityka prywatności",
    accept: "Akceptuj wszystkie",
    necessary: "Tylko niezbędne",
  },
} as const;

/** Shown on the first visit, and again from the footer's "Cookie settings" link. */
export default function CookieBanner() {
  const { language } = useLanguage();
  const c = CONTENT[language];
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => onOpenCookieSettings(() => setReopened(true)), []);

  if (consent === null || (consent !== "unset" && !reopened)) return null;

  const choose = (value: "all" | "necessary") => {
    setConsent(value);
    setReopened(false);
  };

  return (
    <section
      role="region"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-md"
    >
      <div className="rounded-[1.75rem] bg-aspol-white p-6 text-aspol-dark shadow-[0_20px_60px_-15px_rgba(10,25,60,0.45)] ring-1 ring-aspol-line sm:p-7">
        <h2 id="cookie-banner-title" className="font-display text-lg font-extrabold">
          {c.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-aspol-ink-soft">
          {c.body}{" "}
          <Link href="/privacy-policy" className="font-semibold text-aspol-navy underline underline-offset-4 hover:text-aspol-red">
            {c.policy}
          </Link>
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Pill variant="dark" noChip className="px-6" onClick={() => choose("all")}>
            {c.accept}
          </Pill>
          <Pill variant="ghost" noChip className="px-6" onClick={() => choose("necessary")}>
            {c.necessary}
          </Pill>
        </div>
      </div>
    </section>
  );
}
