import type { CollectionConfig } from 'payload'

const slugify = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'News Article',
    plural: 'News',
  },
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    // The public can only read published articles; authenticated CMS users see everything.
    read: ({ req: { user } }) => {
      if (user) {
        return true
      }

      return {
        status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL segment, e.g. /news/your-slug. Auto-filled from the title if left blank.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === 'string' && value.trim()) {
              return slugify(value)
            }

            if (data && typeof data.title === 'string' && data.title.trim()) {
              return slugify(data.title)
            }

            return value
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy',
        },
        description: 'Used for ordering and shown on the article.',
      },
    },
    {
      name: 'category',
      type: 'text',
      localized: true,
      admin: {
        description: 'Short label, e.g. Announcement, Event, Story.',
      },
    },
    {
      name: 'author',
      type: 'text',
      localized: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional. The frontend shows a branded placeholder when no cover image is set.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'One- or two-sentence summary shown in listings and previews.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
  ],
}
