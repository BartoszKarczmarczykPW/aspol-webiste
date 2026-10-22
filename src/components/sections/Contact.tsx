"use client";

import { useRef, useState, useActionState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { sendContactEmail } from "@/app/(website)/actions/contact";
import { trackEvent } from "@/lib/analytics";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import { PHOTOS } from "@/lib/photos";

const VALIDATION_MESSAGES = {
  en: {
    nameRequired: "Name is required",
    nameMin: "Name must be at least 2 characters",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    messageRequired: "Message is required",
    messageMin: "Message must be at least 10 characters",
    messageMax: "Message must not exceed 1000 characters",
  },
  fr: {
    nameRequired: "Le nom est requis",
    nameMin: "Le nom doit contenir au moins 2 caractères",
    emailRequired: "L'email est requis",
    emailInvalid: "Veuillez entrer une adresse email valide",
    messageRequired: "Le message est requis",
    messageMin: "Le message doit contenir au moins 10 caractères",
    messageMax: "Le message ne doit pas dépasser 1000 caractères",
  },
  pl: {
    nameRequired: "Imię jest wymagane",
    nameMin: "Imię musi mieć co najmniej 2 znaki",
    emailRequired: "Email jest wymagany",
    emailInvalid: "Proszę podać prawidłowy adres email",
    messageRequired: "Wiadomość jest wymagana",
    messageMin: "Wiadomość musi mieć co najmniej 10 znaków",
    messageMax: "Wiadomość nie może przekraczać 1000 znaków",
  },
} as const;

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const { settings, home, text, image, joinUrl } = useSiteContent();
  const joinImg = image(home.joinPanelImage, 2000);
  const email = settings.contactEmail || "office@aspol.fr";
  const formStartRef = useRef<number>(Date.now());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [trapField, setTrapField] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  useScrollAnimation(sectionRef);

  const validateField = (field: string, value: string) => {
    let error = "";
    const msg = VALIDATION_MESSAGES[language] || VALIDATION_MESSAGES.en;

    if (field === "name") {
      if (!value.trim()) {
        error = msg.nameRequired;
      } else if (value.trim().length < 2) {
        error = msg.nameMin;
      }
    }

    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = msg.emailRequired;
      } else if (!emailRegex.test(value)) {
        error = msg.emailInvalid;
      }
    }

    if (field === "message") {
      if (!value.trim()) {
        error = msg.messageRequired;
      } else if (value.trim().length < 10) {
        error = msg.messageMin;
      } else if (value.trim().length > 1000) {
        error = msg.messageMax;
      }
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    const field = name as keyof typeof formData;
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field]);
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setFormError(null);

    try {
      // Create FormData for the server action
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("message", formData.message);
      data.append("company", trapField);
      data.append("formStart", String(formStartRef.current));

      const result = await sendContactEmail({}, data);

      if (result.success) {
        trackEvent("contact_submit_success", { language });
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
        setTouched({ name: false, email: false, message: false });
        setTrapField("");
        formStartRef.current = Date.now();

        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        trackEvent("contact_submit_error", { reason: "validation_or_server" });
        setFormError(result.errors?._form?.[0] || "Please try again later.");
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch {
      trackEvent("contact_submit_error", { reason: "exception" });
      setFormError("Please try again later.");
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const field = name as keyof typeof formData;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation only if field was touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({
        ...errors,
        [field]: error,
      });
    } else if (errors[field]) {
      // Clear error when user starts typing
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-2xl bg-white px-5 py-4 text-base text-aspol-dark ring-1 transition-shadow duration-300 placeholder:text-aspol-ink-soft/60 touch-manipulation focus:outline-none focus:ring-2 ${
      hasError ? "ring-aspol-red focus:ring-aspol-red" : "ring-aspol-line focus:ring-aspol-blue"
    } ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`;
  const labelClass = "mb-2 block font-display text-sm font-bold text-aspol-dark";

  const infoRowIcon = "grid size-12 shrink-0 place-items-center rounded-full bg-aspol-mist text-aspol-navy";

  const socials = [
    { key: "facebook", label: `Facebook: ${settings.facebookHandle || "@aspologne"}`, aria: "Facebook - ASPOL", href: settings.facebookUrl || "https://www.facebook.com/aspologne" },
    { key: "instagram", label: `Instagram: ${settings.instagramHandle || "@aspolska"}`, aria: "Instagram - ASPOL", href: settings.instagramUrl || "https://www.instagram.com/aspolska/" },
    { key: "linkedin", label: `LinkedIn: ${settings.linkedinHandle || "ASPOL"}`, aria: "LinkedIn - ASPOL", href: settings.linkedinUrl || "https://www.linkedin.com/company/aspolscpo/" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-pad dome-gap relative overflow-hidden bg-aspol-white text-aspol-dark"
      aria-label="Contact us"
    >
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal as="h2" className="display display-lg lg:col-span-7" text={text(home.contactTitle, t.contact.title)} />
          <p className="max-w-[48ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg lg:col-span-5">
            {text(home.contactSubtitle, t.contact.subtitle)}
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* Contact info */}
          <div className="lg:col-span-5">
            <h3 className="display display-sm mb-8">{t.contact.info.title}</h3>
            <ul className="space-y-7">
              <li className="flex items-start gap-4">
                <span className={infoRowIcon} aria-hidden="true">
                  <svg className="size-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </span>
                <div>
                  <p className="font-display text-sm font-bold">{t.contact.info.email}</p>
                  <a href={`mailto:${email}`} className="text-lg text-aspol-ink-soft underline-offset-4 transition-colors hover:text-aspol-blue hover:underline">
                    {email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className={infoRowIcon} aria-hidden="true">
                  <svg className="size-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </span>
                <div>
                  <p className="font-display text-sm font-bold">{t.contact.info.location}</p>
                  <p className="text-lg text-aspol-ink-soft">{text(settings.contactLocation, t.contact.info.locationValue)}</p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className={infoRowIcon} aria-hidden="true">
                  <svg className="size-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                <div>
                  <p className="font-display text-sm font-bold">{t.contact.info.social}</p>
                  <div className="mt-1 flex flex-col gap-1">
                    {socials.map((social) => (
                      <a
                        key={social.key}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("social_click", { platform: social.key, source: "contact" })}
                        aria-label={social.aria}
                        className="group inline-flex items-center gap-2 text-lg text-aspol-ink-soft transition-colors hover:text-aspol-blue"
                      >
                        <span className="underline-offset-4 group-hover:underline">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact form */}
          <div className="rounded-[2rem] bg-aspol-mist p-6 sm:p-10 lg:col-span-7">
            {submitStatus === "success" && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl bg-aspol-dark p-4 text-white" role="status" aria-live="polite" aria-atomic="true">
                <svg className="mt-0.5 size-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold">{language === "fr" ? "Message envoyé avec succès !" : language === "pl" ? "Wiadomość wysłana pomyślnie!" : "Message sent successfully!"}</p>
                  <p className="mt-1 text-sm text-white/80">{language === "fr" ? "Nous vous répondrons dès que possible." : language === "pl" ? "Odpowiemy najszybciej jak to możliwe." : "We'll get back to you as soon as possible."}</p>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl bg-aspol-red p-4 text-white" role="alert" aria-live="assertive" aria-atomic="true">
                <svg className="mt-0.5 size-5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold">{language === "fr" ? "Une erreur est survenue" : language === "pl" ? "Coś poszło nie tak" : "Something went wrong"}</p>
                  <p className="mt-1 text-sm text-white/90">{formError || (language === "fr" ? "Veuillez réessayer plus tard." : language === "pl" ? "Spróbuj ponownie później." : "Please try again later.")}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={trapField}
                  onChange={(e) => setTrapField(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="name" className={labelClass}>{t.contact.form.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  minLength={2}
                  maxLength={120}
                  autoComplete="name"
                  aria-label={t.contact.form.name}
                  aria-required="true"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={fieldClass(!!errors.name)}
                  placeholder={t.contact.form.namePlaceholder}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm font-semibold text-aspol-red" role="alert">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>{t.contact.form.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  maxLength={254}
                  inputMode="email"
                  autoComplete="email"
                  aria-label={t.contact.form.email}
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass(!!errors.email)}
                  placeholder={t.contact.form.emailPlaceholder}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm font-semibold text-aspol-red" role="alert">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>{t.contact.form.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  rows={6}
                  minLength={10}
                  maxLength={1000}
                  autoComplete="off"
                  aria-label={t.contact.form.message}
                  aria-required="true"
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${fieldClass(!!errors.message)} resize-none`}
                  placeholder={t.contact.form.messagePlaceholder}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm font-semibold text-aspol-red" role="alert">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="pill pill--red w-full justify-between disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>
                  {isSubmitting
                    ? language === "fr"
                      ? "Envoi en cours..."
                      : language === "pl"
                        ? "Wysyłanie..."
                        : "Sending..."
                    : t.contact.form.submit}
                </span>
                <span className="pill__chip" aria-hidden="true">
                  {isSubmitting ? (
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
              <p className="text-center text-xs text-aspol-ink-soft">
                {language === "fr" ? "Protégé contre le spam automatisé." : language === "pl" ? "Chronione przed automatycznym spamem." : "Protected against automated spam."}
              </p>
            </form>
          </div>
        </div>

        {/* Join panel */}
        <div id="join" className="on-dark photo-card relative mt-8 overflow-hidden rounded-[2rem] bg-aspol-navy text-white sm:mt-12">
          <Image
            src={joinImg?.src ?? PHOTOS.sunsetFriends.src}
            alt=""
            fill
            sizes="(min-width: 1408px) 1312px, 100vw"
            loading="lazy"
            className="object-cover opacity-40 mix-blend-multiply"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-start justify-between gap-8 p-7 sm:p-12 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <h3 className="display display-md">{text(home.joinPanelTitle, t.contact.join.title)}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">{text(home.joinPanelDescription, t.contact.join.description)}</p>
            </div>
            <Pill
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("join_click", { source: "contact" })}
            >
              {text(home.joinPanelButton, t.contact.join.button)}
            </Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
