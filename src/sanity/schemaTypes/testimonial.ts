import { defineType, defineField } from 'sanity'
import { CommentIcon } from '@sanity/icons'

const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'role',
      title: 'Role (EN/FR/PL)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'string', validation: (rule) => rule.required().max(100) }),
        defineField({ name: 'fr', title: 'French', type: 'string', validation: (rule) => rule.required().max(100) }),
        defineField({ name: 'pl', title: 'Polish', type: 'string', validation: (rule) => rule.required().max(100) }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text (EN/FR/PL)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', validation: (rule) => rule.required() }),
        defineField({ name: 'fr', title: 'French', type: 'text', validation: (rule) => rule.required() }),
        defineField({ name: 'pl', title: 'Polish', type: 'text', validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (rule) => rule.required().max(4),
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
    select: { title: 'name', subtitle: 'role.en' },
  },
})

export default testimonial
