import { defineType, defineField, defineArrayMember } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons'

const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (EN/FR/PL)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'string', validation: (rule) => rule.required().max(40) }),
        defineField({ name: 'fr', title: 'French', type: 'string', validation: (rule) => rule.required().max(40) }),
        defineField({ name: 'pl', title: 'Polish', type: 'string', validation: (rule) => rule.required().max(40) }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title (EN/FR/PL)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'string', validation: (rule) => rule.required().max(80) }),
        defineField({ name: 'fr', title: 'French', type: 'string', validation: (rule) => rule.required().max(80) }),
        defineField({ name: 'pl', title: 'Polish', type: 'string', validation: (rule) => rule.required().max(80) }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (EN/FR/PL)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'fr', title: 'French', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'pl', title: 'Polish', type: 'string', validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (EN/FR/PL)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', validation: (rule) => rule.required() }),
        defineField({ name: 'fr', title: 'French', type: 'text', validation: (rule) => rule.required() }),
        defineField({ name: 'pl', title: 'Polish', type: 'text', validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (emoji)',
              type: 'string',
              validation: (rule) => rule.required().max(4),
            }),
            defineField({
              name: 'title',
              title: 'Title (EN/FR/PL)',
              type: 'object',
              fields: [
                defineField({ name: 'en', title: 'English', type: 'string', validation: (rule) => rule.required().max(80) }),
                defineField({ name: 'fr', title: 'French', type: 'string', validation: (rule) => rule.required().max(80) }),
                defineField({ name: 'pl', title: 'Polish', type: 'string', validation: (rule) => rule.required().max(80) }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description (EN/FR/PL)',
              type: 'object',
              fields: [
                defineField({ name: 'en', title: 'English', type: 'text', validation: (rule) => rule.required() }),
                defineField({ name: 'fr', title: 'French', type: 'text', validation: (rule) => rule.required() }),
                defineField({ name: 'pl', title: 'Polish', type: 'text', validation: (rule) => rule.required() }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link (optional)',
              type: 'url',
              validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              initialValue: 0,
              validation: (rule) => rule.min(0),
            }),
          ],
          preview: {
            select: { title: 'title.en', subtitle: 'description.en' },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(8).error('Add between 1 and 8 features'),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Section' }),
  },
})

export default aboutSection
