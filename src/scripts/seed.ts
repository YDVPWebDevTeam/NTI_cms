import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'
import { buildLandingPageSeedData, landingPageSeedLocales } from '../lib/landingPageSeed'

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
