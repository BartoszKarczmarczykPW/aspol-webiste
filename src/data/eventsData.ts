import { Event } from "@/types";

export const eventsData: Record<string, Event[]> = {
  en: [
    {
      id: "networking-apero-march-2026",
      title: "Spring Networking Apéro",
      shortDescription: "Join us for our monthly casual networking event in the heart of Paris. Meet fellow students and professionals.",
      fullDescription: `
        <p>Kick off the spring season with the ASPOL community! Our monthly networking apéro is the perfect opportunity to meet Polish students and young professionals living in Paris.</p>
        <h3>What to expect?</h3>
        <ul>
          <li>Casual atmosphere</li>
          <li>Great conversations in Polish, French, and English</li>
          <li>Opportunity to meet the board members</li>
        </ul>
        <p>Whether you just arrived in Paris or have been here for years, everyone is welcome!</p>
      `,
      date: "March 20, 2026",
      isoDate: "2026-03-20",
      time: "19:00 - 22:00",
      location: "Le Café Polonais, Paris 75004",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&fit=crop",
      category: "Social",
      registrationLink: "https://eventbrite.com",
    },
    {
      id: "career-workshop-2026",
      title: "Career in France: Workshop",
      shortDescription: "Learn how to navigate the French job market, write a CV that stands out, and ace your interviews.",
      date: "February 15, 2026",
      isoDate: "2026-02-15",
      time: "14:00 - 17:00",
      location: "Sciences Po, Rue Saint-Guillaume",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&fit=crop",
      category: "Workshop",
      registrationLink: "https://eventbrite.com",
    },
    {
      id: "picnic-seine-may-2026",
      title: "Picnic by the Seine",
      shortDescription: "Relaxing afternoon with Polish snacks and games by the riverside. Bring your friends!",
      date: "May 10, 2026",
      isoDate: "2026-05-10",
      time: "13:00 - 17:00",
      location: "Quai de la Tournelle, Paris",
      image: "https://images.unsplash.com/photo-1533552074826-628d09795a94?w=800&fit=crop",
      category: "Social",
    },
    {
      id: "legal-talk-impots-2026",
      title: "Legal Talk: Filing Taxes in France",
      shortDescription: "Expert advice on how to correctly file your taxes as a student or young professional in France.",
      date: "April 05, 2026",
      isoDate: "2026-04-05",
      time: "18:00 - 20:00",
      location: "Polish Library, Paris",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&fit=crop",
      category: "Workshop",
    },
    {
      id: "paris-polish-forum-vii",
      title: "Paris Polish Forum VII",
      shortDescription: "The 7th edition of our flagship conference focusing on Future of Europe.",
      date: "November 14, 2025",
      isoDate: "2025-11-14",
      location: "Polish Embassy in Paris",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&fit=crop",
      category: "Conference",
    }
  ],
  fr: [
    {
      id: "networking-apero-march-2026",
      title: "Apéro Networking de Printemps",
      shortDescription: "Rejoignez-nous pour notre événement mensuel décontracté au cœur de Paris.",
      fullDescription: `
        <p>Commencez la saison printanière avec la communauté ASPOL ! Notre apéro networking mensuel est l'occasion idéale de rencontrer des étudiants et jeunes professionnels polonais vivant à Paris.</p>
        <h3>À quoi s'attendre ?</h3>
        <ul>
          <li>Atmosphère décontractée</li>
          <li>Grandes conversations en polonais, français et anglais</li>
          <li>Occasion de rencontrer les membres du bureau</li>
        </ul>
      `,
      date: "20 Mars 2026",
      isoDate: "2026-03-20",
      time: "19:00 - 22:00",
      location: "Le Café Polonais, Paris 75004",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&fit=crop",
      category: "Social",
      registrationLink: "https://eventbrite.com",
    },
    {
      id: "career-workshop-2026",
      title: "Carrière en France : Atelier",
      shortDescription: "Apprenez à naviguer sur le marché du travail français, rédiger un CV percutant et réussir vos entretiens.",
      date: "15 Février 2026",
      isoDate: "2026-02-15",
      time: "14:00 - 17:00",
      location: "Sciences Po, Rue Saint-Guillaume",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&fit=crop",
      category: "Workshop",
      registrationLink: "https://eventbrite.com",
    },
    {
      id: "picnic-seine-may-2026",
      title: "Pique-nique sur la Seine",
      shortDescription: "Après-midi détente avec des snacks polonais et des jeux au bord de l'eau. Amenez vos amis !",
      date: "10 Mai 2026",
      isoDate: "2026-05-10",
      time: "13:00 - 17:00",
      location: "Quai de la Tournelle, Paris",
      image: "https://images.unsplash.com/photo-1533552074826-628d09795a94?w=800&fit=crop",
      category: "Social",
    },
    {
      id: "legal-talk-impots-2026",
      title: "Conférence Juridique : Déclarer ses impôts",
      shortDescription: "Conseils d'experts sur la façon de déclarer correctement ses impôts en tant qu'étudiant ou jeune professionnel.",
      date: "05 Avril 2026",
      isoDate: "2026-04-05",
      time: "18:00 - 20:00",
      location: "Bibliothèque Polonaise, Paris",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&fit=crop",
      category: "Workshop",
    },
    {
      id: "paris-polish-forum-vii",
      title: "Forum Polono-Parisien VII",
      shortDescription: "La 7ème édition de notre conférence phare axée sur l'Avenir de l'Europe.",
      date: "14 Novembre 2025",
      isoDate: "2025-11-14",
      location: "Ambassade de Pologne à Paris",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&fit=crop",
      category: "Conference",
    }
  ],
  pl: [
    {
      id: "networking-apero-march-2026",
      title: "Wiosenny Apéro Networking",
      shortDescription: "Dołącz do nas na comiesięcznym spotkaniu w sercu Paryża.",
      fullDescription: `
        <p>Rozpocznij wiosenny sezon ze społecznością ASPOL! Nasz comiesięczny networking to idealna okazja, aby spotkać polskich studentów i młodych profesjonalistów mieszkających w Paryżu.</p>
        <h3>Czego się spodziewać?</h3>
        <ul>
          <li>Luźna atmosfera</li>
          <li>Świetne rozmowy po polsku, francusku i angielsku</li>
          <li>Okazja do poznania członków zarządu</li>
        </ul>
      `,
      date: "20 Marca 2026",
      isoDate: "2026-03-20",
      time: "19:00 - 22:00",
      location: "Le Café Polonais, Paryż 75004",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&fit=crop",
      category: "Social",
      registrationLink: "https://eventbrite.com",
    },
    {
      id: "career-workshop-2026",
      title: "Kariera we Francji: Warsztaty",
      shortDescription: "Dowiedz się, jak poruszać się po francuskim rynku pracy, napisać skuteczne CV i przejść rozmowy kwalifikacyjne.",
      date: "15 Lutego 2026",
      isoDate: "2026-02-15",
      time: "14:00 - 17:00",
      location: "Sciences Po, Rue Saint-Guillaume",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&fit=crop",
      category: "Workshop",
      registrationLink: "https://eventbrite.com",
    },
    {
      id: "picnic-seine-may-2026",
      title: "Piknik nad Sekwaną",
      shortDescription: "Relaksujące popołudnie z polskimi przekąskami i grami nad rzeką. Przyprowadź znajomych!",
      date: "10 Maja 2026",
      isoDate: "2026-05-10",
      time: "13:00 - 17:00",
      location: "Quai de la Tournelle, Paryż",
      image: "https://images.unsplash.com/photo-1533552074826-628d09795a94?w=800&fit=crop",
      category: "Social",
    },
    {
      id: "legal-talk-impots-2026",
      title: "Porady Prawne: Rozliczanie podatków",
      shortDescription: "Eksperckie porady jak poprawnie rozliczyć podatki jako student lub młody profesjonalista we Francji.",
      date: "05 Kwietnia 2026",
      isoDate: "2026-04-05",
      time: "18:00 - 20:00",
      location: "Biblioteka Polska, Paryż",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&fit=crop",
      category: "Workshop",
    },
    {
      id: "paris-polish-forum-vii",
      title: "Paryskie Forum Polskie VII",
      shortDescription: "Siódma edycja naszej flagowej konferencji poświęcona Przyszłości Europy.",
      date: "14 Listopada 2025",
      isoDate: "2025-11-14",
      location: "Ambasada RP w Paryżu",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&fit=crop",
      category: "Conference",
    }
  ]
};
