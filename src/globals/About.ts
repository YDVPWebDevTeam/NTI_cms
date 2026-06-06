import type { GlobalConfig } from 'payload'

import { featureList, text, textarea } from './marketingFields'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
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
      name: 'what',
      type: 'group',
      fields: [
        text('eyebrow'),
        text('title'),
        textarea('description'),
        featureList('features', 2, 8),
      ],
    },
    {
      name: 'values',
      type: 'group',
      fields: [text('eyebrow'), text('title'), featureList('features', 2, 6)],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [text('title'), textarea('description')],
    },
  ],
}
