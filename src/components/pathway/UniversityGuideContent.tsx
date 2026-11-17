"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/layout/PageHero";
import Pill from "@/components/ui/Pill";
import { GUIDES_CHECKED, guideList, type Deadline, type Entry, type Lang, type Programme, type UniversityGuide } from "@/data/universityGuides";

const UI = {
  pl: {
    back: "Wszystkie uczelnie",
    founded: "Założona",
    city: "Gdzie",
    entry: { "after-matura": "Po maturze", "after-bachelor": "Po licencjacie" } as Record<Entry, string>,
    start: "Kiedy można aplikować",
    programmes: "Programy",
    atAGlance: "W skrócie",
    language: "Język",
    length: "Długość",
    tuition: "Czesne",
    apply: "Jak aplikować",
    deadlines: "Terminy (nabór 2027)",
    noDeadlines: "Uczelnia publikuje daty rund w swoim portalu. Sprawdź je przed złożeniem wniosku.",
    passed: "Minął",
    next: "Najbliższy",
    requirements: "Czego potrzebujesz",
    links: "Oficjalne strony",
    tips: "Wskazówki dla maturzystów z Polski",
    sources: "Źródła",
    checked: "Dane sprawdzone",
    disclaimer: "Uczelnie zmieniają terminy i opłaty co roku. Przed złożeniem wniosku potwierdź wszystko na oficjalnej stronie.",
    mentorTitle: "Porozmawiaj z kimś, kto tam studiuje",
    mentorBody: "W Programie Mentoringowym ASPOL połączymy Cię z polskim studentem francuskiej uczelni, który pomoże w rekrutacji i przeprowadzce.",
    mentorCta: "Dołącz jako Mentee",
    others: "Inne uczelnie",
  },
  en: {
    back: "All universities",
    founded: "Founded",
    city: "Where",
    entry: { "after-matura": "After secondary school", "after-bachelor": "After a bachelor's" } as Record<Entry, string>,
    start: "When you can apply",
    programmes: "Programmes",
    atAGlance: "At a glance",
    language: "Language",
    length: "Length",
    tuition: "Tuition",
    apply: "How to apply",
    deadlines: "Deadlines (2027 intake)",
    noDeadlines: "The school publishes its round dates in the application portal. Check them before you apply.",
    passed: "Passed",
    next: "Next",
    requirements: "What you need",
    links: "Official pages",
    tips: "Tips for applicants with a Polish matura",
    sources: "Sources",
    checked: "Facts checked",
    disclaimer: "Schools change dates and fees every year. Confirm everything on the official website before you apply.",
    mentorTitle: "Talk to someone who studies there",
    mentorBody: "ASPOL's Mentoring Program connects you with a Polish student at a French university who helps with applications and the move.",
    mentorCta: "Join as a Mentee",
    others: "Other universities",
  },
  fr: {
    back: "Toutes les écoles",
    founded: "Fondée en",
    city: "Où",
    entry: { "after-matura": "Après le lycée", "after-bachelor": "Après une licence" } as Record<Entry, string>,
    start: "Quand candidater",
    programmes: "Programmes",
    atAGlance: "En bref",
    language: "Langue",
    length: "Durée",
    tuition: "Frais",
    apply: "Comment candidater",
    deadlines: "Dates limites (rentrée 2027)",
    noDeadlines: "L'école publie les dates de ses sessions sur son portail. Vérifiez-les avant de candidater.",
    passed: "Passée",
    next: "Prochaine",
    requirements: "Ce qu'il vous faut",
    links: "Pages officielles",
    tips: "Conseils pour les candidats avec une matura polonaise",
    sources: "Sources",
    checked: "Informations vérifiées le",
    disclaimer: "Les écoles changent leurs dates et leurs frais chaque année. Vérifiez tout sur le site officiel avant de candidater.",
    mentorTitle: "Parlez à quelqu'un qui y étudie",
    mentorBody: "Le Programme de Mentorat d'ASPOL vous met en relation avec un étudiant polonais d'une université française qui vous aide pour la candidature et l'installation.",
    mentorCta: "Rejoindre en tant que Mentee",
    others: "Autres écoles",
  },
} as const;

const LOCALE: Record<Lang, string> = { pl: "pl-PL", en: "en-GB", fr: "fr-FR" };

const formatDate = (iso: string, lang: Lang, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(LOCALE[lang], { timeZone: "Europe/Paris", ...opts }).format(new Date(`${iso}T12:00:00Z`));

const anchor = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function DeadlineList({ deadlines, today, lang }: { deadlines: Deadline[]; today: string; lang: Lang }) {
  const u = UI[lang];
  const sorted = [...deadlines].sort((a, b) => a.date.localeCompare(b.date));
  const nextIndex = sorted.findIndex((d) => d.date >= today);

  return (
    <ol className="border-b border-aspol-line">
      {sorted.map((d, i) => {
        const passed = d.date < today;
        const isNext = i === nextIndex;
        return (
          <li key={`${d.date}-${i}`} className={`flex items-start gap-5 border-t border-aspol-line py-5 ${passed ? "opacity-55" : ""}`}>
            <time
              dateTime={d.date}
              className={`flex w-16 shrink-0 flex-col items-center rounded-2xl py-2.5 ${isNext ? "bg-aspol-red text-white" : "bg-aspol-mist text-aspol-dark"}`}
            >
              <span className="display text-2xl leading-none">{formatDate(d.date, lang, { day: "numeric" })}</span>
              <span className="mt-1 text-xs font-bold">{formatDate(d.date, lang, { month: "short", year: "2-digit" })}</span>
            </time>
            <div className="min-w-0 flex-1 pt-1">
              <p className="flex flex-wrap items-center gap-2 font-display text-lg font-bold leading-snug">
                {d.label[lang]}
                {isNext && <span className="rounded-full bg-aspol-red px-2.5 py-0.5 text-xs font-bold text-white">{u.next}</span>}
                {passed && <span className="rounded-full bg-aspol-mist px-2.5 py-0.5 text-xs font-bold text-aspol-ink-soft">{u.passed}</span>}
              </p>
              {d.note && <p className="mt-1 text-sm leading-relaxed text-aspol-ink-soft sm:text-base">{d.note[lang]}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ProgrammeSection({ p, today, lang }: { p: Programme; today: string; lang: Lang }) {
  const u = UI[lang];
  const facts: [string, string][] = [
    [u.language, p.language[lang]],
    [u.length, p.length[lang]],
    [u.tuition, p.tuition[lang]],
    [u.apply, p.apply[lang]],
  ];

  return (
    <section id={anchor(p.name)} className="scroll-mt-28 border-t-2 border-aspol-dark pt-10 first:border-t-0 first:pt-0 sm:pt-14">
      <p className="mb-4">
        <span className={`rounded-full px-3.5 py-1.5 text-sm font-bold ${p.entry === "after-matura" ? "bg-aspol-red text-white" : "bg-aspol-navy text-white"}`}>
          {u.entry[p.entry]}
        </span>
      </p>
      <h2 className="display display-md">{p.name}</h2>
      <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-aspol-ink-soft">{p.summary[lang]}</p>

      <dl className="mt-8 grid gap-px overflow-hidden rounded-[1.5rem] bg-aspol-line sm:grid-cols-2">
        {facts.map(([k, v]) => (
          <div key={k} className="bg-white p-5 sm:p-6">
            <dt className="text-sm font-bold text-aspol-navy">{k}</dt>
            <dd className="mt-1.5 text-base leading-relaxed">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 grid gap-10 xl:grid-cols-2 xl:gap-12">
        <div>
          <h3 className="display display-sm mb-4">{u.deadlines}</h3>
          {p.deadlines.length ? (
            <DeadlineList deadlines={p.deadlines} today={today} lang={lang} />
          ) : (
            <p className="flex items-start gap-3 rounded-[1.5rem] bg-aspol-mist p-5 text-base leading-relaxed text-aspol-ink-soft">
              <Info className="mt-0.5 size-5 shrink-0 text-aspol-navy" aria-hidden="true" />
              {u.noDeadlines}
            </p>
          )}
        </div>
        <div>
          <h3 className="display display-sm mb-4">{u.requirements}</h3>
          <ul className="space-y-3">
            {p.requirements.map((r) => (
              <li key={r.en} className="flex items-start gap-3 text-base leading-relaxed">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-aspol-navy text-white" aria-hidden="true">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {r[lang]}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="sr-only">{u.links}</h3>
        <ul className="flex flex-wrap gap-3">
          {p.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-aspol-mist px-5 py-3 text-sm font-bold text-aspol-dark transition-colors hover:bg-aspol-dark hover:text-white"
              >
                {link.label[lang]}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function UniversityGuideContent({ guide, today }: { guide: UniversityGuide; today: string }) {
  const { language } = useLanguage();
  const lang = (language in UI ? language : "en") as Lang;
  const u = UI[lang];
  const entries = [...new Set(guide.programmes.map((p) => p.entry))];
  const others = guideList.filter((g) => g.slug !== guide.slug);

  return (
    <div className="min-h-screen bg-aspol-white text-aspol-dark">
      <PageHero
        badge={guide.kind[lang]}
        title={guide.name}
        subtitle={guide.summary[lang]}
        titleClassName="text-[clamp(2.25rem,6vw,5.5rem)]"
        actions={
          <>
            <Pill href={`#${anchor(guide.programmes[0].name)}`}>{u.programmes}</Pill>
            <Pill href="/pathway" variant="ghost" noChip className="px-7">
              <span className="inline-flex items-center gap-2">
                <ArrowLeft className="size-4" aria-hidden="true" />
                {u.back}
              </span>
            </Pill>
          </>
        }
        aside={
          <div className="rounded-[2rem] bg-white p-7 text-aspol-dark sm:p-9">
            <div className="flex h-20 items-center">
              <Image src={guide.logo} alt={guide.name} width={180} height={80} className="max-h-16 w-auto object-contain" />
            </div>
            <dl className="mt-6 divide-y divide-aspol-line border-t border-aspol-line">
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-sm font-bold text-aspol-navy">{u.city}</dt>
                <dd className="text-right text-sm">{guide.city[lang]}</dd>
              </div>
              {guide.founded && (
                <div className="flex justify-between gap-4 py-3.5">
                  <dt className="text-sm font-bold text-aspol-navy">{u.founded}</dt>
                  <dd className="text-right text-sm">{guide.founded}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4 py-3.5">
                <dt className="text-sm font-bold text-aspol-navy">{u.start}</dt>
                <dd className="flex flex-wrap justify-end gap-1.5">
                  {entries.map((e) => (
                    <span key={e} className={`rounded-full px-2.5 py-1 text-xs font-bold text-white ${e === "after-matura" ? "bg-aspol-red" : "bg-aspol-navy"}`}>
                      {u.entry[e]}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        }
      />

      <div className="container-x section-pad grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Side navigation */}
        <aside className="lg:col-span-3">
          <nav className="lg:sticky lg:top-32" aria-label={u.programmes}>
            <p className="font-display text-sm font-bold text-aspol-navy">{u.programmes}</p>
            <ul className="mt-3 space-y-1">
              {guide.programmes.map((p) => (
                <li key={p.name}>
                  <a href={`#${anchor(p.name)}`} className="block rounded-xl px-3 py-2 font-display font-bold leading-snug hover:bg-aspol-mist">
                    {p.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#tips" className="block rounded-xl px-3 py-2 font-display font-bold leading-snug hover:bg-aspol-mist">
                  {u.tips}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm text-aspol-ink-soft">
              {u.checked}: {formatDate(GUIDES_CHECKED, lang, { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </nav>
        </aside>

        <div className="space-y-16 lg:col-span-9">
          {/* Highlights */}
          <section aria-label={u.atAGlance} className="rounded-[2rem] bg-aspol-mist p-7 sm:p-9">
            <h2 className="display display-sm">{u.atAGlance}</h2>
            <ul className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
              {guide.highlights.map((h) => (
                <li key={h.en} className="flex items-start gap-3 text-base leading-relaxed">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-aspol-red" aria-hidden="true" />
                  {h[lang]}
                </li>
              ))}
            </ul>
          </section>

          {guide.programmes.map((p) => (
            <ProgrammeSection key={p.name} p={p} today={today} lang={lang} />
          ))}

          {/* Tips */}
          <section id="tips" className="on-dark scroll-mt-28 rounded-[2rem] bg-aspol-navy p-7 text-white sm:p-10">
            <h2 className="display display-sm">{u.tips}</h2>
            <ul className="mt-6 space-y-4">
              {guide.tips.map((tip) => (
                <li key={tip.en} className="flex items-start gap-3 text-base leading-relaxed text-white/90 sm:text-lg">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-white text-aspol-navy" aria-hidden="true">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {tip[lang]}
                </li>
              ))}
            </ul>
          </section>

          {/* Sources */}
          <section aria-label={u.sources} className="border-t border-aspol-line pt-8">
            <h2 className="font-display text-sm font-bold text-aspol-navy">{u.sources}</h2>
            <ul className="mt-3 space-y-1.5">
              {guide.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-aspol-ink-soft underline underline-offset-4 hover:text-aspol-red">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-aspol-ink-soft">{u.disclaimer}</p>
          </section>
        </div>
      </div>

      {/* Mentoring + other schools (dome-gap keeps it clear of the footer arc) */}
      <section className="dome-gap">
        <div className="container-x grid gap-5 lg:grid-cols-12">
          <div className="on-dark flex flex-col justify-between gap-10 rounded-[2rem] bg-aspol-red p-7 text-white sm:p-12 lg:col-span-7">
            <h2 className="display display-md max-w-[18ch]">{u.mentorTitle}</h2>
            <div>
              <p className="max-w-[48ch] text-base leading-relaxed text-white/90 sm:text-lg">{u.mentorBody}</p>
              <Pill href="/initiatives#join" className="mt-8">
                {u.mentorCta}
              </Pill>
            </div>
          </div>
          <nav aria-label={u.others} className="rounded-[2rem] bg-aspol-mist p-7 sm:p-9 lg:col-span-5">
            <h2 className="display display-sm">{u.others}</h2>
            <ul className="mt-5 divide-y divide-aspol-line">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link href={`/pathway/${g.slug}`} className="group flex items-center justify-between gap-4 py-3 font-display font-bold hover:text-aspol-red">
                    {g.name}
                    <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
}
