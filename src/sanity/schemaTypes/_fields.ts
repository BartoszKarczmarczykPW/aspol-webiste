import { defineField } from 'sanity'

/**
 * Shared field builders so the new schemas stay short and consistent with the
 * existing "(EN/FR/PL)" object convention. Every field built here is OPTIONAL:
 * when an editor leaves it empty the website falls back to the built-in text.
 */

type Kind = 'string' | 'text'

export const localized = (name: string, title: string, kind: Kind = 'string', description?: string, group?: string) =>
  defineField({
    name,
    title: `${title} (EN/FR/PL)`,
    type: 'object',
    group,
    description: description ?? 'Optional. Leave empty to keep the default text.',
    options: { columns: 1 },
    fields: [
      defineField({ name: 'en', title: 'English', type: kind }),
      defineField({ name: 'fr', title: 'French', type: kind }),
      defineField({ name: 'pl', title: 'Polish', type: kind }),
    ],
  })

export const imageWithAlt = (name: string, title: string, description?: string, group?: string) =>
  defineField({
    name,
    title,
    type: 'image',
    group,
    description: description ?? 'Optional. Leave empty to keep the default photo.',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text (EN/FR/PL)',
        type: 'object',
        description: 'Describe the photo for screen readers.',
        fields: [
          defineField({ name: 'en', title: 'English', type: 'string' }),
          defineField({ name: 'fr', title: 'French', type: 'string' }),
          defineField({ name: 'pl', title: 'Polish', type: 'string' }),
        ],
      }),
    ],
  })
