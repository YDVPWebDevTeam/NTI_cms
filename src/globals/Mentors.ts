import type { Field, GlobalConfig } from 'payload'

import { featureList, text, textarea } from './marketingFields'

/** Optional photo for a mentor; the frontend supplies a default when empty. */
const mentorImage: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  admin: {
    description:
      'Optional in CMS. The frontend will use a built-in default portrait until you upload one.',
  },
}

export const Mentors: GlobalConfig = {
  slug: 'mentors',
  label: 'Mentors Page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Website',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [text('eyebrow'), text('title'), textarea('description')],
    },
    {
      name: 'value',
      type: 'group',
      fields: [
        text('eyebrow'),
        text('title'),
        textarea('description'),
        featureList('features', 2, 6),
      ],
    },
    {
      name: 'people',
      type: 'group',
      fields: [
        text('eyebrow'),
        text('title'),
        textarea('description'),
        {
          name: 'mentors',
          type: 'array',
          minRows: 2,
          maxRows: 8,
          required: true,
          fields: [text('name'), text('role'), textarea('bio'), mentorImage],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [text('title'), textarea('description')],
    },
  ],
}
