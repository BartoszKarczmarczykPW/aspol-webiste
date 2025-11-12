"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  featured: boolean;
}

function BlogContent() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts: Record<string, BlogPost[]> = {
    en: [
      {
        id: "paris-polish-forum-vi",
        title: "Paris Polish Forum VI: Navigating Europe's Security Landscape",
        excerpt: "The 2024 edition focused on one of the most pressing issues of our time: security in Europe. Bringing together experts, policymakers, and students at Sciences Po and the Polish Embassy to explore geopolitical, economic, and technological challenges shaping the continent's stability.",
        author: "ASPOL Team",
        date: "2024",
        category: "Events",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
        featured: true,
      },
      {
        id: "paris-polish-forum-v",
        title: "Paris Polish Forum V: Choosing Divergent Paths Together",
        excerpt: "The 2023 edition covered France-Poland relations and our societies as a whole. Key topics included Culture, Macroeconomics, Sustainable Energy, Technology & Disinformation, and Luxury Goods. Keynote by Justyna Orłowska, featuring panels on fascination and alterity, lessons from 2008 recession, and the weaponization of developing technologies.",
        author: "ASPOL Team",
        date: "2023",
        category: "Events",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop",
        featured: true,
      },
      {
        id: "paris-polish-forum-iv-warsaw",
        title: "Paris Polish Forum IV: Post-Pandemic Recovery in Warsaw",
        excerpt: "For the first time, our conference traveled to Warsaw's Palace on the Isle (Łazienki Królewskie). The 2021 edition focused on post-pandemic recovery and designing a new model of development. Topics included the future of global debt, capital markets, climate policy, and culture in the post-pandemic reality.",
        author: "ASPOL Team",
        date: "2021",
        category: "Events",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "paris-polish-forum-iii",
        title: "Paris Polish Forum III: Diversified Leadership",
        excerpt: "The 2019 edition at Sciences Po and Embassy of Poland focused on Diversified Leadership, International Security (20th Anniversary of Polish accession to NATO), Academics (French-Polish Academic Year), and Economics. Keynote by Krzysztof Szczerski, with panels featuring leaders from PKO Bank Polski, BCG, Vogue Poland, and Le Figaro.",
        author: "ASPOL Team",
        date: "2019",
        category: "Events",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "paris-polish-forum-ii",
        title: "Paris Polish Forum II: Innovation and Climate",
        excerpt: "The 2018 edition at Polish Embassy in Paris focused on four crucial topics: Society and Inequalities, Innovation and Banking by BCG, Climate Diplomacy, and Luxury Market. Opened by Ambassador Tomasz Młynarski and Krzysztof Szczerski, featuring experts from PKO Bank Polski, BGŻ BNP Paribas, and Boston Consulting Group.",
        author: "ASPOL Team",
        date: "2018",
        category: "Events",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "paris-polish-forum-i",
        title: "Paris Polish Forum I: The Beginning",
        excerpt: "More than 140 people participated in the inaugural Polish Economic Forum at Sciences Po on February 25, 2017. The event featured panels on 'Opportunities of the Polish Market', 'Re-examining Poland's Place in the World', and 'The Future of the Polish Financial System'. Opened by Polish Ambassador Dariusz Wiśniewski.",
        author: "Kajetan Rościszewski & Michał Chajdukowski",
        date: "February 25, 2017",
        category: "Events",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "mentoring-programme",
        title: "ASPOL Mentoring Programme: Your Pathway to French Universities",
        excerpt: "Our mentoring programme helps Polish students navigate the French higher education system, providing guidance, support, and connection to our vibrant community in Paris.",
        author: "ASPOL Team",
        date: "2024",
        category: "Resources",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "community-meetups",
        title: "Regular Student Community Meet-ups in Paris",
        excerpt: "Join our regular gatherings where Polish students in Paris connect, share experiences, build lasting friendships, and create a strong support network in the French capital.",
        author: "ASPOL Team",
        date: "2024",
        category: "Events",
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
        featured: false,
      },
    ],
    fr: [
      {
        id: "paris-polish-forum-vi",
        title: "Paris Polish Forum VI: Naviguer dans le Paysage Sécuritaire Européen",
        excerpt: "L'édition 2024 s'est concentrée sur l'une des questions les plus pressantes: la sécurité en Europe. Réunissant experts, décideurs et étudiants à Sciences Po et l'Ambassade de Pologne pour explorer les défis géopolitiques, économiques et technologiques façonnant la stabilité du continent.",
        author: "Équipe ASPOL",
        date: "2024",
        category: "Événements",
        readTime: "8 min de lecture",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
        featured: true,
      },
      {
        id: "paris-polish-forum-v",
        title: "Paris Polish Forum V: Choisir des Chemins Divergents Ensemble",
        excerpt: "L'édition 2023 a couvert les relations France-Pologne. Thèmes: Culture, Macroéconomie, Énergie Durable, Technologie et Désinformation, Biens de Luxe. Discours principal par Justyna Orłowska, avec panels sur la fascination et l'altérité, les leçons de la récession de 2008.",
        author: "Équipe ASPOL",
        date: "2023",
        category: "Événements",
        readTime: "7 min de lecture",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop",
        featured: true,
      },
      {
        id: "paris-polish-forum-iv-warsaw",
        title: "Paris Polish Forum IV: Relance Post-Pandémie à Varsovie",
        excerpt: "Pour la première fois au Palais sur l'Île de Varsovie. L'édition 2021 s'est concentrée sur la relance post-pandémique et la conception d'un nouveau modèle de développement. Thèmes: avenir de la dette mondiale, marchés de capitaux, politique climatique.",
        author: "Équipe ASPOL",
        date: "2021",
        category: "Événements",
        readTime: "6 min de lecture",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "paris-polish-forum-iii",
        title: "Paris Polish Forum III: Leadership Diversifié",
        excerpt: "L'édition 2019 à Sciences Po s'est concentrée sur le Leadership Diversifié, la Sécurité Internationale (20e anniversaire de l'adhésion à l'OTAN), l'Académique et l'Économie. Discours principal par Krzysztof Szczerski, avec panels réunissant PKO Bank Polski, BCG, Vogue Poland et Le Figaro.",
        author: "Équipe ASPOL",
        date: "2019",
        category: "Événements",
        readTime: "6 min de lecture",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "paris-polish-forum-ii",
        title: "Paris Polish Forum II: Innovation et Climat",
        excerpt: "L'édition 2018 à l'Ambassade de Pologne s'est concentrée sur quatre sujets: Société et Inégalités, Innovation et Banque par BCG, Diplomatie Climatique et Marché du Luxe. Ouvert par l'Ambassadeur Tomasz Młynarski et Krzysztof Szczerski.",
        author: "Équipe ASPOL",
        date: "2018",
        category: "Événements",
        readTime: "5 min de lecture",
        image: "https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "paris-polish-forum-i",
        title: "Paris Polish Forum I: Le Commencement",
        excerpt: "Plus de 140 personnes ont participé au Forum Économique Polonais inaugural à Sciences Po le 25 février 2017. Panels sur 'Opportunités du Marché Polonais', 'La Place de la Pologne dans le Monde' et 'L'Avenir du Système Financier Polonais'. Ouvert par l'Ambassadeur Dariusz Wiśniewski.",
        author: "Kajetan Rościszewski & Michał Chajdukowski",
        date: "25 février 2017",
        category: "Événements",
        readTime: "5 min de lecture",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "mentoring-programme",
        title: "Programme de Mentorat ASPOL: Votre Voie vers les Universités Françaises",
        excerpt: "Notre programme de mentorat aide les étudiants polonais à naviguer dans le système d'enseignement supérieur français, offrant conseils, soutien et connexion à notre communauté dynamique à Paris.",
        author: "Équipe ASPOL",
        date: "2024",
        category: "Ressources",
        readTime: "4 min de lecture",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "community-meetups",
        title: "Rencontres Régulières de la Communauté Étudiante à Paris",
        excerpt: "Rejoignez nos rassemblements réguliers où les étudiants polonais à Paris se connectent, partagent leurs expériences, créent des amitiés durables et forment un réseau de soutien solide.",
        author: "Équipe ASPOL",
        date: "2024",
        category: "Événements",
        readTime: "3 min de lecture",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
        featured: false,
      },
    ],
    pl: [
      {
        id: "paris-polish-forum-vi",
        title: "Paris Polish Forum VI: Nawigacja w Europejskim Krajobrazie Bezpieczeństwa",
        excerpt: "Edycja 2024 skupiła się na jednej z najpilniejszych kwestii naszych czasów: bezpieczeństwie w Europie. Eksperci, decydenci i studenci w Sciences Po i Ambasadzie Polski omawiali geopolityczne, ekonomiczne i technologiczne wyzwania kształtujące stabilność kontynentu.",
        author: "Zespół ASPOL",
        date: "2024",
        category: "Wydarzenia",
        readTime: "8 min czytania",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
        featured: true,
      },
      {
        id: "paris-polish-forum-v",
        title: "Paris Polish Forum V: Wybór Rozbieżnych Ścieżek Razem",
        excerpt: "Edycja 2023 obejmowała relacje Francja-Polska. Kluczowe tematy: Kultura, Makroekonomia, Zrównoważona Energia, Technologia i Dezinformacja, Dobra Luksusowe. Przemówienie Justyny Orłowskiej, z panelami o fascynacji i odmienności, lekcjach z recesji 2008.",
        author: "Zespół ASPOL",
        date: "2023",
        category: "Wydarzenia",
        readTime: "7 min czytania",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop",
        featured: true,
      },
      {
        id: "paris-polish-forum-iv-warsaw",
        title: "Paris Polish Forum IV: Odbudowa Post-Pandemiczna w Warszawie",
        excerpt: "Po raz pierwszy konferencja odbyła się w Pałacu na Wyspie w Warszawie (Łazienki Królewskie). Edycja 2021 skupiła się na odbudowie post-pandemicznej i projektowaniu nowego modelu rozwoju. Tematy: przyszłość globalnego długu, rynki kapitałowe, polityka klimatyczna.",
        author: "Zespół ASPOL",
        date: "2021",
        category: "Wydarzenia",
        readTime: "6 min czytania",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "paris-polish-forum-iii",
        title: "Paris Polish Forum III: Zróżnicowane Przywództwo",
        excerpt: "Edycja 2019 w Sciences Po i Ambasadzie Polski skupiła się na Zróżnicowanym Przywództwie, Bezpieczeństwie Międzynarodowym (20. rocznica przystąpienia Polski do NATO), Akademickości i Ekonomii. Przemówienie Krzysztofa Szczerskiego, z panelami z PKO Bank Polski, BCG, Vogue Poland i Le Figaro.",
        author: "Zespół ASPOL",
        date: "2019",
        category: "Wydarzenia",
        readTime: "6 min czytania",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "paris-polish-forum-ii",
        title: "Paris Polish Forum II: Innowacje i Klimat",
        excerpt: "Edycja 2018 w Ambasadzie Polski w Paryżu skupiła się na czterech kluczowych tematach: Społeczeństwo i Nierówności, Innowacje i Bankowość przez BCG, Dyplomacja Klimatyczna i Rynek Dóbr Luksusowych. Otwarte przez Ambasadora Tomasza Młynarskiego i Krzysztofa Szczerskiego.",
        author: "Zespół ASPOL",
        date: "2018",
        category: "Wydarzenia",
        readTime: "5 min czytania",
        image: "https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "paris-polish-forum-i",
        title: "Paris Polish Forum I: Początek",
        excerpt: "Ponad 140 osób uczestniczyło w inauguracyjnym Polskim Forum Ekonomicznym w Sciences Po 25 lutego 2017. Wydarzenie obejmowało panele o 'Możliwościach Polskiego Rynku', 'Przemyśleniu Miejsca Polski w Świecie' i 'Przyszłości Polskiego Systemu Finansowego'. Otwarte przez Ambasadora Dariusza Wiśniewskiego.",
        author: "Kajetan Rościszewski & Michał Chajdukowski",
        date: "25 lutego 2017",
        category: "Wydarzenia",
        readTime: "5 min czytania",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "mentoring-programme",
        title: "Program Mentorski ASPOL: Twoja Droga do Francuskich Uniwersytetów",
        excerpt: "Nasz program mentorski pomaga polskim studentom poruszać się po francuskim systemie szkolnictwa wyższego, zapewniając wsparcie, doradztwo i połączenie z naszą żywą społecznością w Paryżu.",
        author: "Zespół ASPOL",
        date: "2024",
        category: "Zasoby",
        readTime: "4 min czytania",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
        featured: false,
      },
      {
        id: "community-meetups",
        title: "Regularne Spotkania Społeczności Studenckiej w Paryżu",
        excerpt: "Dołącz do naszych regularnych spotkań, gdzie polscy studenci w Paryżu nawiązują kontakty, dzielą się doświadczeniami, budują trwałe przyjaźnie i tworzą silną sieć wsparcia.",
        author: "Zespół ASPOL",
        date: "2024",
        category: "Wydarzenia",
        readTime: "3 min czytania",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop",
        featured: false,
      },
    ],
  };

  const categories = {
    en: ["All", "Events", "Stories", "Resources", "Career"],
    fr: ["Tout", "Événements", "Histoires", "Ressources", "Carrière"],
    pl: ["Wszystko", "Wydarzenia", "Historie", "Zasoby", "Kariera"],
  };

  const labels = {
    en: {
      title: "Blog",
      subtitle: "Stories, insights, and updates from the ASPOL community",
      search: "Search articles...",
      featured: "Featured Posts",
      recent: "Recent Articles",
      readMore: "Read More",
      by: "By",
      noResults: "No articles found",
      tryDifferent: "Try a different search or category",
    },
    fr: {
      title: "Blog",
      subtitle: "Histoires, perspectives et actualités de la communauté ASPOL",
      search: "Rechercher des articles...",
      featured: "Articles en Vedette",
      recent: "Articles Récents",
      readMore: "Lire Plus",
      by: "Par",
      noResults: "Aucun article trouvé",
      tryDifferent: "Essayez une recherche ou une catégorie différente",
    },
    pl: {
      title: "Blog",
      subtitle: "Historie, spostrzeżenia i aktualności ze społeczności ASPOL",
      search: "Szukaj artykułów...",
      featured: "Wyróżnione Posty",
      recent: "Najnowsze Artykuły",
      readMore: "Czytaj Więcej",
      by: "Przez",
      noResults: "Nie znaleziono artykułów",
      tryDifferent: "Spróbuj innego wyszukiwania lub kategorii",
    },
  };

  const currentLabels = labels[language as keyof typeof labels] || labels.en;
  const currentPosts = blogPosts[language as keyof typeof blogPosts] || blogPosts.en;
  const currentCategories = categories[language as keyof typeof categories] || categories.en;

  // Filter posts
  const filteredPosts = currentPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const recentPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: currentLabels.title }]} />

          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 mt-6 sm:mt-8 px-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              {currentLabels.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">{currentLabels.subtitle}</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-10 sm:mb-12 space-y-4 sm:space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto px-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={currentLabels.search}
                  inputMode="search"
                  className="w-full px-5 sm:px-6 py-3.5 sm:py-4 pl-12 sm:pl-14 text-base sm:text-lg border-2 border-gray-200 rounded-full focus:border-red-600 focus:outline-none transition-colors touch-manipulation"
                />
                <svg
                  className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
              {currentCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === currentCategories[0] ? "all" : category)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-2 min-h-11 text-sm sm:text-base rounded-full font-medium transition-all touch-manipulation active:scale-95 ${
                    (category === currentCategories[0] && selectedCategory === "all") ||
                    category.toLowerCase() === selectedCategory.toLowerCase()
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-12 sm:mb-16 px-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{currentLabels.featured}</h2>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {featuredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                          {post.category}
                        </span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">{currentLabels.by} {post.author}</span>
                          <span className="mx-2">•</span>
                          <span>{post.date}</span>
                        </div>
                        <Link
                          href={`/blog/${post.id}`}
                          className="text-red-600 font-semibold hover:text-red-700 flex items-center gap-2 group-hover:gap-3 transition-all"
                        >
                          {currentLabels.readMore}
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Recent Posts */}
          {recentPosts.length > 0 && (
            <div className="px-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">{currentLabels.recent}</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {recentPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                          {post.category}
                        </span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500 mb-3">
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <span>{post.date}</span>
                        </div>
                        <Link
                          href={`/blog/${post.id}`}
                          className="text-red-600 text-sm font-semibold hover:text-red-700 flex items-center gap-2 group-hover:gap-3 transition-all"
                        >
                          {currentLabels.readMore}
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <svg
                className="w-24 h-24 mx-auto text-gray-300 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentLabels.noResults}</h3>
              <p className="text-gray-600">{currentLabels.tryDifferent}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function BlogPage() {
  return (
    <LanguageProvider>
      <BlogContent />
    </LanguageProvider>
  );
}
