import type { Field, GlobalConfig, SelectField } from 'payload'

const OPTIONAL_MEDIA_DESCRIPTION =
  'Optional in CMS. The frontend will use its built-in fallback image until you upload one.'

const iconOptions = [
  { label: 'Rocket', value: 'rocket' },
  { label: 'Building', value: 'building' },
  { label: 'Flask', value: 'flask' },
  { label: 'Users', value: 'users' },
  { label: 'Mentor', value: 'mentor' },
  { label: 'Badge', value: 'badge' },
]

/** A required, localized single-line text field. */
const text = (name: string): Field => ({ name, type: 'text', localized: true, required: true })

/** A required, localized multi-line text field. */
const textarea = (name: string): Field => ({
  name,
  type: 'textarea',
  localized: true,
  required: true,
})

/** A required icon picker shared across programs, infrastructure cards, etc. */
const icon = (): Field => ({ name: 'icon', type: 'select', options: iconOptions, required: true })

/** An optional media upload that the frontend falls back to a default image for. */
const mediaUpload = (name: string): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  admin: { description: OPTIONAL_MEDIA_DESCRIPTION },
})

/** A required select with a default, e.g. accent or tone variants. */
const select = (name: string, defaultValue: string, options: SelectField['options']): Field => ({
  name,
  type: 'select',
  defaultValue,
  options,
  required: true,
})

/** A required array of localized labels, e.g. bullet points or partner names. */
const labelList = (name: string, minRows: number, maxRows: number): Field => ({
  name,
  type: 'array',
  minRows,
  maxRows,
  required: true,
  fields: [text('label')],
})

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
        text('eyebrow'),
        text('titlePrefix'),
        text('titleHighlight'),
        text('titleSuffix'),
        textarea('description'),
        mediaUpload('heroImage'),
      ],
    },
    {
      name: 'programs',
      type: 'group',
      fields: [
        text('heading'),
        {
          name: 'items',
          type: 'array',
          minRows: 2,
          maxRows: 2,
          required: true,
          fields: [
            text('title'),
            textarea('description'),
            icon(),
            select('accent', 'primary', [
              { label: 'Primary', value: 'primary' },
              { label: 'Tertiary', value: 'tertiary' },
            ]),
            labelList('bulletItems', 3, 4),
          ],
        },
      ],
    },
    {
      name: 'infrastructure',
      type: 'group',
      fields: [
        text('eyebrow'),
        text('heading'),
        {
          name: 'featuredCard',
          type: 'group',
          fields: [text('title'), textarea('description'), icon(), mediaUpload('image')],
        },
        {
          name: 'cards',
          type: 'array',
          minRows: 3,
          maxRows: 3,
          required: true,
          fields: [
            text('title'),
            textarea('description'),
            icon(),
            select('tone', 'surface', [
              { label: 'Surface', value: 'surface' },
              { label: 'Primary', value: 'primary' },
              { label: 'Tertiary', value: 'tertiary' },
            ]),
          ],
        },
      ],
    },
    {
      name: 'ecosystem',
      type: 'group',
      fields: [
        text('heading'),
        textarea('description'),
        labelList('partnerLogos', 3, 6),
        {
          name: 'mentors',
          type: 'array',
          minRows: 2,
          maxRows: 4,
          required: true,
          fields: [text('name'), text('role'), textarea('bio'), mediaUpload('image')],
        },
        {
          name: 'successHighlight',
          type: 'group',
          fields: [text('eyebrow'), text('title'), text('metric'), text('subtext')],
        },
      ],
    },
    {
      name: 'finalCTA',
      type: 'group',
      fields: [text('title'), textarea('description')],
    },
  ],
}
