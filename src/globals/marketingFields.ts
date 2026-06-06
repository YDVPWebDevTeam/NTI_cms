import type { Field } from 'payload'

/**
 * Shared field helpers for the marketing globals (Partners, About, Mentors).
 * Mirrors the conventions used by {@link ./LandingPage}, but with the richer
 * icon set the marketing pages render via the frontend `getMarketingIcon`.
 */

const marketingIconOptions = [
  { label: 'Badge', value: 'badge' },
  { label: 'Briefcase', value: 'briefcase' },
  { label: 'Building', value: 'building' },
  { label: 'Flask', value: 'flask' },
  { label: 'Globe', value: 'globe' },
  { label: 'Graduation', value: 'graduation' },
  { label: 'Handshake', value: 'handshake' },
  { label: 'Lightbulb', value: 'lightbulb' },
  { label: 'Mentor', value: 'mentor' },
  { label: 'Network', value: 'network' },
  { label: 'Rocket', value: 'rocket' },
  { label: 'Sparkles', value: 'sparkles' },
  { label: 'Target', value: 'target' },
  { label: 'Trending', value: 'trending' },
  { label: 'Trophy', value: 'trophy' },
  { label: 'Users', value: 'users' },
]

/** A required, localized single-line text field. */
export const text = (name: string): Field => ({
  name,
  type: 'text',
  localized: true,
  required: true,
})

/** A required, localized multi-line text field. */
export const textarea = (name: string): Field => ({
  name,
  type: 'textarea',
  localized: true,
  required: true,
})

/** A required icon picker drawn from the marketing icon set. */
export const icon = (): Field => ({
  name: 'icon',
  type: 'select',
  options: marketingIconOptions,
  required: true,
})

/** A required array of localized labels (e.g. partner logos). */
export const labelList = (name: string, minRows: number, maxRows: number): Field => ({
  name,
  type: 'array',
  minRows,
  maxRows,
  required: true,
  fields: [text('label')],
})

/** An array of icon + title + description feature cards. */
export const featureList = (name: string, minRows: number, maxRows: number): Field => ({
  name,
  type: 'array',
  minRows,
  maxRows,
  required: true,
  fields: [icon(), text('title'), textarea('description')],
})
