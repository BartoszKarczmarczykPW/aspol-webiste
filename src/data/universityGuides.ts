
export interface UniversityGuide {
    slug: string;
    name: string;
    logo: string;
    content: string;
}


export const universityGuides: Record<string, UniversityGuide> = {
    "sciences-po": {
        slug: "sciences-po",
        name: "Sciences Po",
        logo: "/images/logos/sciences-po.png",
        content: `
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
`
    },
    "ecole-polytechnique": {
        slug: "ecole-polytechnique",
        name: "École Polytechnique",
        logo: "/images/logos/polytechnique.png",
        content: `
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
`
    },
    "essec": {
        slug: "essec",
        name: "ESSEC Business School",
        logo: "/images/logos/essec.png",
        content: `
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
`
    },
    "hec-paris": {
        slug: "hec-paris",
        name: "HEC Paris",
        logo: "/images/logos/hec.png",
        content: `
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
`
    },
    "ecole-normale-superieure": {
        slug: "ecole-normale-superieure",
        name: "École Normale Supérieure",
        logo: "/images/logos/ens.png",
        content: `
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
`
    },
    "escp-paris": {
        slug: "escp-paris",
        name: "ESCP Business School",
        logo: "/images/logos/escp.png",
        content: `
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
`
    },
    "universite-paris-saclay": {
        slug: "universite-paris-saclay",
        name: "Université Paris-Saclay",
        logo: "/images/logos/saclay.png",
        content: `
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
`
    },
    "insead": {
        slug: "insead",
        name: "INSEAD",
        logo: "/images/logos/insead.png",
        content: `
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
`
    },
    "pantheon-assas": {
        slug: "pantheon-assas",
        name: "Panthéon-Assas University",
        logo: "/images/logos/assas.png",
        content: `
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
`
    }
};
