import { defineType, defineField } from 'sanity'
import { BillIcon } from '@sanity/icons'

const newsletterSignup = defineType({
  name: 'newsletterSignup',
  title: 'Newsletter Signup',
  type: 'document',
  icon: BillIcon,
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: 'email' },
  },
})

export default newsletterSignup
