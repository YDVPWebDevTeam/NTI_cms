import 'dotenv/config'

import { getPayload, type Payload } from 'payload'

import config from '../payload.config'
import { buildAboutSeedData, aboutSeedLocales } from '../lib/aboutSeed'
import { buildLandingPageSeedData, landingPageSeedLocales } from '../lib/landingPageSeed'
import { buildMentorsSeedData, mentorsSeedLocales } from '../lib/mentorsSeed'
import { buildPartnersSeedData, partnersSeedLocales } from '../lib/partnersSeed'

type Locale = 'en' | 'sk'
type GlobalSlug = Parameters<Payload['updateGlobal']>[0]['slug']

/**
 * Copy Payload-generated array row `id`s from an already-seeded global onto the
 * matching rows of the next locale's seed data (matched by position).
 *
 * Our marketing globals use non-localized arrays whose *text subfields* are
 * localized. Calling `updateGlobal` with rows that have no `id` makes Payload
 * delete and recreate every row, which orphans the localized values written for
 * earlier locales — so only the last-seeded locale survives. Re-using the row
 * `id`s keeps each row stable so every locale writes onto the same rows.
 */
function withRowIds<T>(seed: T, existing: unknown): T {
  if (Array.isArray(seed)) {
    const existingArray = Array.isArray(existing) ? existing : []
    return seed.map((item, index) => withRowIds(item, existingArray[index])) as unknown as T
  }

  if (seed && typeof seed === 'object') {
    const existingObject =
      existing && typeof existing === 'object' ? (existing as Record<string, unknown>) : {}
    const merged: Record<string, unknown> = {}

    if (typeof existingObject.id === 'string' || typeof existingObject.id === 'number') {
      merged.id = existingObject.id
    }

    for (const [key, value] of Object.entries(seed as Record<string, unknown>)) {
      merged[key] = withRowIds(value, existingObject[key])
    }

    return merged as T
  }

  return seed
}

/**
 * Seed a global across all locales, preserving array row identity so localized
 * array content is retained for every locale (see {@link withRowIds}).
 */
async function seedGlobal<T>(
  payload: Payload,
  slug: GlobalSlug,
  locales: readonly Locale[],
  build: (locale: Locale) => T,
) {
  for (const [index, locale] of locales.entries()) {
    let data = build(locale)

    if (index > 0) {
      const existing = await payload.findGlobal({ slug, locale, depth: 0, overrideAccess: true })
      data = withRowIds(data, existing)
    }

    await payload.updateGlobal({
      slug,
      locale,
      depth: 0,
      overrideAccess: true,
      data,
    } as Parameters<Payload['updateGlobal']>[0])

    console.log(`Seeded ${slug} for locale: ${locale}`)
  }
}

async function runSeed() {
  const payload = await getPayload({ config })

  await seedGlobal(payload, 'landing-page', landingPageSeedLocales, buildLandingPageSeedData)
  await seedGlobal(payload, 'partners', partnersSeedLocales, buildPartnersSeedData)
  await seedGlobal(payload, 'about', aboutSeedLocales, buildAboutSeedData)
  await seedGlobal(payload, 'mentors', mentorsSeedLocales, buildMentorsSeedData)
}

runSeed()
  .then(() => {
    console.log('Seed completed.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seed failed.')
    console.error(error)
    process.exit(1)
  })
