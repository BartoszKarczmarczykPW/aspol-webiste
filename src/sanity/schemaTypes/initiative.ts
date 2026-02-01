import { defineType, defineField } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

const initiative = defineType({
  name: 'initiative',
  title: 'Initiative',
  type: 'document',
  icon: SparklesIcon,
  fields: [
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
      name: 'badge',
      title: 'Badge (EN/FR/PL)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'string', validation: (rule) => rule.required().max(40) }),
        defineField({ name: 'fr', title: 'French', type: 'string', validation: (rule) => rule.required().max(40) }),
        defineField({ name: 'pl', title: 'Polish', type: 'string', validation: (rule) => rule.required().max(40) }),
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
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Forum', value: 'forum' },
          { title: 'Mentoring', value: 'mentoring' },
          { title: 'Community', value: 'community' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'active',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'badge.en' },
  },
})

export default initiative
