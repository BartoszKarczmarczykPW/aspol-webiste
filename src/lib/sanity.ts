import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for fast public reads
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
    image?: SanityImageWithAlt | null
    title?: LocalizedString
    description?: LocalizedString
  }[]
}

export interface SanityImageWithAlt {
  asset?: { _ref?: string; _id?: string; url?: string } | null
  alt?: Partial<LocalizedString>
  [key: string]: unknown
}

export interface SanityInitiative {
  _id: string
  image?: SanityImageWithAlt | null
  link?: string
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
  photo?: SanityImageWithAlt | null
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
  }`, undefined, { next: { revalidate: 300, tags: ['events'] } })
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
  }`, undefined, { next: { revalidate: 300, tags: ['eventCountdown'] } })
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
  }`, undefined, { next: { revalidate: 300, tags: ['blog'] } })
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
  }`, { slug }, { next: { revalidate: 300, tags: [`event-${slug}`] } })
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
  }`, { slug }, { next: { revalidate: 300, tags: [`post-${slug}`] } })
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
  }`, undefined, { next: { revalidate: 300, tags: ['partners'] } })
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
  }`, undefined, { next: { revalidate: 300, tags: ['statistics'] } })
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
      image { ..., alt { en, fr, pl } },
      title { en, fr, pl },
      description { en, fr, pl }
    }
  }`, undefined, { next: { revalidate: 300, tags: ['aboutSection'] } })
}

/** Fetch active initiatives for the home page. */
export async function getInitiatives(): Promise<SanityInitiative[]> {
  return client.fetch(`*[_type == "initiative" && status == "active"] | order(order asc, title.en asc) {
    _id,
    featured,
    icon,
    link,
    image { ..., alt { en, fr, pl } },
    title { en, fr, pl },
    badge { en, fr, pl },
    description { en, fr, pl }
  }`, undefined, { next: { revalidate: 300, tags: ['initiatives'] } })
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
  }`, undefined, { next: { revalidate: 300, tags: ['teamMembers'] } })
}

/** Fetch active testimonials. */
export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return client.fetch(`*[_type == "testimonial" && status == "active"] | order(order asc, name asc) {
    _id,
    name,
    role { en, fr, pl },
    text { en, fr, pl },
    photo { ..., alt { en, fr, pl } },
    year
  }`, undefined, { next: { revalidate: 300, tags: ['testimonials'] } })
}

/* ------------------------------------------------------------------ */
/*  Site settings, home page content and FAQ (all fields optional)     */
/* ------------------------------------------------------------------ */

type L = Partial<LocalizedString>

export interface SanitySiteSettings {
  joinUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  facebookHandle?: string
  instagramHandle?: string
  linkedinHandle?: string
  contactEmail?: string
  contactLocation?: L
  foundedLabel?: string
  boardSeason?: string
  footerStatement?: L
}

export interface SanityHomePage {
  heroWelcome?: L
  heroSubtitle?: L
  heroDescription?: L
  heroJoinLabel?: L
  heroPartnerLabel?: L
  heroImage?: SanityImageWithAlt | null
  statsImage?: SanityImageWithAlt | null
  partnersTitle?: L
  partnersCta?: L
  initiativesTitle?: L
  initiativesSubtitle?: L
  initiativesCta?: L
  initiativesJoinButton?: L
  teamTitle?: L
  teamSubtitle?: L
  teamJoinText?: L
  teamJoinButton?: L
  testimonialsTitle?: L
  testimonialsSubtitle?: L
  testimonialsShareText?: L
  testimonialsJoinButton?: L
  moments?: SanityImageWithAlt[]
  faqTitle?: L
  faqSubtitle?: L
  newsletterTitle?: L
  newsletterDescription?: L
  newsletterButton?: L
  contactTitle?: L
  contactSubtitle?: L
  joinPanelTitle?: L
  joinPanelDescription?: L
  joinPanelButton?: L
  joinPanelImage?: SanityImageWithAlt | null
}

export interface SanityFaq {
  _id: string
  question: LocalizedString
  answer: LocalizedString
}

/** Fetch the Site Settings singleton. */
export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return client.fetch(`*[_type == "siteSettings"] | order(_updatedAt desc)[0] {
    joinUrl, facebookUrl, instagramUrl, linkedinUrl,
    facebookHandle, instagramHandle, linkedinHandle,
    contactEmail, contactLocation { en, fr, pl },
    foundedLabel, boardSeason,
    footerStatement { en, fr, pl }
  }`, undefined, { next: { revalidate: 300, tags: ['siteSettings'] } })
}

const L3 = '{ en, fr, pl }'
const IMG = '{ ..., alt { en, fr, pl } }'

/** Fetch the Home Page Content singleton. */
export async function getHomePage(): Promise<SanityHomePage | null> {
  return client.fetch(`*[_type == "homePage"] | order(_updatedAt desc)[0] {
    heroWelcome ${L3}, heroSubtitle ${L3}, heroDescription ${L3}, heroJoinLabel ${L3}, heroPartnerLabel ${L3},
    heroImage ${IMG}, statsImage ${IMG},
    partnersTitle ${L3}, partnersCta ${L3},
    initiativesTitle ${L3}, initiativesSubtitle ${L3}, initiativesCta ${L3}, initiativesJoinButton ${L3},
    teamTitle ${L3}, teamSubtitle ${L3}, teamJoinText ${L3}, teamJoinButton ${L3},
    testimonialsTitle ${L3}, testimonialsSubtitle ${L3}, testimonialsShareText ${L3}, testimonialsJoinButton ${L3},
    moments[] ${IMG},
    faqTitle ${L3}, faqSubtitle ${L3},
    newsletterTitle ${L3}, newsletterDescription ${L3}, newsletterButton ${L3},
    contactTitle ${L3}, contactSubtitle ${L3},
    joinPanelTitle ${L3}, joinPanelDescription ${L3}, joinPanelButton ${L3}, joinPanelImage ${IMG}
  }`, undefined, { next: { revalidate: 300, tags: ['homePage'] } })
}

/** Fetch active FAQ entries. */
export async function getFaqs(): Promise<SanityFaq[]> {
  return client.fetch(`*[_type == "faq" && status == "active"] | order(order asc, question.en asc) {
    _id,
    question ${L3},
    answer ${L3}
  }`, undefined, { next: { revalidate: 300, tags: ['faq'] } })
}

export interface SanityPartnersPage {
  heroLabel?: L; heroTitle?: L; heroSubtitle?: L; heroCta?: L
  heroImage?: SanityImageWithAlt | null
  valueTitle?: L
  valueItems?: { title?: L; description?: L }[]
  scopeTitle?: L; scopeSubtitle?: L
  scopeItems?: { text?: L }[]
  communityTitle?: L; disciplines?: L
  stats?: { value?: string; label?: L }[]
  ctaTitle?: L; ctaSubtitle?: L; ctaButton?: L; ctaEmailText?: L
}

/** Fetch the Partners Page singleton. */
export async function getPartnersPage(): Promise<SanityPartnersPage | null> {
  return client.fetch(`*[_type == "partnersPage"] | order(_updatedAt desc)[0] {
    heroLabel ${L3}, heroTitle ${L3}, heroSubtitle ${L3}, heroCta ${L3}, heroImage ${IMG},
    valueTitle ${L3}, valueItems[] { title ${L3}, description ${L3} },
    scopeTitle ${L3}, scopeSubtitle ${L3}, scopeItems[] { text ${L3} },
    communityTitle ${L3}, disciplines ${L3}, stats[] { value, label ${L3} },
    ctaTitle ${L3}, ctaSubtitle ${L3}, ctaButton ${L3}, ctaEmailText ${L3}
  }`, undefined, { next: { revalidate: 300, tags: ['partnersPage'] } })
}
