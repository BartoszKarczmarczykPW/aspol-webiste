import { defineType, defineField } from 'sanity'
import { DocumentPdfIcon } from '@sanity/icons'

const loc = (kind: 'string' | 'text') => [
  defineField({ name: 'en', title: 'English', type: kind }),
  defineField({ name: 'fr', title: 'French', type: kind }),
  defineField({ name: 'pl', title: 'Polish', type: kind }),
]

/**
 * A guide in the "Resources" section of /initiatives. The PDF is shown inside the
 * website (page previews on the card, the full scrollable document on
 * /resources/<slug>); it is offered as a download only when "Allow download" is on.
 */
const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  icon: DocumentPdfIcon,
  fields: [
    defineField({ name: 'title', title: 'Title (EN/FR/PL)', type: 'object', fields: loc('string'), validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description: 'The guide opens at aspol.fr/resources/<this>. Click "Generate".',
      options: { source: 'title.en', maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', title: 'Description (EN/FR/PL)', type: 'object', fields: loc('text') }),
    defineField({
      name: 'file',
      title: 'PDF file',
      type: 'file',
      options: { accept: 'application/pdf' },
      description: 'The guide itself. Visitors read it on the website; the first 3 pages are shown as a preview.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Shown as "Guide written by" on the website. Leave empty to sign it as the ASPOL team.',
    }),
    defineField({
      name: 'allowDownload',
      title: 'Allow download',
      type: 'boolean',
      initialValue: false,
      description: 'Off: no download button, the guide can only be read on the website.',
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
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
    select: { title: 'title.en', subtitle: 'author' },
  },
})

export default resource
