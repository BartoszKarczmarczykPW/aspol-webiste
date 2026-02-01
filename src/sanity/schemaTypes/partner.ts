import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ['http', 'https'] })
          .error('Must be a valid URL starting with http:// or https://'),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          if (!value?.asset?._ref) return 'Logo is required'

          const client = context.getClient({ apiVersion: '2025-11-01' })
          const asset = await client.fetch(
            '*[_id == $id][0]{metadata{dimensions{width,height}}}',
            { id: value.asset._ref }
          )

          const width = asset?.metadata?.dimensions?.width
          const height = asset?.metadata?.dimensions?.height

          if (!width || !height) return 'Unable to read logo dimensions'
          if (width < 200 || height < 80) return 'Logo is too small (min 200x80px)'
          if (width > 2000 || height > 1000) return 'Logo is too large (max 2000x1000px)'

          const ratio = width / height
          if (ratio < 1 || ratio > 6) return 'Logo should be landscape (ratio between 1:1 and 6:1)'

          return true
        }),
    }),
    defineField({
      name: 'logoPath',
      title: 'Logo Path (Deprecated)',
      type: 'string',
      description: 'Legacy fallback. Prefer the Logo image field above.',
      deprecated: {
        reason: 'Use the Logo image field for previews and size validation.',
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          if (!/^\//.test(value)) return 'Logo path must start with “/”'
          return true
        }),
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
    select: {
      title: 'name',
      subtitle: 'website',
      media: 'logo',
    },
  },
})

export default partner
