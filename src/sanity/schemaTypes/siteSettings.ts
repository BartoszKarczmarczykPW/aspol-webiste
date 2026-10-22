import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'
import { localized } from './_fields'

/** Singleton: site-wide links, contact details and footer copy. */
const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'links', title: 'Links', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'footer', title: 'Footer & header' },
  ],
  fields: [
    defineField({
      name: 'joinUrl',
      title: 'Membership form URL',
      type: 'url',
      group: 'links',
      description: 'Used by every "Join ASPOL" button on the site (header, hero, footer, team, contact).',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      group: 'links',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'links',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'links',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'facebookHandle',
      title: 'Facebook label',
      type: 'string',
      group: 'links',
      description: 'Shown in the contact section, e.g. @aspologne',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram label',
      type: 'string',
      group: 'links',
      description: 'e.g. @aspolska',
    }),
    defineField({
      name: 'linkedinHandle',
      title: 'LinkedIn label',
      type: 'string',
      group: 'links',
      description: 'e.g. ASPOL',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      group: 'contact',
      description: 'Displayed in the contact section and used for partnership buttons. Messages are still delivered to the address configured on the server.',
      validation: (rule) => rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email' }).error('Enter a valid email address'),
    }),
    localized('contactLocation', 'Location', 'string', 'e.g. Paris, France', 'contact'),
    defineField({
      name: 'foundedLabel',
      title: 'Hero badge text',
      type: 'string',
      group: 'footer',
      description: 'Small pill above the hero title, e.g. "Est. 2016 • Paris, France".',
    }),
    defineField({
      name: 'boardSeason',
      title: 'Board season',
      type: 'string',
      group: 'footer',
      description: 'Shown under each team member, e.g. 2026/27.',
    }),
    localized('footerStatement', 'Footer statement', 'text', 'Large sentence at the top of the footer.', 'footer'),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})

export default siteSettings
