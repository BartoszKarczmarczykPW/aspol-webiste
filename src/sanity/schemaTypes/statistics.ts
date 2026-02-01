import { defineType, defineField, defineArrayMember } from 'sanity'
import { BarChartIcon } from '@sanity/icons'

const statistics = defineType({
  name: 'statistics',
  title: 'Statistics',
  type: 'document',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Statistic Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'statItem',
          title: 'Stat Item',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
              validation: (rule) => rule.required().min(0),
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'Optional, e.g. + or %',
            }),
            defineField({
              name: 'label',
              title: 'Label (EN/FR/PL)',
              type: 'object',
              fields: [
                defineField({
                  name: 'en',
                  title: 'English',
                  type: 'string',
                  validation: (rule) => rule.required().max(80),
                }),
                defineField({
                  name: 'fr',
                  title: 'French',
                  type: 'string',
                  validation: (rule) => rule.required().max(80),
                }),
                defineField({
                  name: 'pl',
                  title: 'Polish',
                  type: 'string',
                  validation: (rule) => rule.required().max(80),
                }),
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
          ],
          preview: {
            select: {
              title: 'label.en',
              subtitle: 'value',
            },
            prepare: ({ title, subtitle }) => ({
              title: title || 'Stat Item',
              subtitle: subtitle !== undefined ? `Value: ${subtitle}` : undefined,
            }),
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(6).error('Add between 1 and 6 items'),
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Site Statistics',
    }),
  },
})

export default statistics
