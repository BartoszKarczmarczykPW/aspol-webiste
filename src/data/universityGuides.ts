/**
 * University guides for /pathway/[slug].
 *
 * Every fact below comes from the university's own admissions pages (or, where noted,
 * from the French ministry / Parcoursup), checked on GUIDES_CHECKED. Dates are for the
 * September 2027 intake unless a label says otherwise. When an official page did not
 * publish a figure, the guide says so and links to it instead of guessing.
 */

export type Lang = "pl" | "en" | "fr";
export type L = Record<Lang, string>;

const l = (pl: string, en: string, fr: string): L => ({ pl, en, fr });

/** Date the facts were last checked against the official sources (ISO). */
export const GUIDES_CHECKED = "2026-11-17";

export type Entry = "after-matura" | "after-bachelor";

export interface Deadline {
  /** ISO date (Paris time) of the deadline. */
  date: string;
  label: L;
  /** e.g. when results come out. */
  note?: L;
}

export interface Programme {
  name: string;
  entry: Entry;
  summary: L;
  language: L;
  length: L;
  tuition: L;
  /** How and where to apply. */
  apply: L;
  deadlines: Deadline[];
  requirements: L[];
  links: { label: L; url: string }[];
}

export interface UniversityGuide {
  slug: string;
  name: string;
  fullName?: string;
  logo: string;
  kind: L;
  city: L;
  founded?: number;
  summary: L;
  highlights: L[];
  programmes: Programme[];
  /** Advice specific to applicants with a Polish matura. */
  tips: L[];
  sources: { label: string; url: string }[];
}

/* ------------------------------------------------------------------ */
/*  Shared facts                                                       */
/* ------------------------------------------------------------------ */

/** Parcoursup 2027 (official calendar published October 2026). */
export const PARCOURSUP_2027: Deadline[] = [
  {
    date: "2026-12-17",
    label: l("Katalog kierunków online", "Programme catalogue opens", "Ouverture du catalogue des formations"),
  },
  {
    date: "2027-01-18",
    label: l("Rejestracja i wybór kierunków (vœux)", "Registration and choices (vœux) open", "Inscription et formulation des vœux"),
    note: l("do 11 marca 2027", "until 11 March 2027", "jusqu'au 11 mars 2027"),
  },
  {
    date: "2027-03-11",
    label: l("Ostatni dzień na dodanie kierunków", "Last day to add choices", "Dernier jour pour formuler ses vœux"),
  },
  {
    date: "2027-04-01",
    label: l("Ostatni dzień na uzupełnienie i potwierdzenie wniosku", "Last day to complete and confirm your file", "Dernier jour pour compléter le dossier et confirmer les vœux"),
  },
  {
    date: "2027-06-01",
    label: l("Pierwsze odpowiedzi uczelni", "First answers from programmes", "Premières réponses des formations"),
  },
];

/** Public university fees 2026/27 for EU citizens (French ministry). */
export const PUBLIC_FEES_2026: L = l(
  "178 € rocznie (licencjat) / 255 € (magisterka) + CVEC 105 € (rok 2026/27, obywatele UE)",
  "€178 per year (licence) / €255 (master) + CVEC €105 (2026/27, EU citizens)",
  "178 € par an (licence) / 255 € (master) + CVEC 105 € (2026-2027, citoyens UE)",
);

const parcoursupLink = { label: l("Parcoursup", "Parcoursup", "Parcoursup"), url: "https://www.parcoursup.gouv.fr/" };

/* ------------------------------------------------------------------ */
/*  Guides                                                             */
/* ------------------------------------------------------------------ */

export const universityGuides: Record<string, UniversityGuide> = {
  "sciences-po": {
    slug: "sciences-po",
    name: "Sciences Po",
    fullName: "Institut d'études politiques de Paris",
    logo: "/images/logos/sciences-po.png",
    kind: l("Grande école nauk społecznych", "Grande école for the social sciences", "Grande école en sciences sociales"),
    city: l("Paryż + 6 kampusów regionalnych", "Paris + 6 regional campuses", "Paris + 6 campus en région"),
    founded: 1872,
    summary: l(
      "Najbardziej znana francuska uczelnia nauk politycznych, prawa, ekonomii i stosunków międzynarodowych. Licencjat trwa 3 lata, a trzeci rok spędza się na wymianie za granicą.",
      "France's best-known school for politics, law, economics and international affairs. The bachelor takes 3 years, and the third year is spent on exchange abroad.",
      "L'école française de référence en science politique, droit, économie et relations internationales. Le bachelor dure 3 ans, dont une troisième année à l'étranger.",
    ),
    highlights: [
      l("Kampusy: Paryż, Dijon, Le Havre, Menton, Nancy, Poitiers, Reims", "Campuses: Paris, Dijon, Le Havre, Menton, Nancy, Poitiers, Reims", "Campus : Paris, Dijon, Le Havre, Menton, Nancy, Poitiers, Reims"),
      l("Kampus w Dijon specjalizuje się w Unii Europejskiej i Europie Środkowo-Wschodniej", "The Dijon campus focuses on the EU and Central & Eastern Europe", "Le campus de Dijon est spécialisé sur l'Union européenne et l'Europe centrale et orientale"),
      l("Programy po angielsku: Le Havre, Reims i Menton (ścieżki anglojęzyczne)", "English-taught options: Le Havre, Reims and Menton (English tracks)", "Programmes en anglais : Le Havre, Reims et Menton (parcours anglophones)"),
      l("Podwójne dyplomy m.in. z Columbia, UBC, FU Berlin, Keio, HKU, Luiss i ESCP", "Dual degrees with Columbia, UBC, FU Berlin, Keio, HKU, Luiss and ESCP, among others", "Doubles diplômes notamment avec Columbia, UBC, FU Berlin, Keio, HKU, Luiss et ESCP"),
    ],
    programmes: [
      {
        name: "Bachelor (Collège universitaire)",
        entry: "after-matura",
        summary: l(
          "Interdyscyplinarny licencjat z nauk społecznych z wybranym kampusem i specjalizacją regionalną (minor).",
          "A multidisciplinary social-science bachelor with a chosen campus and regional minor.",
          "Un bachelor pluridisciplinaire en sciences sociales, avec un campus et une mineure régionale.",
        ),
        language: l("Francuski lub angielski (zależnie od kampusu), poziom C1", "French or English depending on campus, C1 level", "Français ou anglais selon le campus, niveau C1"),
        length: l("3 lata (3. rok za granicą)", "3 years (year 3 abroad)", "3 ans (3e année à l'étranger)"),
        tuition: l(
          "0–14 900 € rocznie w zależności od dochodów rodziny (UE, 2026/27); stypendyści CROUS zwolnieni",
          "€0–14,900 per year depending on family income (EU, 2026/27); CROUS scholarship holders are exempt",
          "0 à 14 900 € par an selon les revenus du foyer (UE, 2026-2027) ; boursiers CROUS exonérés",
        ),
        apply: l(
          "Własny portal Sciences Po (ścieżka dla świadectw spoza Francji). Opłata 150 €.",
          "Sciences Po's own portal (track for non-French school diplomas). Fee €150.",
          "Portail de Sciences Po (procédure pour les diplômes étrangers). Frais de 150 €.",
        ),
        deadlines: [
          { date: "2026-11-04", label: l("Runda 1", "Round 1", "Session 1"), note: l("rozmowy 8–18 grudnia, wyniki w połowie stycznia", "interviews 8–18 December, results mid-January", "entretiens du 8 au 18 décembre, résultats mi-janvier") },
          { date: "2027-01-13", label: l("Runda 2 i stypendium Émile Boutmy", "Round 2 and Émile Boutmy scholarship", "Session 2 et bourse Émile Boutmy"), note: l("rozmowy 8–19 marca, wyniki na początku kwietnia", "interviews 8–19 March, results early April", "entretiens du 8 au 19 mars, résultats début avril") },
          { date: "2027-03-01", label: l("Runda 3 i podwójne dyplomy", "Round 3 and dual degrees", "Session 3 et doubles diplômes"), note: l("rozmowy 13–23 kwietnia, wyniki na początku maja", "interviews 13–23 April, results early May", "entretiens du 13 au 23 avril, résultats début mai") },
        ],
        requirements: [
          l("Oceny z ostatnich 3 lat szkoły i wyniki egzaminów (przewidywane wyniki matury są akceptowane)", "Grades from the last 3 years of school and exam results (predicted matura results are accepted)", "Notes des 3 dernières années et résultats d'examens (les résultats prévisionnels de la matura sont acceptés)"),
          l("3 krótkie teksty o motywacji i planach (1 500–2 000 znaków każdy)", "3 short texts on motivation and plans (1,500–2,000 characters each)", "3 textes courts sur la motivation et le projet (1 500 à 2 000 caractères chacun)"),
          l("2 opinie od nauczycieli (bez nich wniosek jest niekompletny)", "2 academic references (without them the file is incomplete)", "2 recommandations académiques (sans elles, le dossier est incomplet)"),
          l("Rozmowa online ok. 25 minut: prezentacja, analiza obrazu, motywacja", "Online interview of about 25 minutes: self-presentation, image analysis, motivation", "Entretien en ligne d'environ 25 minutes : présentation, analyse d'image, motivation"),
          l("Wniosek i rozmowa liczą się po 50 punktów (razem 100)", "The file and the interview are worth 50 points each (100 in total)", "Le dossier et l'entretien comptent chacun 50 points (100 au total)"),
        ],
        links: [
          { label: l("Rekrutacja międzynarodowa", "International admissions", "Admissions internationales"), url: "https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/" },
          { label: l("Wymagania językowe wg kampusu", "Language requirements by campus", "Exigences linguistiques par campus"), url: "https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/language-requirements/" },
          { label: l("Portal aplikacyjny", "Application portal", "Portail de candidature"), url: "https://admission.sciencespo.fr/" },
        ],
      },
    ],
    tips: [
      l(
        "Kampus w Paryżu jest dostępny tylko dla absolwentów francuskich liceów. Po polskiej maturze wybierasz jeden z kampusów regionalnych.",
        "The Paris campus is only open to graduates of French secondary schools. With a Polish matura you choose one of the regional campuses.",
        "Le campus de Paris est réservé aux diplômés du secondaire français. Avec une matura polonaise, on choisit un campus en région.",
      ),
      l(
        "Liczy się typ świadectwa, a nie obywatelstwo: z polską maturą aplikujesz w procedurze międzynarodowej, nie przez Parcoursup.",
        "What matters is the diploma, not your nationality: with a Polish matura you use the international procedure, not Parcoursup.",
        "C'est le diplôme qui compte, pas la nationalité : avec une matura polonaise, on passe par la procédure internationale, pas par Parcoursup.",
      ),
      l(
        "Aplikować można tylko raz, więc warto celować w pierwszą lub drugą rundę i dobrze przygotować rozmowę.",
        "You can only apply once, so aim for round 1 or 2 and prepare the interview well.",
        "On ne peut candidater qu'une seule fois : visez la session 1 ou 2 et préparez bien l'entretien.",
      ),
    ],
    sources: [
      { label: "Sciences Po: International undergraduate admissions 2027", url: "https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/" },
      { label: "Sciences Po: Language requirements", url: "https://www.sciencespo.fr/admissions/en/undergraduate/foreign-secondary-schools/language-requirements/" },
      { label: "Sciences Po: Droits de scolarité", url: "https://www.sciencespo.fr/fr/admissions-bourses/droits-scolarite/" },
    ],
  },

  "ecole-polytechnique": {
    slug: "ecole-polytechnique",
    name: "École Polytechnique",
    fullName: "École polytechnique (l'X), Institut Polytechnique de Paris",
    logo: "/images/logos/polytechnique.png",
    kind: l("Grande école inżynierska i naukowa", "Engineering and science grande école", "Grande école d'ingénieurs et de sciences"),
    city: l("Palaiseau (pod Paryżem)", "Palaiseau (south of Paris)", "Palaiseau (sud de Paris)"),
    founded: 1794,
    summary: l(
      "Najbardziej prestiżowa francuska uczelnia ścisła, część Institut Polytechnique de Paris. Dla osób po maturze prowadzi trzyletni Bachelor of Science w całości po angielsku.",
      "France's most prestigious science and engineering school, part of Institut Polytechnique de Paris. After secondary school you can join its three-year Bachelor of Science, taught entirely in English.",
      "La plus prestigieuse école scientifique française, membre de l'Institut Polytechnique de Paris. Après le lycée, on peut intégrer son Bachelor of Science de trois ans, entièrement en anglais.",
    ),
    highlights: [
      l("Bachelor of Science w całości po angielsku", "Bachelor of Science taught entirely in English", "Bachelor of Science entièrement en anglais"),
      l("Mocny nacisk na matematykę i nauki ścisłe", "Strong emphasis on mathematics and science", "Forte dominante mathématiques et sciences"),
      l("Po licencjacie: magisterki MSc&T po angielsku lub cykl inżynierski", "After the bachelor: English-taught MSc&T master's or the engineering cycle", "Après le bachelor : MSc&T en anglais ou cycle ingénieur"),
    ],
    programmes: [
      {
        name: "Bachelor of Science",
        entry: "after-matura",
        summary: l(
          "Trzyletni licencjat ścisły z matematyką w centrum programu.",
          "A three-year science bachelor built around mathematics.",
          "Un bachelor scientifique de trois ans centré sur les mathématiques.",
        ),
        language: l("Angielski (C1)", "English (C1)", "Anglais (C1)"),
        length: l("3 lata, wstęp tylko na 1. rok", "3 years, entry to year 1 only", "3 ans, entrée en 1re année uniquement"),
        tuition: l("15 900 € rocznie (UE, nabór 2027); 19 600 € spoza UE", "€15,900 per year (EU, 2027 intake); €19,600 non-EU", "15 900 € par an (UE, rentrée 2027) ; 19 600 € hors UE"),
        apply: l("Portal online uczelni. Opłata 105 €. Jedna aplikacja w roku: albo portal, albo Parcoursup.", "The school's online portal. Fee €105. One application per year: either the portal or Parcoursup.", "Portail en ligne de l'école. Frais de 105 €. Une seule candidature par an : portail ou Parcoursup."),
        deadlines: [
          { date: "2026-10-20", label: l("Runda 1", "Round 1", "Session 1"), note: l("rozmowy w grudniu, wyniki w styczniu", "interviews in December, results in January", "entretiens en décembre, résultats en janvier") },
          { date: "2027-01-06", label: l("Runda 2", "Round 2", "Session 2"), note: l("rozmowy luty–marzec, wyniki w marcu", "interviews Feb–March, results in March", "entretiens février-mars, résultats en mars") },
          { date: "2027-02-08", label: l("Runda 3 (do 14:00)", "Round 3 (2 pm)", "Session 3 (14 h)"), note: l("rozmowy marzec–kwiecień, wyniki w kwietniu", "interviews March–April, results in April", "entretiens mars-avril, résultats en avril") },
        ],
        requirements: [
          l("Rozszerzona matematyka i co najmniej jeden rozszerzony przedmiot ścisły", "Advanced mathematics and at least one advanced science subject", "Mathématiques approfondies et au moins une science approfondie"),
          l("Angielski C1: TOEFL iBT 90, IELTS 6.5 (min. 6 z każdej części) lub Cambridge 176", "English C1: TOEFL iBT 90, IELTS 6.5 (min. 6 per skill) or Cambridge 176", "Anglais C1 : TOEFL iBT 90, IELTS 6,5 (min. 6 par compétence) ou Cambridge 176"),
          l("Świadectwa, personal statement, CV i 2 opinie (jedna od nauczyciela matematyki)", "Transcripts, personal statement, CV and 2 references (one from a maths teacher)", "Bulletins, lettre de motivation, CV et 2 recommandations (dont une d'un professeur de mathématiques)"),
          l("Rozmowa online po angielsku, ok. 50 minut (dla wybranych kandydatów)", "Online interview in English, about 50 minutes (shortlisted candidates)", "Entretien en ligne en anglais, environ 50 minutes (candidats présélectionnés)"),
        ],
        links: [
          { label: l("Kryteria i procedura", "Criteria and procedure", "Critères et procédure"), url: "https://programmes.polytechnique.edu/en/bachelors-admissions/bachelor-of-science/admissions-criteria-and-procedure" },
          { label: l("FAQ rekrutacji (czesne, testy)", "Admissions FAQ (fees, tests)", "FAQ admissions (frais, tests)"), url: "https://programmes.polytechnique.edu/en/bachelor/admissions/application-faq" },
        ],
      },
    ],
    tips: [
      l(
        "Rozszerzona matematyka na maturze to praktycznie warunek. Na rozmowie pojawiają się pytania z matematyki.",
        "Advanced-level maths in the matura is practically a must, and the interview tests your maths.",
        "Les mathématiques en niveau avancé à la matura sont quasiment indispensables, et l'entretien teste les mathématiques.",
      ),
      l(
        "Certyfikat angielskiego nie może być starszy niż 2 lata w chwili rozpoczęcia studiów, a IGCSE nie jest akceptowany.",
        "Your English certificate must be under 2 years old when the programme starts, and IGCSE is not accepted.",
        "Le certificat d'anglais doit avoir moins de 2 ans à la rentrée, et l'IGCSE n'est pas accepté.",
      ),
    ],
    sources: [
      { label: "École polytechnique: Bachelor admissions criteria and procedure", url: "https://programmes.polytechnique.edu/en/bachelors-admissions/bachelor-of-science/admissions-criteria-and-procedure" },
      { label: "École polytechnique: Bachelor application FAQ", url: "https://programmes.polytechnique.edu/en/bachelor/admissions/application-faq" },
    ],
  },

  essec: {
    slug: "essec",
    name: "ESSEC Business School",
    logo: "/images/logos/essec.png",
    kind: l("Grande école biznesowa", "Business grande école", "Grande école de commerce"),
    city: l("Cergy (pod Paryżem), Singapur, Rabat", "Cergy (near Paris), Singapore, Rabat", "Cergy (près de Paris), Singapour, Rabat"),
    founded: 1907,
    summary: l(
      "Jedna z czołowych francuskich szkół biznesu. Global BBA to czteroletni licencjat z ekonomii i zarządzania ze stażami i wyjazdami za granicę.",
      "One of France's leading business schools. The Global BBA is a four-year business bachelor with internships and time abroad.",
      "L'une des meilleures écoles de commerce françaises. Le Global BBA est un bachelor de quatre ans avec stages et séjours à l'étranger.",
    ),
    highlights: [
      l("Global BBA: ścieżka angielska lub francuska w Cergy", "Global BBA: English or French track in Cergy", "Global BBA : parcours anglais ou français à Cergy"),
      l("Trzy kampusy: Cergy, Singapur, Rabat", "Three campuses: Cergy, Singapore, Rabat", "Trois campus : Cergy, Singapour, Rabat"),
      l("Kampus startowy wybiera się przy aplikacji, a zmiana zwykle nie jest możliwa", "You pick your starting campus when you apply; switching is generally not possible", "Le campus de départ se choisit à la candidature ; en changer n'est généralement pas possible"),
    ],
    programmes: [
      {
        name: "Global BBA",
        entry: "after-matura",
        summary: l(
          "Czteroletni licencjat z biznesu i zarządzania.",
          "A four-year business and management bachelor.",
          "Un bachelor de quatre ans en commerce et management.",
        ),
        language: l("Angielski lub francuski (Cergy, Rabat), angielski (Singapur)", "English or French (Cergy, Rabat), English (Singapore)", "Anglais ou français (Cergy, Rabat), anglais (Singapour)"),
        length: l("4 lata", "4 years", "4 ans"),
        tuition: l(
          "20 900 € czesnego + 2 000 € opłaty rocznie, plus jednorazowo 2 730 € (Cergy i Singapur, nabór 2027; razem 94 330 € za 4 lata)",
          "€20,900 tuition + €2,000 registration per year, plus a one-time €2,730 (Cergy and Singapore, 2027 intake; €94,330 in total over 4 years)",
          "20 900 € de scolarité + 2 000 € d'inscription par an, plus 2 730 € une fois (Cergy et Singapour, rentrée 2027 ; 94 330 € au total sur 4 ans)",
        ),
        apply: l(
          "Portal aplikacyjny ESSEC, nabór w kilku rundach. Opłata 100 € (Cergy). Daty rund są publikowane w portalu.",
          "ESSEC's application portal, in several rounds. Fee €100 (Cergy). Round dates are published in the portal.",
          "Portail de candidature de l'ESSEC, en plusieurs sessions. Frais de 100 € (Cergy). Les dates sont publiées sur le portail.",
        ),
        deadlines: [],
        requirements: [
          l("Świadectwa z ostatnich 3 lat i zaświadczenie o przewidywanym ukończeniu szkoły", "Transcripts from the last 3 years and a certificate of expected graduation", "Bulletins des 3 dernières années et certificat de scolarité"),
          l("Angielski: IELTS 6.5, TOEFL iBT 90, TOEIC 850 lub B2 First 175 (wynik nie starszy niż 2 lata)", "English: IELTS 6.5, TOEFL iBT 90, TOEIC 850 or B2 First 175 (score under 2 years old)", "Anglais : IELTS 6,5, TOEFL iBT 90, TOEIC 850 ou B2 First 175 (score de moins de 2 ans)"),
          l("CV na 1 stronę i 2 opinie od nauczycieli", "One-page CV and 2 academic references", "CV d'une page et 2 recommandations académiques"),
          l("Rozmowa po angielsku ok. 30 minut z dwoma egzaminatorami", "Interview in English of about 30 minutes with two examiners", "Entretien en anglais d'environ 30 minutes devant deux examinateurs"),
          l("Po przyjęciu: depozyt 5 500 € w ciągu 2 tygodni (odliczany od czesnego)", "After admission: €5,500 deposit within 2 weeks (deducted from tuition)", "Après l'admission : acompte de 5 500 € sous 2 semaines (déduit de la scolarité)"),
        ],
        links: [
          { label: l("Rekrutacja (świadectwo zagraniczne)", "Admissions (international diploma)", "Admission (diplôme international)"), url: "https://www.essec.edu/en/program/global-bba/global-bba-international/admission/" },
          { label: l("Portal aplikacyjny", "Application portal", "Portail de candidature"), url: "https://essec.my.site.com/Admission/s/available-programs?language=en_US&code=GBBA&lang=en" },
        ],
      },
    ],
    tips: [
      l(
        "Średnia ocen ma być wyraźnie powyżej przeciętnej i stabilna albo rosnąca. Uczelnia patrzy na wszystkie 3 ostatnie lata.",
        "Your grades should be well above average and steady or rising: the school looks at all of the last 3 years.",
        "Les notes doivent être nettement au-dessus de la moyenne et stables ou en progression : l'école regarde les 3 dernières années.",
      ),
      l(
        "Wszystkie dokumenty trzeba wgrać przed terminem rundy. Niekompletne wnioski nie są rozpatrywane.",
        "Upload every document before the round deadline: incomplete files are not reviewed.",
        "Déposez tous les documents avant la date limite de la session : les dossiers incomplets ne sont pas examinés.",
      ),
    ],
    sources: [
      { label: "ESSEC: Global BBA, applying with an international high school diploma", url: "https://www.essec.edu/en/program/global-bba/global-bba-international/admission/" },
    ],
  },

  "hec-paris": {
    slug: "hec-paris",
    name: "HEC Paris",
    fullName: "École des hautes études commerciales de Paris",
    logo: "/images/logos/hec.png",
    kind: l("Grande école biznesowa", "Business grande école", "Grande école de commerce"),
    city: l("Jouy-en-Josas (pod Paryżem)", "Jouy-en-Josas (near Paris)", "Jouy-en-Josas (près de Paris)"),
    founded: 1881,
    summary: l(
      "Jedna z najlepszych szkół biznesu w Europie. Po maturze jedyną drogą jest licencjat realizowany wspólnie z Uniwersytetem Bocconi. Najbardziej znany program HEC to magisterka (Master in Management).",
      "One of Europe's top business schools. After secondary school, the only route is a bachelor run jointly with Bocconi University; HEC's flagship is its Master in Management.",
      "L'une des meilleures écoles de commerce d'Europe. Après le lycée, la seule voie est un bachelor commun avec l'Université Bocconi ; le programme phare reste le Master in Management.",
    ),
    highlights: [
      l("Licencjat HEC i Bocconi: 3 semestry w Mediolanie, 3 w Jouy-en-Josas", "HEC–Bocconi bachelor: 3 semesters in Milan, 3 in Jouy-en-Josas", "Bachelor HEC–Bocconi : 3 semestres à Milan, 3 à Jouy-en-Josas"),
      l("Master in Management (Grande École) dla osób z licencjatem", "Master in Management (Grande École) for bachelor's graduates", "Master in Management (Grande École) pour les titulaires d'une licence"),
      l("Wszystkie programy dostępne po angielsku", "All programmes available in English", "Tous les programmes disponibles en anglais"),
    ],
    programmes: [
      {
        name: "BASc Data, Society & Organisations (HEC–Bocconi)",
        entry: "after-matura",
        summary: l(
          "Podwójny licencjat z data science zastosowanego do społeczeństwa i organizacji.",
          "A double bachelor in data science applied to society and organisations.",
          "Un double bachelor en science des données appliquée à la société et aux organisations.",
        ),
        language: l("Angielski (min. B2)", "English (B2 minimum)", "Anglais (B2 minimum)"),
        length: l("3 lata (Mediolan, potem Jouy-en-Josas)", "3 years (Milan, then Jouy-en-Josas)", "3 ans (Milan, puis Jouy-en-Josas)"),
        tuition: l(
          "Rok 1: 23 000 €, rok 2: 25 750 €, rok 3: 26 500 € (2026/27; płatne uczelni, na której się studiuje)",
          "Year 1: €23,000, year 2: €25,750, year 3: €26,500 (2026/27; paid to the university where you study)",
          "1re année : 23 000 €, 2e : 25 750 €, 3e : 26 500 € (2026-2027 ; payés à l'université d'accueil)",
        ),
        apply: l(
          "Przez portal Bocconi; to Bocconi wydaje decyzję o przyjęciu.",
          "Through the Bocconi portal; Bocconi issues the admission decision.",
          "Via le portail de Bocconi, qui rend la décision d'admission.",
        ),
        deadlines: [
          { date: "2026-09-29", label: l("Runda 1", "Round 1", "Session 1"), note: l("wyniki 11 listopada 2026", "results 11 November 2026", "résultats le 11 novembre 2026") },
          { date: "2027-01-26", label: l("Runda 2", "Round 2", "Session 2"), note: l("wyniki do połowy marca", "results by mid-March", "résultats mi-mars") },
          { date: "2027-04-27", label: l("Runda 3", "Round 3", "Session 3"), note: l("wyniki do końca maja", "results by end of May", "résultats fin mai") },
        ],
        requirements: [
          l("Wynik SAT lub ACT albo test online Bocconi", "SAT or ACT score, or the Bocconi online test", "Score SAT ou ACT, ou test en ligne de Bocconi"),
          l("Oceny z przedostatniego i trzeciego od końca roku szkoły", "Grades from the third-last and second-last school years", "Notes de l'avant-dernière et de l'antépénultième année"),
          l("List motywacyjny, CV i certyfikat angielskiego", "Motivation letter, CV and English certificate", "Lettre de motivation, CV et certificat d'anglais"),
          l("Rozmowa wideo online", "Online video interview", "Entretien vidéo en ligne"),
        ],
        links: [
          { label: l("Rekrutacja na licencjat", "Bachelor admissions", "Admissions bachelor"), url: "https://www.hec.edu/en/bachelor-programs/admissions" },
          { label: l("Opłaty (Bocconi)", "Fees (Bocconi)", "Frais (Bocconi)"), url: "https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/hec-bocconi-double-program-fees-funding-and-housing" },
        ],
      },
      {
        name: "Master in Management (Grande École)",
        entry: "after-bachelor",
        summary: l(
          "Flagowa magisterka HEC dla absolwentów dowolnego trzyletniego licencjatu, z niewielkim doświadczeniem zawodowym lub bez niego.",
          "HEC's flagship master's for graduates of any three-year bachelor, with little or no work experience.",
          "Le master phare d'HEC, ouvert aux diplômés d'une licence de trois ans, avec peu ou pas d'expérience.",
        ),
        language: l("Angielski", "English", "Anglais"),
        length: l("Szczegóły na stronie programu", "See the programme page", "Voir la page du programme"),
        tuition: l("Czesne podaje strona „Fees and Financing” HEC", "Tuition is listed on HEC's Fees and Financing page", "Frais indiqués sur la page Fees and Financing d'HEC"),
        apply: l("Bezpośrednio przez HEC (opłata 180 €) lub przez Join a School in France (250 €), wybierasz jedną drogę", "Directly with HEC (fee €180) or via Join a School in France (€250), one route only", "Directement auprès d'HEC (180 €) ou via Join a School in France (250 €), une seule voie"),
        deadlines: [
          { date: "2026-10-07", label: l("Runda 1 (12:00)", "Round 1 (noon)", "Session 1 (12 h)"), note: l("wyniki do 19 listopada", "results by 19 November", "résultats au plus tard le 19 novembre") },
          { date: "2026-11-26", label: l("Runda 2 (12:00)", "Round 2 (noon)", "Session 2 (12 h)"), note: l("wyniki do 1 lutego", "results by 1 February", "résultats au plus tard le 1er février") },
          { date: "2027-02-17", label: l("Runda 3 (12:00)", "Round 3 (noon)", "Session 3 (12 h)"), note: l("wyniki do 12 kwietnia", "results by 12 April", "résultats au plus tard le 12 avril") },
          { date: "2027-04-28", label: l("Runda 4 (12:00)", "Round 4 (noon)", "Session 4 (12 h)"), note: l("wyniki do 9 czerwca", "results by 9 June", "résultats au plus tard le 9 juin") },
        ],
        requirements: [
          l("Co najmniej trzyletni licencjat z dowolnej dziedziny", "At least a three-year bachelor's degree in any field", "Au moins une licence de trois ans, toutes disciplines"),
          l("GMAT, GRE lub TAGE MAGE", "GMAT, GRE or TAGE MAGE", "GMAT, GRE ou TAGE MAGE"),
          l("Certyfikat angielskiego (TOEIC, TOEFL, IELTS lub Cambridge), chyba że studia były po angielsku", "English test (TOEIC, TOEFL, IELTS or Cambridge) unless your degree was taught in English", "Test d'anglais (TOEIC, TOEFL, IELTS ou Cambridge), sauf diplôme suivi en anglais"),
        ],
        links: [
          { label: l("Rekrutacja na MiM", "MiM admissions", "Admissions MiM"), url: "https://www.hec.edu/en/master-management/admissions" },
        ],
      },
    ],
    tips: [
      l(
        "Rundy na licencjat HEC–Bocconi zaczynają się już we wrześniu. Test SAT lub test Bocconi warto zaplanować wcześnie.",
        "HEC–Bocconi bachelor rounds start in September: plan the SAT or the Bocconi test early.",
        "Les sessions du bachelor HEC–Bocconi commencent dès septembre : prévoyez le SAT ou le test Bocconi tôt.",
      ),
      l(
        "Jeśli celujesz w magisterkę HEC, najpierw zrób licencjat (np. w Polsce lub we Francji) i przygotuj GMAT.",
        "If you are aiming for an HEC master's, first complete a bachelor's (in Poland or France) and prepare for the GMAT.",
        "Pour viser un master HEC, terminez d'abord une licence (en Pologne ou en France) et préparez le GMAT.",
      ),
    ],
    sources: [
      { label: "HEC Paris: Bachelor admissions", url: "https://www.hec.edu/en/bachelor-programs/admissions" },
      { label: "Bocconi: HEC–Bocconi double program fees", url: "https://www.unibocconi.it/en/applying-bocconi/bachelor-and-law-programs/hec-bocconi-double-program-fees-funding-and-housing" },
      { label: "HEC Paris: Master in Management admissions", url: "https://www.hec.edu/en/master-management/admissions" },
    ],
  },

  "ecole-normale-superieure": {
    slug: "ecole-normale-superieure",
    name: "École Normale Supérieure",
    fullName: "École normale supérieure – PSL",
    logo: "/images/logos/ens.png",
    kind: l("Grande école badawcza (Université PSL)", "Research grande école (PSL University)", "Grande école de recherche (Université PSL)"),
    city: l("Paryż, rue d'Ulm (5. dzielnica)", "Paris, rue d'Ulm (5th arrondissement)", "Paris, rue d'Ulm (5e arrondissement)"),
    founded: 1794,
    summary: l(
      "Najbardziej selektywna uczelnia badawcza we Francji, współzałożycielka Université PSL. Dla studentów zagranicznych prowadzi International Selection: przyjęcie na 3. rok licencjatu lub 1. rok magisterki ze stypendium i pokojem w akademiku.",
      "France's most selective research school and a founding member of PSL University. International students can apply through the International Selection, entering year 3 of a bachelor or year 1 of a master with a grant and a room.",
      "L'école de recherche la plus sélective de France, membre fondateur de l'Université PSL. Les étudiants étrangers y entrent par la Sélection internationale, en L3 ou M1, avec une bourse et un logement.",
    ),
    highlights: [
      l("Nie ma wstępu bezpośrednio po maturze: najpierw studia na uczelni zagranicznej", "No entry straight after secondary school: you first study at a foreign university", "Pas d'entrée directe après le lycée : il faut d'abord étudier dans une université étrangère"),
      l("Ścieżki: nauki humanistyczne i społeczne oraz nauki ścisłe", "Tracks: arts & humanities, and sciences", "Filières : lettres et sciences humaines, et sciences"),
      l("Stypendium 1 000 € miesięcznie przez 3 lata i pokój w akademiku ENS (ścieżka humanistyczna)", "€1,000 per month for 3 years plus a room on an ENS campus (arts & humanities track)", "Bourse de 1 000 € par mois pendant 3 ans et chambre sur un campus de l'ENS (filière lettres)"),
    ],
    programmes: [
      {
        name: "International Selection",
        entry: "after-bachelor",
        summary: l(
          "Konkurs dla studentów uczelni zagranicznych. Po 3 latach otrzymujesz dyplom ENS i magisterkę ze swojej dziedziny.",
          "A competition for students at foreign universities. After 3 years you receive the ENS diploma and a master's in your field.",
          "Un concours pour les étudiants d'universités étrangères. Au bout de 3 ans : diplôme de l'ENS et master dans la discipline.",
        ),
        language: l(
          "Humanistyka: głównie francuski; nauki ścisłe: francuski lub angielski",
          "Humanities: mainly French; sciences: French or English",
          "Lettres : principalement en français ; sciences : français ou anglais",
        ),
        length: l("3 lata (wejście na L3 lub M1)", "3 years (entry at L3 or M1)", "3 ans (entrée en L3 ou M1)"),
        tuition: l("Bez czesnego. Stypendium dla przyjętych.", "No tuition; admitted students receive a grant", "Pas de frais de scolarité ; bourse pour les admis"),
        apply: l("Platforma OnePSL30. Wnioski od 16 października 2026 (14:00).", "OnePSL30 platform, applications from 16 October 2026 (2 pm)", "Plateforme OnePSL30, candidatures à partir du 16 octobre 2026 (14 h)"),
        deadlines: [
          { date: "2026-12-15", label: l("Termin składania wniosków (14:00)", "Application deadline (2 pm)", "Date limite de candidature (14 h)"), note: l("obie ścieżki", "both tracks", "les deux filières") },
          { date: "2027-02-15", label: l("Egzaminy, ścieżka humanistyczna", "Tests, arts & humanities", "Épreuves, filière lettres"), note: l("15–26 lutego, wyniki od 9 marca", "15–26 February, results from 9 March", "du 15 au 26 février, résultats à partir du 9 mars") },
          { date: "2027-03-03", label: l("Egzaminy, nauki ścisłe", "Tests, sciences", "Épreuves, sciences"), note: l("3–19 marca, wyniki od 26 marca", "3–19 March, results from 26 March", "du 3 au 19 mars, résultats à partir du 26 mars") },
        ],
        requirements: [
          l("Humanistyka: co najmniej 3 lata studiów na uczelni zagranicznej; nauki ścisłe: co najmniej 1 rok", "Humanities: at least 3 years at a foreign university; sciences: at least 1 year", "Lettres : au moins 3 ans d'études dans une université étrangère ; sciences : au moins 1 an"),
          l("Wiek poniżej 26 lat w dniu otwarcia naboru", "Under 26 on the day applications open", "Moins de 26 ans à l'ouverture des candidatures"),
          l("Projekt badawczy (do 3 stron) i list motywacyjny", "Research project (up to 3 pages) and cover letter", "Projet de recherche (3 pages maximum) et lettre de motivation"),
          l("Egzaminy zdalne: pisemny i ustne (humanistyka) lub ustny naukowy i rozmowa (nauki ścisłe)", "Remote tests: written and oral (humanities) or scientific oral and interview (sciences)", "Épreuves à distance : écrit et oraux (lettres) ou oral scientifique et entretien (sciences)"),
          l("Można aplikować tylko raz", "You can only apply once", "Une seule candidature possible"),
        ],
        links: [
          { label: l("International Selection 2027", "International Selection 2027", "Sélection internationale 2027"), url: "https://www.ens.psl.eu/en/node/1291/international-selection" },
          { label: l("Platforma OnePSL30", "OnePSL30 platform", "Plateforme OnePSL30"), url: "https://concoursens.candidature.onepsl30.fr/" },
        ],
      },
    ],
    tips: [
      l(
        "Typowa ścieżka z Polski: licencjat na dobrej polskiej uczelni, a na 2. lub 3. roku aplikacja do ENS.",
        "The usual route from Poland: start a bachelor's at a strong Polish university and apply to the ENS in your 2nd or 3rd year.",
        "Le parcours classique depuis la Pologne : une licence dans une bonne université polonaise, puis candidature à l'ENS en 2e ou 3e année.",
      ),
      l(
        "Na ścieżce humanistycznej egzaminy są po francusku, więc potrzebny jest naprawdę dobry francuski.",
        "The humanities exams are in French, so you need genuinely strong French.",
        "Les épreuves de lettres se passent en français : un très bon niveau est indispensable.",
      ),
    ],
    sources: [
      { label: "ENS–PSL: International Selection 2027", url: "https://www.ens.psl.eu/en/node/1291/international-selection" },
    ],
  },

  "escp-paris": {
    slug: "escp-paris",
    name: "ESCP Business School",
    logo: "/images/logos/escp.png",
    kind: l("Europejska szkoła biznesu (grande école)", "European business school (grande école)", "École de commerce européenne (grande école)"),
    city: l("Paryż, Berlin, Londyn, Madryt, Turyn, Warszawa", "Paris, Berlin, London, Madrid, Turin, Warsaw", "Paris, Berlin, Londres, Madrid, Turin, Varsovie"),
    founded: 1819,
    summary: l(
      "Najstarsza szkoła biznesu na świecie, z sześcioma kampusami w Europie. Bachelor in Management to 3 lata w 3 krajach, po angielsku.",
      "The world's oldest business school, with six campuses across Europe. The Bachelor in Management means 3 years in 3 countries, taught in English.",
      "La plus ancienne école de commerce au monde, avec six campus en Europe. Le Bachelor in Management, c'est 3 ans dans 3 pays, en anglais.",
    ),
    highlights: [
      l("Każdy rok w innym kraju", "Each year in a different country", "Chaque année dans un pays différent"),
      l("Nowy podwójny licencjat z Sciences Po: Politics, Economics & Management (4 lata, po angielsku)", "New dual bachelor with Sciences Po: Politics, Economics & Management (4 years, in English)", "Nouveau double bachelor avec Sciences Po : Politics, Economics & Management (4 ans, en anglais)"),
      l("ESCP ma kampus w Warszawie, ale nie prowadzi on tego licencjatu", "ESCP has a Warsaw campus, but this bachelor is not taught there", "L'ESCP a un campus à Varsovie, mais ce bachelor n'y est pas enseigné"),
    ],
    programmes: [
      {
        name: "Bachelor in Management (BSc)",
        entry: "after-matura",
        summary: l(
          "Rok 1: Berlin, Londyn, Paryż lub Turyn. Rok 2: Berlin, Madryt, Paryż lub Turyn. Rok 3: Berlin, Londyn, Madryt, Paryż lub Turyn.",
          "Year 1: Berlin, London, Paris or Turin. Year 2: Berlin, Madrid, Paris or Turin. Year 3: Berlin, London, Madrid, Paris or Turin.",
          "1re année : Berlin, Londres, Paris ou Turin. 2e : Berlin, Madrid, Paris ou Turin. 3e : Berlin, Londres, Madrid, Paris ou Turin.",
        ),
        language: l("Angielski (część zajęć po francusku lub hiszpańsku na późniejszych latach)", "English (some French or Spanish courses in later years)", "Anglais (quelques cours en français ou espagnol ensuite)"),
        length: l("3 lata, 180 ECTS", "3 years, 180 ECTS", "3 ans, 180 ECTS"),
        tuition: l("17 900 € czesnego + 2 900 € opłat = 20 800 € rocznie (paszport UE, nabór 2027)", "€17,900 tuition + €2,900 fees = €20,800 per year (EU passport, 2027 intake)", "17 900 € de scolarité + 2 900 € de frais = 20 800 € par an (passeport UE, rentrée 2027)"),
        apply: l("Portal ESCP, nabór kroczący w rundach. Opłata 80 €.", "ESCP portal, rolling rounds. Fee €80.", "Portail de l'ESCP, sessions successives. Frais de 80 €."),
        deadlines: [
          { date: "2026-11-18", label: l("Runda 1", "Round 1", "Session 1"), note: l("wyniki do 18 grudnia", "results by 18 December", "résultats au plus tard le 18 décembre") },
          { date: "2027-01-14", label: l("Runda 2", "Round 2", "Session 2"), note: l("wyniki do 12 lutego", "results by 12 February", "résultats au plus tard le 12 février") },
          { date: "2027-02-17", label: l("Runda 3", "Round 3", "Session 3"), note: l("wyniki do 18 marca", "results by 18 March", "résultats au plus tard le 18 mars") },
          { date: "2027-03-29", label: l("Runda 4", "Round 4", "Session 4"), note: l("wyniki do 23 kwietnia", "results by 23 April", "résultats au plus tard le 23 avril") },
          { date: "2027-04-20", label: l("Runda 5 (Berlin, Londyn, Madryt)", "Round 5 (Berlin, London, Madrid)", "Session 5 (Berlin, Londres, Madrid)"), note: l("wyniki do 14 maja", "results by 14 May", "résultats au plus tard le 14 mai") },
          { date: "2027-05-20", label: l("Runda 6", "Round 6", "Session 6"), note: l("wyniki do 15 czerwca", "results by 15 June", "résultats au plus tard le 15 juin") },
        ],
        requirements: [
          l("Bez egzaminu wstępnego; wniosek online i rozmowa online z co najmniej dwiema osobami", "No entrance exam: online application and an online interview with at least two people", "Pas de concours : dossier en ligne et entretien en ligne avec au moins deux personnes"),
          l("Angielski: IELTS 6.5, TOEFL iBT 4.5 (nowa skala) lub CAE 180; certyfikat można dosłać później", "English: IELTS 6.5, TOEFL iBT 4.5 (new scale) or CAE 180; you can send it later", "Anglais : IELTS 6,5, TOEFL iBT 4,5 (nouvelle échelle) ou CAE 180 ; envoi possible plus tard"),
          l("Francuski B1 dla 2. roku w Paryżu, C1 dla 3. roku w Paryżu", "French B1 for year 2 in Paris, C1 for year 3 in Paris", "Français B1 pour la 2e année à Paris, C1 pour la 3e"),
          l("Po przyjęciu: depozyt 3 500 € (odliczany od opłat)", "After admission: €3,500 deposit (deducted from fees)", "Après l'admission : acompte de 3 500 € (déduit des frais)"),
        ],
        links: [
          { label: l("Strona programu", "Programme page", "Page du programme"), url: "https://escp.eu/programmes/bachelor-in-management-BSc" },
        ],
      },
    ],
    tips: [
      l(
        "Turyn ma osobny, wcześniejszy kalendarz rund (pierwsza runda już 27 października 2026).",
        "Turin has its own, earlier round calendar (round 1 closed on 27 October 2026).",
        "Turin a son propre calendrier, plus précoce (session 1 close le 27 octobre 2026).",
      ),
      l(
        "Kandydaci z francuską maturą (baccalauréat), którzy chcą zacząć w Paryżu, aplikują przez Parcoursup. Z polską maturą aplikujesz przez portal ESCP.",
        "Candidates with the French baccalauréat who want to start in Paris apply via Parcoursup; with a Polish matura you use the ESCP portal.",
        "Les bacheliers français qui veulent commencer à Paris passent par Parcoursup ; avec une matura polonaise, on passe par le portail ESCP.",
      ),
    ],
    sources: [
      { label: "ESCP: Bachelor in Management (BSc)", url: "https://escp.eu/programmes/bachelor-in-management-BSc" },
    ],
  },

  "universite-paris-saclay": {
    slug: "universite-paris-saclay",
    name: "Université Paris-Saclay",
    logo: "/images/logos/saclay.png",
    kind: l("Publiczny uniwersytet badawczy", "Public research university", "Université publique de recherche"),
    city: l("Plateau de Saclay i okolice (na południe od Paryża)", "Saclay plateau and nearby (south of Paris)", "Plateau de Saclay et alentours (sud de Paris)"),
    summary: l(
      "Najwyżej oceniana francuska uczelnia: 13. miejsce na świecie i 1. w UE w rankingu szanghajskim 2026. Studia licencjackie są prawie bezpłatne i głównie po francusku.",
      "France's highest-ranked university: 13th in the world and 1st in the EU in the 2026 Shanghai ranking. Bachelor studies are almost free and mostly in French.",
      "La première université française : 13e mondiale et 1re de l'UE au classement de Shanghai 2026. La licence est quasi gratuite et surtout en français.",
    ),
    highlights: [
      l("13. miejsce na świecie w rankingu szanghajskim 2026", "13th in the world in the 2026 Shanghai ranking", "13e mondiale au classement de Shanghai 2026"),
      l("Licencjaty (licence) i podwójne licencjaty, głównie po francusku", "Licences and double licences, mostly in French", "Licences et doubles licences, surtout en français"),
      l("Wiele magisterek po angielsku (nabór od połowy stycznia 2027)", "Many English-taught master's (applications from mid-January 2027)", "Nombreux masters en anglais (candidatures dès mi-janvier 2027)"),
    ],
    programmes: [
      {
        name: "Licence (1. rok)",
        entry: "after-matura",
        summary: l(
          "Klasyczny trzyletni licencjat na publicznym uniwersytecie. Selektywne podwójne licencjaty łączą dwie dziedziny.",
          "A classic three-year public-university bachelor; selective double licences combine two fields.",
          "Une licence universitaire classique en trois ans ; les doubles licences sélectives associent deux disciplines.",
        ),
        language: l("Francuski (często wymagane B2)", "French (B2 often required)", "Français (B2 souvent exigé)"),
        length: l("3 lata", "3 years", "3 ans"),
        tuition: PUBLIC_FEES_2026,
        apply: l(
          "Parcoursup. Obywatele UE przechodzą tę samą procedurę co Francuzi.",
          "Parcoursup: EU citizens follow the same procedure as French students.",
          "Parcoursup : les citoyens de l'UE suivent la même procédure que les candidats français.",
        ),
        deadlines: PARCOURSUP_2027,
        requirements: [
          l("Świadectwa z liceum i plan kształcenia; list motywacyjny (projet de formation)", "School transcripts and a short statement of your study project (projet de formation)", "Bulletins de lycée et projet de formation motivé"),
          l("Francuski na poziomie umożliwiającym studia (często B2)", "French good enough to study (often B2)", "Un niveau de français suffisant pour étudier (souvent B2)"),
        ],
        links: [
          { label: l("Jak aplikować na licencjat", "Applying for undergraduate programmes", "Candidater en licence"), url: "https://www.universite-paris-saclay.fr/en/admissions/applying-undergraduate-programmes" },
          { label: l("Oferta studiów licencjackich", "Undergraduate catalogue", "Offre de premier cycle"), url: "https://www.universite-paris-saclay.fr/formation/premier-cycle" },
          parcoursupLink,
        ],
      },
    ],
    tips: [
      l(
        "Strona uczelni nie wymienia wprost polskiej matury. Przed aplikacją potwierdź na Parcoursup lub mailowo, że nie potrzebujesz dodatkowej procedury (DAP).",
        "The university page does not name the Polish matura: before applying, confirm on Parcoursup or by email that you don't need the separate DAP procedure.",
        "La page de l'université ne cite pas la matura polonaise : vérifiez sur Parcoursup ou par e-mail qu'aucune DAP n'est requise.",
      ),
      l(
        "Wyniki matury poznasz dopiero w lipcu, a odpowiedzi z Parcoursup przychodzą od 1 czerwca. Przyjęcie zależy od ocen z liceum.",
        "Matura results only arrive in July, while Parcoursup answers start on 1 June: admission is based on your school grades.",
        "Les résultats de la matura arrivent en juillet, alors que Parcoursup répond dès le 1er juin : l'admission repose sur les notes de lycée.",
      ),
    ],
    sources: [
      { label: "Université Paris-Saclay: Applying for undergraduate programmes", url: "https://www.universite-paris-saclay.fr/en/admissions/applying-undergraduate-programmes" },
      { label: "Université Paris-Saclay: Classement de Shanghai 2026", url: "https://www.universite-paris-saclay.fr/actualites/classement-de-shanghai-2026-luniversite-paris-saclay-1ere-universite-francaise-dans-le-top-20-des-meilleures-universites-de-recherche-au-monde" },
      { label: "Service-Public: droits d'inscription 2026-2027", url: "https://www.service-public.gouv.fr/particuliers/actualites/A17481" },
    ],
  },

  insead: {
    slug: "insead",
    name: "INSEAD",
    logo: "/images/logos/insead.png",
    kind: l("Szkoła biznesu (tylko studia podyplomowe)", "Business school (graduate only)", "École de commerce (cycles supérieurs uniquement)"),
    city: l("Fontainebleau, Singapur, Abu Zabi", "Fontainebleau, Singapore, Abu Dhabi", "Fontainebleau, Singapour, Abou Dhabi"),
    founded: 1957,
    summary: l(
      "Światowej klasy szkoła biznesu bez studiów licencjackich. Dla osób zaraz po licencjacie prowadzi 14-miesięczny Master in Management, a dla doświadczonych menedżerów słynne MBA.",
      "A world-class business school with no undergraduate programme. Recent graduates can join the 14-month Master in Management; experienced professionals, the famous MBA.",
      "Une business school de premier plan sans programme de licence. Les jeunes diplômés peuvent rejoindre le Master in Management de 14 mois ; les cadres expérimentés, le célèbre MBA.",
    ),
    highlights: [
      l("Brak licencjatu: nie da się aplikować zaraz po maturze", "No bachelor's: you cannot apply straight after secondary school", "Pas de licence : impossible de candidater juste après le lycée"),
      l("Master in Management: 14 miesięcy, start w sierpniu, kilka kampusów", "Master in Management: 14 months, August start, multiple campuses", "Master in Management : 14 mois, rentrée en août, plusieurs campus"),
    ],
    programmes: [
      {
        name: "Master in Management (MIM)",
        entry: "after-bachelor",
        summary: l(
          "Program dla absolwentów licencjatu bez wymaganego doświadczenia zawodowego.",
          "For bachelor's graduates; full-time work experience is not required.",
          "Pour les diplômés d'une licence ; l'expérience professionnelle n'est pas exigée.",
        ),
        language: l("Angielski", "English", "Anglais"),
        length: l("14 miesięcy, start w sierpniu 2027", "14 months, starting August 2027", "14 mois, rentrée en août 2027"),
        tuition: l("57 870 € za cały program (wg strony programu)", "€57,870 for the programme (as listed by INSEAD)", "57 870 € pour le programme (selon INSEAD)"),
        apply: l("Portal INSEAD. Opłata 180 €. Stypendia we wszystkich rundach.", "INSEAD portal, fee €180; scholarships in every round", "Portail INSEAD, frais de 180 € ; bourses à chaque session"),
        deadlines: [
          { date: "2026-10-06", label: l("Runda 1", "Round 1", "Session 1"), note: l("decyzja końcowa 4 grudnia", "final decision 4 December", "décision finale le 4 décembre") },
          { date: "2026-12-08", label: l("Runda 2", "Round 2", "Session 2"), note: l("decyzja końcowa 5 lutego", "final decision 5 February", "décision finale le 5 février") },
          { date: "2027-02-23", label: l("Runda 3", "Round 3", "Session 3"), note: l("decyzja końcowa 16 kwietnia", "final decision 16 April", "décision finale le 16 avril") },
          { date: "2027-04-27", label: l("Runda 4", "Round 4", "Session 4"), note: l("decyzja końcowa 25 czerwca", "final decision 25 June", "décision finale le 25 juin") },
        ],
        requirements: [
          l("Licencjat lub równoważny dyplom", "A bachelor's degree or equivalent", "Une licence ou équivalent"),
          l("GMAT lub GRE (ważne 5 lat, wysyłane bezpośrednio do INSEAD)", "GMAT or GRE (valid 5 years, sent directly to INSEAD)", "GMAT ou GRE (valables 5 ans, envoyés directement à l'INSEAD)"),
          l("Test angielskiego (TOEFL, IELTS, PTE lub Duolingo), chyba że studia były po angielsku", "English test (TOEFL, IELTS, PTE or Duolingo) unless your degree was in English", "Test d'anglais (TOEFL, IELTS, PTE ou Duolingo), sauf diplôme en anglais"),
        ],
        links: [
          { label: l("Rekrutacja na MIM", "MIM admissions", "Admissions MIM"), url: "https://www.insead.edu/master-programmes/mim/admissions" },
        ],
      },
    ],
    tips: [
      l(
        "INSEAD to cel na po licencjacie. Wcześniej zbuduj profil: dobre wyniki na studiach, staże i GMAT.",
        "INSEAD is a goal for after your bachelor's: build your profile first with strong grades, internships and the GMAT.",
        "L'INSEAD est un objectif pour après la licence : construisez d'abord votre profil (notes, stages, GMAT).",
      ),
    ],
    sources: [
      { label: "INSEAD: Master in Management admissions", url: "https://www.insead.edu/master-programmes/mim/admissions" },
    ],
  },

  "pantheon-assas": {
    slug: "pantheon-assas",
    name: "Université Paris-Panthéon-Assas",
    logo: "/images/logos/assas.png",
    kind: l("Publiczny uniwersytet (prawo, ekonomia, zarządzanie)", "Public university (law, economics, management)", "Université publique (droit, économie, gestion)"),
    city: l("Paryż (Dzielnica Łacińska) i Melun", "Paris (Latin Quarter) and Melun", "Paris (Quartier latin) et Melun"),
    summary: l(
      "Najbardziej znany francuski wydział prawa. Studia są prawie bezpłatne, ale wybiórcze i prowadzone po francusku. Na licencjat aplikuje się przez Parcoursup.",
      "France's best-known law faculty: almost free, selective and taught in French. You apply for the licence through Parcoursup.",
      "La faculté de droit la plus réputée de France : quasi gratuite, sélective et en français. La licence se demande sur Parcoursup.",
    ),
    highlights: [
      l("Licencjat z prawa, ekonomii i zarządzania, także w wersji podwójnej i międzynarodowej", "Licences in law, economics and management, including double and international tracks", "Licences en droit, économie et gestion, y compris doubles cursus et parcours internationaux"),
      l("Collège de droit: elitarna ścieżka z podwójnym dyplomem, 75 miejsc", "Collège de droit: selective double-diploma track, 75 places", "Collège de droit : filière d'excellence à double diplôme, 75 places"),
    ],
    programmes: [
      {
        name: "Licence en droit (1. rok)",
        entry: "after-matura",
        summary: l(
          "Trzyletni licencjat z prawa francuskiego. Ta sama procedura obejmuje ścieżki międzynarodowe i podwójne kierunki.",
          "A three-year licence in French law; the same procedure covers international tracks and double degrees.",
          "Une licence de droit en trois ans ; la même procédure couvre les parcours internationaux et doubles cursus.",
        ),
        language: l("Francuski", "French", "Français"),
        length: l("3 lata", "3 years", "3 ans"),
        tuition: PUBLIC_FEES_2026,
        apply: l("Parcoursup (także Collège de droit jako osobny wybór)", "Parcoursup (Collège de droit is a separate choice)", "Parcoursup (le Collège de droit est un vœu spécifique)"),
        deadlines: PARCOURSUP_2027,
        requirements: [
          l("Świadectwa z liceum i list motywacyjny (projet de formation)", "School transcripts and a statement of your study project", "Bulletins de lycée et projet de formation motivé"),
          l("Bardzo dobry francuski: zajęcia i egzaminy są po francusku", "Very good French: lectures and exams are in French", "Très bon niveau de français : cours et examens en français"),
          l("Collège de droit: test (logika, słownictwo, wiedza ogólna) i rozmowa; dodatkowo 485 € + 118 € rocznie", "Collège de droit: a test (logic, vocabulary, general knowledge) and an interview; extra fees of €485 + €118 per year", "Collège de droit : QCM (logique, vocabulaire, culture générale) et entretien ; frais supplémentaires de 485 € + 118 € par an"),
        ],
        links: [
          { label: l("Rekrutacja na licencjat", "Licence admissions", "Inscriptions en licence"), url: "https://www.assas-universite.fr/fr/formations/candidatures/inscriptions-en-licence" },
          { label: l("Collège de droit", "Collège de droit", "Collège de droit"), url: "https://www.assas-universite.fr/fr/formations/offre-de-formation/college-droit" },
          parcoursupLink,
        ],
      },
    ],
    tips: [
      l(
        "Prawo francuskie to dobry wybór, jeśli planujesz karierę we Francji lub w instytucjach UE. Przed rozpoczęciem nauki język musi być na wysokim poziomie.",
        "French law makes sense if you plan a career in France or EU institutions; your French needs to be strong before you start.",
        "Le droit français a du sens si vous visez une carrière en France ou dans les institutions européennes ; le français doit être solide dès le départ.",
      ),
    ],
    sources: [
      { label: "Assas: Inscriptions en licence", url: "https://www.assas-universite.fr/fr/formations/candidatures/inscriptions-en-licence" },
      { label: "Assas: Collège de droit", url: "https://www.assas-universite.fr/fr/formations/offre-de-formation/college-droit" },
    ],
  },
};

export const guideList = Object.values(universityGuides);
