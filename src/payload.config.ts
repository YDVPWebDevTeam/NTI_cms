import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { About } from './globals/About'
import { LandingPage } from './globals/LandingPage'
import { Mentors } from './globals/Mentors'
import { Partners } from './globals/Partners'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const parseOrigins = (...values: Array<string | undefined>): string[] =>
  values
    .flatMap((value) => value?.split(',') ?? [])
    .map((value) => value.trim())
    .filter(Boolean)

const isProduction = process.env.NODE_ENV === 'production'
const developmentCorsOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3002',
  'http://127.0.0.1:3002',
]

const frontendCors = [
  ...parseOrigins(process.env.FRONTEND_URL, process.env.CORS_ORIGINS),
  ...(!isProduction ? developmentCorsOrigins : []),
].filter((value, index, array) => array.indexOf(value) === index)

const r2PublicBaseUrl = process.env.R2_PUBLIC_BASE_URL?.replace(/\/+$/, '')
const r2IsConfigured = Boolean(
  process.env.R2_ENDPOINT &&
  process.env.R2_BUCKET_NAME &&
  process.env.R2_ACCESS_KEY_ID &&
  process.env.R2_SECRET_ACCESS_KEY &&
  r2PublicBaseUrl,
)
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: frontendCors.length > 0 ? frontendCors : undefined,
  collections: [Users, Media, News],
  globals: [LandingPage, Partners, About, Mentors],
  editor: lexicalEditor(),
  localization: {
    defaultLocale: 'en',
    fallback: true,
    locales: [
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'sk',
        label: 'Slovak',
      },
    ],
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      bucket: process.env.R2_BUCKET_NAME || 'unused',
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix, size }) => {
            const filenameForSize =
              (size as { filename?: string } | undefined)?.filename || filename
            const pathSegments = [prefix, filenameForSize].filter(Boolean)

            return `${r2PublicBaseUrl!}/${pathSegments.join('/')}`
          },
        },
      },
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true,
        region: process.env.R2_REGION || 'auto',
      },
      disableLocalStorage: true,
      enabled: r2IsConfigured,
    }),
  ],
})
