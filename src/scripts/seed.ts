import 'dotenv/config'

import { getPayload, type Payload } from 'payload'

import config from '../payload.config'
import { buildLandingPageSeedData, landingPageSeedLocales } from '../lib/landingPageSeed'
import { newsSeedArticles, newsSeedLocales, paragraphsToLexical } from '../lib/newsSeed'

async function seedLandingPage(payload: Payload) {
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

async function seedNews(payload: Payload) {
  const [defaultLocale, ...otherLocales] = newsSeedLocales

  for (const article of newsSeedArticles) {
    const dataForLocale = (locale: (typeof newsSeedLocales)[number]) => ({
      slug: article.slug,
      status: article.status,
      publishedAt: article.publishedAt,
      title: article.title[locale],
      excerpt: article.excerpt[locale],
      category: article.category[locale],
      author: article.author[locale],
      content: paragraphsToLexical(article.body[locale]),
    })

    // Payload has no upsert, so look the article up by slug to stay idempotent.
    const existing = await payload.find({
      collection: 'news',
      where: { slug: { equals: article.slug } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const existingId = existing.docs[0]?.id

    const base = existingId
      ? await payload.update({
          collection: 'news',
          id: existingId,
          locale: defaultLocale,
          overrideAccess: true,
          data: dataForLocale(defaultLocale),
        })
      : await payload.create({
          collection: 'news',
          locale: defaultLocale,
          overrideAccess: true,
          data: dataForLocale(defaultLocale),
        })

    for (const locale of otherLocales) {
      await payload.update({
        collection: 'news',
        id: base.id,
        locale,
        overrideAccess: true,
        data: dataForLocale(locale),
      })
    }

    console.log(`Seeded news article: ${article.slug}`)
  }
}

async function runSeed() {
  const payload = await getPayload({ config })

  await seedLandingPage(payload)
  await seedNews(payload)
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
