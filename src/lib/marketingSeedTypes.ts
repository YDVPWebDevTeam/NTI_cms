/** Shared seed value types for the marketing globals (Partners, About, Mentors). */

export type Locale = 'en' | 'sk'

/** Icon keys offered by the marketing icon picker (see ../globals/marketingFields). */
export type MarketingIcon =
  | 'badge'
  | 'briefcase'
  | 'building'
  | 'flask'
  | 'globe'
  | 'graduation'
  | 'handshake'
  | 'lightbulb'
  | 'mentor'
  | 'network'
  | 'rocket'
  | 'sparkles'
  | 'target'
  | 'trending'
  | 'trophy'
  | 'users'

export type SeedFeature = { icon: MarketingIcon; title: string; description: string }
