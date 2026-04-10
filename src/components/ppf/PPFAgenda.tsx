type SupportedLanguage = "pl" | "en" | "fr";

type AgendaItem = {
  time: string;
  title: string;
  subtitle?: string;
};

type Panel = {
  title: string;
  description: string;
  speakers: string;
};

type AgendaContent = {
  sectionTitle: string;
  sectionLead: string;
  dayLabel: string;
  noteParallelWorkshops: string;
  registrationHint: string;
  registrationCta: string;
  timeline: {
    friday: {
      title: string;
      date: string;
        location: string;
      items: AgendaItem[];
    };
    saturday: {
      title: string;
      date: string;
        location: string;
      items: AgendaItem[];
    };
  };
  panels: {
    title: string;
    subtitle: string;
    items: Panel[];
  };
};

const content: Record<SupportedLanguage, AgendaContent> = {
  pl: {
    sectionTitle: "Ramowa Agenda",
    sectionLead: "Program 10. edycji Paris Polish Forum",
    dayLabel: "Dzień",
    noteParallelWorkshops: "Uwaga: możliwe dwa warsztaty równoległe lub jeden warsztat dwugodzinny.",
    registrationHint: "Zapisy znajdują się niżej na tej stronie.",
    registrationCta: "Przejdź do zapisów",
    timeline: {
      friday: {
        title: "Piątek",
        date: "17 kwietnia",
        location: "Lokalizacja: Stacja Naukowa PAN w Paryzu",
        items: [
          { time: "16:40-16:55", title: "Rejestracja", subtitle: "Tylko dla uczestnikow zapisanych na warsztaty" },
          {
            time: "17:00-18:30",
            title: "Warsztaty CEC group",
            subtitle: "Prowadzenie: Claudie-Marie Smolen, Aleksandra Kielan",
          },
          { time: "18:40-19:10", title: "Rejestracja i poczestunek", subtitle: "Napoje gorace (herbata/kawa)" },
          {
            time: "19:15-19:40",
            title: "Oficjalna inauguracja",
            subtitle: "Prowadzenie: dr hab. n. med. Aldona Katarzyna Jankowska, prof. UMK; wspolprezesi ASPOL Zofia Gostkowska i Kacper Pabisz",
          },
          {
            time: "19:40-20:40",
            title: "Zielona Inteligencja: Czy AI uratuje klimat?",
            subtitle: "Dyskusja o zuzyciu energii, wzroscie efektywnosci i klimatycznych rozwiazaniach AI. Prelegenci: Michal Szczepanski, Maxime Moisson, Pilar Santamaria",
          },
          { time: "20:40-22:00", title: "Sesja networkingowa", subtitle: "W trakcie sesji bedzie serwowane wino" },
        ],
      },
      saturday: {
        title: "Sobota",
        date: "18 kwietnia",
        location: "Lokalizacja: Ambasada RP w Paryzu",
        items: [
          { time: "14:00-14:30", title: "Recepcja", subtitle: "Welcome coffee & croissanty" },
          {
            time: "14:30-14:45",
            title: "Oficjalne otwarcie dnia drugiego",
            subtitle: "Przedstawiciel Ambasady i prezesi ASPOL",
          },
          {
            time: "14:45-16:00",
            title: "Walka Slow: dezinformacja, propaganda i bezpieczenstwo informacji",
            subtitle: "M. Czarnecka, P. Moreau-Chevrolet, M. Piekos, A. Kielan",
          },
          { time: "16:00-16:30", title: "Poczestunek", subtitle: "Napoje gorace (herbata/kawa)" },
          { time: "16:35-17:00", title: "Fireside Chat z Wieslawem Tarka" },
          {
            time: "17:00-18:00",
            title: "Keynote: Arancha Gonzalez - Czy Europa moze byc aktorem geopolitycznym?",
            subtitle: "Nastepnie interaktywna sesja Q&A",
          },
          { time: "18:00-18:30", title: "Koncert Tempo Chopin" },
          {
            time: "18:30-19:30",
            title: "United Europe of Innovation",
            subtitle: "R. Kierzenkowski, B. Mierzwa | Moderacja: W. Nitecka",
          },
          { time: "19:30-19:45", title: "Oficjalne zakończenie", subtitle: "Podziękowania" },
          { time: "19:45-22:00", title: "Networking", subtitle: "Aperitify i pelna kolacja" },
        ],
      },
    },
    panels: {
      title: "Panele 10. edycji PPF",
      subtitle: "Tematy i prelegenci",
      items: [
        {
          title: "Zielona Inteligencja: Czy AI uratuje środowisko?",
          description:
            "Dyskusja o zuzyciu energii, wzroscie efektywnosci oraz rozwiazaniach klimatycznych opartych na AI.",
          speakers: "Michal Szczepanski, Maxime Moisson, Pilar Santamaria",
        },
        {
          title: "Europa Innowacji",
          description:
            "Wplyw badan naukowych, technologii i przedsiebiorczosci na pozycje Europy w coraz bardziej zlozonym srodowisku globalnym.",
          speakers: "Rafal Kierzenkowski, Bartosz Mierzwa | Moderacja: Weronika Nitecka",
        },
        {
          title: "Walka Słów: Dezinformacja, Propaganda i Bezpieczeństwo",
          description:
            "Dyskusja o roli dezinformacji i propagandy we wspolczesnych spoleczenstwach oraz ich wplywie na stabilnosc demokracji.",
          speakers: "Maja Czarnecka, Philippe Moreau-Chevrolet, Michal Piekos, Aleksandra Kielan",
        },
      ],
    },
  },
  en: {
    sectionTitle: "Agenda Overview",
    sectionLead: "Program of the 10th edition of Paris Polish Forum",
    dayLabel: "Day",
    noteParallelWorkshops: "Note: Friday workshops may run in parallel or as one two-hour workshop.",
    registrationHint: "Registration form is located below this agenda.",
    registrationCta: "Go to registration",
    timeline: {
      friday: {
        title: "Friday",
        date: "April 17",
        location: "Location: Polish Academy of Sciences Scientific Centre in Paris",
        items: [
          { time: "16:40-16:55", title: "Registration", subtitle: "Only for participants registered for workshops" },
          {
            time: "17:00-18:30",
            title: "Workshop by CEC group",
            subtitle: "Speakers: Claudie-Marie Smolen, Aleksandra Kielan",
          },
          { time: "18:40-19:10", title: "Registration and refreshments", subtitle: "Hot drinks (tea/coffee)" },
          {
            time: "19:15-19:40",
            title: "Official Opening Ceremony",
            subtitle: "Conducted by: dr hab. n. med. Aldona Katarzyna Jankowska, prof. UMK; ASPOL co-presidents Zofia Gostkowska and Kacper Pabisz",
          },
          {
            time: "19:40-20:40",
            title: "Green Intelligence: Can AI Save the Climate?",
            subtitle: "The discussion will focus on energy consumption, efficiency gains, and AI-based climate solutions. Speakers: Michał Szczepański, Maxime Moisson, Pilar Santamaria. Moderator: Zofia Gostkowska",
          },
          { time: "20:40-22:00", title: "Networking Session", subtitle: "Wine will be served during this session" },
        ],
      },
      saturday: {
        title: "Saturday",
        date: "April 18",
        location: "Location: Embassy of Poland in Paris",
        items: [
          { time: "14:00-14:30", title: "Reception and Reception", subtitle: "Welcome coffee & croissants!" },
          {
            time: "14:30-14:45",
            title: "Official Opening of Day Two",
            subtitle: "Welcome speech of the embassy representative Chief of Economic Section at Polish Embassy in Paris - Błazkiewicz Jakub and ASPOL presidents: Zofia Gostkowska, Kacper Pabisz",
          },
          {
            time: "14:45-16:00",
            title: "The War of Words: Disinformation, Propaganda, and Information Security",
            subtitle: "Discussion on the role of disinformation and propaganda in contemporary societies and their impact on the stability of democracy. Speakers: Maja Czarnecka, Philippe Moreau-Chevrolet, Michał Piękoś, Aleksandra Kielan. Moderator: Klara Winiarczyk",
          },
          { time: "16:00-16:30", title: "Refreshments", subtitle: "Hot drinks (tea/coffee)" },
          { time: "16:35-17:00", title: "Fireside Chat with Ambassador Wiesław Tarka" },
          {
            time: "17:00-18:00",
            title: "Keynote Speech by Arancha González: Can Europe be a geopolitical actor?",
            subtitle: "Followed by an interactive Q&A session.",
          },
          { time: "18:00-18:30", title: "Concert by Tempo Chopin" },
          {
            time: "18:30-19:30",
            title: "United Europe of Innovation",
            subtitle: "Impact of scientific research, technology, and entrepreneurship can strengthen on Europe's position in an increasingly complex global environment. Speakers: Rafał Kierzenkowski, Tomasz Mierzwa, Francesco Pappada, Lola Pinel. Moderator: Weronika Nitecka",
          },
          { time: "19:30-19:45", title: "Official Closing", subtitle: "Acknowledgements" },
          { time: "19:45-22:00", title: "Networking", subtitle: "Aperitifs and dinner will be served." },
        ],
      },
    },
    panels: {
      title: "PPF 10th Edition Panels",
      subtitle: "Topics and speakers",
      items: [
        {
          title: "Green Intelligence: Can AI Save the Environment?",
          description:
            "The discussion focuses on energy consumption, efficiency gains, and AI-based climate solutions.",
          speakers: "Michał Szczepański, Maxime Moisson, Pilar Santamaria | Moderator: Zofia Gostkowska",
        },
        {
          title: "United Europe of Innovation",
          description:
            "Impact of scientific research, technology, and entrepreneurship can strengthen Europe's position in an increasingly complex global environment.",
          speakers: "Rafał Kierzenkowski, Tomasz Mierzwa, Francesco Pappada, Lola Pinel | Moderator: Weronika Nitecka",
        },
        {
          title: "The War of Words: Disinformation, Propaganda, and Information Security",
          description:
            "Discussion on the role of disinformation and propaganda in contemporary societies and their impact on democratic stability.",
          speakers: "Maja Czarnecka, Philippe Moreau-Chevrolet, Michał Piękoś, Aleksandra Kielan | Moderator: Klara Winiarczyk",
        },
      ],
    },
  },
  fr: {
    sectionTitle: "Agenda",
    sectionLead: "Programme de la 10e édition du Paris Polish Forum",
    dayLabel: "Jour",
    noteParallelWorkshops:
      "Note: les ateliers du vendredi peuvent se tenir en parallèle ou en un seul atelier de deux heures.",
    registrationHint: "Le formulaire d'inscription se trouve plus bas sur cette page.",
    registrationCta: "Aller à l'inscription",
    timeline: {
      friday: {
        title: "Vendredi",
        date: "17 avril",
        location: "Lieu: Centre scientifique de l'Academie polonaise des sciences a Paris",
        items: [
          { time: "16:40-16:55", title: "Enregistrement", subtitle: "Uniquement pour les participants inscrits aux ateliers" },
          {
            time: "17:00-18:30",
            title: "Atelier par le groupe CEC",
            subtitle: "Intervenantes: Claudie-Marie Smolen, Aleksandra Kielan",
          },
          { time: "18:40-19:10", title: "Enregistrement et rafraichissements", subtitle: "Boissons chaudes (the/cafe)" },
          {
            time: "19:15-19:40",
            title: "Ceremonie d'ouverture officielle",
            subtitle: "Animee par: dr hab. n. med. Aldona Katarzyna Jankowska, prof. UMK; copresidents ASPOL Zofia Gostkowska et Kacper Pabisz",
          },
          {
            time: "19:40-20:40",
            title: "Intelligence verte: l'IA peut-elle sauver le climat?",
            subtitle: "Discussion sur la consommation d'energie, les gains d'efficacite et les solutions climatiques basees sur l'IA. Intervenants: Michal Szczepanski, Maxime Moisson, Pilar Santamaria",
          },
          { time: "20:40-22:00", title: "Session networking", subtitle: "Du vin sera servi pendant cette session" },
        ],
      },
      saturday: {
        title: "Samedi",
        date: "18 avril",
        location: "Lieu: Ambassade de Pologne a Paris",
        items: [
          { time: "14:00-14:30", title: "Reception", subtitle: "Welcome coffee & croissant" },
          {
            time: "14:30-14:45",
            title: "Ouverture officielle du jour deux",
            subtitle: "Discours du representant de l'Ambassade et des presidents ASPOL",
          },
          {
            time: "14:45-16:00",
            title: "La guerre des mots: desinformation, propagande et securite de l'information",
            subtitle: "M. Czarnecka, P. Moreau-Chevrolet, M. Piekos, A. Kielan",
          },
          { time: "16:00-16:30", title: "Rafraichissements", subtitle: "Boissons chaudes (the/cafe)" },
          { time: "16:35-17:00", title: "Fireside Chat avec Wieslaw Tarka" },
          {
            time: "17:00-18:00",
            title: "Keynote par Arancha Gonzalez: l'Europe peut-elle etre un acteur geopolitique?",
            subtitle: "Suivi d'une session Q&A interactive",
          },
          { time: "18:00-18:30", title: "Concert par Tempo Chopin" },
          {
            time: "18:30-19:30",
            title: "United Europe of Innovation",
            subtitle: "R. Kierzenkowski, B. Mierzwa | Moderatrice: W. Nitecka",
          },
          { time: "19:30-19:45", title: "Clôture officielle", subtitle: "Remerciements" },
          { time: "19:45-22:00", title: "Networking", subtitle: "Aperitifs et diner complet" },
        ],
      },
    },
    panels: {
      title: "Panels de la 10e édition du PPF",
      subtitle: "Thèmes et intervenants",
      items: [
        {
          title: "Intelligence verte: l'IA peut-elle sauver l'environnement?",
          description:
            "Discussion sur la consommation d'energie, les gains d'efficacite et les solutions climatiques fondees sur l'IA.",
          speakers: "Michał Szczepański, Maxime Moisson, Pilar Santamaria",
        },
        {
          title: "Europe de l'innovation",
          description:
            "Impact de la recherche scientifique, de la technologie et de l'entrepreneuriat sur la position de l'Europe dans un environnement global complexe.",
          speakers: "Rafal Kierzenkowski, Bartosz Mierzwa | Moderatrice: Weronika Nitecka",
        },
        {
          title: "Bataille des mots: désinformation, propagande et sécurité",
          description:
            "Discussion sur le role de la desinformation et de la propagande dans les societes contemporaines et leur impact sur la stabilite democratique.",
          speakers: "Maja Czarnecka, Philippe Moreau-Chevrolet, Michał Piękoś, Aleksandra Kielan",
        },
      ],
    },
  },
};

function TimelineCard({ item, animationIndex }: { item: AgendaItem; animationIndex: number }) {
  return (
    <article
      className="group relative pt-10 sm:pt-11 min-w-64 sm:min-w-0 animate-fade-in-up"
      style={{ animationDelay: `${Math.min(animationIndex * 0.08, 0.56)}s` }}
    >
      <span className="absolute top-0 left-0 z-10 h-4 w-4 rounded-full border-3 border-aspol-dark bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.26),0_0_24px_rgba(255,255,255,0.35)]" />

      <div className="rounded-2xl border border-white/10 bg-white/3 p-4 sm:p-5 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/5 group-hover:shadow-[0_10px_22px_rgba(5,12,30,0.28)]">
        <p className="text-[2.05rem] sm:text-[2.45rem] font-black text-white leading-none tracking-[-0.02em] tabular-nums">{item.time}</p>
        <p className="mt-3 text-2xl sm:text-3xl font-semibold text-white leading-tight">{item.title}</p>
        {item.subtitle ? <p className="mt-2 text-lg italic text-white/75">{item.subtitle}</p> : null}
      </div>
    </article>
  );
}

function TimelineSection({
  dayTitle,
  dayDate,
  dayLocation,
  items,
  dayLabel,
}: {
  dayTitle: string;
  dayDate: string;
  dayLocation: string;
  items: AgendaItem[];
  dayLabel: string;
}) {
  const desktopChunkSize = 3;
  const desktopRows = Array.from(
    { length: Math.ceil(items.length / desktopChunkSize) },
    (_, index) => items.slice(index * desktopChunkSize, index * desktopChunkSize + desktopChunkSize)
  );

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/12 bg-aspol-dark px-5 py-8 sm:px-8 sm:py-10 shadow-[0_18px_42px_rgba(8,19,44,0.34)]">
      <div className="pointer-events-none absolute inset-0 opacity-35" style={{ backgroundImage: "radial-gradient(circle at 15% 15%, rgba(255,255,255,0.14), transparent 42%), radial-gradient(circle at 90% 0%, rgba(169,13,24,0.24), transparent 35%)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      <header className="relative mb-8 sm:mb-10">
        <p className="text-xs tracking-[0.24em] uppercase text-white/55">{dayLabel}</p>
        <h3 className="mt-2 text-5xl sm:text-6xl font-bold italic text-white font-heading leading-none">{dayTitle}</h3>
        <p className="mt-2 text-4xl sm:text-5xl font-semibold text-aspol-red leading-none">{dayDate}</p>
        <p className="mt-3 text-sm sm:text-base text-white/80">{dayLocation}</p>
      </header>

      <div className="lg:hidden relative">
        <div className="absolute left-0 right-0 top-2 h-px bg-white/65" />
        <div className="absolute left-0 right-0 top-2 h-px bg-white/40 blur-[1px]" />
        <div className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory">
          {items.map((item, index) => (
            <div key={`${item.time}-${item.title}`} className="snap-start">
              <TimelineCard item={item} animationIndex={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-col lg:gap-6">
        {desktopRows.map((row, rowIndex) => (
          <div key={`${dayTitle}-row-${rowIndex}`} className="relative">
            <div className="absolute left-0 right-0 top-2 h-px bg-white/65" />
            <div className="absolute left-0 right-0 top-2 h-px bg-white/40 blur-[1px]" />
            <div className="grid grid-cols-3 gap-5">
              {row.map((item, colIndex) => (
                <TimelineCard
                  key={`${item.time}-${item.title}`}
                  item={item}
                  animationIndex={rowIndex * desktopChunkSize + colIndex}
                />
              ))}
              {Array.from({ length: desktopChunkSize - row.length }, (_, fillerIndex) => (
                <div key={`${dayTitle}-row-${rowIndex}-filler-${fillerIndex}`} aria-hidden="true" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PPFAgenda({ language }: { language: string }) {
  const lang = language === "pl" || language === "fr" || language === "en" ? language : "pl";
  const tr = content[lang];

  return (
    <div id="ppf-agenda" className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-16 pb-16 sm:pb-20">
      <header className="mb-8 sm:mb-10">
        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-aspol-dark/50">PPF 2026</p>
        <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold italic text-aspol-dark font-heading">{tr.sectionTitle}</h2>
        <p className="mt-3 text-lg sm:text-xl text-aspol-dark/70">{tr.sectionLead}</p>
      </header>

      <div className="mb-7 sm:mb-8 relative overflow-hidden rounded-2xl border border-aspol-navy/12 bg-linear-to-r from-white to-gray-50 px-4 py-4 sm:px-5 sm:py-4 shadow-[0_10px_25px_rgba(15,23,42,0.08)]">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-linear-to-b from-aspol-red via-aspol-red/75 to-aspol-red/35" />
        <div className="relative pl-2 sm:pl-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-aspol-navy text-white shadow-sm">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 4v12m0 0l-5-5m5 5l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-aspol-navy/55">Registration</p>
              <p className="mt-1 text-sm sm:text-base font-semibold text-aspol-navy">
                {tr.registrationHint}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("ppf-form")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-aspol-red px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_16px_rgba(169,13,24,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-aspol-red/90 hover:shadow-[0_14px_22px_rgba(169,13,24,0.33)]"
          >
            {tr.registrationCta}
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 5v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <TimelineSection
          dayLabel={tr.dayLabel}
          dayTitle={tr.timeline.friday.title}
          dayDate={tr.timeline.friday.date}
          dayLocation={tr.timeline.friday.location}
          items={tr.timeline.friday.items}
        />

        <p className="text-sm italic text-aspol-red">* {tr.noteParallelWorkshops}</p>

        <TimelineSection
          dayLabel={tr.dayLabel}
          dayTitle={tr.timeline.saturday.title}
          dayDate={tr.timeline.saturday.date}
          dayLocation={tr.timeline.saturday.location}
          items={tr.timeline.saturday.items}
        />
      </div>

      <section className="mt-10 sm:mt-12 rounded-3xl border border-gray-200 bg-gray-100 px-5 py-8 sm:px-8 sm:py-10">
        <header>
          <h3 className="text-3xl sm:text-4xl font-bold italic text-aspol-navy font-heading">{tr.panels.title}</h3>
          <p className="mt-2 text-aspol-navy/80">{tr.panels.subtitle}</p>
        </header>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {tr.panels.items.map((panel) => (
            <article key={panel.title} className="h-full flex flex-col bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
              <h4 className="text-xl sm:text-2xl font-bold text-aspol-navy leading-tight">{panel.title}</h4>
              <p className="mt-4 text-base sm:text-lg text-aspol-dark/80 leading-relaxed">{panel.description}</p>
              <p className="mt-auto pt-5 border-t border-dotted border-aspol-dark/40 italic text-aspol-dark/75">{panel.speakers}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
