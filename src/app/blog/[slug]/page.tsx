"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SocialShare from "@/components/SocialShare";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

function BlogPostContent() {
  const params = useParams();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const slug = params?.slug as string;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Blog post data - matching the blog page posts
  const blogPostsData: Record<string, Record<string, BlogPostData>> = {
    en: {
      "paris-polish-forum-vi": {
        id: "paris-polish-forum-vi",
        title: "Paris Polish Forum VI: Navigating Europe's Security Landscape",
        excerpt: "The 2024 edition focused on one of the most pressing issues of our time: security in Europe.",
        author: "ASPOL Team",
        date: "2024",
        category: "Events",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
        content: `
          <h2>Overview</h2>
          <p>The sixth edition of the Paris Polish Forum brought together experts, policymakers, and students at Sciences Po and the Polish Embassy to explore geopolitical, economic, and technological challenges shaping Europe's stability.</p>
          
          <h3>Key Topics Discussed</h3>
          <ul>
            <li><strong>Geopolitical Security:</strong> Analysis of current threats and challenges facing European nations</li>
            <li><strong>Energy Security:</strong> The role of renewable energy and energy independence in European stability</li>
            <li><strong>Economic Sanctions:</strong> Understanding the impact of international sanctions on global economies</li>
            <li><strong>Cybersecurity:</strong> Protecting critical infrastructure from digital threats</li>
            <li><strong>NATO Cooperation:</strong> Strengthening defense alliances in uncertain times</li>
          </ul>
          
          <h3>Notable Speakers</h3>
          <p>The forum featured distinguished speakers from government, academia, and international organizations, providing diverse perspectives on Europe's security challenges.</p>
          
          <h3>Student Engagement</h3>
          <p>Over 100 students participated in interactive discussions, Q&A sessions, and networking opportunities with industry leaders and policymakers.</p>
          
          <h3>Impact</h3>
          <p>The Paris Polish Forum VI strengthened Franco-Polish relations and provided valuable insights into collaborative approaches to European security challenges. The event fostered important dialogues between young professionals and experienced leaders in the field.</p>
          
          <blockquote>
            "The Paris Polish Forum continues to be an essential platform for fostering understanding and cooperation between France and Poland on critical issues facing Europe."
          </blockquote>
        `
      },
      "paris-polish-forum-v": {
        id: "paris-polish-forum-v",
        title: "Paris Polish Forum V: Choosing Divergent Paths Together",
        excerpt: "The 2023 edition covered France-Poland relations and our societies as a whole.",
        author: "ASPOL Team",
        date: "2023",
        category: "Events",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop",
        content: `
          <h2>Theme: Divergent Paths Together</h2>
          <p>The fifth Paris Polish Forum explored how France and Poland can collaborate despite different approaches to common challenges. The conference emphasized unity in diversity and mutual understanding.</p>
          
          <h3>Conference Tracks</h3>
          
          <h4>1. Culture & Society</h4>
          <p>Discussions on cultural fascination, alterity, and how arts and literature bridge the gap between French and Polish societies.</p>
          
          <h4>2. Macroeconomics</h4>
          <p>Analysis of economic policies, lessons from the 2008 recession, and strategies for sustainable economic growth in both countries.</p>
          
          <h4>3. Sustainable Energy</h4>
          <p>Exploration of renewable energy initiatives, green technology, and the path to energy independence.</p>
          
          <h4>4. Technology & Disinformation</h4>
          <p>Critical examination of how technology can be weaponized, the spread of disinformation, and strategies to combat fake news.</p>
          
          <h4>5. Luxury Goods Market</h4>
          <p>Insights into the luxury industry, consumer trends, and how Polish and French brands navigate global markets.</p>
          
          <h3>Keynote Address</h3>
          <p>The forum was opened by <strong>Justyna Orłowska</strong>, who delivered an inspiring keynote on Franco-Polish cooperation and shared values.</p>
          
          <h3>Networking & Opportunities</h3>
          <p>Participants enjoyed networking sessions, career workshops, and mentorship opportunities with industry professionals from both countries.</p>
        `
      },
      "paris-polish-forum-iv-warsaw": {
        id: "paris-polish-forum-iv-warsaw",
        title: "Paris Polish Forum IV: Post-Pandemic Recovery in Warsaw",
        excerpt: "For the first time, our conference traveled to Warsaw's Palace on the Isle.",
        author: "ASPOL Team",
        date: "2021",
        category: "Events",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&h=600&fit=crop",
        content: `
          <h2>A Historic Venue</h2>
          <p>Breaking tradition, the fourth edition of the Paris Polish Forum took place at the stunning Palace on the Isle (Łazienki Królewskie) in Warsaw, Poland. This historic location provided an inspiring backdrop for discussions on post-pandemic recovery.</p>
          
          <h3>Focus: Building Back Better</h3>
          <p>The 2021 conference centered on designing a new model of development in the aftermath of the global pandemic, focusing on resilience and sustainability.</p>
          
          <h3>Key Discussions</h3>
          
          <h4>Global Debt and Financial Recovery</h4>
          <p>Experts analyzed the surge in global debt due to pandemic stimulus measures and strategies for sustainable fiscal recovery.</p>
          
          <h4>Capital Markets Evolution</h4>
          <p>Panels explored how capital markets adapted during the crisis and emerging investment opportunities in a post-pandemic world.</p>
          
          <h4>Climate Policy Post-COVID</h4>
          <p>Discussion on leveraging the pandemic recovery to accelerate climate action and green investments.</p>
          
          <h4>Culture in the New Normal</h4>
          <p>Examination of how cultural institutions and creative industries are adapting to new realities and digitalization.</p>
          
          <h3>Cross-Border Collaboration</h3>
          <p>The Warsaw edition strengthened ties between Polish and French institutions, demonstrating ASPOL's commitment to bilateral relations beyond Paris.</p>
          
          <h3>Participant Experience</h3>
          <p>Attendees enjoyed guided tours of the palace grounds, networking dinners, and cultural performances showcasing Polish-French artistic collaboration.</p>
        `
      }
    },
    fr: {
      "paris-polish-forum-vi": {
        id: "paris-polish-forum-vi",
        title: "Forum Polono-Parisien VI : Naviguer dans le paysage sécuritaire européen",
        excerpt: "L'édition 2024 s'est concentrée sur l'une des questions les plus pressantes de notre époque : la sécurité en Europe.",
        author: "Équipe ASPOL",
        date: "2024",
        category: "Événements",
        readTime: "8 min de lecture",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
        content: `
          <h2>Aperçu</h2>
          <p>La sixième édition du Forum Polono-Parisien a réuni des experts, des décideurs politiques et des étudiants à Sciences Po et à l'Ambassade de Pologne pour explorer les défis géopolitiques, économiques et technologiques qui façonnent la stabilité européenne.</p>
          
          <h3>Sujets clés abordés</h3>
          <ul>
            <li><strong>Sécurité géopolitique :</strong> Analyse des menaces et défis actuels auxquels font face les nations européennes</li>
            <li><strong>Sécurité énergétique :</strong> Le rôle des énergies renouvelables et de l'indépendance énergétique dans la stabilité européenne</li>
            <li><strong>Sanctions économiques :</strong> Comprendre l'impact des sanctions internationales sur les économies mondiales</li>
            <li><strong>Cybersécurité :</strong> Protéger les infrastructures critiques contre les menaces numériques</li>
            <li><strong>Coopération OTAN :</strong> Renforcer les alliances de défense en période d'incertitude</li>
          </ul>
          
          <h3>Intervenants notables</h3>
          <p>Le forum a accueilli des intervenants distingués issus du gouvernement, du monde académique et des organisations internationales, offrant des perspectives diverses sur les défis de sécurité européens.</p>
        `
      }
    },
    pl: {
      "paris-polish-forum-vi": {
        id: "paris-polish-forum-vi",
        title: "Paryskie Forum Polskie VI: Nawigacja w europejskim krajobrazie bezpieczeństwa",
        excerpt: "Edycja 2024 skupiła się na jednej z najbardziej palących kwestii naszych czasów: bezpieczeństwie w Europie.",
        author: "Zespół ASPOL",
        date: "2024",
        category: "Wydarzenia",
        readTime: "8 min czytania",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
        content: `
          <h2>Przegląd</h2>
          <p>Szósta edycja Paryskiego Forum Polskiego zgromadziła ekspertów, decydentów politycznych i studentów w Sciences Po oraz Ambasadzie Polski, aby zbadać geopolityczne, ekonomiczne i technologiczne wyzwania kształtujące stabilność Europy.</p>
          
          <h3>Główne tematy</h3>
          <ul>
            <li><strong>Bezpieczeństwo geopolityczne:</strong> Analiza obecnych zagrożeń i wyzwań stojących przed narodami europejskimi</li>
            <li><strong>Bezpieczeństwo energetyczne:</strong> Rola energii odnawialnej i niezależności energetycznej w stabilności europejskiej</li>
            <li><strong>Sankcje ekonomiczne:</strong> Zrozumienie wpływu sankcji międzynarodowych na światowe gospodarki</li>
            <li><strong>Cyberbezpieczeństwo:</strong> Ochrona krytycznej infrastruktury przed zagrożeniami cyfrowymi</li>
            <li><strong>Współpraca NATO:</strong> Wzmacnianie sojuszy obronnych w niepewnych czasach</li>
          </ul>
        `
      }
    }
  };

  const currentPost = blogPostsData[language as keyof typeof blogPostsData]?.[slug] || 
                      blogPostsData.en[slug];

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-red-600 hover:text-red-700 font-semibold">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20">
        <article className={`max-w-4xl mx-auto px-4 sm:px-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: currentPost.title }
            ]} 
          />

          {/* Hero Image */}
          <div className="relative rounded-3xl h-64 sm:h-96 mb-8 mt-8 shadow-2xl overflow-hidden">
            <img 
              src={currentPost.image} 
              alt={currentPost.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
              {currentPost.category}
            </span>
            <span>{currentPost.date}</span>
            <span>•</span>
            <span>{currentPost.readTime}</span>
            <span>•</span>
            <span>By {currentPost.author}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {currentPost.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {currentPost.excerpt}
          </p>

          {/* Social Share */}
          <div className="mb-12 pb-8 border-b border-gray-200">
            <p className="text-sm text-gray-500 mb-3 font-medium">Share this article:</p>
            <SocialShare 
              url={`https://aspol.fr/blog/${slug}`}
              title={currentPost.title}
              description={currentPost.excerpt}
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:my-6 prose-li:text-gray-700 prose-li:mb-2
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-blockquote:border-l-4 prose-blockquote:border-red-600 
              prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
              prose-blockquote:bg-red-50 prose-blockquote:py-4 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{ __html: currentPost.content }}
          />

          {/* Bottom Social Share */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-lg font-semibold text-gray-900 mb-4">Enjoyed this article? Share it!</p>
            <SocialShare 
              url={`https://aspol.fr/blog/${slug}`}
              title={currentPost.title}
              description={currentPost.excerpt}
            />
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-full hover:bg-gray-200 transition-all duration-200 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default function BlogPost() {
  return (
    <LanguageProvider>
      <BlogPostContent />
    </LanguageProvider>
  );
}
