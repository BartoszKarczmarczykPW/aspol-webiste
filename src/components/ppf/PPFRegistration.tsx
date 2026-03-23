"use client";

import { useState, useEffect, useRef, useCallback, useMemo, type ComponentType, type SVGProps } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { registerForPPF } from "@/app/(website)/actions/ppf-register";
import type { PPFSpotsData, PPFRegistrationState } from "@/types/ppf";
import PPFAgenda from "@/components/ppf/PPFAgenda";
import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js/min";
import countriesData from "world-countries";
import * as FlagIcons from "country-flag-icons/react/3x2";

// ─── Translations ─────────────────────────────────────────────
const t = {
  en: {
    title: "Paris Polish Forum",
    year: "2026",
    subtitle: "Registration",
    dateInfo: "April 17-18, 2026",
    location: "Paris, France",
    heroDesc: "Two days of conferences, networking, and cultural exchange connecting Polish students and professionals in France.",
    ticketSelect: "Choose your ticket",
    saturdayOnly: "Saturday only",
    saturdayOnlyDesc: "April 18 — Gala & networking",
    bothDays: "Both days",
    bothDaysDesc: "April 17-18 — Full experience",
    bothDaysTag: "RECOMMENDED",
    fridaySpots: "Friday spots",
    saturdaySpots: "Saturday spots",
    spotsLeft: "left",
    full: "FULL",
    personalInfo: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    optional: "optional",
    academicInfo: "Academic Information",
    university: "University / Company",
    fieldOfStudy: "Field of Study",
    howDidYouHear: "How did you hear about PPF?",
    selectSource: "Select…",
    sources: ["Social media", "Friend", "University", "ASPOL event", "LinkedIn", "Other"],
    acceptTerms: "I accept the terms and conditions and agree to the processing of my personal data for the purpose of event registration.",
    submit: "Confirm Registration",
    submitting: "Registering…",
    closed: "Registration is currently closed",
    allSaturdayFull: "All spots have been taken!",
    fridayFullNote: "Friday is full — you can still register for Saturday only.",
    successTitle: "Registration received",
    successSubtitle: "Pending organizer verification",
    successMessage: "Your ticket will be sent after approval.",
    ticketLabel: "TICKET ID",
    showAtEntrance: "Show this confirmation or the email ticket at the entrance",
    yourTicket: "Your ticket type",
    fridayLabel: "Friday — April 17",
    saturdayLabel: "Saturday — April 18",
    bothLabel: "Both days — April 17-18",
    registerAnother: "Register another person",
    required: "Required",
    fridayTag: "FRI",
    saturdayTag: "SAT",
    secureNote: "Your data is encrypted and secure",
    downloadTicket: "Download Ticket (PDF)",
    generatingPdf: "Generating…",
    // NEW FIELDS
    citizenshipLabel: "Citizenship",
    citizenshipOptions: ["Poland", "France", "Other"],
    professionalStatusLabel: "Professional Status",
    professionalStatusStudent: "Student",
    professionalStatusWorking: "Working Professional",
    professionalStatusOther: "Other",
    returnPlansLabel: "Are you planning to return to Poland in the future?",
    returnPlansYes: "Yes",
    returnPlansNo: "No",
    returnPlansMaybe: "Maybe / Not decided",
    gdprLabel: "GDPR Consent",
    gdprAccept: "I consent to the processing of my personal data specifically for Paris Polish Forum registration and related communication.",
    attendanceLabel: "I confirm my attendance at the event and understand that spots are limited.",
    successPendingNote: "Your registration has been received. Please wait for the organizers to verify and send your ticket (this may take up to 24-48h).",
  },
  fr: {
    title: "Paris Polish Forum",
    year: "2026",
    subtitle: "Inscription",
    dateInfo: "17-18 avril 2026",
    location: "Paris, France",
    heroDesc: "Deux jours de conférences, de networking et d'échanges culturels réunissant étudiants et professionnels polonais en France.",
    ticketSelect: "Choisissez votre billet",
    saturdayOnly: "Samedi uniquement",
    saturdayOnlyDesc: "18 avril — Gala & networking",
    bothDays: "Les deux jours",
    bothDaysDesc: "17-18 avril — Expérience complète",
    bothDaysTag: "RECOMMANDÉ",
    fridaySpots: "Places vendredi",
    saturdaySpots: "Places samedi",
    spotsLeft: "restantes",
    full: "COMPLET",
    personalInfo: "Informations personnelles",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    phone: "Téléphone",
    optional: "optionnel",
    academicInfo: "Informations académiques",
    university: "Université / Entreprise",
    fieldOfStudy: "Domaine d'études",
    howDidYouHear: "Comment avez-vous connu PPF ?",
    selectSource: "Sélectionnez…",
    sources: ["Réseaux sociaux", "Ami(e)", "Université", "Événement ASPOL", "LinkedIn", "Autre"],
    acceptTerms: "J'accepte les conditions générales et le traitement de mes données personnelles dans le cadre de l'inscription à l'événement.",
    submit: "Confirmer l'inscription",
    submitting: "Inscription en cours…",
    closed: "Les inscriptions sont actuellement fermées",
    allSaturdayFull: "Toutes les places sont prises !",
    fridayFullNote: "Le vendredi est complet — vous pouvez encore vous inscrire pour le samedi uniquement.",
    successTitle: "Inscription reçue",
    successSubtitle: "En attente de vérification",
    successMessage: "Votre billet sera envoyé après validation.",
    ticketLabel: "N° BILLET",
    showAtEntrance: "Présentez cette confirmation ou l'email à l'entrée",
    yourTicket: "Votre type de billet",
    fridayLabel: "Vendredi — 17 avril",
    saturdayLabel: "Samedi — 18 avril",
    bothLabel: "Les deux jours — 17-18 avril",
    registerAnother: "Inscrire une autre personne",
    required: "Obligatoire",
    fridayTag: "VEN",
    saturdayTag: "SAM",
    secureNote: "Vos données sont cryptées et sécurisées",
    downloadTicket: "Télécharger le billet (PDF)",
    generatingPdf: "Génération…",
    // NEW FIELDS
    citizenshipLabel: "Nationalité",
    citizenshipOptions: ["Pologne", "France", "Autre"],
    professionalStatusLabel: "Statut professionnel",
    professionalStatusStudent: "Étudiant",
    professionalStatusWorking: "Professionnel",
    professionalStatusOther: "Autre",
    returnPlansLabel: "Envisagez-vous de retourner en Pologne à l'avenir ?",
    returnPlansYes: "Oui",
    returnPlansNo: "Non",
    returnPlansMaybe: "Peut-être / Pas encore décidé",
    gdprLabel: "Consentement RGPD",
    gdprAccept: "Je consens au traitement de mes données personnelles spécifiquement pour l'inscription au Paris Polish Forum et la communication associée.",
    attendanceLabel: "Je confirme ma présence à l'événement et je comprends que les places sont limitées.",
    successPendingNote: "Votre inscription a bien été reçue. Veuillez patienter pendant que les organisateurs vérifient et envoient votre billet (cela peut prendre de 24 à 48 heures).",
  },
  pl: {
    title: "Paris Polish Forum",
    year: "2026",
    subtitle: "Rejestracja",
    dateInfo: "17-18 kwietnia 2026",
    location: "Paryż, Francja",
    heroDesc: "Dwa dni konferencji, networkingu i wymiany kulturalnej łączącej polskich studentów i profesjonalistów we Francji.",
    ticketSelect: "Wybierz bilet",
    saturdayOnly: "Tylko sobota",
    saturdayOnlyDesc: "18 kwietnia — Gala i networking",
    bothDays: "Oba dni",
    bothDaysDesc: "17-18 kwietnia — Pełne doświadczenie",
    bothDaysTag: "POLECAMY",
    fridaySpots: "Miejsca na piątek",
    saturdaySpots: "Miejsca na sobotę",
    spotsLeft: "pozostało",
    full: "BRAK MIEJSC",
    personalInfo: "Dane osobowe",
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "Email",
    phone: "Telefon",
    optional: "opcjonalnie",
    academicInfo: "Informacje o profilu",
    university: "Uczelnia / Firma",
    fieldOfStudy: "Kierunek studiów",
    howDidYouHear: "Skąd wiesz o PPF?",
    selectSource: "Wybierz…",
    sources: ["Media społecznościowe", "Znajomy/a", "Uczelnia", "Wydarzenie ASPOL", "LinkedIn", "Inne"],
    acceptTerms: "Akceptuję regulamin i wyrażam zgodę na przetwarzanie moich danych osobowych w celu rejestracji na wydarzenie.",
    submit: "Potwierdź rejestrację",
    submitting: "Rejestracja…",
    closed: "Zapisy są obecnie zamknięte",
    allSaturdayFull: "Wszystkie miejsca zostały zajęte!",
    fridayFullNote: "Piątek jest pełny — możesz się jeszcze zapisać na samą sobotę.",
    successTitle: "Zgłoszenie wysłane!",
    successSubtitle: "Rejestracja w toku",
    successMessage: "Twój bilet zostanie wysłany po weryfikacji.",
    ticketLabel: "NR BILETU",
    showAtEntrance: "Pokaż to potwierdzenie lub bilet (po otrzymaniu go na email) przy wejściu",
    yourTicket: "Twój typ biletu",
    fridayLabel: "Piątek — 17 kwietnia",
    saturdayLabel: "Sobota — 18 kwietnia",
    bothLabel: "Oba dni — 17-18 kwietnia",
    registerAnother: "Zarejestruj kolejną osobę",
    required: "Wymagane",
    fridayTag: "PT",
    saturdayTag: "SOB",
    secureNote: "Twoje dane są szyfrowane i bezpieczne",
    downloadTicket: "Pobierz bilet (PDF)",
    generatingPdf: "Generowanie…",
    // NEW FIELDS
    citizenshipLabel: "Obywatelstwo",
    citizenshipOptions: ["Polska", "Francja", "Inne"],
    professionalStatusLabel: "Status zawodowy",
    professionalStatusStudent: "Student / Studentka",
    professionalStatusWorking: "Pracuję zawodowo",
    professionalStatusOther: "Inny",
    returnPlansLabel: "Czy planujesz powrót do Polski w przyszłości?",
    returnPlansYes: "Tak",
    returnPlansNo: "Nie",
    returnPlansMaybe: "Może / Jeszcze nie wiem",
    gdprLabel: "Zgoda RODO",
    gdprAccept: "Wyrażam zgodę na przetwarzanie moich danych osobowych wyłącznie w celu rejestracji na Paris Polish Forum oraz komunikacji z tym związanej.",
    attendanceLabel: "Potwierdzam swoją obecność na wydarzeniu i rozumiem, że liczba miejsc jest ograniczona.",
    successPendingNote: "Twoja rejestracja została przyjęta. Poczekaj na weryfikację przez organizatorów i wysłanie biletu (może to zająć do 24-48h).",
  },
};

const PINNED_COUNTRY_CODES = ["PL", "FR"] as CountryCode[];
const SHOW_FRIDAY_FULL_NOTE = false;

function CountryFlag({ code }: { code: string }) {
  const Flag = (FlagIcons as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[code.toUpperCase()];
  if (!Flag) {
    return <span className="inline-flex items-center justify-center w-4 text-[10px] font-semibold text-gray-500">{code.toUpperCase()}</span>;
  }
  return <Flag className="w-4 h-3 rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" aria-hidden="true" />;
}

// ─── Main component ───────────────────────────────────────────
export default function PPFRegistration() {
  const { language } = useLanguage();
  const lang = (language as keyof typeof t) || "en";
  const tr = t[lang] || t.en;

  const countryMetaMap = useMemo(() => {
    const map = new Map<CountryCode, { countryName: string; nationality: string }>();
    for (const country of countriesData) {
      const code = country.cca2 as CountryCode;
      const countryName = country.name?.common || code;
      const nationality = country.demonyms?.eng?.m || country.demonyms?.eng?.f || countryName;
      map.set(code, { countryName, nationality });
    }
    return map;
  }, []);

  const phoneCountryOptions = useMemo(() => {
    return getCountries()
      .map((countryCode) => {
        const meta = countryMetaMap.get(countryCode);
        const label = meta?.countryName || countryCode;
        const dialCode = `+${getCountryCallingCode(countryCode)}`;
        return { countryCode, label, dialCode, isPinned: PINNED_COUNTRY_CODES.includes(countryCode) };
      })
      .sort((a, b) => {
        if (a.countryCode === "PL") return -1;
        if (b.countryCode === "PL") return 1;
        if (a.countryCode === "FR") return -1;
        if (b.countryCode === "FR") return 1;
        return a.label.localeCompare(b.label, "en");
      });
  }, [countryMetaMap]);

  const citizenshipOptions = useMemo(() => {
    const toNationality = (countryCode: CountryCode) => {
      const meta = countryMetaMap.get(countryCode);

      return {
        countryCode,
        label: meta?.nationality || meta?.countryName || countryCode,
        isPinned: PINNED_COUNTRY_CODES.includes(countryCode),
      };
    };

    const pinnedOptions = PINNED_COUNTRY_CODES.map(toNationality);

    const rest = getCountries()
      .filter((countryCode) => !PINNED_COUNTRY_CODES.includes(countryCode))
      .map(toNationality)
      .sort((a, b) => a.label.localeCompare(b.label, "en"));

    return [...pinnedOptions, ...rest];
  }, [countryMetaMap]);

  const [spots, setSpots] = useState<PPFSpotsData | null>(null);
  const [ticketType, setTicketType] = useState<"saturday-only" | "both-days" | "">("");
  const [gdprConsent, setGdprConsent] = useState<"accept" | "reject" | "">("");
  const [attendanceConfirmed, setAttendanceConfirmed] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState("+48");
  const [phoneCountryQuery, setPhoneCountryQuery] = useState("");
  const [isPhoneCountryOpen, setIsPhoneCountryOpen] = useState(false);
  const [activePhoneCountryIndex, setActivePhoneCountryIndex] = useState(0);
  const [selectedCitizenship, setSelectedCitizenship] = useState("");
  const [citizenshipQuery, setCitizenshipQuery] = useState("");
  const [isCitizenshipOpen, setIsCitizenshipOpen] = useState(false);
  const [activeCitizenshipIndex, setActiveCitizenshipIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<PPFRegistrationState | null>(null);
  const [mounted, setMounted] = useState(false);
  const formStartRef = useRef<number>(0);
  const phoneCountryDropdownRef = useRef<HTMLDivElement>(null);
  const citizenshipDropdownRef = useRef<HTMLDivElement>(null);

  const noResultsLabel = lang === "pl" ? "Brak wyników" : lang === "fr" ? "Aucun résultat" : "No results";
  const pinnedLabel = lang === "pl" ? "Wyróżnione" : lang === "fr" ? "Épinglés" : "Pinned";
  const allCountriesLabel = lang === "pl" ? "Wszystkie kraje" : lang === "fr" ? "Tous les pays" : "All countries";

  const filteredPhoneCountryOptions = useMemo(() => {
    const query = phoneCountryQuery.trim().toLowerCase();
    if (!query) return phoneCountryOptions;
    return phoneCountryOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.dialCode.toLowerCase().includes(query) ||
        opt.countryCode.toLowerCase().includes(query)
    );
  }, [phoneCountryOptions, phoneCountryQuery]);

  const filteredCitizenshipOptions = useMemo(() => {
    const query = citizenshipQuery.trim().toLowerCase();
    if (!query) return citizenshipOptions;
    return citizenshipOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.countryCode.toLowerCase().includes(query)
    );
  }, [citizenshipOptions, citizenshipQuery]);

  const filteredPinnedPhoneCountryOptions = useMemo(
    () => filteredPhoneCountryOptions.filter((opt) => opt.isPinned),
    [filteredPhoneCountryOptions]
  );

  const filteredOtherPhoneCountryOptions = useMemo(
    () => filteredPhoneCountryOptions.filter((opt) => !opt.isPinned),
    [filteredPhoneCountryOptions]
  );

  const filteredPinnedCitizenshipOptions = useMemo(
    () => filteredCitizenshipOptions.filter((opt) => opt.isPinned),
    [filteredCitizenshipOptions]
  );

  const filteredOtherCitizenshipOptions = useMemo(
    () => filteredCitizenshipOptions.filter((opt) => !opt.isPinned),
    [filteredCitizenshipOptions]
  );

  const selectedPhoneCountryOption = useMemo(
    () => phoneCountryOptions.find((opt) => opt.dialCode === phoneCountryCode) || phoneCountryOptions[0],
    [phoneCountryOptions, phoneCountryCode]
  );

  const safeActivePhoneCountryIndex = useMemo(
    () => Math.min(activePhoneCountryIndex, Math.max(0, filteredPhoneCountryOptions.length - 1)),
    [activePhoneCountryIndex, filteredPhoneCountryOptions.length]
  );

  const safeActiveCitizenshipIndex = useMemo(
    () => Math.min(activeCitizenshipIndex, Math.max(0, filteredCitizenshipOptions.length - 1)),
    [activeCitizenshipIndex, filteredCitizenshipOptions.length]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (phoneCountryDropdownRef.current && !phoneCountryDropdownRef.current.contains(target)) {
        setIsPhoneCountryOpen(false);
      }
      if (citizenshipDropdownRef.current && !citizenshipDropdownRef.current.contains(target)) {
        setIsCitizenshipOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    formStartRef.current = Date.now();
  }, []);

  // Use requestAnimationFrame to defer mounted state to avoid sync setState in effect
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const fetchSpots = useCallback(() => {
    fetch("/api/ppf/spots")
      .then((r) => r.json())
      .then((data: PPFSpotsData) => setSpots(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchSpots();
  }, [fetchSpots]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("formStart", String(formStartRef.current));

    const rawPhone = String(formData.get("phone") || "").trim();
    const rawPhoneCode = String(formData.get("phoneCountryCode") || phoneCountryCode).trim();
    // Store phone in a Sheets-safe display format to avoid formula parsing on leading "+".
    formData.set("phone", rawPhone ? `(${rawPhoneCode}) ${rawPhone}` : "");

    const state = await registerForPPF({}, formData);

    setResult(state);
    setIsSubmitting(false);

    if (state.success) {
      fetchSpots();
    }
  };

  const reset = () => {
    setResult(null);
    setTicketType("");
    setGdprConsent("");
    setAttendanceConfirmed(false);
    setPhoneCountryQuery("");
    setIsPhoneCountryOpen(false);
    setActivePhoneCountryIndex(0);
    setSelectedCitizenship("");
    setCitizenshipQuery("");
    setIsCitizenshipOpen(false);
    setActiveCitizenshipIndex(0);
    formStartRef.current = Date.now();
  };

  const handlePhoneCountrySearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isPhoneCountryOpen) {
        setIsPhoneCountryOpen(true);
        setActivePhoneCountryIndex(0);
        return;
      }
      setActivePhoneCountryIndex((prev) => Math.min(prev + 1, filteredPhoneCountryOptions.length - 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isPhoneCountryOpen) {
        setIsPhoneCountryOpen(true);
        setActivePhoneCountryIndex(Math.max(0, filteredPhoneCountryOptions.length - 1));
        return;
      }
      setActivePhoneCountryIndex((prev) => Math.max(prev - 1, 0));
      return;
    }

    if (e.key === "Enter" && isPhoneCountryOpen && filteredPhoneCountryOptions.length > 0) {
      e.preventDefault();
      const selected = filteredPhoneCountryOptions[safeActivePhoneCountryIndex];
      if (selected) {
        setPhoneCountryCode(selected.dialCode);
        setIsPhoneCountryOpen(false);
      }
      return;
    }

    if (e.key === "Escape") {
      setIsPhoneCountryOpen(false);
    }
  };

  const handleCitizenshipSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isCitizenshipOpen) {
        setIsCitizenshipOpen(true);
        setActiveCitizenshipIndex(0);
        return;
      }
      setActiveCitizenshipIndex((prev) => Math.min(prev + 1, filteredCitizenshipOptions.length - 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isCitizenshipOpen) {
        setIsCitizenshipOpen(true);
        setActiveCitizenshipIndex(Math.max(0, filteredCitizenshipOptions.length - 1));
        return;
      }
      setActiveCitizenshipIndex((prev) => Math.max(prev - 1, 0));
      return;
    }

    if (e.key === "Enter" && isCitizenshipOpen && filteredCitizenshipOptions.length > 0) {
      e.preventDefault();
      const selected = filteredCitizenshipOptions[safeActiveCitizenshipIndex];
      if (selected) {
        setSelectedCitizenship(selected.label);
        setIsCitizenshipOpen(false);
      }
      return;
    }

    if (e.key === "Escape") {
      setIsCitizenshipOpen(false);
    }
  };

  // ─── Success view ───────────────────────────────────────────
  if (result?.success && result.ticketId) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-br from-aspol-dark via-aspol-navy to-aspol-dark" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(144, 12, 21, 0.4), transparent 50%), radial-gradient(circle at 80% 20%, rgba(20, 61, 115, 0.4), transparent 50%)" }} />

        <div className={`relative z-10 max-w-md w-full transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Success animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 mb-6 animate-fade-in-up">
              <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 font-heading">{tr.successTitle}</h1>
            <p className="text-white/60">{tr.successSubtitle}</p>
          </div>

          {/* Ticket card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            {/* Ticket header */}
            <div className="px-8 pt-8 pb-6 text-center border-b border-dashed border-white/10 relative">
              <p className="text-[10px] text-white/40 uppercase tracking-[4px] mb-3">{tr.ticketLabel}</p>
              <p className="text-3xl font-mono font-bold text-aspol-red tracking-widest">{result.ticketId}</p>
              <p className="text-sm text-white/50 mt-3">
                {ticketType === "saturday-only" ? tr.saturdayLabel : tr.bothLabel}
              </p>
              {/* Circle cutouts */}
              <div className="absolute -left-3 top-1/2 w-6 h-6 rounded-full bg-aspol-dark" />
              <div className="absolute -right-3 top-1/2 w-6 h-6 rounded-full bg-aspol-dark" />
            </div>

            {/* Ticket body */}
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/20">
                <svg className="w-5 h-5 text-aspol-red shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-white/90 font-medium">{tr.successPendingNote}</p>
              </div>

              <button
                onClick={reset}
                className="w-full mt-4 py-3.5 text-sm font-semibold text-white/70 hover:text-white border border-white/10 hover:border-white/30 rounded-xl transition-all duration-300 hover:bg-white/5"
              >
                {tr.registerAnother}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── Closed / Full state ────────────────────────────────────
  const saturdayFull = spots ? spots.saturday.spotsLeft <= 0 : false;
  const fridayFull = spots ? spots.friday.spotsLeft <= 0 : false;
  const allFull = saturdayFull;
  const isClosed = spots && (!spots.isOpen || allFull);

  // ─── Form view ──────────────────────────────────────────────
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* ── HERO AREA ── */}
      <div className="relative bg-aspol-dark overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-aspol-dark via-aspol-navy/80 to-aspol-dark" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(144, 12, 21, 0.5), transparent 60%), radial-gradient(circle at 70% 80%, rgba(20, 61, 115, 0.5), transparent 60%)" }} />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-20 sm:pb-28 text-center">
          {/* Event badge */}
          <div className={`transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-aspol-red animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white/70 uppercase">
                {tr.dateInfo} &bull; {tr.location}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-heading mb-4">
              <span className="text-white">{tr.title}</span>
              <br />
              <span className="text-aspol-red">{tr.year}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/50 font-medium mb-2">{tr.subtitle}</p>
          </div>

          {/* Description */}
          <div className={`transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto mt-6 leading-relaxed">
              {tr.heroDesc}
            </p>
          </div>

          {/* Scroll indicator */}
          {!isClosed && (
            <div className={`mt-12 transition-all duration-700 delay-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
              <button
                type="button"
                onClick={() => document.getElementById("ppf-form")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors cursor-pointer bg-transparent border-none"
              >
                <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto block" preserveAspectRatio="none">
            <path d="M0 80V40C240 0 480 0 720 40C960 80 1200 80 1440 40V80H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      <div className="bg-gray-50 border-t border-gray-100">
        <PPFAgenda language={lang} />
      </div>

      {/* ── FORM AREA ── */}
      <div id="ppf-form" className="bg-gray-50 relative pb-20 sm:pb-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-4">

          {/* Closed banner */}
          {isClosed && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <p className="text-xl text-gray-500 font-medium">
                {allFull ? tr.allSaturdayFull : tr.closed}
              </p>
            </div>
          )}

          {/* Friday full info banner */}
          {!isClosed && fridayFull && SHOW_FRIDAY_FULL_NOTE && (
            <div className="mb-8 flex items-center gap-3 px-5 py-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm font-medium">
              <svg className="w-5 h-5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {tr.fridayFullNote}
            </div>
          )}

          {/* Form */}
          {!isClosed && (
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Honeypot */}
              <div className="absolute opacity-0 -z-10" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input type="text" name="company" id="company" tabIndex={-1} autoComplete="off" />
              </div>

              {/* ─── TICKET TYPE SECTION ─── */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-aspol-dark mb-1 font-heading">{tr.ticketSelect}</h2>
                <p className="text-sm text-gray-400 mb-6">{tr.required}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Saturday only */}
                  <label
                    className={`group relative flex flex-col p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      ticketType === "saturday-only"
                        ? "border-aspol-red bg-aspol-red/5 shadow-md shadow-aspol-red/5"
                        : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm"
                    } ${saturdayFull ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <input
                      type="radio"
                      name="ticketType"
                      value="saturday-only"
                      checked={ticketType === "saturday-only"}
                      onChange={() => !saturdayFull && setTicketType("saturday-only")}
                      disabled={!!saturdayFull}
                      className="absolute opacity-0"
                    />
                    {/* Radio indicator */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                        ticketType === "saturday-only" ? "border-aspol-red bg-aspol-red" : "border-gray-300"
                      }`}>
                        {ticketType === "saturday-only" && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                        ticketType === "saturday-only" ? "bg-aspol-red text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        {tr.saturdayTag}
                      </div>
                      <span className="font-semibold text-aspol-dark">{tr.saturdayOnly}</span>
                    </div>
                    <span className="text-sm text-gray-500 pl-13">{tr.saturdayOnlyDesc}</span>
                  </label>

                  {/* Both days */}
                  <label
                    className={`group relative flex flex-col p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      ticketType === "both-days"
                        ? "border-aspol-red bg-aspol-red/5 shadow-md shadow-aspol-red/5"
                        : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm"
                    } ${fridayFull ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <input
                      type="radio"
                      name="ticketType"
                      value="both-days"
                      checked={ticketType === "both-days"}
                      onChange={() => !fridayFull && setTicketType("both-days")}
                      disabled={fridayFull}
                      className="absolute opacity-0"
                    />
                    {/* Recommended badge */}
                    {!fridayFull && (
                      <div className="absolute -top-2.5 left-5">
                        <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-aspol-red text-white shadow-sm">
                          {tr.bothDaysTag}
                        </span>
                      </div>
                    )}
                    {/* Radio indicator */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                        ticketType === "both-days" ? "border-aspol-red bg-aspol-red" : "border-gray-300"
                      }`}>
                        {ticketType === "both-days" && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors leading-none ${
                        ticketType === "both-days" ? "bg-aspol-red text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        {tr.fridayTag}+{tr.saturdayTag}
                      </div>
                      <span className="font-semibold text-aspol-dark">{tr.bothDays}</span>
                    </div>
                    <span className="text-sm text-gray-500 pl-13">{tr.bothDaysDesc}</span>
                  </label>
                </div>
                {result?.errors?.ticketType && (
                  <p className="text-red-500 text-sm mt-3">{result.errors.ticketType[0]}</p>
                )}
              </div>

              {/* ─── PERSONAL INFO SECTION ─── */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-aspol-dark mb-6 font-heading">{tr.personalInfo}</h2>

                <div className="space-y-5">
                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
                        {tr.firstName} <span className="text-aspol-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        minLength={2}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-aspol-red/20 focus:border-aspol-red transition-all text-gray-900 placeholder:text-gray-300"
                      />
                      {result?.errors?.firstName && (
                        <p className="text-red-500 text-sm mt-1.5">{result.errors.firstName[0]}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
                        {tr.lastName} <span className="text-aspol-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        minLength={2}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-aspol-red/20 focus:border-aspol-red transition-all text-gray-900 placeholder:text-gray-300"
                      />
                      {result?.errors?.lastName && (
                        <p className="text-red-500 text-sm mt-1.5">{result.errors.lastName[0]}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      {tr.email} <span className="text-aspol-red">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-aspol-red/20 focus:border-aspol-red transition-all text-gray-900 placeholder:text-gray-300"
                    />
                    {result?.errors?.email && (
                      <p className="text-red-500 text-sm mt-1.5">{result.errors.email[0]}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      {tr.phone} <span className="text-gray-400 font-normal text-xs">({tr.optional})</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-3">
                      <div className="space-y-2" ref={phoneCountryDropdownRef}>
                        <input
                          type="text"
                          value={phoneCountryQuery}
                          onChange={(e) => {
                            setPhoneCountryQuery(e.target.value);
                            setIsPhoneCountryOpen(true);
                            setActivePhoneCountryIndex(0);
                          }}
                          onKeyDown={handlePhoneCountrySearchKeyDown}
                          placeholder={lang === "pl" ? "Szukaj kraju lub +kod" : lang === "fr" ? "Rechercher pays ou +indicatif" : "Search country or +code"}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-aspol-red/20 focus:border-aspol-red text-sm text-gray-800 placeholder:text-gray-400"
                        />
                        <input type="hidden" name="phoneCountryCode" value={phoneCountryCode} />
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              setIsPhoneCountryOpen((prev) => !prev);
                              setActivePhoneCountryIndex(0);
                            }}
                            className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:ring-2 focus:ring-aspol-red/20 focus:border-aspol-red transition-all text-gray-900 text-left flex items-center justify-between"
                          >
                            <span className="truncate inline-flex items-center gap-2">
                              <CountryFlag code={selectedPhoneCountryOption?.countryCode || "PL"} />
                              <span>{selectedPhoneCountryOption?.label} ({phoneCountryCode})</span>
                            </span>
                            <svg className={`w-4 h-4 text-gray-500 transition-transform ${isPhoneCountryOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25L12 15.75 4.5 8.25" />
                            </svg>
                          </button>
                          {isPhoneCountryOpen && (
                            <div className="absolute z-30 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl max-h-72 overflow-y-auto">
                              {filteredPhoneCountryOptions.length === 0 ? (
                                <div className="px-3 py-2 text-sm text-gray-500">
                                  {noResultsLabel}
                                </div>
                              ) : (
                                <>
                                  {filteredPinnedPhoneCountryOptions.length > 0 && (
                                    <>
                                      <div className="px-3 py-2 text-[11px] font-bold tracking-wide uppercase text-gray-400 bg-gray-50 sticky top-0">
                                        {pinnedLabel}
                                      </div>
                                      {filteredPinnedPhoneCountryOptions.map((opt) => {
                                        const optionIndex = filteredPhoneCountryOptions.findIndex(
                                          (candidate) => candidate.countryCode === opt.countryCode
                                        );
                                        return (
                                          <button
                                            key={`${opt.countryCode}-${opt.dialCode}`}
                                            type="button"
                                            onMouseEnter={() => setActivePhoneCountryIndex(optionIndex)}
                                            onClick={() => {
                                              setPhoneCountryCode(opt.dialCode);
                                              setIsPhoneCountryOpen(false);
                                            }}
                                            className={`w-full px-3 py-2 text-left text-sm transition-colors inline-flex items-center gap-2 ${phoneCountryCode === opt.dialCode ? "text-aspol-red font-semibold" : "text-gray-700"} ${safeActivePhoneCountryIndex === optionIndex ? "bg-aspol-red/10" : "hover:bg-gray-50"}`}
                                          >
                                            <CountryFlag code={opt.countryCode} />
                                            <span>{opt.label} ({opt.dialCode})</span>
                                          </button>
                                        );
                                      })}
                                    </>
                                  )}

                                  {filteredOtherPhoneCountryOptions.length > 0 && (
                                    <>
                                      <div className="px-3 py-2 text-[11px] font-bold tracking-wide uppercase text-gray-400 bg-gray-50 sticky top-0">
                                        {allCountriesLabel}
                                      </div>
                                      {filteredOtherPhoneCountryOptions.map((opt) => {
                                        const optionIndex = filteredPhoneCountryOptions.findIndex(
                                          (candidate) => candidate.countryCode === opt.countryCode
                                        );
                                        return (
                                          <button
                                            key={`${opt.countryCode}-${opt.dialCode}`}
                                            type="button"
                                            onMouseEnter={() => setActivePhoneCountryIndex(optionIndex)}
                                            onClick={() => {
                                              setPhoneCountryCode(opt.dialCode);
                                              setIsPhoneCountryOpen(false);
                                            }}
                                            className={`w-full px-3 py-2 text-left text-sm transition-colors inline-flex items-center gap-2 ${phoneCountryCode === opt.dialCode ? "text-aspol-red font-semibold" : "text-gray-700"} ${safeActivePhoneCountryIndex === optionIndex ? "bg-aspol-red/10" : "hover:bg-gray-50"}`}
                                          >
                                            <CountryFlag code={opt.countryCode} />
                                            <span>{opt.label} ({opt.dialCode})</span>
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
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-aspol-red/20 focus:border-aspol-red transition-all text-gray-900 placeholder:text-gray-300"
                        placeholder="123 456 789"
                      />
                    </div>
                  </div>

                  {/* Citizenship */}
                  <div>
                    <label htmlFor="citizenshipSearch" className="block text-sm font-medium text-gray-700 mb-1.5">
                      {tr.citizenshipLabel} <span className="text-aspol-red">*</span>
                    </label>
                    <div ref={citizenshipDropdownRef}>
                      <input
                        id="citizenshipSearch"
                        type="text"
                        value={citizenshipQuery}
                        onChange={(e) => {
                          setCitizenshipQuery(e.target.value);
                          setIsCitizenshipOpen(true);
                          setActiveCitizenshipIndex(0);
                        }}
                        onKeyDown={handleCitizenshipSearchKeyDown}
                        placeholder={lang === "pl" ? "Szukaj obywatelstwa" : lang === "fr" ? "Rechercher citoyenneté" : "Search citizenship"}
                        className="w-full px-3 py-2 mb-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-aspol-red/20 focus:border-aspol-red text-sm text-gray-800 placeholder:text-gray-400"
                      />
                      <input type="hidden" name="citizenship" value={selectedCitizenship} />
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCitizenshipOpen((prev) => !prev);
                            setActiveCitizenshipIndex(0);
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-white focus:ring-2 focus:ring-aspol-red/20 focus:border-aspol-red transition-all text-gray-900 text-left flex items-center justify-between"
                        >
                          <span className={`truncate inline-flex items-center gap-2 ${selectedCitizenship ? "text-gray-900" : "text-gray-400"}`}>
                            {selectedCitizenship && (
                              <CountryFlag
                                code={
                                  citizenshipOptions.find((opt) => opt.label === selectedCitizenship)?.countryCode || "PL"
                                }
                              />
                            )}
                            <span>{selectedCitizenship || tr.selectSource}</span>
                          </span>
                          <svg className={`w-4 h-4 text-gray-500 transition-transform ${isCitizenshipOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25L12 15.75 4.5 8.25" />
                          </svg>
                        </button>
                        {isCitizenshipOpen && (
                          <div className="absolute z-30 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl max-h-72 overflow-y-auto">
                            {filteredCitizenshipOptions.length === 0 ? (
                              <div className="px-3 py-2 text-sm text-gray-500">
                                {noResultsLabel}
                              </div>
                            ) : (
                              <>
                                {filteredPinnedCitizenshipOptions.length > 0 && (
                                  <>
                                    <div className="px-3 py-2 text-[11px] font-bold tracking-wide uppercase text-gray-400 bg-gray-50 sticky top-0">
                                      {pinnedLabel}
                                    </div>
                                    {filteredPinnedCitizenshipOptions.map((opt) => {
                                      const optionIndex = filteredCitizenshipOptions.findIndex(
                                        (candidate) => candidate.countryCode === opt.countryCode
                                      );
                                      return (
                                        <button
                                          key={opt.countryCode}
                                          type="button"
                                          onMouseEnter={() => setActiveCitizenshipIndex(optionIndex)}
                                          onClick={() => {
                                            setSelectedCitizenship(opt.label);
                                            setIsCitizenshipOpen(false);
                                          }}
                                          className={`w-full px-3 py-2 text-left text-sm transition-colors inline-flex items-center gap-2 ${selectedCitizenship === opt.label ? "text-aspol-red font-semibold" : "text-gray-700"} ${safeActiveCitizenshipIndex === optionIndex ? "bg-aspol-red/10" : "hover:bg-gray-50"}`}
                                        >
                                          <CountryFlag code={opt.countryCode} />
                                          <span>{opt.label}</span>
                                        </button>
                                      );
                                    })}
                                  </>
                                )}

                                {filteredOtherCitizenshipOptions.length > 0 && (
                                  <>
                                    <div className="px-3 py-2 text-[11px] font-bold tracking-wide uppercase text-gray-400 bg-gray-50 sticky top-0">
                                      {allCountriesLabel}
                                    </div>
                                    {filteredOtherCitizenshipOptions.map((opt) => {
                                      const optionIndex = filteredCitizenshipOptions.findIndex(
                                        (candidate) => candidate.countryCode === opt.countryCode
                                      );
                                      return (
                                        <button
                                          key={opt.countryCode}
                                          type="button"
                                          onMouseEnter={() => setActiveCitizenshipIndex(optionIndex)}
                                          onClick={() => {
                                            setSelectedCitizenship(opt.label);
                                            setIsCitizenshipOpen(false);
                                          }}
                                          className={`w-full px-3 py-2 text-left text-sm transition-colors inline-flex items-center gap-2 ${selectedCitizenship === opt.label ? "text-aspol-red font-semibold" : "text-gray-700"} ${safeActiveCitizenshipIndex === optionIndex ? "bg-aspol-red/10" : "hover:bg-gray-50"}`}
                                        >
                                          <CountryFlag code={opt.countryCode} />
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
                    {result?.errors?.citizenship && (
                      <p className="text-red-500 text-sm mt-1.5">{result.errors.citizenship[0]}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* ─── ACADEMIC INFO SECTION ─── */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-aspol-dark mb-6 font-heading">{tr.academicInfo}</h2>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1.5">
                        {tr.university} <span className="text-gray-400 font-normal text-xs">({tr.optional})</span>
                      </label>
                      <input
                        type="text"
                        id="university"
                        name="university"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-aspol-red/20 focus:border-aspol-red transition-all text-gray-900 placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-1.5">
                        {tr.fieldOfStudy} <span className="text-gray-400 font-normal text-xs">({tr.optional})</span>
                      </label>
                      <input
                        type="text"
                        id="fieldOfStudy"
                        name="fieldOfStudy"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-aspol-red/20 focus:border-aspol-red transition-all text-gray-900 placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  {/* How did you hear */}
                  <div>
                    <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-700 mb-1.5">
                      {tr.howDidYouHear}
                    </label>
                    <select
                      id="howDidYouHear"
                      name="howDidYouHear"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-aspol-red/20 focus:border-aspol-red transition-all text-gray-900 appearance-none"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.75rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.25em" }}
                    >
                      <option value="">{tr.selectSource}</option>
                      {tr.sources.map((src) => (
                        <option key={src} value={src}>{src}</option>
                      ))}
                    </select>
                  </div>

                  {/* Professional Status */}
                  <div className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      {tr.professionalStatusLabel} <span className="text-aspol-red">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "student", label: tr.professionalStatusStudent },
                        { id: "working", label: tr.professionalStatusWorking },
                        { id: "other", label: tr.professionalStatusOther },
                      ].map((opt) => (
                        <label
                          key={opt.id}
                          className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-aspol-red/30 hover:bg-aspol-red/5 cursor-pointer transition-all has-[:checked]:border-aspol-red has-[:checked]:bg-aspol-red/5"
                        >
                          <input
                            type="radio"
                            name="professionalStatus"
                            value={opt.id}
                            required
                            className="w-4 h-4 text-aspol-red focus:ring-aspol-red/30 cursor-pointer"
                          />
                          <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Return Plans */}
                  <div className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      {tr.returnPlansLabel} <span className="text-aspol-red">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "yes", label: tr.returnPlansYes },
                        { id: "no", label: tr.returnPlansNo },
                        { id: "maybe", label: tr.returnPlansMaybe },
                      ].map((opt) => (
                        <label
                          key={opt.id}
                          className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-aspol-red/30 hover:bg-aspol-red/5 cursor-pointer transition-all has-[:checked]:border-aspol-red has-[:checked]:bg-aspol-red/5"
                        >
                          <input
                            type="radio"
                            name="returnPlans"
                            value={opt.id}
                            required
                            className="w-4 h-4 text-aspol-red focus:ring-aspol-red/30 cursor-pointer"
                          />
                          <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── TERMS & SUBMIT ─── */}
              <div className="space-y-6">
                {/* GDPR Consent */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-4">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{tr.gdprLabel}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{tr.gdprAccept}</p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="gdprConsent"
                        value="accept"
                        checked={gdprConsent === "accept"}
                        onChange={() => setGdprConsent("accept")}
                        required
                        className="w-5 h-5 text-aspol-red focus:ring-aspol-red/30 cursor-pointer"
                      />
                      <span className={`text-sm font-semibold transition-colors ${gdprConsent === "accept" ? "text-aspol-red" : "text-gray-400 group-hover:text-gray-600"}`}>
                        {tr.successTitle ? (lang === "pl" ? "Akceptuję" : lang === "fr" ? "J'accepte" : "I accept") : "Accept"}
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="gdprConsent"
                        value="reject"
                        checked={gdprConsent === "reject"}
                        onChange={() => setGdprConsent("reject")}
                        className="w-5 h-5 text-gray-300 focus:ring-gray-200 cursor-pointer"
                      />
                      <span className={`text-sm font-medium transition-colors ${gdprConsent === "reject" ? "text-gray-600" : "text-gray-400 group-hover:text-gray-600"}`}>
                        {lang === "pl" ? "Nie akceptuję" : lang === "fr" ? "Je n'accepte pas" : "I do not accept"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Attendance Confirmation */}
                <div className="flex items-start gap-4 px-2">
                  <div className="relative mt-1">
                    <input
                      type="checkbox"
                      id="attendanceConfirmed"
                      name="attendanceConfirmed"
                      checked={attendanceConfirmed}
                      onChange={(e) => setAttendanceConfirmed(e.target.checked)}
                      required
                      className="peer w-6 h-6 rounded-lg border-gray-300 text-aspol-red focus:ring-aspol-red/30 cursor-pointer transition-all"
                    />
                  </div>
                  <label htmlFor="attendanceConfirmed" className="text-sm font-medium text-gray-600 leading-relaxed cursor-pointer select-none">
                    {tr.attendanceLabel} <span className="text-aspol-red">*</span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || gdprConsent !== "accept" || !attendanceConfirmed || !ticketType}
                  className="w-full py-4 bg-aspol-red text-white font-bold rounded-xl hover:bg-red-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed text-lg shadow-lg shadow-aspol-red/20 hover:shadow-xl hover:shadow-aspol-red/30 active:scale-[0.99] relative overflow-hidden group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {tr.submitting}
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10">{tr.submit}</span>
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </>
                  )}
                </button>

                {/* Security note */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  {tr.secureNote}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
