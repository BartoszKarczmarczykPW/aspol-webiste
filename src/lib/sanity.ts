import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Ensure newly published content shows immediately
})

/* ------------------------------------------------------------------ */
/*  Lightweight result types — keep them in sync with the GROQ         */
/*  projections above each function. We use interfaces rather than     */
/*  `any` so call-sites get autocompletion and type safety.            */
/* ------------------------------------------------------------------ */

interface LocalizedString {
  en: string
  fr: string
  pl: string
}

interface SanityImage {
  asset: {
    _id: string
    url: string
    metadata?: { lqip?: string; dimensions?: { width: number; height: number } }
  } | null
}

export interface SanityEvent {
  _id: string
  title: LocalizedString
  slug: { current: string }
  date: string
  location: LocalizedString
  description: LocalizedString
  imageUrl: string | null
  registrationLink?: string
  tags?: string[]
  featured?: boolean
}

export interface EventCountdownConfig {
  _id: string
  title: string
  label: LocalizedString
  targetDate: string
  liveLabel?: LocalizedString
  completedMessage?: LocalizedString
  isActive?: boolean
  showLiveBadge?: boolean
}

export interface SanityPost {
  _id: string
  title: LocalizedString
  slug: { current: string }
  author: string
  publishedAt: string
  excerpt: LocalizedString
  /** Localized Portable Text arrays — each key holds a PortableText block array. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: { en: any[]; fr: any[]; pl: any[] }
  imageUrl: string | null
  tags?: string[]
  upcoming?: boolean
  featured?: boolean
}

export interface SanityPostDetail extends SanityPost {
  sponsors?: { _key: string; name: string; website?: string; logoUrl?: string }[]
  partners?: { _key: string; name: string; website?: string; logoUrl?: string }[]
}

export interface SanityPartner {
  _id: string
  name: string
  website?: string
  logoPath?: string
  logo?: SanityImage
  order?: number
}

export interface SanityStatistics {
  items: {
    value: number
    suffix?: string
    order?: number
    label: LocalizedString
  }[]
}

export interface SanityAboutSection {
  eyebrow?: LocalizedString
  title?: LocalizedString
  subtitle?: LocalizedString
  description?: LocalizedString
  features?: {
    icon?: string
    order?: number
    link?: string
    title?: LocalizedString
    description?: LocalizedString
  }[]
}

export interface SanityInitiative {
  _id: string
  featured?: boolean
  icon?: string
  title: LocalizedString
  badge?: LocalizedString
  description: LocalizedString
}

export interface SanityTeamMember {
  _id: string
  name: string
  role: LocalizedString
  linkedin?: string
  photo?: SanityImage
}

export interface SanityTestimonial {
  _id: string
  name: string
  role: LocalizedString
  text: LocalizedString
  year?: number
}

/* ------------------------------------------------------------------ */
/*  Fetch helpers                                                      */
/* ------------------------------------------------------------------ */

/** Fetch all events, newest first. */
export async function getEvents(): Promise<SanityEvent[]> {
  return client.fetch(`*[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    location,
    description,
    "imageUrl": image.asset->url,
    registrationLink,
    tags,
    featured
  }`)
}

/** Fetch the active event countdown configuration (singleton). */
export async function getEventCountdown(): Promise<EventCountdownConfig | null> {
  return client.fetch(`*[_type == "eventCountdown" && isActive == true] | order(_updatedAt desc)[0] {
    _id,
    title,
    label,
    targetDate,
    liveLabel,
    completedMessage,
    isActive,
    showLiveBadge
  }`)
}

/** Fetch all blog posts, newest first. */
export async function getPosts(): Promise<SanityPost[]> {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    content,
    "imageUrl": featuredImage.asset->url,
    tags,
    upcoming,
    featured
  }`)
}

/** Fetch a single event by its slug. Returns `null` when not found. */
export async function getEventBySlug(slug: string): Promise<SanityEvent | null> {
  return client.fetch(`*[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    location,
    description,
    "imageUrl": image.asset->url,
    registrationLink,
    tags,
    featured
  }`, { slug })
}

/** Fetch a single post by its slug (includes sponsors & partners). */
export async function getPostBySlug(slug: string): Promise<SanityPostDetail | null> {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    content,
    "imageUrl": featuredImage.asset->url,
    tags,
    featured,
    sponsors[] {
      _key,
      name,
      website,
      "logoUrl": logo.asset->url
    },
    partners[] {
      _key,
      name,
      website,
      "logoUrl": logo.asset->url
    }
  }`, { slug })
}

/** Fetch active partners for the carousel. */
export async function getPartners(): Promise<SanityPartner[]> {
  return client.fetch(`*[_type == "partner" && status == "active"] | order(order asc, name asc) {
    _id,
    name,
    website,
    logoPath,
    logo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions { width, height } }
      }
    },
    order
  }`)
}

/** Fetch site-wide statistics (singleton). */
export async function getStatistics(): Promise<SanityStatistics | null> {
  return client.fetch(`*[_type == "statistics"] | order(_updatedAt desc)[0] {
    items[] {
      value,
      suffix,
      order,
      label { en, fr, pl }
    }
  }`)
}

/** Fetch the home-page About section (singleton). */
export async function getAboutSection(): Promise<SanityAboutSection | null> {
  return client.fetch(`*[_type == "aboutSection"] | order(_updatedAt desc)[0] {
    eyebrow { en, fr, pl },
    title { en, fr, pl },
    subtitle { en, fr, pl },
    description { en, fr, pl },
    features[] {
      icon,
      order,
      link,
      title { en, fr, pl },
      description { en, fr, pl }
    }
  }`)
}

/** Fetch active initiatives for the home page. */
export async function getInitiatives(): Promise<SanityInitiative[]> {
  return client.fetch(`*[_type == "initiative" && status == "active"] | order(order asc, title.en asc) {
    _id,
    featured,
    icon,
    title { en, fr, pl },
    badge { en, fr, pl },
    description { en, fr, pl }
  }`)
}

/** Fetch active team members. */
export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  return client.fetch(`*[_type == "teamMember" && status == "active"] | order(order asc, name asc) {
    _id,
    name,
    role { en, fr, pl },
    linkedin,
    photo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions { width, height } }
      }
    }
  }`)
}

/** Fetch active testimonials. */
export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return client.fetch(`*[_type == "testimonial" && status == "active"] | order(order asc, name asc) {
    _id,
    name,
    role { en, fr, pl },
    text { en, fr, pl },
    year
  }`)
}
