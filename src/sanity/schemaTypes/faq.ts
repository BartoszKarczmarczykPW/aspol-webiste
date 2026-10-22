import { defineType, defineField } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question (EN/FR/PL)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'string', validation: (rule) => rule.required().max(160) }),
        defineField({ name: 'fr', title: 'French', type: 'string', validation: (rule) => rule.required().max(160) }),
        defineField({ name: 'pl', title: 'Polish', type: 'string', validation: (rule) => rule.required().max(160) }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer (EN/FR/PL)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', validation: (rule) => rule.required() }),
        defineField({ name: 'fr', title: 'French', type: 'text', validation: (rule) => rule.required() }),
        defineField({ name: 'pl', title: 'Polish', type: 'text', validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
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
  preview: { select: { title: 'question.en', subtitle: 'status' } },
})

export default faq
