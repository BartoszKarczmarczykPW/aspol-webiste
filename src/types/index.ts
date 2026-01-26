export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content?: string;
}

export interface Event {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  date: string; // Display date e.g. "Oct 15, 2025"
  isoDate: string; // ISO 8601 date e.g. "2025-10-15"
  time?: string; // e.g. "18:00 - 21:00"
  location: string;
  image: string;
  category: "Conference" | "Social" | "Workshop" | "Cultural" | "Webinar";
  registrationLink?: string;
  featured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  year: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  linkedin: string | null;
}

export interface StatItemProps {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
}
