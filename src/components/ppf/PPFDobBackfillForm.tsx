"use client";

import { useEffect, useMemo, useRef, useState, type ComponentType, type SVGProps } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { backfillPPFDateOfBirth } from "@/app/(website)/actions/ppf-dob-backfill";
import type { PPFDobBackfillState } from "@/types/ppf";
import countriesData from "world-countries";
import * as FlagIcons from "country-flag-icons/react/3x2";

const t = {
  en: {
    title: "PPF 2026 - Birth Details Completion",
    subtitle:
      "This form is for participants already registered and accepted for PPF 2026.",
    ticketId: "Ticket ID",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    dateOfBirth: "Date of Birth",
    countryOfBirth: "Country of Birth",
    countryOfBirthPlaceholder: "Start typing to search countries",
    selectCountryOfBirth: "Select country",
    submit: "Save Required Details",
    submitting: "Saving...",
    success: "Date of birth and country of birth have been saved successfully.",
    hint: "Use the same details as in your registration and confirmation email.",
  },
  fr: {
    title: "PPF 2026 - Completer les informations de naissance",
    subtitle:
      "Ce formulaire est destine aux participants deja inscrits et acceptes au PPF 2026.",
    ticketId: "Numero de billet",
    firstName: "Prenom",
    lastName: "Nom",
    email: "Email",
    dateOfBirth: "Date de naissance",
    countryOfBirth: "Pays de naissance",
    countryOfBirthPlaceholder: "Commencez a taper pour rechercher un pays",
    selectCountryOfBirth: "Selectionnez un pays",
    submit: "Enregistrer les informations requises",
    submitting: "Enregistrement...",
    success: "La date et le pays de naissance ont ete enregistres avec succes.",
    hint: "Utilisez les memes informations que lors de l'inscription et dans l'email de confirmation.",
  },
  pl: {
    title: "PPF 2026 - Uzupelnienie danych urodzenia",
    subtitle:
      "Ten formularz jest dla osob juz zarejestrowanych i zaakceptowanych na PPF 2026.",
    ticketId: "Numer biletu",
    firstName: "Imie",
    lastName: "Nazwisko",
    email: "Email",
    dateOfBirth: "Data urodzenia",
    countryOfBirth: "Kraj urodzenia",
    countryOfBirthPlaceholder: "Zacznij wpisywac, aby wyszukac kraj",
    selectCountryOfBirth: "Wybierz kraj",
    submit: "Zapisz wymagane dane",
    submitting: "Zapisywanie...",
    success: "Data i kraj urodzenia zostaly zapisane.",
    hint: "Uzyj dokladnie tych samych danych co w rejestracji i mailu potwierdzajacym.",
  },
};

const CONSENT_PARAGRAPHS = [
  "I consent to the processing of my personal data by Association des Etudiants Polonais en France (ASPOL) for the purpose of granting access to the Embassy on the day of the event Paris Polish Forum X, taking place on 18 April 2026, and for its transmission to the Embassy of Poland in Paris as required for security and entry procedures.",
  "I acknowledge that providing my data is voluntary but necessary to participate in the event and access the Embassy premises. My personal data will be processed in accordance with the General Data Protection Regulation as applicable in France, including the French Data Protection Act (Loi Informatique et Libertes). The data will be stored by Association des Etudiants Polonais en France (ASPOL) until 19 April 2026 and for the duration of processing by the Embassy of Poland in Paris, in accordance with its internal rules.",
  "I understand that I have the right to access my data, request its rectification or erasure, and restrict its processing, in accordance with applicable data protection laws. You may also contact the CNIL for further information or to exercise your rights.",
];

const PINNED_COUNTRY_CODES = ["PL", "FR"];

function CountryFlag({ code }: { code: string }) {
  const Flag = (FlagIcons as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[code.toUpperCase()];
  if (!Flag) {
    return (
      <span className="inline-flex items-center justify-center w-4 text-[10px] font-semibold text-gray-500">
        {code.toUpperCase()}
      </span>
    );
  }
  return <Flag className="w-4 h-3 rounded-xs shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" aria-hidden="true" />;
}

export default function PPFDobBackfillForm() {
  const { language } = useLanguage();
  const lang = (language as keyof typeof t) || "en";
  const tr = t[lang] || t.en;
  const params = useSearchParams();

  const countryOptions = useMemo(() => {
    const locale = lang === "pl" ? "pl" : lang === "fr" ? "fr" : "en";

    return countriesData
      .map((country) => {
        const code = country.cca2 || "";
        const label =
          lang === "pl"
            ? country.translations?.pol?.common || country.name?.common || ""
            : lang === "fr"
              ? country.translations?.fra?.common || country.name?.common || ""
              : country.name?.common || "";

        return {
          code,
          label,
          isPinned: PINNED_COUNTRY_CODES.includes(code),
        };
      })
      .filter((option) => Boolean(option.code && option.label.trim()))
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.label.localeCompare(b.label, locale);
      });
  }, [lang]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<PPFDobBackfillState | null>(null);
  const [selectedCountryOfBirth, setSelectedCountryOfBirth] = useState("");
  const [countryOfBirthQuery, setCountryOfBirthQuery] = useState("");
  const [isCountryOfBirthOpen, setIsCountryOfBirthOpen] = useState(false);
  const [activeCountryOfBirthIndex, setActiveCountryOfBirthIndex] = useState(0);

  const formStartRef = useRef<number>(0);
  const countryOfBirthDropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountryOptions = useMemo(() => {
    const query = countryOfBirthQuery.trim().toLowerCase();
    if (!query) return countryOptions;
    return countryOptions.filter(
      (opt) => opt.label.toLowerCase().includes(query) || opt.code.toLowerCase().includes(query)
    );
  }, [countryOptions, countryOfBirthQuery]);

  const filteredPinnedCountryOptions = useMemo(
    () => filteredCountryOptions.filter((opt) => opt.isPinned),
    [filteredCountryOptions]
  );

  const filteredOtherCountryOptions = useMemo(
    () => filteredCountryOptions.filter((opt) => !opt.isPinned),
    [filteredCountryOptions]
  );

  const safeActiveCountryOfBirthIndex = useMemo(
    () => Math.min(activeCountryOfBirthIndex, Math.max(0, filteredCountryOptions.length - 1)),
    [activeCountryOfBirthIndex, filteredCountryOptions.length]
  );

  const noResultsLabel = lang === "pl" ? "Brak wynikow" : lang === "fr" ? "Aucun resultat" : "No results";
  const pinnedLabel = lang === "pl" ? "Wyroznione" : lang === "fr" ? "Epingles" : "Pinned";
  const allCountriesLabel = lang === "pl" ? "Wszystkie kraje" : lang === "fr" ? "Tous les pays" : "All countries";
  const defaultTicketId = (params.get("ticketId") || "").trim();

  useEffect(() => {
    formStartRef.current = Date.now();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (countryOfBirthDropdownRef.current && !countryOfBirthDropdownRef.current.contains(target)) {
        setIsCountryOfBirthOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountryOfBirthSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isCountryOfBirthOpen) {
        setIsCountryOfBirthOpen(true);
        setActiveCountryOfBirthIndex(0);
        return;
      }
      setActiveCountryOfBirthIndex((prev) => Math.min(prev + 1, filteredCountryOptions.length - 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isCountryOfBirthOpen) {
        setIsCountryOfBirthOpen(true);
        setActiveCountryOfBirthIndex(Math.max(0, filteredCountryOptions.length - 1));
        return;
      }
      setActiveCountryOfBirthIndex((prev) => Math.max(prev - 1, 0));
      return;
    }

    if (e.key === "Enter" && isCountryOfBirthOpen && filteredCountryOptions.length > 0) {
      e.preventDefault();
      const selected = filteredCountryOptions[safeActiveCountryOfBirthIndex];
      if (selected) {
        setSelectedCountryOfBirth(selected.label);
        setIsCountryOfBirthOpen(false);
      }
      return;
    }

    if (e.key === "Escape") {
      setIsCountryOfBirthOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("countryOfBirth", selectedCountryOfBirth);
    formData.set("formStart", String(formStartRef.current));

    const state = await backfillPPFDateOfBirth({}, formData);
    setResult(state);
    setIsSubmitting(false);

    if (state.success) {
      form.reset();
      setSelectedCountryOfBirth("");
      setCountryOfBirthQuery("");
      setIsCountryOfBirthOpen(false);
      setActiveCountryOfBirthIndex(0);
      formStartRef.current = Date.now();
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-aspol-dark">{tr.title}</h1>
          <p className="mt-3 text-gray-600">{tr.subtitle}</p>
          <p className="mt-2 text-sm text-gray-500">{tr.hint}</p>

          <div className="mt-5 px-4 py-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-900">
            <p className="text-sm font-semibold leading-relaxed">
              Important: Completing date of birth and country of birth is mandatory to be allowed entry to the Embassy on the event day.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="absolute opacity-0 -z-10" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input type="text" name="company" id="company" tabIndex={-1} autoComplete="off" />
            </div>

            {result?.errors?._form && (
              <div className="px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700">
                {result.errors._form[0]}
              </div>
            )}

            {result?.success && (
              <div className="px-4 py-3 rounded-xl border border-green-200 bg-green-50 text-sm text-green-800">
                {result.message || tr.success}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ticketId">{tr.ticketId}</label>
              <input id="ticketId" name="ticketId" defaultValue={defaultTicketId} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aspol-red focus:outline-none focus:ring-2 focus:ring-aspol-red/15" />
              {result?.errors?.ticketId && <p className="text-red-600 text-sm mt-1">{result.errors.ticketId[0]}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="firstName">{tr.firstName}</label>
                <input id="firstName" name="firstName" required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aspol-red focus:outline-none focus:ring-2 focus:ring-aspol-red/15" />
                {result?.errors?.firstName && <p className="text-red-600 text-sm mt-1">{result.errors.firstName[0]}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="lastName">{tr.lastName}</label>
                <input id="lastName" name="lastName" required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aspol-red focus:outline-none focus:ring-2 focus:ring-aspol-red/15" />
                {result?.errors?.lastName && <p className="text-red-600 text-sm mt-1">{result.errors.lastName[0]}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">{tr.email}</label>
              <input id="email" name="email" type="email" required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aspol-red focus:outline-none focus:ring-2 focus:ring-aspol-red/15" />
              {result?.errors?.email && <p className="text-red-600 text-sm mt-1">{result.errors.email[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="dateOfBirth">{tr.dateOfBirth}</label>
              <input id="dateOfBirth" name="dateOfBirth" type="date" required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aspol-red focus:outline-none focus:ring-2 focus:ring-aspol-red/15" />
              {result?.errors?.dateOfBirth && <p className="text-red-600 text-sm mt-1">{result.errors.dateOfBirth[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="countryOfBirthSearch">{tr.countryOfBirth}</label>
              <div ref={countryOfBirthDropdownRef}>
                <input
                  id="countryOfBirthSearch"
                  type="text"
                  value={countryOfBirthQuery}
                  onChange={(e) => {
                    setCountryOfBirthQuery(e.target.value);
                    setIsCountryOfBirthOpen(true);
                    setActiveCountryOfBirthIndex(0);
                  }}
                  onKeyDown={handleCountryOfBirthSearchKeyDown}
                  placeholder={tr.countryOfBirthPlaceholder}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-aspol-red focus:outline-none focus:ring-2 focus:ring-aspol-red/15"
                />
                <input type="hidden" name="countryOfBirth" value={selectedCountryOfBirth} />
                <div className="relative mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCountryOfBirthOpen((prev) => !prev);
                      setActiveCountryOfBirthIndex(0);
                    }}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-left text-gray-900 transition-all hover:bg-white focus:border-aspol-red focus:outline-none focus:ring-2 focus:ring-aspol-red/15 flex items-center justify-between"
                  >
                    <span className={`truncate inline-flex items-center gap-2 ${selectedCountryOfBirth ? "text-gray-900" : "text-gray-400"}`}>
                      {selectedCountryOfBirth && (
                        <CountryFlag code={countryOptions.find((opt) => opt.label === selectedCountryOfBirth)?.code || "PL"} />
                      )}
                      <span>{selectedCountryOfBirth || tr.selectCountryOfBirth}</span>
                    </span>
                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${isCountryOfBirthOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25L12 15.75 4.5 8.25" />
                    </svg>
                  </button>

                  {isCountryOfBirthOpen && (
                    <div className="absolute z-30 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl max-h-72 overflow-y-auto">
                      {filteredCountryOptions.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-gray-500">{noResultsLabel}</div>
                      ) : (
                        <>
                          {filteredPinnedCountryOptions.length > 0 && (
                            <>
                              <div className="sticky top-0 bg-gray-50 px-3 py-2 text-[11px] font-bold tracking-wide uppercase text-gray-400">{pinnedLabel}</div>
                              {filteredPinnedCountryOptions.map((opt) => {
                                const optionIndex = filteredCountryOptions.findIndex((candidate) => candidate.code === opt.code);
                                return (
                                  <button
                                    key={`birth-${opt.code}`}
                                    type="button"
                                    onMouseEnter={() => setActiveCountryOfBirthIndex(optionIndex)}
                                    onClick={() => {
                                      setSelectedCountryOfBirth(opt.label);
                                      setIsCountryOfBirthOpen(false);
                                    }}
                                    className={`w-full px-3 py-2 text-left text-sm transition-colors inline-flex items-center gap-2 ${selectedCountryOfBirth === opt.label ? "text-aspol-red font-semibold" : "text-gray-700"} ${safeActiveCountryOfBirthIndex === optionIndex ? "bg-aspol-red/10" : "hover:bg-gray-50"}`}
                                  >
                                    <CountryFlag code={opt.code} />
                                    <span>{opt.label}</span>
                                  </button>
                                );
                              })}
                            </>
                          )}

                          {filteredOtherCountryOptions.length > 0 && (
                            <>
                              <div className="sticky top-0 bg-gray-50 px-3 py-2 text-[11px] font-bold tracking-wide uppercase text-gray-400">{allCountriesLabel}</div>
                              {filteredOtherCountryOptions.map((opt) => {
                                const optionIndex = filteredCountryOptions.findIndex((candidate) => candidate.code === opt.code);
                                return (
                                  <button
                                    key={`birth-${opt.code}`}
                                    type="button"
                                    onMouseEnter={() => setActiveCountryOfBirthIndex(optionIndex)}
                                    onClick={() => {
                                      setSelectedCountryOfBirth(opt.label);
                                      setIsCountryOfBirthOpen(false);
                                    }}
                                    className={`w-full px-3 py-2 text-left text-sm transition-colors inline-flex items-center gap-2 ${selectedCountryOfBirth === opt.label ? "text-aspol-red font-semibold" : "text-gray-700"} ${safeActiveCountryOfBirthIndex === optionIndex ? "bg-aspol-red/10" : "hover:bg-gray-50"}`}
                                  >
                                    <CountryFlag code={opt.code} />
                                    <span>{opt.label}</span>
                                  </button>
                                );
                              })}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {result?.errors?.countryOfBirth && <p className="text-red-600 text-sm mt-1">{result.errors.countryOfBirth[0]}</p>}
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{CONSENT_PARAGRAPHS[0]}</p>
              <p className="mt-3 text-xs sm:text-sm text-gray-700 leading-relaxed">{CONSENT_PARAGRAPHS[1]}</p>
              <p className="mt-3 text-xs sm:text-sm text-gray-700 leading-relaxed">{CONSENT_PARAGRAPHS[2]}</p>
              <p className="mt-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
                For any questions regarding your personal data, you may contact us at:{" "}
                <a href="mailto:office@aspol.fr" className="font-semibold text-aspol-red hover:underline">office@aspol.fr</a>
              </p>

              <label className="mt-4 flex items-start gap-3 cursor-pointer">
                <input
                  id="dataProcessingConsent"
                  name="dataProcessingConsent"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-aspol-red focus:ring-aspol-red/30"
                />
                <span className="text-sm font-medium text-gray-800">
                  I have read and accept the personal data processing notice above.
                </span>
              </label>
              {result?.errors?.dataProcessingConsent && (
                <p className="text-red-600 text-sm mt-2">{result.errors.dataProcessingConsent[0]}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-aspol-red text-white font-semibold py-3.5 hover:bg-aspol-red-dark disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? tr.submitting : tr.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
