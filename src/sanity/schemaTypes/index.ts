import { type SchemaTypeDefinition } from 'sanity'
import event from './event'
import eventCountdown from './eventCountdown'
import post from './post'
import partner from './partner'
import statistics from './statistics'
import teamMember from './teamMember'
import aboutSection from './aboutSection'
import initiative from './initiative'
import testimonial from './testimonial'
import contactMessage from './contactMessage'
import newsletterSignup from './newsletterSignup'
import siteSettings from './siteSettings'
import homePage from './homePage'
import faq from './faq'
import partnersPage from './partnersPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    event,
    eventCountdown,
    post,
    partner,
    statistics,
    teamMember,
    aboutSection,
    initiative,
    testimonial,
    contactMessage,
    newsletterSignup,
    siteSettings,
    homePage,
    faq,
    partnersPage,
  ],
}
