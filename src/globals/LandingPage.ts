import type { GlobalConfig } from 'payload'

const iconOptions = [
  {
    label: 'Rocket',
    value: 'rocket',
  },
  {
    label: 'Building',
    value: 'building',
  },
  {
    label: 'Flask',
    value: 'flask',
  },
  {
    label: 'Users',
    value: 'users',
  },
  {
    label: 'Mentor',
    value: 'mentor',
  },
  {
    label: 'Badge',
    value: 'badge',
  },
]

const linkFields = [
  {
    name: 'label',
    type: 'text',
    localized: true,
    required: true,
  },
  {
    name: 'href',
    type: 'text',
    required: true,
  },
] satisfies GlobalConfig['fields']

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  label: 'Landing Page',
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
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'titlePrefix',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'titleHighlight',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'titleSuffix',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'primaryCTA',
          type: 'group',
          fields: linkFields,
        },
        {
          name: 'secondaryCTA',
          type: 'group',
          fields: linkFields,
        },
        {
          name: 'learnMoreCTA',
          type: 'group',
          fields: linkFields,
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Optional in CMS. The frontend will use its built-in fallback image until you upload one.',
          },
        },
      ],
    },
    {
      name: 'programs',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'items',
          type: 'array',
          minRows: 2,
          maxRows: 2,
          required: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'icon',
              type: 'select',
              options: iconOptions,
              required: true,
            },
            {
              name: 'accent',
              type: 'select',
              defaultValue: 'primary',
              options: [
                {
                  label: 'Primary',
                  value: 'primary',
                },
                {
                  label: 'Tertiary',
                  value: 'tertiary',
                },
              ],
              required: true,
            },
            {
              name: 'bulletItems',
              type: 'array',
              minRows: 3,
              maxRows: 4,
              required: true,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  required: true,
                },
              ],
            },
            {
              name: 'cta',
              type: 'group',
              fields: linkFields,
            },
          ],
        },
      ],
    },
    {
      name: 'infrastructure',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'featuredCard',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'icon',
              type: 'select',
              options: iconOptions,
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Optional in CMS. The frontend will use its built-in fallback image until you upload one.',
              },
            },
          ],
        },
        {
          name: 'cards',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          required: true,
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'icon',
              type: 'select',
              options: iconOptions,
              required: true,
            },
            {
              name: 'tone',
              type: 'select',
              defaultValue: 'surface',
              options: [
                {
                  label: 'Surface',
                  value: 'surface',
                },
                {
                  label: 'Primary',
                  value: 'primary',
                },
                {
                  label: 'Tertiary',
                  value: 'tertiary',
                },
              ],
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'ecosystem',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'partnerLogos',
          type: 'array',
          minRows: 3,
          maxRows: 6,
          required: true,
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'mentors',
          type: 'array',
          minRows: 2,
          maxRows: 4,
          required: true,
          fields: [
            {
              name: 'name',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'bio',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Optional in CMS. The frontend will use its built-in fallback image until you upload one.',
              },
            },
          ],
        },
        {
          name: 'successHighlight',
          type: 'group',
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'metric',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'subtext',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'finalCTA',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'primaryCTA',
          type: 'group',
          fields: linkFields,
        },
        {
          name: 'secondaryCTA',
          type: 'group',
          fields: linkFields,
        },
      ],
    },
  ],
}
