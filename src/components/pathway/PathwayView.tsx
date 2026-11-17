"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Rocket, School } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Reveal from "@/components/ui/Reveal";
import PageHero from "@/components/layout/PageHero";
import Pill from "@/components/ui/Pill";
import { PHOTOS, photoAlt } from "@/lib/photos";
import { GUIDES_CHECKED, PARCOURSUP_2027, guideList, type Entry, type Lang } from "@/data/universityGuides";

const CONTENT = {
  pl: {
    heroSubtitle: "Aktualne przewodniki po rekrutacji na rok akademicki 2027/28: programy, terminy, wymagania i koszty, sprawdzone na oficjalnych stronach uczelni.",
    heroMentor: "Dołącz do mentoringu",
    routesTitle: "Dwie drogi na francuskie studia",
    routesIntro: "To, gdzie i kiedy aplikujesz, zależy od typu uczelni, a nie od tego, że jesteś z Polski.",
    routeA: {
      title: "Grandes écoles i programy międzynarodowe",
      body: "Sciences Po, Polytechnique, ESSEC, ESCP i HEC–Bocconi przyjmują wnioski we własnych portalach, w rundach od września do maja. Programy często są po angielsku, a czesne wynosi zwykle 15–27 tys. € rocznie.",
      facts: ["Własny portal każdej uczelni", "Rundy: wrzesień 2026 – maj 2027", "Często po angielsku", "Przewidywane wyniki matury wystarczą do aplikacji"],
    },
    routeB: {
      title: "Uniwersytety publiczne przez Parcoursup",
      body: "Paris-Saclay, Panthéon-Assas i inne uniwersytety publiczne. Obywatele UE aplikują przez Parcoursup tak jak Francuzi. Studia są po francusku i prawie bezpłatne.",
      facts: ["Parcoursup: 18 stycznia – 11 marca 2027", "178 € rocznie + CVEC 105 €", "Studia po francusku (zwykle B2+)", "Odpowiedzi od 1 czerwca 2027"],
    },
    filterAll: "Wszystkie",
    entry: { "after-matura": "Po maturze", "after-bachelor": "Po licencjacie" } as Record<Entry, string>,
    nextDeadline: "Najbliższy termin",
    roundsInPortal: "Terminy w portalu uczelni",
    noUpcoming: "Nabór 2027 zamknięty",
    openGuide: "Otwórz przewodnik",
    timelineTitle: "Kalendarz maturzysty 2026/27",
    timelineIntro: "Tak wygląda rok, jeśli zdajesz maturę w maju 2027 i chcesz zacząć studia we Francji we wrześniu 2027.",
    timeline: [
      ["Wrzesień – październik 2026", "Wybierz uczelnie i zdaj certyfikat językowy (IELTS lub TOEFL, DELF dla studiów po francusku). Na HEC–Bocconi zaplanuj SAT albo test Bocconi."],
      ["Październik 2026 – marzec 2027", "Rundy w portalach uczelni: Polytechnique, Sciences Po, ESCP, ESSEC, HEC–Bocconi. Wcześniejsza runda to więcej wolnych miejsc i szybsza decyzja."],
      ["18 stycznia – 11 marca 2027", "Parcoursup dla uniwersytetów publicznych. Wniosek trzeba uzupełnić i potwierdzić do 1 kwietnia."],
      ["Maj 2027", "Matura. Uczelnie z własnymi portalami zwykle przyjmują warunkowo, na podstawie ocen i przewidywanych wyników."],
      ["Czerwiec – lipiec 2027", "Odpowiedzi z Parcoursup od 1 czerwca. Wyniki matury przychodzą na początku lipca i trzeba je wysłać uczelni."],
      ["Lipiec – sierpień 2027", "Mieszkanie (akademiki CROUS lub wynajem), opłata CVEC 105 € i rejestracja administracyjna na uczelni."],
    ],
    costsTitle: "Ile to kosztuje",
    costsIntro: "Roczne czesne dla obywateli UE na nabór 2027, według oficjalnych stron. Do tego dochodzą koszty życia, a w Paryżu najwięcej kosztuje mieszkanie.",
    costs: [
      ["Uniwersytet publiczny (licencjat)", "178 €"],
      ["Sciences Po (bachelor)", "0–14 900 € (zależnie od dochodu)"],
      ["École Polytechnique (BSc)", "15 900 €"],
      ["ESCP (BSc)", "20 800 €"],
      ["ESSEC (Global BBA)", "22 900 € + 2 730 € jednorazowo"],
      ["HEC–Bocconi (BASc)", "23 000–26 500 €"],
    ],
    costsNote: "Na uczelniach publicznych obowiązuje też opłata CVEC 105 € (2026/27). Jako obywatel UE nie potrzebujesz wizy.",
    checked: "Dane sprawdzone",
  },
  en: {
    heroSubtitle: "Up-to-date admissions guides for the 2027/28 academic year: programmes, deadlines, requirements and costs, checked against each university's official pages.",
    heroMentor: "Join the mentoring",
    routesTitle: "Two routes into French higher education",
    routesIntro: "Where and when you apply depends on the type of school, not on your nationality.",
    routeA: {
      title: "Grandes écoles and international programmes",
      body: "Sciences Po, Polytechnique, ESSEC, ESCP and HEC–Bocconi take applications on their own portals, in rounds from September to May. Programmes are often in English, with tuition typically €15–27k a year.",
      facts: ["Each school's own portal", "Rounds: September 2026 – May 2027", "Often taught in English", "Predicted matura results are enough to apply"],
    },
    routeB: {
      title: "Public universities via Parcoursup",
      body: "Paris-Saclay, Panthéon-Assas and other public universities: EU citizens apply through Parcoursup just like French students. Teaching is in French and almost free.",
      facts: ["Parcoursup: 18 January – 11 March 2027", "€178 a year + CVEC €105", "Taught in French (usually B2+)", "Answers from 1 June 2027"],
    },
    filterAll: "All",
    entry: { "after-matura": "After secondary school", "after-bachelor": "After a bachelor's" } as Record<Entry, string>,
    nextDeadline: "Next deadline",
    roundsInPortal: "Dates in the school's portal",
    noUpcoming: "2027 intake closed",
    openGuide: "Open the guide",
    timelineTitle: "The 2026/27 calendar for matura students",
    timelineIntro: "What the year looks like if you sit the matura in May 2027 and want to start in France in September 2027.",
    timeline: [
      ["September – October 2026", "Choose your schools and take a language test (IELTS or TOEFL; DELF for French-taught studies). For HEC–Bocconi, plan the SAT or the Bocconi test."],
      ["October 2026 – March 2027", "Rounds on the schools' own portals: Polytechnique, Sciences Po, ESCP, ESSEC, HEC–Bocconi. Earlier rounds mean more open places and faster decisions."],
      ["18 January – 11 March 2027", "Parcoursup for public universities; complete and confirm your file by 1 April."],
      ["May 2027", "Matura exams. Schools with their own portals usually admit conditionally, on your grades and predicted results."],
      ["June – July 2027", "Parcoursup answers from 1 June. Matura results arrive in early July; send them to your school."],
      ["July – August 2027", "Housing (CROUS residences or private rental), the €105 CVEC and administrative registration."],
    ],
    costsTitle: "What it costs",
    costsIntro: "Annual tuition for EU citizens, 2027 intake, from the official pages. Living costs come on top, and housing is the big one in Paris.",
    costs: [
      ["Public university (licence)", "€178"],
      ["Sciences Po (bachelor)", "€0–14,900 (income-based)"],
      ["École Polytechnique (BSc)", "€15,900"],
      ["ESCP (BSc)", "€20,800"],
      ["ESSEC (Global BBA)", "€22,900 + €2,730 once"],
      ["HEC–Bocconi (BASc)", "€23,000–26,500"],
    ],
    costsNote: "Public universities also charge the €105 CVEC (2026/27). As an EU citizen you do not need a visa.",
    checked: "Facts checked",
  },
  fr: {
    heroSubtitle: "Des guides d'admission à jour pour la rentrée 2027 : programmes, dates limites, exigences et coûts, vérifiés sur les sites officiels des établissements.",
    heroMentor: "Rejoindre le mentorat",
    routesTitle: "Deux voies vers les études en France",
    routesIntro: "Où et quand candidater dépend du type d'établissement, pas de votre nationalité.",
    routeA: {
      title: "Grandes écoles et programmes internationaux",
      body: "Sciences Po, Polytechnique, l'ESSEC, l'ESCP et HEC–Bocconi recrutent sur leurs propres portails, en sessions de septembre à mai. Les programmes sont souvent en anglais, avec des frais de 15 à 27 k€ par an.",
      facts: ["Portail propre à chaque école", "Sessions : septembre 2026 – mai 2027", "Souvent en anglais", "Les résultats prévisionnels de la matura suffisent pour candidater"],
    },
    routeB: {
      title: "Universités publiques via Parcoursup",
      body: "Paris-Saclay, Panthéon-Assas et les autres universités publiques : les citoyens de l'UE passent par Parcoursup comme les candidats français. Enseignement en français, quasi gratuit.",
      facts: ["Parcoursup : 18 janvier – 11 mars 2027", "178 € par an + CVEC 105 €", "Enseignement en français (souvent B2+)", "Réponses dès le 1er juin 2027"],
    },
    filterAll: "Toutes",
    entry: { "after-matura": "Après le lycée", "after-bachelor": "Après une licence" } as Record<Entry, string>,
    nextDeadline: "Prochaine date limite",
    roundsInPortal: "Dates sur le portail de l'école",
    noUpcoming: "Rentrée 2027 close",
    openGuide: "Ouvrir le guide",
    timelineTitle: "Le calendrier 2026-2027 des candidats",
    timelineIntro: "L'année type si vous passez la matura en mai 2027 et visez une rentrée en France en septembre 2027.",
    timeline: [
      ["Septembre – octobre 2026", "Choisissez vos écoles et passez un test de langue (IELTS ou TOEFL ; DELF pour des études en français). Pour HEC–Bocconi, prévoyez le SAT ou le test Bocconi."],
      ["Octobre 2026 – mars 2027", "Sessions sur les portails des écoles : Polytechnique, Sciences Po, ESCP, ESSEC, HEC–Bocconi. Plus tôt, c'est plus de places et une réponse plus rapide."],
      ["18 janvier – 11 mars 2027", "Parcoursup pour les universités publiques ; dossier à compléter et confirmer avant le 1er avril."],
      ["Mai 2027", "Épreuves de la matura. Les écoles à portail propre admettent souvent sous condition, sur notes et résultats prévisionnels."],
      ["Juin – juillet 2027", "Réponses Parcoursup dès le 1er juin. Les résultats de la matura arrivent début juillet : envoyez-les à l'école."],
      ["Juillet – août 2027", "Logement (résidences CROUS ou location), CVEC de 105 € et inscription administrative."],
    ],
    costsTitle: "Combien ça coûte",
    costsIntro: "Frais annuels pour les citoyens de l'UE, rentrée 2027, d'après les sites officiels. S'y ajoute le coût de la vie, surtout le logement à Paris.",
    costs: [
      ["Université publique (licence)", "178 €"],
      ["Sciences Po (bachelor)", "0 à 14 900 € (selon revenus)"],
      ["École polytechnique (BSc)", "15 900 €"],
      ["ESCP (BSc)", "20 800 €"],
      ["ESSEC (Global BBA)", "22 900 € + 2 730 € une fois"],
      ["HEC–Bocconi (BASc)", "23 000 à 26 500 €"],
    ],
    costsNote: "Les universités publiques demandent aussi la CVEC de 105 € (2026-2027). Citoyen de l'UE, vous n'avez pas besoin de visa.",
    checked: "Informations vérifiées le",
  },
} as const;

const LOCALE: Record<Lang, string> = { pl: "pl-PL", en: "en-GB", fr: "fr-FR" };
const fmt = (iso: string, lang: Lang, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(LOCALE[lang], { timeZone: "Europe/Paris", ...opts }).format(new Date(`${iso}T12:00:00Z`));

type Filter = "all" | Entry;

export default function PathwayView({ today }: { today: string }) {
  const { t, language } = useLanguage();
  const lang = (language in CONTENT ? language : "en") as Lang;
  const c = CONTENT[lang];
  const [filter, setFilter] = useState<Filter>("all");

  const cards = guideList
    .filter((g) => filter === "all" || g.programmes.some((p) => p.entry === filter))
    .map((g) => {
      const programmes = filter === "all" ? g.programmes : g.programmes.filter((p) => p.entry === filter);
      const upcoming = programmes
        .flatMap((p) => p.deadlines.map((d) => ({ ...d, programme: p.name })))
        .filter((d) => d.date >= today && d.date !== PARCOURSUP_2027[0].date)
        .sort((a, b) => a.date.localeCompare(b.date))[0];
      const hasDates = programmes.some((p) => p.deadlines.length > 0);
      return { g, programmes, upcoming, hasDates };
    });

  const filters: Filter[] = ["all", "after-matura", "after-bachelor"];

  return (
    <main className="min-h-screen bg-aspol-white text-aspol-dark">
      <PageHero
        badge={t.pathway.heroBadge}
        title={`${t.pathway.heroTitleStart} ${t.pathway.heroTitleHighlight} ${t.pathway.heroTitleEnd}`}
        subtitle={c.heroSubtitle}
        actions={
          <>
            <Pill href="#universities">{t.pathway.heroPrimaryCta}</Pill>
            <Pill href="/initiatives#join" variant="ghost" noChip className="px-7">
              {c.heroMentor}
            </Pill>
          </>
        }
        aside={
          <div className="photo-card relative aspect-4/3 overflow-hidden rounded-[2rem] bg-aspol-dark">
            <Image
              src={PHOTOS.smilingPair.src}
              alt={photoAlt("smilingPair", language)}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        }
      />

      {/* Two routes */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <Reveal as="h2" className="display text-[clamp(2.25rem,5.4vw,5.75rem)] lg:col-span-8" text={c.routesTitle} />
            <p className="max-w-[44ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg lg:col-span-4">{c.routesIntro}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-2">
            {[
              { r: c.routeA, tone: "on-dark bg-aspol-navy text-white", dot: "bg-white" },
              { r: c.routeB, tone: "bg-aspol-mist text-aspol-dark", dot: "bg-aspol-red" },
            ].map(({ r, tone, dot }) => (
              <article key={r.title} className={`flex flex-col gap-8 rounded-[2rem] p-7 sm:p-10 ${tone}`}>
                <div>
                  <h3 className="display display-md">{r.title}</h3>
                  <p className="mt-4 max-w-[52ch] text-base leading-relaxed opacity-90 sm:text-lg">{r.body}</p>
                </div>
                <ul className="mt-auto grid gap-3 border-t border-current/20 pt-6 sm:grid-cols-2">
                  {r.facts.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-display text-base font-bold leading-snug">
                      <span className={`mt-2 size-1.5 shrink-0 rounded-full ${dot}`} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Universities */}
      <section id="universities" className="section-pad dome-gap scroll-mt-20 bg-aspol-mist">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <Reveal as="h2" className="display text-[clamp(2.25rem,5.4vw,5.75rem)] lg:col-span-8" text={t.pathway.universitiesTitle} />
            <p className="max-w-[44ch] text-sm text-aspol-ink-soft lg:col-span-4">
              {c.checked}: {fmt(GUIDES_CHECKED, lang, { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label={c.filterAll}>
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full px-5 py-2.5 font-display text-sm font-bold transition-colors ${
                  filter === f ? "bg-aspol-dark text-white" : "bg-white text-aspol-dark hover:bg-aspol-line"
                }`}
              >
                {f === "all" ? c.filterAll : c.entry[f]}
              </button>
            ))}
          </div>

          <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cards.map(({ g, programmes, upcoming, hasDates }) => (
              <li key={g.slug}>
                <Link
                  href={`/pathway/${g.slug}`}
                  className="group flex h-full flex-col rounded-[2rem] bg-white p-6 transition-[border-radius] duration-700 ease-(--ease-out-expo) hover:rounded-[3rem] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-14 items-center">
                      <Image src={g.logo} alt="" width={140} height={56} className="max-h-12 w-auto object-contain" />
                    </span>
                    <span
                      className="grid size-11 shrink-0 place-items-center rounded-full bg-aspol-dark text-white transition-transform duration-500 ease-(--ease-out-expo) group-hover:-rotate-45"
                      aria-hidden="true"
                    >
                      <ArrowRight className="size-5" />
                    </span>
                  </div>
                  <h3 className="display display-sm mt-6">{g.name}</h3>
                  <p className="mt-1.5 text-sm text-aspol-ink-soft">
                    {g.kind[lang]} · {g.city[lang]}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {programmes.map((p) => (
                      <li key={p.name} className="flex flex-wrap items-center gap-2 text-sm">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${p.entry === "after-matura" ? "bg-aspol-red" : "bg-aspol-navy"}`}>
                          {c.entry[p.entry]}
                        </span>
                        <span className="font-semibold">{p.name}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto border-t border-aspol-line pt-4 text-sm">
                    {upcoming ? (
                      <>
                        <span className="font-bold text-aspol-red">{c.nextDeadline}:</span>{" "}
                        {fmt(upcoming.date, lang, { day: "numeric", month: "long", year: "numeric" })}
                        <span className="block text-aspol-ink-soft">{upcoming.label[lang]}</span>
                      </>
                    ) : (
                      <span className="text-aspol-ink-soft">{hasDates ? c.noUpcoming : c.roundsInPortal}</span>
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Calendar */}
      <section className="on-dark dome-top relative overflow-hidden bg-aspol-dark pb-20 text-white sm:pb-28">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h2 className="display display-md lg:col-span-7">{c.timelineTitle}</h2>
            <p className="max-w-[46ch] text-base leading-relaxed text-white/80 sm:text-lg lg:col-span-5">{c.timelineIntro}</p>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[2rem] bg-white/15 sm:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {c.timeline.map(([when, what], i) => (
              <li key={when} className="bg-aspol-dark p-7 sm:p-8">
                <span className="grid size-10 place-items-center rounded-full bg-white font-display text-sm font-extrabold text-aspol-dark" aria-hidden="true">
                  {i + 1}
                </span>
                <p className="mt-5 font-display text-lg font-bold">{when}</p>
                <p className="mt-2 text-base leading-relaxed text-white/80">{what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Costs */}
      <section className="section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal as="h2" className="display text-[clamp(2.25rem,5.4vw,5.75rem)]" text={c.costsTitle} />
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg">{c.costsIntro}</p>
          </div>
          <div className="lg:col-span-7">
            <dl className="border-b border-aspol-line">
              {c.costs.map(([k, v]) => (
                <div key={k} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-aspol-line py-4">
                  <dt className="font-display text-lg font-bold">{k}</dt>
                  <dd className="text-base text-aspol-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm leading-relaxed text-aspol-ink-soft">{c.costsNote}</p>
          </div>
        </div>
      </section>

      {/* Campus France */}
      <section className="container-x pb-20 sm:pb-28">
        <div className="flex flex-col items-start gap-6 rounded-[2rem] bg-aspol-mist p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-10">
          <div className="grid size-20 shrink-0 place-items-center rounded-3xl bg-white p-4">
            <Image src="/images/logos/campus-france.png" alt="Campus France" width={56} height={56} className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex-1">
            <h3 className="display display-sm mb-2">{t.pathway.campusFranceTitle}</h3>
            <p className="max-w-[62ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg">
              <span className="font-semibold text-aspol-red">Campus France</span> {t.pathway.campusFranceBodyPrefix}{" "}
              <a
                href="https://www.pologne.campusfrance.org/pl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-aspol-navy underline underline-offset-4 hover:text-aspol-red"
              >
                {t.pathway.campusFranceLink}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Support (last section: dome-gap keeps it clear of the footer arc) */}
      <section className="dome-gap">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <article className="on-dark flex min-h-80 flex-col justify-between gap-10 rounded-[2rem] bg-aspol-red p-7 text-white sm:p-10">
            <span className="grid size-14 place-items-center rounded-full bg-white text-aspol-red" aria-hidden="true">
              <Rocket className="size-7" />
            </span>
            <div>
              <h3 className="display display-md">{t.pathway.mentoringTitle}</h3>
              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-white/85 sm:text-lg">{t.pathway.mentoringBody}</p>
              <Pill href="/initiatives#join" className="mt-8">
                {t.pathway.mentoringCta}
              </Pill>
            </div>
          </article>
          <article className="flex min-h-80 flex-col justify-between gap-10 rounded-[2rem] bg-aspol-mist p-7 sm:p-10">
            <span className="grid size-14 place-items-center rounded-full bg-white text-aspol-navy" aria-hidden="true">
              <School className="size-7" />
            </span>
            <div>
              <h3 className="display display-md">{t.pathway.visitsTitle}</h3>
              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg">{t.pathway.visitsBody}</p>
              <Pill href="/#contact" variant="dark" className="mt-8">
                {t.pathway.visitsCta}
              </Pill>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
