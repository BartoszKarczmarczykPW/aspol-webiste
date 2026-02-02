import { defineType, defineField, defineArrayMember } from 'sanity'

const richTextBlock = defineArrayMember({
    type: 'block',
    styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
    ],
    lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
    ],
    marks: {
        decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Underline', value: 'underline' },
        ],
        annotations: [
            defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                    defineField({
                        name: 'href',
                        title: 'URL',
                        type: 'url',
                        validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto'] }),
                    }),
                ],
            }),
        ],
    },
})

export default defineType({
    name: 'post',
    title: 'Blog Post',
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
            name: 'author',
            title: 'Author',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'text' },
                { name: 'fr', title: 'French', type: 'text' },
                { name: 'pl', title: 'Polish', type: 'text' },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'object',
            fields: [
                {
                    name: 'en',
                    title: 'English',
                    type: 'array',
                    of: [richTextBlock],
                },
                {
                    name: 'fr',
                    title: 'French',
                    type: 'array',
                    of: [richTextBlock],
                },
                {
                    name: 'pl',
                    title: 'Polish',
                    type: 'array',
                    of: [richTextBlock],
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'sponsors',
            title: 'Sponsors',
            type: 'array',
            of: [
                defineArrayMember({
                    name: 'sponsor',
                    title: 'Sponsor',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'website',
                            title: 'Website',
                            type: 'url',
                            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
                        }),
                        defineField({
                            name: 'logo',
                            title: 'Logo',
                            type: 'image',
                            options: { hotspot: true },
                        }),
                    ],
                    preview: {
                        select: { title: 'name', media: 'logo' },
                    },
                }),
            ],
        }),
        defineField({
            name: 'partners',
            title: 'Partners',
            type: 'array',
            of: [
                defineArrayMember({
                    name: 'partner',
                    title: 'Partner',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'website',
                            title: 'Website',
                            type: 'url',
                            validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
                        }),
                        defineField({
                            name: 'logo',
                            title: 'Logo',
                            type: 'image',
                            options: { hotspot: true },
                        }),
                    ],
                    preview: {
                        select: { title: 'name', media: 'logo' },
                    },
                }),
            ],
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'featured',
            title: 'Featured Post',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title.en',
            author: 'author',
            media: 'featuredImage',
        },
        prepare(selection) {
            const { author } = selection
            return {
                title: selection.title,
                subtitle: author && `by ${author}`,
                media: selection.media,
            }
        },
    },
})
