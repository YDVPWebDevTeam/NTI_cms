import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'
import { buildAboutSeedData, aboutSeedLocales } from '../lib/aboutSeed'
import { buildLandingPageSeedData, landingPageSeedLocales } from '../lib/landingPageSeed'
import { buildMentorsSeedData, mentorsSeedLocales } from '../lib/mentorsSeed'
import { buildPartnersSeedData, partnersSeedLocales } from '../lib/partnersSeed'

async function runSeed() {
  const payload = await getPayload({ config })

  for (const locale of landingPageSeedLocales) {
    await payload.updateGlobal({
      slug: 'landing-page',
      locale,
      depth: 0,
      overrideAccess: true,
      data: buildLandingPageSeedData(locale),
    })

    console.log(`Seeded landing-page for locale: ${locale}`)
  }

  for (const locale of partnersSeedLocales) {
    await payload.updateGlobal({
      slug: 'partners',
      locale,
      depth: 0,
      overrideAccess: true,
      data: buildPartnersSeedData(locale),
    })

    console.log(`Seeded partners for locale: ${locale}`)
  }

  for (const locale of aboutSeedLocales) {
    await payload.updateGlobal({
      slug: 'about',
      locale,
      depth: 0,
      overrideAccess: true,
      data: buildAboutSeedData(locale),
    })

    console.log(`Seeded about for locale: ${locale}`)
  }

  for (const locale of mentorsSeedLocales) {
    await payload.updateGlobal({
      slug: 'mentors',
      locale,
      depth: 0,
      overrideAccess: true,
      data: buildMentorsSeedData(locale),
    })

    console.log(`Seeded mentors for locale: ${locale}`)
  }
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
