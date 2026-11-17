"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, CalendarDays, Clock, Download, GraduationCap, HeartHandshake, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import type { SanityInitiativesPage, SanityResource, SanityWebinar } from "@/lib/sanity";
import { PHOTOS, photoAlt } from "@/lib/photos";
import PageHero from "@/components/layout/PageHero";
import Pill, { PillFace } from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";
import Events from "@/components/sections/Events";
import PdfThumbnails from "@/components/resources/PdfThumbnails";
import GuideByline from "@/components/resources/GuideByline";
import { useInView } from "@/hooks/useInView";
import { universities } from "@/data/universities";
import { MENTEE_FORM_URL, MENTOR_FORM_URL } from "@/lib/mentoring";

type Lang = "en" | "fr" | "pl";

/** Built-in copy, as supplied by the board ("Mentoring & Resources" brief). */
const CONTENT = {
  en: {
    heroTitle: "Our Initiatives",
    heroSubtitle: "Discover the programs and activities that bring our community together",
    heroMentoring: "Mentoring Program",
    heroResources: "Guides",
    mentoringTitle: "Mentoring Program",
    mentoringBody:
      "Our program supports Polish high school and university students aspiring to study in France. We connect applicants with Polish students currently studying at French universities, who offer full guidance through university applications, travel preparations and the first steps after arriving in France.",
    benefitsTitle: "Through Mentoring Program you will access:",
    benefits: [
      "Personal Peer-to-peer Guidance",
      "Clarity on the Application Process",
      "Support with Administrative Paperwork",
      "Insider tips & Advice",
    ],
    webinarsIntro: "Want to learn more about the Mentorship Program? Join our free webinars:",
    webinarsEmpty: "No webinars are scheduled right now. New dates will appear here soon.",
    webinarJoin: "Register",
    webinarCalendar: "Add to Google Calendar",
    minutes: "min",
    joinTitle: "Join Mentoring Program",
    joinIntro: "Pick your role and fill in a short form. We'll get back to you with the next steps.",
    mentorTitle: "Become a Mentor",
    mentorBody: "Studying at a French university? Share your experience and help the next Polish students find their way.",
    menteeTitle: "Become a Mentee",
    menteeBody: "Planning to study in France? Get support from a student who has already been through it.",
    applyCta: "Fill in the form",
    resourcesTitle: "Guides",
    resourcesIntro:
      "To help you make the most of your stay in France, we have prepared special resources with all the essential information you need to know about everyday life and studying in France.",
    resourcesEmpty: "New guides are on their way.",
    author: "Author",
    download: "Download PDF",
    read: "Read the guide",
    pagePreview: "Page preview",
  },
  pl: {
    heroTitle: "Nasze Inicjatywy",
    heroSubtitle: "Poznaj programy i działania, które łączą naszą społeczność",
    heroMentoring: "Program Mentoringowy",
    heroResources: "Poradniki",
    mentoringTitle: "Program Mentoringowy",
    mentoringBody:
      "Nasz program wspiera polskich licealistów i studentów planujących studia we Francji. Łączymy aplikantów z polskimi studentami francuskich uczelni, którzy oferują pełne wsparcie na etapie rekrutacji, przygotowań do wyjazdu oraz pierwszych kroków po przyjeździe do Francji.",
    benefitsTitle: "Dzięki udziałowi w Programie Mentoringowym zyskasz:",
    benefits: [
      "Osobiste wsparcie rówieśnicze (1 na 1)",
      "Wskazówki o procesie rekrutacji",
      "Pomoc w sprawach administracyjnych",
      "Praktyczne wskazówki i porady z pierwszej ręki",
    ],
    webinarsIntro: "Chcesz dowiedzieć się więcej o Programie Mentoringowym? Weź udział w naszych darmowych webinarach:",
    webinarsEmpty: "Obecnie nie ma zaplanowanych webinarów. Nowe terminy pojawią się tu wkrótce.",
    webinarJoin: "Zapisz się",
    webinarCalendar: "Dodaj do Kalendarza Google",
    minutes: "min",
    joinTitle: "Dołącz do Programu Mentoringowego",
    joinIntro: "Wybierz swoją rolę i wypełnij krótki formularz. Odezwiemy się z kolejnymi krokami.",
    mentorTitle: "Zostań Mentorem/Mentorką",
    mentorBody: "Studiujesz na francuskiej uczelni? Podziel się doświadczeniem i pomóż kolejnym polskim studentom.",
    menteeTitle: "Zostań Mentee",
    menteeBody: "Planujesz studia we Francji? Otrzymaj wsparcie studenta, który przeszedł już tę drogę.",
    applyCta: "Wypełnij formularz",
    resourcesTitle: "Poradniki",
    resourcesIntro:
      "Aby ułatwić Wam pobyt we Francji, przygotowaliśmy specjalne materiały zawierające najważniejsze informacje o codziennym życiu i studiowaniu we Francji.",
    resourcesEmpty: "Nowe poradniki są w przygotowaniu.",
    author: "Autor",
    download: "Pobierz PDF",
    read: "Czytaj poradnik",
    pagePreview: "Podgląd strony",
  },
  fr: {
    heroTitle: "Nos Initiatives",
    heroSubtitle: "Découvrez les programmes et activités qui rassemblent notre communauté",
    heroMentoring: "Programme de Mentorat",
    heroResources: "Guides",
    mentoringTitle: "Programme de Mentorat",
    mentoringBody:
      "Notre programme accompagne les lycéens et étudiants polonais qui souhaitent étudier en France. Nous mettons en relation les candidats avec des étudiants polonais déjà inscrits dans des universités françaises, qui leur offrent un accompagnement complet : de la candidature aux premières démarches sur place, en passant par la préparation du départ.",
    benefitsTitle: "Grâce au Programme de Mentorat, vous bénéficierez de :",
    benefits: [
      "Un accompagnement individuel et personnalisé (1 sur 1)",
      "Des conseils clairs sur le processus de candidature",
      "Une aide pour les démarches administratives",
      "Des conseils pratiques et des retours d'expérience du terrain",
    ],
    webinarsIntro: "Vous souhaitez en savoir plus sur le programme de mentorat ? Participez à nos webinars gratuits :",
    webinarsEmpty: "Aucun webinar n'est prévu pour le moment. Les prochaines dates apparaîtront ici.",
    webinarJoin: "S'inscrire",
    webinarCalendar: "Ajouter à Google Agenda",
    minutes: "min",
    joinTitle: "Rejoindre notre Programme Mentoring",
    joinIntro: "Choisissez votre rôle et remplissez un court formulaire. Nous reviendrons vers vous avec les prochaines étapes.",
    mentorTitle: "Devenez Mentor",
    mentorBody: "Vous étudiez dans une université française ? Partagez votre expérience et aidez les prochains étudiants polonais.",
    menteeTitle: "Devenez Mentee",
    menteeBody: "Vous envisagez d'étudier en France ? Bénéficiez du soutien d'un étudiant qui est déjà passé par là.",
    applyCta: "Remplir le formulaire",
    resourcesTitle: "Guides",
    resourcesIntro:
      "Pour faciliter votre séjour en France, nous avons préparé des ressources spécialement conçues pour vous, avec toutes les informations essentielles à connaître sur la vie quotidienne et les études en France.",
    resourcesEmpty: "De nouveaux guides arrivent bientôt.",
    author: "Auteur",
    download: "Télécharger le PDF",
    read: "Lire le guide",
    pagePreview: "Aperçu de la page",
  },
} as const;

/**
 * Strings the brief does not spell out. The route stops are the three stages the brief's
 * own sentence names ("applications, travel preparations, first steps after arriving").
 */
const EXTRA = {
  en: {
    heroCta: "Join as a Mentee",
    from: "Poland",
    to: "France",
    stops: ["University applications", "Travel preparations", "First steps in France"],
    alongside: "Your mentor stays with you at every stage.",
    asMentee: "As a Mentee",
    asMentor: "As a Mentor",
    webinarsCta: "Join the programme",
    webinarsTitle: "Webinars",
    unisTitle: "Aiming for a specific school?",
    unisBody: "Read our guides to French universities: admissions, deadlines and what to expect.",
  },
  pl: {
    heroCta: "Dołącz jako Mentee",
    from: "Polska",
    to: "Francja",
    stops: ["Rekrutacja", "Przygotowania do wyjazdu", "Pierwsze kroki we Francji"],
    alongside: "Twój mentor jest z Tobą na każdym etapie.",
    asMentee: "Jako Mentee",
    asMentor: "Jako Mentor",
    webinarsCta: "Dołącz do programu",
    webinarsTitle: "Webinary",
    unisTitle: "Celujesz w konkretną uczelnię?",
    unisBody: "Zajrzyj do naszych przewodników po francuskich uczelniach: rekrutacja, terminy i czego się spodziewać.",
  },
  fr: {
    heroCta: "Rejoindre en tant que Mentee",
    from: "Pologne",
    to: "France",
    stops: ["Candidature", "Préparation du départ", "Premières démarches sur place"],
    alongside: "Votre mentor vous accompagne à chaque étape.",
    asMentee: "En tant que Mentee",
    asMentor: "En tant que Mentor",
    webinarsCta: "Rejoindre le programme",
    webinarsTitle: "Webinars",
    unisTitle: "Vous visez une école en particulier ?",
    unisBody: "Consultez nos guides des établissements français : admissions, calendrier et ce qui vous attend.",
  },
} as const;


const LOCALE: Record<Lang, string> = { en: "en-GB", fr: "fr-FR", pl: "pl-PL" };

function googleCalendarLink(title: string, details: string, startIso: string, minutes: number) {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const start = new Date(startIso);
  const end = new Date(start.getTime() + minutes * 60_000);
  const params = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${fmt(start)}/${fmt(end)}`, details });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Headline on the left, intro on the right: the same pattern as the home page sections. */
function SectionTitle({ title, intro, longWords = false }: { title: string; intro?: string; longWords?: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
      <Reveal
        as="h2"
        className={`display [overflow-wrap:anywhere] lg:col-span-8 ${longWords ? "text-[clamp(1.75rem,8.4vw,2.25rem)] sm:text-[clamp(2.25rem,5.4vw,5.75rem)]" : "text-[clamp(2.25rem,5.4vw,5.75rem)]"}`}
        text={title}
      />
      {intro && <p className="max-w-[52ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg lg:col-span-4">{intro}</p>}
    </div>
  );
}

/**
 * The page's one memorable element: the mentoring journey drawn as a route from Poland
 * to France. Three stops (the stages named in the brief) each carry one benefit; the line
 * itself is the peer-to-peer support that runs through all of them. The line draws once
 * when it scrolls into view (instant with reduced motion, see globals.css).
 */
function MentoringRoute({ title, alongsideTitle, alongside, from, to, stops, benefits }: {
  title: string;
  alongsideTitle: string;
  alongside: string;
  from: string;
  to: string;
  stops: readonly string[];
  benefits: readonly string[];
}) {
  const routeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(routeRef, 0.35);

  return (
    <section aria-labelledby="route-title" className="on-dark dome-top relative overflow-hidden bg-aspol-dark pb-20 text-white sm:pb-28">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 id="route-title" className="display display-md lg:col-span-7">{title}</h2>
          <div className="flex items-start gap-4 lg:col-span-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-aspol-red text-white" aria-hidden="true">
              <Users size={22} />
            </span>
            <p>
              <span className="block font-display text-xl font-bold leading-snug sm:text-2xl">{alongsideTitle}</span>
              <span className="mt-1 block text-base text-white/75">{alongside}</span>
            </p>
          </div>
        </div>

        <div ref={routeRef} className="relative mt-14 sm:mt-20" style={{ "--route": inView ? 1 : 0 } as React.CSSProperties}>
          {/* Endpoints */}
          <div className="mb-6 flex items-center justify-between font-display text-sm font-bold text-white/70 lg:mb-8">
            <span className="flex items-center gap-2">
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-aspol-dark">PL</span>
              {from}
            </span>
            <span className="hidden items-center gap-2 lg:flex">
              {to}
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-aspol-dark">FR</span>
            </span>
          </div>

          <div className="relative">
            {/* Track + fill: vertical on phones, horizontal from lg */}
            <span className="absolute bottom-0 left-[21px] top-0 w-[3px] rounded-full bg-white/15 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[21px] lg:h-[3px] lg:w-auto" aria-hidden="true" />
            <span
              className="absolute bottom-0 left-[21px] top-0 w-[3px] origin-top rounded-full bg-white transition-transform duration-[1600ms] ease-(--ease-out-expo) [transform:scaleY(var(--route))] lg:bottom-auto lg:left-0 lg:right-0 lg:top-[21px] lg:h-[3px] lg:w-auto lg:origin-left lg:[transform:scaleX(var(--route))]"
              aria-hidden="true"
            />
            {/* Destination marker at the end of the line (desktop) */}
            <span
              className="absolute right-0 top-[13px] hidden size-[19px] rounded-full border-[3px] border-white bg-aspol-red opacity-[var(--route)] transition-opacity delay-[1200ms] duration-500 lg:block"
              aria-hidden="true"
            />

            <ol className="relative grid gap-12 lg:grid-cols-3 lg:gap-0">
              {stops.map((stop, i) => (
                <li key={stop} className="relative pl-16 lg:pl-0 lg:pr-10 lg:pt-16">
                  <span
                    className="absolute left-0 top-0 grid size-[45px] place-items-center rounded-full bg-white font-display text-base font-extrabold text-aspol-dark ring-[6px] ring-aspol-dark transition-[background-color,color] delay-300 duration-700"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3 className="display display-sm">{stop}</h3>
                  <p className="mt-3 max-w-[30ch] text-base leading-relaxed text-white/80 sm:text-lg">{benefits[i]}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-10 flex items-center gap-2 pl-16 font-display text-sm font-bold text-white/70 lg:hidden">
            {to}
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-aspol-dark">FR</span>
          </p>
        </div>
      </div>
    </section>
  );
}

interface Props {
  page: SanityInitiativesPage | null;
  webinars: SanityWebinar[];
  resources: SanityResource[];
}

export default function InitiativesView({ page, webinars, resources }: Props) {
  const { language } = useLanguage();
  const { text, image } = useSiteContent();
  const lang = (language in CONTENT ? language : "en") as Lang;
  const c = CONTENT[lang];
  const x = EXTRA[lang];

  const mentoringImg = image(page?.mentoringImage, 1600);
  const menteeUrl = page?.menteeFormUrl || MENTEE_FORM_URL;
  const mentorUrl = page?.mentorFormUrl || MENTOR_FORM_URL;

  return (
    <div className="min-h-screen bg-aspol-white text-aspol-dark">
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        actions={
          <>
            <Pill href="#join">{x.heroCta}</Pill>
            <Pill href="#resources" variant="ghost" noChip className="px-7">
              {c.heroResources}
            </Pill>
          </>
        }
        aside={
          <div className="photo-card relative aspect-4/3 overflow-hidden rounded-[2rem] bg-aspol-dark">
            <Image
              src={PHOTOS.sunsetGroup.src}
              alt={photoAlt("sunsetGroup", lang)}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        }
      />

      {/* All initiatives (the "Our Initiatives" block from the home page, without its own heading) */}
      <section className="section-pad">
        <div className="container-x">
          <Events embedded />
        </div>
      </section>

      {/* MENTORING: photo from the forum + the brief's description */}
      <section id="mentoring" className="section-pad dome-gap scroll-mt-24 bg-aspol-mist">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="photo-card relative aspect-4/3 overflow-hidden rounded-[2rem] bg-aspol-dark lg:col-span-5 lg:aspect-4/5">
            <Image
              src={mentoringImg?.src ?? PHOTOS.networking.src}
              alt={mentoringImg?.alt || photoAlt("networking", lang)}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal as="h2" className="display text-[clamp(2.25rem,5.4vw,5.75rem)] [overflow-wrap:anywhere]" text={c.mentoringTitle} />
            <p className="mt-8 max-w-[44ch] font-display text-xl font-bold leading-snug text-aspol-navy sm:text-2xl">{c.mentoringBody}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Pill href="#join" variant="red">
                {x.heroCta}
              </Pill>
              <Pill href="#webinars" variant="ghost" noChip className="px-7 text-aspol-dark">
                {x.webinarsTitle}
              </Pill>
            </div>
          </div>
        </div>
      </section>

      <MentoringRoute
        title={c.benefitsTitle}
        alongsideTitle={c.benefits[0]}
        alongside={x.alongside}
        from={x.from}
        to={x.to}
        stops={x.stops}
        benefits={c.benefits.slice(1)}
      />

      {/* WEBINARS (editable in Studio) */}
      <section id="webinars" className="section-pad scroll-mt-24">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal as="h2" className="display text-[clamp(2.25rem,5.4vw,5.75rem)]" text={x.webinarsTitle} />
            <p className="mt-6 max-w-[34ch] font-display text-xl font-bold leading-snug text-aspol-navy sm:text-2xl">
              {text(page?.webinarsIntro, c.webinarsIntro)}
            </p>
          </div>
          <div className="lg:col-span-7">
            {webinars.length === 0 ? (
              <div className="flex h-full flex-col justify-between gap-8 rounded-[2rem] bg-aspol-mist p-7 sm:p-9">
                <div className="flex items-start gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-aspol-navy text-white" aria-hidden="true">
                    <CalendarDays size={22} />
                  </span>
                  <p className="max-w-[44ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg">{c.webinarsEmpty}</p>
                </div>
                <Pill href="#join" variant="dark" className="self-start">
                  {x.webinarsCta}
                </Pill>
              </div>
            ) : (
              <ul className="border-b border-aspol-line">
                {webinars.map((w) => {
                  const date = new Date(w.date!);
                  const title = text(w.title, "Webinar");
                  const desc = text(w.description, "");
                  const minutes = w.durationMinutes ?? 60;
                  const fmt = (o: Intl.DateTimeFormatOptions) =>
                    new Intl.DateTimeFormat(LOCALE[lang], { timeZone: "Europe/Paris", ...o }).format(date);
                  return (
                    <li key={w._key} className="flex gap-5 border-t border-aspol-line py-7 sm:gap-8 sm:py-9">
                      <time
                        dateTime={w.date}
                        className="flex size-20 shrink-0 flex-col items-center justify-center rounded-3xl bg-aspol-navy text-white sm:size-24"
                      >
                        <span className="display text-3xl leading-none sm:text-4xl">{fmt({ day: "numeric" })}</span>
                        <span className="mt-1 text-xs font-bold">{fmt({ month: "short" })}</span>
                      </time>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl font-bold leading-snug sm:text-2xl">{title}</h3>
                        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-aspol-ink-soft">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="size-4" aria-hidden="true" />
                            {fmt({ weekday: "long", hour: "2-digit", minute: "2-digit", timeZoneName: "short" })}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="size-4" aria-hidden="true" />
                            {minutes} {c.minutes}
                          </span>
                        </p>
                        {desc && <p className="mt-3 text-base leading-relaxed text-aspol-ink-soft">{desc}</p>}
                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                          {w.link && (
                            <Pill href={w.link} target="_blank" rel="noopener noreferrer" variant="blue">
                              {c.webinarJoin}
                            </Pill>
                          )}
                          <a
                            href={googleCalendarLink(title, [desc, w.link].filter(Boolean).join("\n\n"), w.date!, minutes)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-aspol-navy underline underline-offset-4 hover:text-aspol-red"
                          >
                            <CalendarDays className="size-4" aria-hidden="true" />
                            {c.webinarCalendar}
                          </a>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* JOIN: the applicant's path is the big red panel, the mentor's the smaller navy one */}
      <section id="join" className="section-pad scroll-mt-24 pt-0 sm:pt-0">
        <div className="container-x">
          <SectionTitle longWords title={c.joinTitle} intro={c.joinIntro} />
          <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-12">
            <a
              href={menteeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group on-dark flex min-h-[24rem] flex-col justify-between gap-12 rounded-[2rem] bg-aspol-red p-7 text-white transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3.5rem] sm:p-12 lg:col-span-7 lg:min-h-[30rem]"
            >
              <span className="grid size-14 place-items-center rounded-full bg-white text-aspol-red" aria-hidden="true">
                <GraduationCap size={28} />
              </span>
              <span className="block">
                <span className="display block text-[clamp(2rem,4.4vw,4rem)]">{x.asMentee}</span>
                <span className="mt-4 block max-w-[40ch] text-base leading-relaxed text-white/85 sm:text-lg">{c.menteeBody}</span>
                <PillFace className="mt-8">{c.applyCta}</PillFace>
              </span>
            </a>
            <a
              href={mentorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group on-dark flex min-h-[24rem] flex-col justify-between gap-12 rounded-[2rem] bg-aspol-navy p-7 text-white transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3.5rem] sm:p-12 lg:col-span-5 lg:min-h-[30rem]"
            >
              <span className="grid size-14 place-items-center rounded-full bg-white text-aspol-navy" aria-hidden="true">
                <HeartHandshake size={28} />
              </span>
              <span className="block">
                <span className="display block text-[clamp(2rem,3.4vw,3.25rem)]">{x.asMentor}</span>
                <span className="mt-4 block max-w-[36ch] text-base leading-relaxed text-white/85 sm:text-lg">{c.mentorBody}</span>
                <PillFace className="mt-8">{c.applyCta}</PillFace>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* GUIDES (editable in Studio) + the university guides on /pathway */}
      <section id="resources" className="section-pad dome-gap scroll-mt-24 bg-aspol-mist">
        <div className="container-x">
          <SectionTitle title={c.resourcesTitle} intro={text(page?.resourcesIntro, c.resourcesIntro)} />

          {resources.length === 0 ? (
            <div className="mt-12 flex items-center gap-5 rounded-[2rem] bg-white p-7 sm:mt-16 sm:p-9">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-aspol-navy text-white" aria-hidden="true">
                <BookOpen size={22} />
              </span>
              <p className="text-base text-aspol-ink-soft sm:text-lg">{c.resourcesEmpty}</p>
            </div>
          ) : (
            <ul className={`mt-12 grid gap-5 sm:mt-16 ${resources.length > 1 ? "lg:grid-cols-2" : ""}`}>
              {resources.map((r) => {
                const title = text(r.title, "");
                const desc = text(r.description, "");
                const href = `/resources/${r.slug || r._id}`;
                // A single guide gets the full width: previews on the left, text on the right.
                const wide = resources.length === 1;
                return (
                  <li
                    key={r._id}
                    className={`group flex flex-col rounded-[2rem] bg-white p-5 transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3rem] sm:p-7 ${wide ? "lg:flex-row lg:items-stretch lg:gap-4" : ""}`}
                  >
                    {r.fileUrl && (
                      <Link
                        href={href}
                        tabIndex={-1}
                        aria-hidden="true"
                        className={`block rounded-[1.5rem] bg-aspol-mist p-4 sm:p-5 ${wide ? "lg:w-[58%] lg:shrink-0" : ""}`}
                      >
                        <PdfThumbnails url={r.fileUrl} title={title} pageLabel={c.pagePreview} />
                      </Link>
                    )}
                    <div className={`flex flex-1 flex-col px-2 pt-6 sm:px-3 ${wide ? "lg:justify-center lg:px-8 lg:pt-0" : ""}`}>
                      <h3 className="display display-md">
                        <Link href={href} className="hover:text-aspol-red">
                          {title}
                        </Link>
                      </h3>
                      {desc && <p className="mt-3 text-base leading-relaxed text-aspol-ink-soft sm:text-lg">{desc}</p>}
                      <GuideByline author={r.author} lang={lang} className="mt-5 border-t border-aspol-line pt-5" />
                      <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${wide ? "pt-8" : "mt-auto pt-6"}`}>
                        <Pill href={href} variant="blue">
                          {c.read}
                        </Pill>
                        {r.allowDownload && r.fileUrl && (
                          <a
                            href={`${r.fileUrl}?dl=`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-aspol-navy underline underline-offset-4 hover:text-aspol-red"
                          >
                            <Download className="size-4" aria-hidden="true" />
                            {c.download}
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {/* University guides */}
          <div className="mt-16 grid gap-8 border-t border-aspol-line pt-12 sm:mt-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <h3 className="display display-sm">{x.unisTitle}</h3>
              <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-aspol-ink-soft">{x.unisBody}</p>
            </div>
            <ul className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-8">
              {universities.map((uni) => (
                <li key={uni.url}>
                  <Link
                    href={uni.url}
                    className="group/uni flex h-20 items-center justify-center rounded-2xl bg-white px-4 ring-1 ring-transparent transition-shadow hover:ring-aspol-navy/30 sm:h-24"
                    title={uni.name}
                  >
                    <Image
                      src={uni.logo}
                      alt={uni.name}
                      width={140}
                      height={56}
                      className="max-h-10 w-auto object-contain opacity-80 grayscale transition-[filter,opacity] duration-500 group-hover/uni:opacity-100 group-hover/uni:grayscale-0 sm:max-h-12"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
