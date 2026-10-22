import { defineType, defineField, defineArrayMember } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { localized, imageWithAlt } from './_fields'

/**
 * Singleton: editable copy and imagery for the home page sections that are not
 * covered by their own document types (hero, headings, calls to action, photos).
 * Every field is optional; the website falls back to its built-in text/photos.
 */
const homePage = defineType({
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'partners', title: 'Partners' },
    { name: 'initiatives', title: 'Initiatives' },
    { name: 'team', title: 'Team' },
    { name: 'testimonials', title: 'Testimonials & photos' },
    { name: 'faq', title: 'FAQ' },
    { name: 'newsletter', title: 'Newsletter' },
    { name: 'contact', title: 'Contact & join' },
  ],
  fields: [
    // Hero
    localized('heroWelcome', 'Hero title', 'string', 'Headline before the word ASPOL, e.g. "Welcome to".', 'hero'),
    localized('heroSubtitle', 'Hero subtitle', 'string', undefined, 'hero'),
    localized('heroDescription', 'Hero description', 'text', undefined, 'hero'),
    localized('heroJoinLabel', 'Primary button label', 'string', 'e.g. Join ASPOL', 'hero'),
    localized('heroPartnerLabel', 'Secondary button label', 'string', 'e.g. Become a Partner', 'hero'),
    imageWithAlt('heroImage', 'Hero photo', 'Wide landscape photo (min. 1600px wide) shown in the rising dome.', 'hero'),
    imageWithAlt('statsImage', 'Statistics background photo', 'Shown faintly behind the numbers.', 'hero'),

    // Partners
    localized('partnersTitle', 'Partners heading', 'string', undefined, 'partners'),
    localized('partnersCta', 'Partners button label', 'string', undefined, 'partners'),

    // Initiatives
    localized('initiativesTitle', 'Initiatives heading', 'string', undefined, 'initiatives'),
    localized('initiativesSubtitle', 'Initiatives intro', 'text', undefined, 'initiatives'),
    localized('initiativesCta', 'Closing question', 'string', 'e.g. Interested in joining our community?', 'initiatives'),
    localized('initiativesJoinButton', 'Closing button label', 'string', undefined, 'initiatives'),

    // Team
    localized('teamTitle', 'Team heading', 'string', undefined, 'team'),
    localized('teamSubtitle', 'Team intro', 'text', undefined, 'team'),
    localized('teamJoinText', 'Join-the-team question', 'string', undefined, 'team'),
    localized('teamJoinButton', 'Join-the-team button label', 'string', undefined, 'team'),

    // Testimonials and photo strip
    localized('testimonialsTitle', 'Testimonials heading', 'string', undefined, 'testimonials'),
    localized('testimonialsSubtitle', 'Testimonials intro', 'text', undefined, 'testimonials'),
    localized('testimonialsShareText', 'Share-your-story question', 'string', undefined, 'testimonials'),
    localized('testimonialsJoinButton', 'Share-your-story button label', 'string', undefined, 'testimonials'),
    defineField({
      name: 'moments',
      title: 'Event photo strip',
      type: 'array',
      group: 'testimonials',
      description: 'Photos in the scrolling strip under the testimonials. Leave empty to keep the default photos.',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text (EN/FR/PL)',
              type: 'object',
              fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'fr', title: 'French', type: 'string' }),
                defineField({ name: 'pl', title: 'Polish', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
      validation: (rule) => rule.max(12),
    }),

    // FAQ
    localized('faqTitle', 'FAQ heading', 'string', undefined, 'faq'),
    localized('faqSubtitle', 'FAQ intro', 'string', undefined, 'faq'),

    // Newsletter
    localized('newsletterTitle', 'Newsletter heading', 'string', undefined, 'newsletter'),
    localized('newsletterDescription', 'Newsletter text', 'text', undefined, 'newsletter'),
    localized('newsletterButton', 'Newsletter button label', 'string', undefined, 'newsletter'),

    // Contact + join panel
    localized('contactTitle', 'Contact heading', 'string', undefined, 'contact'),
    localized('contactSubtitle', 'Contact intro', 'text', undefined, 'contact'),
    localized('joinPanelTitle', 'Join panel heading', 'string', undefined, 'contact'),
    localized('joinPanelDescription', 'Join panel text', 'text', undefined, 'contact'),
    localized('joinPanelButton', 'Join panel button label', 'string', undefined, 'contact'),
    imageWithAlt('joinPanelImage', 'Join panel background photo', undefined, 'contact'),
  ],
  preview: { prepare: () => ({ title: 'Home Page Content' }) },
})

export default homePage
