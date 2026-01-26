import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'fr', title: 'French', type: 'string' },
                { name: 'pl', title: 'Polish', type: 'string' },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title.en',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Event Date',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'fr', title: 'French', type: 'string' },
                { name: 'pl', title: 'Polish', type: 'string' },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'text' },
                { name: 'fr', title: 'French', type: 'text' },
                { name: 'pl', title: 'Polish', type: 'text' },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Event Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'registrationLink',
            title: 'Registration Link',
            type: 'url',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'featured',
            title: 'Featured Event',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title.en',
            date: 'date',
            media: 'image',
        },
        prepare(selection) {
            const { title, date } = selection
            return {
                title: title,
                subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
                media: selection.media,
            }
        },
    },
})
