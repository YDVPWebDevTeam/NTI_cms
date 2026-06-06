import type { GlobalConfig } from 'payload'

import { featureList, labelList, text, textarea } from './marketingFields'

export const Partners: GlobalConfig = {
  slug: 'partners',
  label: 'Partners Page',
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
      name: 'why',
      type: 'group',
      fields: [
        text('eyebrow'),
        text('title'),
        textarea('description'),
        featureList('features', 2, 6),
      ],
    },
    {
      name: 'ways',
      type: 'group',
      fields: [
        text('eyebrow'),
        text('title'),
        textarea('description'),
        featureList('features', 2, 8),
      ],
    },
    {
      name: 'logos',
      type: 'group',
      fields: [text('label'), labelList('items', 3, 8)],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [text('title'), textarea('description')],
    },
  ],
}
