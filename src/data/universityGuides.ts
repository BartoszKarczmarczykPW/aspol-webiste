
export interface UniversityGuide {
    slug: string;
    name: string;
    logo: string;
    content: {
        en: string;
        fr: string;
        pl: string;
    };
}


export const universityGuides: Record<string, UniversityGuide> = {
    "sciences-po": {
        slug: "sciences-po",
        name: "Sciences Po",
        logo: "/images/logos/sciences-po.png",
        content: {
            pl: `
# Sciences Po

### Magisterka po francusku: ✅

- Institut d’Études Politiques de Paris (IEP de Paris) ; Instytut Nauk Politycznych w Paryżu
- Założona w 1872 r.
- Status Grande École
- 14 tys. studentów (4 tys. na licencjacie, 10 tys. na magistrach i doktoratach)
- Trzyletni multidyscyplinarny licencjat z możliwością studiowania po angielsku - trzy ścieżki do wyboru i duża różnorodnością zajęć (w systemie 2+1 albo 2+2, wymiana albo podwójny dyplom, pierwsze dwa lata na ScPo)
- 7 kampusów regionalnych, każdy o innej specjalizacji regionalnej: Paryż, Reims, Menton, Le Havre, Dijon, Nancy, Poitiers. 
- Program podwójnego dyplomu między Sciences Po i topowymi uniwersytetami na poziomie licencjackim: University of California - Berkeley, Columbia University, University College London, Hong Kong University, Freie Universität Berlin, Keio University (Japan), National Univerity of Singapore, University of British Columbia (Kanada), University of Sydney
- BASC: program podwójnego dyplomu z nauk ścisłych i humanistycznych/ społecznych
- Program podwójnego dyplomu na poziomie magisterki: 
  - w Ameryce Północnej: Columbia University, Georgetown Law School, University of Philadelphia Law School, UCLA Luskin School of Public Affairs, MUNK School of Global Affairs at the University of Toronto
  - w Azji: University of Tokyo, Fudan University (Shanghai), Peking University
  - w Europie: Freie Universität Berlin, Hertie School of Governance Berlin, King’s College London, London School of Economics, Stockholm School of Economics, Università Bocconi (Włochy), University of St. Gallen (Szwajcaria)
  - we Francji: HEC Paris, Université Paris I Panthéon Sorbonne, Sorboone Université, Agroparistech, ISAE-Supaero, Saint-Cyr Coëtquidan, Université de Paris
  - w Ameryce Łacińskiej: CEDUA (Meksyk), Fundação Getulio Vargas (Brazylia)
- Bogata oferta specjalistycznych programów magisterskich.
- Gwarantowane przyjęcie na magistra dla absolwentów licencjatu.

### Proces rekrutacyjny:
Studenci, którzy nie ukończyli francuskiego liceum, aplikują za pomocą specjalnego portalu tej uczelni. Pierwszy etap zazwyczaj trwa od listopada do kwietnia (zależy od roku). Można za niego otrzymać 20 punktów za każdą z trzech kategorii :
1. Oceny z matury (jeśli na tym etapie nie mamy wyników matury, należy podać oceny przewidywane i/lub wyniki matur próbnych). Żadne konkretne przedmioty nie są wymagane.
2. Wyniki podczas trzech ostatnich lat nauki : należy podać oceny z 3 ostatnich lat oraz uzupełnić sekcję o aktywnościach i zainteresowaniach, gdzie przedstawimy działania niezwiązane ściśle z nauką
3. Eseje : należy napisać w sumie cztery eseje; trzy dotyczące motywacji oraz pracę na jeden z pięciu podanych na stronie uczelni tematów

Należy również podać nasze dane osobowe oraz podać dwa kampusy, na które chcemy aplikować. Istnieje możliwość dołączenia listów rekomendacyjnych od nauczycieli oraz dodatkowych certyfikatów (np. językowych). Możemy napisać naszą aplikację po angielsku lub po francusku. Na sam koniec tego etapu trzeba zapłacić bezzwrotną opłatę aplikacyjną.
Jeśli uzyskamy odpowiednią ilość punktów w pierwszym etapie, otrzymamy zaproszenie na rozmowę, która również oceniana jest na 20 punktów.

[Strona admissions](https://www.sciencespo.fr/admissions/en.html)
[Aplikuj](https://admission.sciencespo.fr/applicants/procedure)
`,
                        en: `
# Sciences Po

### Master’s in French: ✅

- Institut d’Études Politiques de Paris (IEP de Paris)
- Founded in 1872
- Grande École status
- 14,000 students (4,000 undergraduates; 10,000 master’s and doctoral students)
- Three‑year multidisciplinary bachelor with options in English — three tracks and a wide range of courses (2+1 or 2+2; exchange or dual degree; first two years at Sciences Po)
- 7 regional campuses with different regional specializations: Paris, Reims, Menton, Le Havre, Dijon, Nancy, Poitiers
- Undergraduate dual‑degree programs with top universities: University of California – Berkeley, Columbia University, University College London, Hong Kong University, Freie Universität Berlin, Keio University (Japan), National University of Singapore, University of British Columbia (Canada), University of Sydney
- BASC: dual degree in sciences and humanities/social sciences
- Master’s dual‑degree programs:
    - North America: Columbia University, Georgetown Law School, University of Pennsylvania Law School, UCLA Luskin School of Public Affairs, MUNK School of Global Affairs at the University of Toronto
    - Asia: University of Tokyo, Fudan University (Shanghai), Peking University
    - Europe: Freie Universität Berlin, Hertie School of Governance Berlin, King’s College London, London School of Economics, Stockholm School of Economics, Università Bocconi (Italy), University of St. Gallen (Switzerland)
    - France: HEC Paris, Université Paris I Panthéon Sorbonne, Sorbonne Université, AgroParisTech, ISAE‑Supaero, Saint‑Cyr Coëtquidan, Université de Paris
    - Latin America: CEDUA (Mexico), Fundação Getulio Vargas (Brazil)
- Wide range of specialized master’s programs
- Guaranteed admission to master’s for Sciences Po undergraduate graduates

### Admissions process:
Students who did not complete French high school apply through the university’s dedicated portal. The first stage typically runs from November to April (varies by year). You can earn 20 points in each of three categories:
1. Matura (high‑school leaving exam) grades (if not available yet, provide predicted grades and/or mock exam results). No specific subjects are required.
2. Grades from the last three years of school, plus activities and interests (non‑academic achievements).
3. Essays: four essays total — three about motivation and one on a topic chosen from the five provided by the university.

You must also provide personal details and choose two campuses you want to apply to. Recommendation letters and additional certificates (e.g., language) can be included. You may apply in English or French. At the end of this stage, a non‑refundable application fee is required. If you achieve the required score in stage one, you will be invited to an interview, also scored out of 20.

[Admissions page](https://www.sciencespo.fr/admissions/en.html)
[Apply](https://admission.sciencespo.fr/applicants/procedure)
`,
                        fr: `
# Sciences Po

### Master en français : ✅

- Institut d’Études Politiques de Paris (IEP de Paris)
- Fondée en 1872
- Statut Grande École
- 14 000 étudiants (4 000 en licence ; 10 000 en master et doctorat)
- Licence pluridisciplinaire de trois ans avec options en anglais — trois parcours et un large choix de cours (2+1 ou 2+2 ; échange ou double diplôme ; deux premières années à Sciences Po)
- 7 campus régionaux spécialisés : Paris, Reims, Menton, Le Havre, Dijon, Nancy, Poitiers
- Doubles diplômes de licence avec des universités de premier plan : University of California – Berkeley, Columbia University, University College London, Hong Kong University, Freie Universität Berlin, Keio University (Japon), National University of Singapore, University of British Columbia (Canada), University of Sydney
- BASC : double diplôme sciences et humanités/sciences sociales
- Doubles diplômes de master :
    - Amérique du Nord : Columbia University, Georgetown Law School, University of Pennsylvania Law School, UCLA Luskin School of Public Affairs, MUNK School of Global Affairs (University of Toronto)
    - Asie : University of Tokyo, Fudan University (Shanghai), Peking University
    - Europe : Freie Universität Berlin, Hertie School of Governance Berlin, King’s College London, London School of Economics, Stockholm School of Economics, Università Bocconi (Italie), University of St. Gallen (Suisse)
    - France : HEC Paris, Université Paris I Panthéon Sorbonne, Sorbonne Université, AgroParisTech, ISAE‑Supaero, Saint‑Cyr Coëtquidan, Université de Paris
    - Amérique latine : CEDUA (Mexique), Fundação Getulio Vargas (Brésil)
- Large éventail de programmes de master spécialisés
- Admission garantie en master pour les diplômés de la licence Sciences Po

### Procédure d’admission :
Les étudiants n’ayant pas effectué leur lycée en France postulent via le portail dédié de l’université. La première étape se déroule généralement de novembre à avril (selon l’année). Elle comporte 20 points par catégorie :
1. Notes du baccalauréat (si non disponibles, fournir les notes prévisionnelles et/ou les résultats d’examens blancs). Aucun sujet spécifique n’est requis.
2. Notes des trois dernières années et activités/intérêts (réalisations non strictement académiques).
3. Essais : quatre essais au total — trois sur la motivation et un sur un sujet proposé par l’université.

Il faut aussi fournir ses données personnelles et choisir deux campus. Des lettres de recommandation et des certificats supplémentaires (par ex. linguistiques) peuvent être ajoutés. La candidature peut être rédigée en anglais ou en français. À la fin de cette étape, des frais de candidature non remboursables sont requis. En cas de score suffisant, vous serez invité à un entretien noté sur 20.

[Page admissions](https://www.sciencespo.fr/admissions/en.html)
[Candidater](https://admission.sciencespo.fr/applicants/procedure)
`,
                }
    },
    "ecole-polytechnique": {
        slug: "ecole-polytechnique",
        name: "École Polytechnique",
        logo: "/images/logos/polytechnique.png",
        content: {
            pl: `
# École Polytechnique

### Magisterka po angielsku: ✅

- École Polytechnique (l’X)
- Założona w 1794 r.
- Status Grande École
- Znajduje się pod Paryżem, w Palaiseau (około godziny drogi od Paryża).
- Mottem uczelni jest "Pour la Patrie, les Sciences et la Gloire" (Dla Ojczyzny, Nauki i Chwały).
- Uczelnia oferuje studia na poziomie licencjackim, magisterskim, doktoranckim oraz program inżynierski (Ingénieur Polytechnicien).

### Proces rekrutacyjny (Bachelor):
Aplikacja na program Bachelor of Science odbywa się przez portal internetowy uczelni. Wymagane są m.in. transkrypty ocen z liceum, CV, list motywacyjny (Personal Statement), dwa listy rekomendacyjne oraz certyfikat znajomości języka angielskiego (C1).
Proces składa się z dwóch etapów:
1. Ocena kwalifikowalności na podstawie przesłanych dokumentów.
2. Rozmowa kwalifikacyjna (online) z zakresu matematyki oraz ogólna, sprawdzająca motywację i profil kandydata.

**Czesne:** Szczegóły dotyczące czesnego dostępne są na stronie uczelni.

[Strona Bachelor](https://programmes.polytechnique.edu/bachelor/bachelor-of-science)
[Aplikuj](https://candidatures-bachelor.polytechnique.fr/candidatures/index.php)
`,
        en: `
# École Polytechnique

### Master’s in English: ✅

- École Polytechnique (l’X)
- Founded in 1794
- Grande École status
- Located near Paris in Palaiseau (about 1 hour from Paris)
- Motto: “Pour la Patrie, les Sciences et la Gloire” (For the Homeland, Science and Glory)
- Offers bachelor’s, master’s, doctoral studies and the engineering program (Ingénieur Polytechnicien)

### Admissions (Bachelor):
Applications for the Bachelor of Science are submitted through the university’s online portal. Required documents include high‑school transcripts, CV, personal statement, two recommendation letters, and proof of English (C1).
The process has two stages:
1. Eligibility review based on submitted documents.
2. Online interview covering mathematics plus a general interview assessing motivation and profile.

**Tuition:** Details are available on the university website.

[Bachelor page](https://programmes.polytechnique.edu/bachelor/bachelor-of-science)
[Apply](https://candidatures-bachelor.polytechnique.fr/candidatures/index.php)
`,
        fr: `
# École Polytechnique

### Master en anglais : ✅

- École Polytechnique (l’X)
- Fondée en 1794
- Statut Grande École
- Située près de Paris à Palaiseau (environ 1 heure de Paris)
- Devise : « Pour la Patrie, les Sciences et la Gloire »
- Propose des études de licence, master, doctorat et un programme d’ingénieur (Ingénieur Polytechnicien)

### Admissions (Bachelor) :
La candidature au Bachelor of Science se fait via le portail en ligne de l’université. Documents requis : relevés de notes du lycée, CV, lettre de motivation (Personal Statement), deux lettres de recommandation et certificat d’anglais (C1).
La procédure comporte deux étapes :
1. Évaluation de l’éligibilité sur dossier.
2. Entretien en ligne (mathématiques) + entretien général sur la motivation et le profil.

**Frais de scolarité :** détails disponibles sur le site de l’université.

[Page Bachelor](https://programmes.polytechnique.edu/bachelor/bachelor-of-science)
[Candidater](https://candidatures-bachelor.polytechnique.fr/candidatures/index.php)
`,
    }
    },
    "essec": {
        slug: "essec",
        name: "ESSEC Business School",
        logo: "/images/logos/essec.png",
        content: {
            pl: `
# ESSEC Business School

- Założona w 1907 r.
- Status Grande École
- Znajduje się pod Paryżem, w Cergy (około godziny drogi od Paryża).
- Uczelnia oferuje studia na poziomie licencjackim, magisterskim, doktoranckim oraz program MBA.

### Proces rekrutacyjny:
Proces rekrutacyjny na tę uczelnię odbywa się przede wszystkim przez specjalną platformę uczelni. Aplikacja przez portal uczelniany odbywa się w czterech turach, ale najlepiej aplikować jak najwcześniej. Składa się z dwóch etapów: aplikacji internetowej, gdzie przesyła się dokumenty administracyjne, certyfikat językowy, CV, oraz listy opisujące twoją dotychczasową działalność akademicką, sportową, woluntarystyczną. Drugim etapem procesu rekrutacyjnego są rozmowy kwalifikacyjne, podczas których zadawane są pytania sprawdzające motywację ucznia, pytania dotyczące jego profilu lub pytania dotyczące zagadnień ekonomicznych i innych wyzwań dzisiejszego świata. Etap rozmowy kwalifikacyjnej może się nie odbyć, jeśli uczelnia uzna, iż profil studenta jest wyjątkowy i na tyle bogaty, że ocena jego zachowania, rozumowania i prezentacji nie jest potrzebna.

[Strona uniwersytetu](https://www.essec.edu/fr/)
[Aplikuj](https://essec.myapply.online/login?ReturnUrl=%2F)

### Rejestracja administracyjna:
Procedura rejestracji administracyjnej odbywa się przed każdym rokiem akademickim. Obowiązkowa jest opłata na życie studenckie (CVEC).

### Czesne roczne:
Czesne na tej uczelni jest zależne od statusu studenta. Ta kwota może być zmniejszona w przypadku dostania oferty na studia z wyróżnieniem.

### Kalendarz i zapisy na zajęcia:
Studia licencjackie trwają cztery lata i każdy rok obejmuje dwa semestry. Zazwyczaj rok akademicki trwa od połowy września do połowy maja. Co około półtorej miesiąca występują tygodniowe przerwy od zajęć, a na święta Bożego Narodzenia przypadają dwa tygodnie wolnego. Pomiędzy pierwszym a drugim rokiem studiów każdy student musi odbyć trzymiesięczny staż. Pomiędzy drugim a trzecim rokiem studiów każdy student musi odbyć miesięczny wolontariat. Na trzecim roku, każdy student wybiera większość przedmiotów według swoich zainteresowań.

### Życie studenckie:
Życie studenckie w ESSECu jest naprawdę bogate, ponieważ w szkole znajduje się ponad 100 klubów zainteresowań oraz odbywa się wiele ciekawych eventów. Należy pamiętać, iż nie wszystkie kluby są dostępne dla międzynarodowych studentów lub osób nie mówiących po francusku. Większość studentów mieszka w akademiku ‘’Residence du Parc”, który jest sercem towarzyskim dla większości studentów pierwszego roku, ponieważ jest zarezerwowany tylko dla pierwszoroczniaków.

### Wymiany:
Szkoła ma bardzo bogatą ofertę wymian międzynarodowych oraz programów międzyuczelnianych. Możliwość wzięcia w nich udziału jest podyktowana średnią uzyskaną na pierwszym roku, a szczególnie podczas pierwszego semestru. Szkoła posiada trzy kampusy na świecie, w Cergy, Singapurze oraz Rabacie. Oprócz tego może poszczycić się bogatą siatką szkół partnerskich na całym świecie.
`,
            en: `
# ESSEC Business School

- Founded in 1907
- Grande École status
- Located near Paris in Cergy (about 1 hour from Paris)
- Offers bachelor’s, master’s, doctoral programs and MBA

### Admissions process:
Applications are mainly submitted through ESSEC’s dedicated platform. There are four application rounds, but it’s best to apply early. The process has two stages: the online application (administrative documents, language certificate, CV, and essays about academic, sports, and volunteer activities) and interviews, where motivation, profile, and current economic/social topics are discussed. The interview stage may be waived if the university considers the candidate’s profile exceptionally strong.

[University website](https://www.essec.edu/fr/)
[Apply](https://essec.myapply.online/login?ReturnUrl=%2F)

### Administrative registration:
Registration takes place before each academic year. The student‑life fee (CVEC) is mandatory.

### Annual tuition:
Tuition depends on the student’s status. The amount can be reduced for students admitted with distinction.

### Academic calendar & course registration:
Undergraduate studies last four years with two semesters per year. The academic year usually runs from mid‑September to mid‑May, with a one‑week break about every 1.5 months and two weeks at Christmas. Between years 1–2, each student completes a three‑month internship. Between years 2–3, each student completes a one‑month volunteer placement. In year 3, most courses are chosen based on personal interests.

### Student life:
Student life at ESSEC is very rich: there are 100+ clubs and many events. Note that not all clubs are open to international students or non‑French speakers. Most first‑year students live in the “Résidence du Parc” dorm, which is the social hub for the first‑year cohort.

### Exchanges:
The school offers extensive international exchanges and inter‑university programs. Participation depends on the grade average, especially after the first semester. ESSEC has campuses in Cergy, Singapore, and Rabat, and a wide network of partner schools worldwide.
`,
            fr: `
# ESSEC Business School

- Fondée en 1907
- Statut Grande École
- Située près de Paris à Cergy (environ 1 heure de Paris)
- Propose des études de licence, master, doctorat ainsi qu’un MBA

### Procédure d’admission :
La candidature se fait principalement via la plateforme dédiée de l’école. Il existe quatre sessions, mais il est conseillé de candidater tôt. La procédure comporte deux étapes : dossier en ligne (documents administratifs, certificat de langue, CV et lettres décrivant vos activités académiques, sportives et associatives), puis des entretiens portant sur la motivation, le profil et des sujets économiques et d’actualité. L’entretien peut être supprimé si le profil est jugé exceptionnel.

[Site de l’université](https://www.essec.edu/fr/)
[Candidater](https://essec.myapply.online/login?ReturnUrl=%2F)

### Inscription administrative :
L’inscription se fait avant chaque année académique. La contribution vie étudiante (CVEC) est obligatoire.

### Frais de scolarité annuels :
Les frais dépendent du statut de l’étudiant. Ils peuvent être réduits en cas d’admission avec distinction.

### Calendrier & choix des cours :
La licence dure quatre ans avec deux semestres par an. L’année académique va généralement de mi‑septembre à mi‑mai, avec une semaine de pause environ toutes les 6–7 semaines et deux semaines à Noël. Entre la 1re et la 2e année : stage de 3 mois. Entre la 2e et la 3e : volontariat d’un mois. En 3e année, la majorité des cours est choisie selon les intérêts de l’étudiant.

### Vie étudiante :
ESSEC propose plus de 100 clubs et de nombreux événements. Tous les clubs ne sont pas accessibles aux étudiants internationaux ou non francophones. La plupart des étudiants de 1re année vivent à la “Résidence du Parc”, cœur de la vie sociale.

### Échanges :
L’école offre un large réseau d’échanges internationaux et de partenariats. L’accès dépend de la moyenne, surtout du 1er semestre. ESSEC dispose de campus à Cergy, Singapour et Rabat, ainsi que d’un vaste réseau d’écoles partenaires.
`,
        }
    },
    "hec-paris": {
        slug: "hec-paris",
        name: "HEC Paris",
        logo: "/images/logos/hec.png",
        content: {
            pl: `
# HEC Paris

### Magisterka po angielsku: ✅
### Licencjat po angielsku: ❌

- École des hautes études commerciales de Paris
- Założona w 1881 r.
- Status Grande École
- Znajduje się w Jouy-en-Josas, pod Paryżem.
- Uznawana za jedną z najlepszych szkół biznesowych na świecie (często #1 w rankingach europejskich).
- Oferuje głównie programy magisterskie (Master in Management, MSc), MBA, PhD oraz Executive Education. Nie posiada tradycyjnego programu licencjackiego (Bachelor) dostępnego bezpośrednio po maturze (z wyjątkiem specyficznych programów partnerskich).

### Rekrutacja (Master in Management):
Aplikacja odbywa się przez portal online. Wymagane są: dyplom licencjata (lub zaświadczenie o studiowaniu na ostatnim roku), transkrypty ocen, GMAT/GRE/TAGE MAGE, certyfikat językowy (angielski), CV, 2 listy rekomendacyjne, eseje.
Po selekcji dokumentów następuje etap rozmowy kwalifikacyjnej.

[Strona HEC](https://www.hec.edu/en)
[Programy Master](https://www.hec.edu/en/master-s-programs)
`,
            en: `
# HEC Paris

### Master’s in English: ✅
### Bachelor’s in English: ❌

- École des hautes études commerciales de Paris
- Founded in 1881
- Grande École status
- Located in Jouy‑en‑Josas near Paris
- Considered one of the world’s top business schools (often #1 in European rankings)
- Focuses mainly on master’s programs (Master in Management, MSc), MBA, PhD, and Executive Education. No traditional bachelor’s program directly after high school (except specific partner programs).

### Admissions (Master in Management):
Applications are submitted online. Required documents: bachelor’s diploma (or proof of final‑year enrollment), transcripts, GMAT/GRE/TAGE MAGE, English certificate, CV, two recommendation letters, and essays. After document review, shortlisted candidates are invited to an interview.

[HEC website](https://www.hec.edu/en)
[Master’s programs](https://www.hec.edu/en/master-s-programs)
`,
            fr: `
# HEC Paris

### Master en anglais : ✅
### Licence en anglais : ❌

- École des hautes études commerciales de Paris
- Fondée en 1881
- Statut Grande École
- Située à Jouy‑en‑Josas près de Paris
- Considérée parmi les meilleures business schools au monde (souvent #1 en Europe)
- Propose principalement des programmes de master (Master in Management, MSc), MBA, PhD et Executive Education. Pas de licence classique directement après le bac (sauf programmes partenaires spécifiques).

### Admissions (Master in Management) :
La candidature se fait en ligne. Documents requis : diplôme de licence (ou attestation de dernière année), relevés de notes, GMAT/GRE/TAGE MAGE, certificat d’anglais, CV, deux lettres de recommandation et essais. Après la sélection sur dossier, un entretien est organisé.

[Site HEC](https://www.hec.edu/en)
[Programmes Master](https://www.hec.edu/en/master-s-programs)
`,
        }
    },
    "ecole-normale-superieure": {
        slug: "ecole-normale-superieure",
        name: "École Normale Supérieure",
        logo: "/images/logos/ens.png",
        content: {
            pl: `
# École Normale Supérieure

### Licencjat po angielsku: ❌
### Magisterka po angielsku: ❌

- École Normale Supérieure (znana również jako Normale sup ', Ulm, a najczęściej po prostu ENS) jest jedną z najbardziej selektywnych i prestiżowych szkół wyższych we Francji.
- Jedna z grandes écoles i członek założyciel Uniwersytetu PSL.
- Założona w 1826 r.
- Znajduje się w Paryżu, w 5. dzielnicy.
- Studia zarówno humanistyczne, jak i nauki ścisłe.
- Możliwość studiów w języku francuskim, po selekcji międzynarodowej, czyli konkursie otwartym dla studentów studiujących na zagranicznej uczelni na ostatnim roku licencjatu.
- Zwycięzcy mają tytuł normalien-étudiant.
- Nauka trwa trzy lata, podczas których uczeń otrzymuje stypendium.
- Wśród absolwentów jest 14 laureatów Nagrody Nobla, z których 8 jest z fizyki (ENS ma najwyższy odsetek laureatów Nagrody Nobla wśród swoich absolwentów ze wszystkich instytucji na świecie) i 12 medalistów Fieldsa (drugie miejsce wśród wszystkich uniwersytetów na świecie).
- Szkoła zyskała szczególne uznanie w dziedzinie matematyki i fizyki jako jeden z czołowych francuskich ośrodków szkolenia naukowego.
- Wyróżnia się też w naukach humanistycznych - wykształciła Henri Bergson'a, Jean-Paul Sartre'a, Simone Weil czy Michela Foucault (który swego czasu mieszkał w Warszawie).

[Strona admissions](https://www.ens.psl.eu/une-formation-d-exception/admission-concours)
`,
            en: `
# École Normale Supérieure

### Bachelor’s in English: ❌
### Master’s in English: ❌

- École Normale Supérieure (also known as “Ulm” or simply ENS) is one of the most selective and prestigious higher‑education institutions in France.
- One of the grandes écoles and a founding member of PSL University.
- Founded in 1826.
- Located in Paris (5th arrondissement).
- Offers studies in both humanities and sciences.
- Studies are in French, after international selection (a competitive exam open to students in the final year of a bachelor’s at a foreign university).
- Successful candidates hold the title normalien‑étudiant.
- The program lasts three years and includes a scholarship.
- Alumni include 14 Nobel Prize winners (8 in physics) and 12 Fields Medalists (second highest worldwide among universities).
- Particularly renowned in mathematics and physics; a leading French scientific training center.
- Distinguished in the humanities with alumni such as Henri Bergson, Jean‑Paul Sartre, Simone Weil, and Michel Foucault.

[Admissions page](https://www.ens.psl.eu/une-formation-d-exception/admission-concours)
`,
            fr: `
# École Normale Supérieure

### Licence en anglais : ❌
### Master en anglais : ❌

- L’École Normale Supérieure (appelée aussi « Ulm » ou simplement ENS) est l’une des institutions les plus sélectives et prestigieuses en France.
- Une des grandes écoles et membre fondateur de l’Université PSL.
- Fondée en 1826.
- Située à Paris (5e arrondissement).
- Études en sciences et en humanités.
- Études en français après sélection internationale (concours ouvert aux étudiants en dernière année de licence à l’étranger).
- Les lauréats portent le titre de normalien‑étudiant.
- Formation de trois ans avec bourse.
- Parmi les alumni : 14 prix Nobel (dont 8 en physique) et 12 médaillés Fields (2e au monde parmi les universités).
- Excellente réputation en mathématiques et physique.
- Très forte en humanités (Henri Bergson, Jean‑Paul Sartre, Simone Weil, Michel Foucault).

[Page admissions](https://www.ens.psl.eu/une-formation-d-exception/admission-concours)
`,
        }
    },
    "escp-paris": {
        slug: "escp-paris",
        name: "ESCP Business School",
        logo: "/images/logos/escp.png",
        content: {
            pl: `
# ESCP Paris

### Licencjat po angielsku: ✅
### Magisterka po angielsku: ✅

- École Supérieure de Commerce de Paris
- Znajduje się w XI. dzielnicy Paryża
- Założona w 1819 r.
- Status Grande École
- Najstarsza szkoła biznesowa w Europie
- 8. najlepsza szkoła biznesowa w Europie wg. Financial Times'a

### Programy:
Programy po angielsku dostępne zarówno na poziomie Licencjatu, jak i Magistra:
- [Bachelor in Management (BSc)](https://escp.eu/programmes/bachelor)
- [Master in Management](https://escp.eu/programmes/master-in-management)

**6 kampusów** - Berlin, Londyn, Madryt, Paryż, Turyn, Warszawa. Możliwość kombinacji miast, np. rok w Paryżu, rok w Londynie.
- Licencjat to 3 lata w 3 różnych miastach.

[Strona uniwersytetu](https://escp.eu/)
[Aplikuj](https://aurion.escpeurope.eu/faces/Login.xhtml)
`,
            en: `
# ESCP Paris

### Bachelor’s in English: ✅
### Master’s in English: ✅

- École Supérieure de Commerce de Paris
- Located in Paris (11th arrondissement)
- Founded in 1819
- Grande École status
- Oldest business school in Europe
- Ranked #8 business school in Europe by the Financial Times

### Programs:
English‑taught programs available at both bachelor and master levels:
- [Bachelor in Management (BSc)](https://escp.eu/programmes/bachelor)
- [Master in Management](https://escp.eu/programmes/master-in-management)

**6 campuses** — Berlin, London, Madrid, Paris, Turin, Warsaw. You can combine cities (e.g., one year in Paris, one year in London).
- The bachelor’s program lasts 3 years in 3 different cities.

[University website](https://escp.eu/)
[Apply](https://aurion.escpeurope.eu/faces/Login.xhtml)
`,
            fr: `
# ESCP Paris

### Licence en anglais : ✅
### Master en anglais : ✅

- École Supérieure de Commerce de Paris
- Située dans le 11e arrondissement de Paris
- Fondée en 1819
- Statut Grande École
- Plus ancienne business school d’Europe
- 8e meilleure business school d’Europe (Financial Times)

### Programmes :
Programmes en anglais disponibles en licence et en master :
- [Bachelor in Management (BSc)](https://escp.eu/programmes/bachelor)
- [Master in Management](https://escp.eu/programmes/master-in-management)

**6 campus** — Berlin, Londres, Madrid, Paris, Turin, Varsovie. Possibilité de combiner les villes (ex. une année à Paris, une année à Londres).
- La licence dure 3 ans dans 3 villes différentes.

[Site de l’université](https://escp.eu/)
[Candidater](https://aurion.escpeurope.eu/faces/Login.xhtml)
`,
        }
    },
    "universite-paris-saclay": {
        slug: "universite-paris-saclay",
        name: "Université Paris-Saclay",
        logo: "/images/logos/saclay.png",
        content: {
            pl: `
# Université Paris-Saclay

### Licencjat po angielsku: ❌
### Magisterka po angielsku: ✅

- Utworzony 6 listopada 2019.
- Jeden z dwunastu uniwersytetów paryskich, spadkobierca Uniwersytetu Paris-Sud-XI, utworzonego 1 stycznia 1971 roku.
- 14 miejsce na świecie w rankingu 2020 Academic Ranking of World Universities (ARWU), tzw. Rankingu Szanghajskim.
- W rankingach przedmiotowych 1. miejsce na świecie z matematyki i 9. na świecie z fizyki (1. w Europie), a także w pierwszej 25. w medycynie i w rolnictwie.
- Licencjat tylko po francusku, możliwe studiowanie wielu przedmiotów, aplikacja przez platformę ParcourSup
- Ograniczona ilość programów magisterskich dostępna w języku angielskim - aplikacja przez Uniwersytet.
- Jest częścią projektu Paris-Saclay, który jest kampusem akademickim i biznesowym intensywnie prowadzącym badania naukowe, rozwijanym na Plateau de Saclay pod Paryżem i jest głównym ośrodkiem szkolenia i badań w ramach klastra technologicznego Paris-Saclay.
- Uniwersytet integruje kilka wiodących francuskich grandes écoles, wiodących wydziałów, szkół wyższych i ośrodków badawczych, które są częścią najlepszych światowych organizacji badawczych w różnych dziedzinach.

**Czesne roczne:** Niskie opłaty charakterystyczne dla uniwersytetów publicznych.

[Strona admission](https://www.universite-paris-saclay.fr/en/admissions/international-students)
[Aplikuj na magistra](https://www.universite-paris-saclay.fr/en/admission/apply-master-programmes)
`,
            en: `
# Université Paris-Saclay

### Bachelor’s in English: ❌
### Master’s in English: ✅

- Created on 6 November 2019.
- One of the twelve Paris universities, successor to Paris‑Sud XI (founded 1 January 1971).
- Ranked 14th worldwide in the 2020 Academic Ranking of World Universities (Shanghai Ranking).
- Subject rankings: #1 in Mathematics, #9 in Physics (1st in Europe), and top‑25 in Medicine and Agriculture.
- Bachelor’s programs are taught in French; application via Parcoursup.
- Limited number of English‑taught master’s programs; apply via the university.
- Part of the Paris‑Saclay project, a research‑intensive academic and business campus on the Plateau de Saclay near Paris.
- Integrates leading French grandes écoles, faculties, and research centers across multiple disciplines.

**Annual tuition:** Low fees typical of public universities.

[Admissions page](https://www.universite-paris-saclay.fr/en/admissions/international-students)
[Apply for master’s](https://www.universite-paris-saclay.fr/en/admission/apply-master-programmes)
`,
            fr: `
# Université Paris-Saclay

### Licence en anglais : ❌
### Master en anglais : ✅

- Créée le 6 novembre 2019.
- Une des douze universités parisiennes, héritière de Paris‑Sud XI (créée le 1er janvier 1971).
- 14e au monde au classement ARWU 2020 (Shanghai Ranking).
- Classements par discipline : #1 en mathématiques, #9 en physique (1er en Europe), et top‑25 en médecine et agriculture.
- Licence en français ; candidature via Parcoursup.
- Nombre limité de masters en anglais ; candidature via l’université.
- Fait partie du projet Paris‑Saclay, campus académique et économique à forte intensité de recherche sur le Plateau de Saclay.
- Intègre plusieurs grandes écoles, facultés et centres de recherche de premier plan.

**Frais annuels :** faibles frais caractéristiques des universités publiques.

[Page admissions](https://www.universite-paris-saclay.fr/en/admissions/international-students)
[Candidater au master](https://www.universite-paris-saclay.fr/en/admission/apply-master-programmes)
`,
        }
    },
    "insead": {
        slug: "insead",
        name: "INSEAD",
        logo: "/images/logos/insead.png",
        content: {
            pl: `
# INSEAD

### Licencjat po angielsku: ❌
### Magisterka po angielsku: ✅

- Institut Européen d'Administration des Affaires
- Znajduje się w Fointainebleau, 75km od centrum Paryża, 44 min. komunikacją miejską
- Ma też kampus w Singapurze
- Założona w 1957 r.
- ponad 1,4 tyś. studentów
- Najlepszy MBA na świecie wg. Financial Times'a
- 3. najlepsza szkoła biznesowa w Europie wg. Financial Times'a

### Programy:
Tylko studia na poziomie magisterskim:
- [Master in Management](https://www.insead.edu/master-programmes/mim)
- [Master in Business Administration](https://www.insead.edu/master-programmes/mba)

[Strona](https://www.insead.edu/)
[Aplikuj](https://formulaires.polytechnique.fr/candidatures/home/)
`,
            en: `
# INSEAD

### Bachelor’s in English: ❌
### Master’s in English: ✅

- Institut Européen d’Administration des Affaires
- Located in Fontainebleau, 75 km from central Paris (about 44 minutes by public transport)
- Also has a campus in Singapore
- Founded in 1957
- 1,400+ students
- Best MBA in the world (Financial Times)
- 3rd best business school in Europe (Financial Times)

### Programs:
Only master’s‑level programs:
- [Master in Management](https://www.insead.edu/master-programmes/mim)
- [Master in Business Administration](https://www.insead.edu/master-programmes/mba)

[Website](https://www.insead.edu/)
[Apply](https://formulaires.polytechnique.fr/candidatures/home/)
`,
            fr: `
# INSEAD

### Licence en anglais : ❌
### Master en anglais : ✅

- Institut Européen d’Administration des Affaires
- Situé à Fontainebleau, à 75 km du centre de Paris (environ 44 min en transports)
- Possède aussi un campus à Singapour
- Fondé en 1957
- Plus de 1 400 étudiants
- Meilleur MBA au monde (Financial Times)
- 3e meilleure business school d’Europe (Financial Times)

### Programmes :
Uniquement des programmes de niveau master :
- [Master in Management](https://www.insead.edu/master-programmes/mim)
- [Master in Business Administration](https://www.insead.edu/master-programmes/mba)

[Site](https://www.insead.edu/)
[Candidater](https://formulaires.polytechnique.fr/candidatures/home/)
`,
        }
    },
    "pantheon-assas": {
        slug: "pantheon-assas",
        name: "Panthéon-Assas University",
        logo: "/images/logos/assas.png",
        content: {
            pl: `
# Panthéon-Assas

### Licencjat po angielsku: ✅
### Magisterka po angielsku: ✅

- Pierwszy francuski uniwersytet prawniczy
- Istnieje od XII wieku
- Znajduje się w VI. dzielnicy Paryża, główne kampusy znajdują się na Place du Panthéon i Rue d'Assas, stąd nazwa.
- Trzyletnie licencjaty w języku francuskim w dziedzinach: prawo, nauki polityczne, ekonomia, zarządzanie, komunikacja. Ponadto, studia prawnicze oferowane na poziomie licencjatu w całości po angielsku.
- 4 podwójne dyplomy licencjackie z Sorbonne Université w dziedzinach: prawo i historia, prawo i historia sztuki, prawo i nauki ścisłe, media i historia (tylko w języku francuskim).
- 16 magisterek z prawa (wymagany poziom języka francuskiego: C1 w skali CERF)
- 16 magisterek z zakresu ekonomii, zarządzania, komunikacji i nauk politycznych (wymagany poziom języka francuskiego: C1 w skali CERF)
- 1 magisterka International Human Resources Management oferowana w języku angielskim.
- QS Global Ranking #541-550, a prawo i nauki prawnicze są w Top 100 rankingów przedmiotowych.

[Strona admissions](https://www.u-paris2.fr/en)
[Aplikuj](https://www.parcoursup.fr/)
`,
            en: `
# Panthéon-Assas

### Bachelor’s in English: ✅
### Master’s in English: ✅

- France’s first law university
- Founded in the 12th century
- Located in Paris’s 6th arrondissement; main campuses are at Place du Panthéon and Rue d’Assas
- Three‑year bachelor’s programs in French in law, political science, economics, management, and communication. In addition, a fully English‑taught law bachelor’s program is available.
- 4 dual bachelor’s degrees with Sorbonne Université: law & history, law & art history, law & sciences, media & history (French only)
- 16 law master’s programs (French level required: C1, CEFR)
- 16 master’s programs in economics, management, communication and political science (French level required: C1, CEFR)
- 1 English‑taught master’s: International Human Resources Management
- QS Global Ranking #541–550; law is in the top‑100 subject rankings

[Admissions page](https://www.u-paris2.fr/en)
[Apply](https://www.parcoursup.fr/)
`,
            fr: `
# Panthéon-Assas

### Licence en anglais : ✅
### Master en anglais : ✅

- Première université de droit en France
- Fondée au XIIe siècle
- Située dans le 6e arrondissement de Paris ; campus principaux Place du Panthéon et Rue d’Assas
- Licences de 3 ans en français : droit, sciences politiques, économie, management, communication. Une licence de droit entièrement en anglais est également proposée.
- 4 doubles licences avec Sorbonne Université : droit & histoire, droit & histoire de l’art, droit & sciences, médias & histoire (en français uniquement)
- 16 masters de droit (niveau de français requis : C1, CECR)
- 16 masters en économie, management, communication et science politique (niveau de français requis : C1, CECR)
- 1 master International Human Resources Management en anglais
- QS Global Ranking #541–550 ; le droit est dans le top‑100 des classements par discipline

[Page admissions](https://www.u-paris2.fr/en)
[Candidater](https://www.parcoursup.fr/)
`,
        }
    }
};
