"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { backfillPPFDateOfBirth } from "@/app/(website)/actions/ppf-dob-backfill";
import type { PPFDobBackfillState } from "@/types/ppf";

const t = {
  en: {
    title: "PPF 2026 - Date of Birth Completion",
    subtitle:
      "This form is for participants already registered and accepted for PPF 2026.",
    ticketId: "Ticket ID",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    dateOfBirth: "Date of Birth",
    submit: "Save Date of Birth",
    submitting: "Saving...",
    success: "Date of birth has been saved successfully.",
    hint: "Use the same details as in your registration and confirmation email.",
  },
  fr: {
    title: "PPF 2026 - Complément date de naissance",
    subtitle:
      "Ce formulaire est destiné aux participants déjà inscrits et acceptés au PPF 2026.",
    ticketId: "Numéro de billet",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    dateOfBirth: "Date de naissance",
    submit: "Enregistrer la date de naissance",
    submitting: "Enregistrement...",
    success: "La date de naissance a été enregistrée avec succès.",
    hint: "Utilisez les mêmes informations que lors de l'inscription et dans l'email de confirmation.",
  },
  pl: {
    title: "PPF 2026 - Uzupełnienie daty urodzenia",
    subtitle:
      "Ten formularz jest dla osób już zarejestrowanych i zaakceptowanych na PPF 2026.",
    ticketId: "Numer biletu",
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "Email",
    dateOfBirth: "Data urodzenia",
    submit: "Zapisz datę urodzenia",
    submitting: "Zapisywanie...",
    success: "Data urodzenia została zapisana.",
    hint: "Użyj dokładnie tych samych danych co w rejestracji i mailu potwierdzającym.",
  },
};

const CONSENT_PARAGRAPHS = [
  "I consent to the processing of my personal data by Association des Étudiants Polonais en France (ASPOL) for the purpose of granting access to the Embassy on the day of the event Paris Polish Forum X, taking place on 18 April 2026, and for its transmission to the Embassy of Poland in Paris as required for security and entry procedures.",
  "I acknowledge that providing my data is voluntary but necessary to participate in the event and access the Embassy premises. My personal data will be processed in accordance with the General Data Protection Regulation as applicable in France, including the French Data Protection Act (Loi Informatique et Libertés). The data will be stored by Association des Étudiants Polonais en France (ASPOL) until 19 April 2026 and for the duration of processing by the Embassy of Poland in Paris, in accordance with its internal rules.",
  "I understand that I have the right to access my data, request its rectification or erasure, and restrict its processing, in accordance with applicable data protection laws. You may also contact the CNIL for further information or to exercise your rights.",
];

export default function PPFDobBackfillForm() {
  const { language } = useLanguage();
  const lang = (language as keyof typeof t) || "en";
  const tr = t[lang] || t.en;
  const params = useSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<PPFDobBackfillState | null>(null);
  const formStartRef = useRef<number>(0);

  const defaultTicketId = (params.get("ticketId") || "").trim();

  useEffect(() => {
    formStartRef.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("formStart", String(formStartRef.current));

    const state = await backfillPPFDateOfBirth({}, formData);
    setResult(state);
    setIsSubmitting(false);

    if (state.success) {
      form.reset();
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
              Important: Completing date of birth is mandatory to be allowed entry to the Embassy on the event day.
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
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="ticketId">
                {tr.ticketId}
              </label>
              <input
                id="ticketId"
                name="ticketId"
                defaultValue={defaultTicketId}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aspol-red focus:outline-none focus:ring-2 focus:ring-aspol-red/15"
              />
              {result?.errors?.ticketId && <p className="text-red-600 text-sm mt-1">{result.errors.ticketId[0]}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="firstName">
                  {tr.firstName}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aspol-red focus:outline-none focus:ring-2 focus:ring-aspol-red/15"
                />
                {result?.errors?.firstName && <p className="text-red-600 text-sm mt-1">{result.errors.firstName[0]}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="lastName">
                  {tr.lastName}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aspol-red focus:outline-none focus:ring-2 focus:ring-aspol-red/15"
                />
                {result?.errors?.lastName && <p className="text-red-600 text-sm mt-1">{result.errors.lastName[0]}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">
                {tr.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aspol-red focus:outline-none focus:ring-2 focus:ring-aspol-red/15"
              />
              {result?.errors?.email && <p className="text-red-600 text-sm mt-1">{result.errors.email[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="dateOfBirth">
                {tr.dateOfBirth}
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-aspol-red focus:outline-none focus:ring-2 focus:ring-aspol-red/15"
              />
              {result?.errors?.dateOfBirth && <p className="text-red-600 text-sm mt-1">{result.errors.dateOfBirth[0]}</p>}
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{CONSENT_PARAGRAPHS[0]}</p>
              <p className="mt-3 text-xs sm:text-sm text-gray-700 leading-relaxed">{CONSENT_PARAGRAPHS[1]}</p>
              <p className="mt-3 text-xs sm:text-sm text-gray-700 leading-relaxed">{CONSENT_PARAGRAPHS[2]}</p>
              <p className="mt-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
                For any questions regarding your personal data, you may contact us at: {" "}
                <a href="mailto:office@aspol.fr" className="font-semibold text-aspol-red hover:underline">
                  office@aspol.fr
                </a>
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
