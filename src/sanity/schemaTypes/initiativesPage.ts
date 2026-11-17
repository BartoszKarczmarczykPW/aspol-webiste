import { defineType, defineField, defineArrayMember } from 'sanity'
import { RocketIcon } from '@sanity/icons'
import { localized, imageWithAlt } from './_fields'

const loc = (kind: 'string' | 'text') => [
  defineField({ name: 'en', title: 'English', type: kind }),
  defineField({ name: 'fr', title: 'French', type: kind }),
  defineField({ name: 'pl', title: 'Polish', type: kind }),
]

/**
 * Singleton: the editable parts of the /initiatives page (mentoring photo, sign-up
 * forms, webinar calendar, resources intro). The rest of the page copy is built in.
 * Resources themselves are separate "Resource" documents.
 */
const initiativesPage = defineType({
  name: 'initiativesPage',
  title: 'Initiatives Page',
  type: 'document',
  icon: RocketIcon,
  groups: [
    { name: 'mentoring', title: 'Mentoring', default: true },
    { name: 'webinars', title: 'Webinars' },
    { name: 'resources', title: 'Resources' },
  ],
  fields: [
    imageWithAlt('mentoringImage', 'Mentoring photo', 'Optional. Leave empty to keep the default Paris Polish Forum photo.', 'mentoring'),
    defineField({
      name: 'menteeFormUrl',
      title: 'Sign-up form: Mentee',
      type: 'url',
      group: 'mentoring',
      description: 'Optional. Google Form link for the "Become a Mentee" card. Leave empty to use the default form (forms.gle/7dKMao9GvZksXwhd6).',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'mentorFormUrl',
      title: 'Sign-up form: Mentor',
      type: 'url',
      group: 'mentoring',
      description: 'Optional. Google Form link for the "Become a Mentor" card. Leave empty to use the default form (forms.gle/b14gGimG1sosRi1VA).',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),

    localized('webinarsIntro', 'Webinars intro', 'text', undefined, 'webinars'),
    defineField({
      name: 'webinars',
      title: 'Webinar calendar',
      type: 'array',
      group: 'webinars',
      description: 'Upcoming webinars are listed by date. Past webinars are hidden automatically.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'webinar',
          fields: [
            defineField({ name: 'title', title: 'Title (EN/FR/PL)', type: 'object', fields: loc('string'), validation: (rule) => rule.required() }),
            defineField({ name: 'date', title: 'Date & time', type: 'datetime', validation: (rule) => rule.required() }),
            defineField({ name: 'durationMinutes', title: 'Duration (minutes)', type: 'number', initialValue: 60, validation: (rule) => rule.min(10).max(480) }),
            defineField({ name: 'description', title: 'Short description (EN/FR/PL)', type: 'object', fields: loc('text') }),
            defineField({
              name: 'link',
              title: 'Registration / meeting link',
              type: 'url',
              validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: { title: 'title.en', date: 'date' },
            prepare: ({ title, date }) => ({
              title: title || 'Webinar',
              subtitle: date ? new Date(date).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : 'No date',
            }),
          },
        }),
      ],
    }),

    localized('resourcesIntro', 'Resources intro', 'text', undefined, 'resources'),
  ],
  preview: { prepare: () => ({ title: 'Initiatives Page' }) },
})

export default initiativesPage
