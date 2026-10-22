import { defineType, defineField, defineArrayMember } from 'sanity'
import { UsersIcon } from '@sanity/icons'
import { localized, imageWithAlt } from './_fields'

const loc = (kind: 'string' | 'text') => [
  defineField({ name: 'en', title: 'English', type: kind }),
  defineField({ name: 'fr', title: 'French', type: kind }),
  defineField({ name: 'pl', title: 'Polish', type: kind }),
]

/**
 * Singleton: copy for the /partners page. Everything is optional; the page keeps
 * its built-in text for any field (or list) left empty.
 */
const partnersPage = defineType({
  name: 'partnersPage',
  title: 'Partners Page',
  type: 'document',
  icon: UsersIcon,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'value', title: 'Strategic value' },
    { name: 'scope', title: 'Scope' },
    { name: 'community', title: 'Community profile' },
    { name: 'cta', title: 'Final call to action' },
  ],
  fields: [
    localized('heroLabel', 'Badge', 'string', undefined, 'hero'),
    localized('heroTitle', 'Title', 'string', undefined, 'hero'),
    localized('heroSubtitle', 'Subtitle', 'text', undefined, 'hero'),
    localized('heroCta', 'Button label', 'string', undefined, 'hero'),
    imageWithAlt('heroImage', 'Hero photo', undefined, 'hero'),

    localized('valueTitle', 'Heading', 'string', undefined, 'value'),
    defineField({
      name: 'valueItems',
      title: 'Value cards',
      type: 'array',
      group: 'value',
      description: 'Leave empty to keep the default cards. The card icon follows the card position.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'valueItem',
          fields: [
            defineField({ name: 'title', title: 'Title (EN/FR/PL)', type: 'object', fields: loc('string') }),
            defineField({ name: 'description', title: 'Description (EN/FR/PL)', type: 'object', fields: loc('text') }),
          ],
          preview: { select: { title: 'title.en', subtitle: 'description.en' } },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),

    localized('scopeTitle', 'Heading', 'string', undefined, 'scope'),
    localized('scopeSubtitle', 'Intro', 'text', undefined, 'scope'),
    defineField({
      name: 'scopeItems',
      title: 'Collaboration items',
      type: 'array',
      group: 'scope',
      description: 'Leave empty to keep the default list.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'scopeItem',
          fields: [defineField({ name: 'text', title: 'Text (EN/FR/PL)', type: 'object', fields: loc('string') })],
          preview: { select: { title: 'text.en' } },
        }),
      ],
      validation: (rule) => rule.max(16),
    }),

    localized('communityTitle', 'Heading', 'string', undefined, 'community'),
    localized('disciplines', 'Core disciplines', 'string', undefined, 'community'),
    defineField({
      name: 'stats',
      title: 'Community statistics',
      type: 'array',
      group: 'community',
      description: 'Leave empty to keep the default figures.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'communityStat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. 40%', validation: (rule) => rule.required().max(10) }),
            defineField({ name: 'label', title: 'Label (EN/FR/PL)', type: 'object', fields: loc('string') }),
          ],
          preview: { select: { title: 'value', subtitle: 'label.en' } },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),

    localized('ctaTitle', 'Heading', 'string', undefined, 'cta'),
    localized('ctaSubtitle', 'Text', 'text', undefined, 'cta'),
    localized('ctaButton', 'Button label', 'string', undefined, 'cta'),
    localized('ctaEmailText', 'Text before the email', 'string', 'e.g. or email us directly at', 'cta'),
  ],
  preview: { prepare: () => ({ title: 'Partners Page' }) },
})

export default partnersPage
