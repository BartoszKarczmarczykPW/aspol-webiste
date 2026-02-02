import { defineType, defineField } from 'sanity'
import { ClockIcon } from '@sanity/icons'

const eventCountdown = defineType({
  name: 'eventCountdown',
  title: 'Event Countdown',
  type: 'document',
  icon: ClockIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'label',
      title: 'Label (EN/FR/PL)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'string', validation: (rule) => rule.required().max(80) }),
        defineField({ name: 'fr', title: 'French', type: 'string', validation: (rule) => rule.required().max(80) }),
        defineField({ name: 'pl', title: 'Polish', type: 'string', validation: (rule) => rule.required().max(80) }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'targetDate',
      title: 'Target Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'liveLabel',
      title: 'Live Badge Label (EN/FR/PL)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'string', validation: (rule) => rule.required().max(20) }),
        defineField({ name: 'fr', title: 'French', type: 'string', validation: (rule) => rule.required().max(20) }),
        defineField({ name: 'pl', title: 'Polish', type: 'string', validation: (rule) => rule.required().max(20) }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'completedMessage',
      title: 'Message When Countdown Ends (EN/FR/PL)',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'string', validation: (rule) => rule.max(120) }),
        defineField({ name: 'fr', title: 'French', type: 'string', validation: (rule) => rule.max(120) }),
        defineField({ name: 'pl', title: 'Polish', type: 'string', validation: (rule) => rule.max(120) }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showLiveBadge',
      title: 'Show Live Badge',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'targetDate',
    },
    prepare({ title, date }) {
      return {
        title: title || 'Event Countdown',
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
      }
    },
  },
})

export default eventCountdown
