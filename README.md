<div align="center">

# NTI CMS

**Content management system for the Nitriansky technologický inkubátor**

Manage localized landing-page content, marketing pages, news articles, and media used by the NTI frontend.

[![Payload CMS](https://img.shields.io/badge/Payload_CMS-3.84-black?logo=payloadcms)](https://payloadcms.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9%20%7C%2010-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License](https://img.shields.io/badge/license-MIT-green)](#license)

</div>

---

## About the project

**NTI CMS** is the content-management service for the public website of the Nitriansky technologický inkubátor.

It gives authorized editors a Payload admin panel for managing:

- the NTI landing page;
- the About, Partners, and Mentors pages;
- localized news articles;
- images and other website media;
- English and Slovak versions of public content.

The CMS is built with Payload 3 inside a Next.js application. It stores structured content in PostgreSQL, exposes REST and GraphQL APIs, and can store uploaded media locally or in Cloudflare R2.

The main consumer of this service is the [`NTI_frontend`](https://github.com/YDVPWebDevTeam/NTI_frontend) application.

---

## Main capabilities

### Content management

- Secure Payload admin panel
- Authentication for CMS users
- Structured marketing-page content
- Localized English and Slovak fields
- Draft and published states for news
- Automatic news slug generation
- Rich-text article content
- Media uploads with generated image sizes
- Seed data for all marketing globals
- REST and GraphQL APIs

### Storage and infrastructure

- PostgreSQL through the Payload Vercel Postgres adapter
- Local media storage during development
- Optional Cloudflare R2 media storage
- Configurable frontend and CORS origins
- Docker Compose setup for local development

### Quality assurance

- Strict TypeScript
- ESLint and Prettier
- Pre-commit validation with simple-git-hooks
- Vitest integration tests
- Playwright end-to-end tests
- Generated Payload TypeScript types
- Generated Payload admin import map

---

## Technology stack

| Technology | Purpose |
| --- | --- |
| [Payload CMS 3.84](https://payloadcms.com/) | Admin panel, collections, globals, authentication, REST and GraphQL APIs |
| [Next.js 16](https://nextjs.org/) | Application runtime and Payload integration |
| [React 19](https://react.dev/) | Admin and application UI |
| [TypeScript](https://www.typescriptlang.org/) | Strict static typing |
| [PostgreSQL](https://www.postgresql.org/) | Persistent structured-content database |
| [Lexical](https://lexical.dev/) | Rich-text editing |
| [Sharp](https://sharp.pixelplumbing.com/) | Image processing and generated image sizes |
| [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) | Optional S3-compatible media storage |
| [Vitest](https://vitest.dev/) | Integration testing |
| [Playwright](https://playwright.dev/) | Admin-panel end-to-end testing |
| [Docker Compose](https://docs.docker.com/compose/) | Reproducible local CMS and PostgreSQL environment |

---

## Architecture overview

```mermaid
flowchart LR
    E[Content editor] --> A[Payload Admin]
    A --> P[Payload CMS]
    P --> DB[(PostgreSQL)]
    P --> L[Local media storage]
    P --> R2[Cloudflare R2]

    F[NTI Frontend] --> REST[Payload REST API]
    F --> GQL[Payload GraphQL API]
    REST --> P
    GQL --> P
```

The application uses a single Payload configuration as the source of truth for:

- collections;
- globals;
- localization;
- access control;
- database connectivity;
- media processing;
- optional R2 storage;
- generated TypeScript definitions.

---

## Content model

### Collections

#### `users`

Authentication-enabled collection for CMS administrators and content editors.

| Property | Description |
| --- | --- |
| Authentication | Enabled |
| Admin title | User email |
| Admin access | Authenticated CMS users |

Payload adds the core authentication fields automatically.

#### `media`

Upload-enabled collection for public website images.

| Field | Type | Localized | Required |
| --- | --- | --- | --- |
| `alt` | Text | Yes | Yes |
| `caption` | Textarea | Yes | No |

Public read access is enabled so the frontend can display uploaded media.

Generated image sizes:

| Size | Dimensions | Usage |
| --- | --- | --- |
| `card` | 640 × 480 | Cards, listings, and admin thumbnails |
| `hero` | 1440 × 1440 | Large marketing and hero images |

Accepted MIME types:

```text
image/jpeg
image/png
image/webp
image/svg+xml
```

#### `news`

Localized news and article collection.

| Field | Type | Localized | Notes |
| --- | --- | --- | --- |
| `title` | Text | Yes | Required |
| `slug` | Text | No | Required, unique, indexed |
| `status` | Select | No | `draft` or `published` |
| `publishedAt` | Date | No | Used for display and ordering |
| `category` | Text | Yes | Optional short category label |
| `author` | Text | Yes | Optional |
| `coverImage` | Media relation | No | Optional |
| `excerpt` | Textarea | Yes | Listing and preview summary |
| `content` | Rich text | Yes | Full article body |

News access rules:

- authenticated CMS users can read all articles;
- public API clients can read only articles whose status is `published`;
- slugs are normalized and can be generated automatically from the title.

---

### Globals

Globals represent single editable page documents rather than lists of records.

All marketing globals:

- are grouped under **Website** in the Payload admin panel;
- allow public read access;
- contain localized English and Slovak fields;
- can be populated through the seed script.

#### `landing-page`

Content for the main NTI landing page:

- hero section;
- Program A and Program B cards;
- infrastructure section;
- ecosystem and mentor highlights;
- success metric;
- final call to action.

Optional CMS images can be left empty because the frontend provides built-in fallback images.

#### `about`

Content for the About page:

- hero;
- “what NTI is” section;
- feature list;
- values;
- call to action.

#### `partners`

Content for the Partners page:

- hero;
- reasons to partner with NTI;
- cooperation formats;
- partner labels/logos;
- call to action.

#### `mentors`

Content for the Mentors page:

- hero;
- mentoring value proposition;
- feature list;
- mentor profiles;
- call to action.

Mentor photos are optional. The frontend displays a default portrait when no CMS image is assigned.

---

## Localization

The CMS currently supports:

| Code | Language |
| --- | --- |
| `en` | English |
| `sk` | Slovak |

Configuration:

- default locale: `en`;
- fallback behavior: enabled;
- text, textarea, rich-text, alt-text, captions, and other editorial fields are localized where appropriate.

Example REST requests:

```text
GET /api/globals/landing-page?locale=en
GET /api/globals/landing-page?locale=sk
GET /api/news?locale=en
GET /api/news?locale=sk
```

When adding new fields, decide explicitly whether their values should be localized.

---

## Project structure

```text
NTI_cms/
├── src/
│   ├── app/
│   │   └── (payload)/              # Payload admin, REST, and GraphQL routes
│   ├── collections/
│   │   ├── Media.ts                # Public media library and image sizes
│   │   ├── News.ts                 # Localized news collection
│   │   └── Users.ts                # CMS authentication
│   ├── globals/
│   │   ├── About.ts                # About-page content
│   │   ├── LandingPage.ts          # Main landing-page content
│   │   ├── Mentors.ts              # Mentors-page content
│   │   ├── Partners.ts             # Partners-page content
│   │   └── marketingFields.ts      # Shared marketing field helpers
│   ├── lib/
│   │   ├── aboutSeed.ts            # About-page seed content
│   │   ├── landingPageSeed.ts      # Landing-page seed content
│   │   ├── mentorsSeed.ts          # Mentors-page seed content
│   │   └── partnersSeed.ts         # Partners-page seed content
│   ├── scripts/
│   │   └── seed.ts                 # Localized global seeding
│   ├── payload.config.ts            # Main Payload configuration
│   └── payload-types.ts             # Generated Payload TypeScript types
├── tests/
│   ├── e2e/                         # Playwright admin-panel tests
│   ├── helpers/                     # Test-user and login helpers
│   └── int/                         # Vitest API integration tests
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── next.config.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── vitest.config.mts
```

### Important conventions

- Register new collections and globals in `src/payload.config.ts`.
- Keep reusable field definitions in shared helper files.
- Do not edit Payload-generated route files manually.
- Regenerate Payload types after changing collections or globals.
- Regenerate the admin import map after adding or changing custom admin components.
- Use the `@/*` alias for imports from `src`.
- Use `@payload-config` when a direct Payload configuration import is required.

---

## Requirements

- **Node.js** `^18.20.2` or `>=20.9.0`
- **pnpm** `9` or `10`
- A reachable PostgreSQL database
- Cloudflare R2 credentials only when remote media storage is required

Node.js 20 or newer is recommended for consistency with the Docker Compose environment.

Check installed versions:

```bash
node --version
pnpm --version
```

Enable pnpm through Corepack when needed:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

---

## Local development

### 1. Clone the repository

```bash
git clone https://github.com/YDVPWebDevTeam/NTI_cms.git
cd NTI_cms
```

### 2. Install dependencies

```bash
pnpm install
```

The installation runs the `prepare` script and configures the repository's Git hooks.

### 3. Create the environment file

macOS or Linux:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 4. Configure PostgreSQL and Payload

At minimum, set:

```env
POSTGRES_URL=postgresql://user:password@localhost:5432/nti_cms
PAYLOAD_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Generate a strong secret, for example:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Do not commit the generated secret.

### 5. Start the CMS

```bash
pnpm dev
```

The development server runs on:

```text
http://localhost:3002
```

Payload admin panel:

```text
http://localhost:3002/admin
```

On the first run, create the initial CMS administrator through the admin panel.

### 6. Seed starter content

After the database is available:

```bash
pnpm seed
```

The script updates these globals in both English and Slovak:

```text
landing-page
partners
about
mentors
```

The seeding implementation preserves Payload array-row identifiers between locales so localized values remain attached to the same rows.

---

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `POSTGRES_URL` | Yes | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Yes | Long secret used by Payload for authentication and cryptographic operations |
| `FRONTEND_URL` | Recommended | Main frontend origin allowed to access the CMS |
| `CORS_ORIGINS` | No | Comma-separated list of additional allowed origins |
| `R2_ENDPOINT` | For R2 | Cloudflare R2 S3-compatible endpoint |
| `R2_BUCKET_NAME` | For R2 | Media bucket name |
| `R2_ACCESS_KEY_ID` | For R2 | R2 access-key identifier |
| `R2_SECRET_ACCESS_KEY` | For R2 | R2 secret access key |
| `R2_REGION` | No | R2 region, defaults to `auto` |
| `R2_PUBLIC_BASE_URL` | For R2 | Public base URL used to construct media URLs |
| `PLAYWRIGHT_BASE_URL` | No | CMS URL used by Playwright, defaults to `http://localhost:3002` |

### Development CORS defaults

Outside production, the CMS automatically allows:

```text
http://localhost:3000
http://127.0.0.1:3000
http://localhost:3002
http://127.0.0.1:3002
```

Production deployments should explicitly configure `FRONTEND_URL` and/or `CORS_ORIGINS`.

---

## Cloudflare R2 media storage

R2 storage is optional.

The plugin is enabled only when all required values are present:

```env
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_BUCKET_NAME=nti-media
R2_ACCESS_KEY_ID=replace-me
R2_SECRET_ACCESS_KEY=replace-me
R2_REGION=auto
R2_PUBLIC_BASE_URL=https://pub-xxxxxxxx.r2.dev
```

When R2 is fully configured:

- uploads are stored in the configured bucket;
- local file storage is disabled;
- public media URLs are generated from `R2_PUBLIC_BASE_URL`;
- generated image variants use their own generated filenames.

When the configuration is incomplete, the R2 plugin remains disabled and Payload uses local storage.

Do not commit real R2 credentials.

---

## Docker Compose development

The provided `docker-compose.yml` starts:

- the Payload application on port `3002`;
- PostgreSQL 16 on port `5432`;
- persistent PostgreSQL and `node_modules` volumes.

For Docker Compose, use the PostgreSQL service hostname:

```env
POSTGRES_URL=postgresql://postgres:postgres@postgres:5432/payload
PAYLOAD_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Start the environment:

```bash
docker compose up
```

Run it in the background:

```bash
docker compose up -d
```

Seed content:

```bash
docker compose exec payload pnpm seed
```

View logs:

```bash
docker compose logs -f payload
```

Stop the environment:

```bash
docker compose down
```

Remove the database volume as well:

```bash
docker compose down -v
```

> Removing volumes permanently deletes the local Docker database.

### Host application with Docker PostgreSQL

When the CMS runs directly on your computer but only PostgreSQL runs in Docker, use `localhost` rather than the Docker service name:

```env
POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/payload
```

---

## API usage

Payload exposes both REST and GraphQL APIs.

### REST API

Base URL during local development:

```text
http://localhost:3002/api
```

Examples:

```text
GET http://localhost:3002/api/globals/landing-page?locale=en
GET http://localhost:3002/api/globals/about?locale=sk
GET http://localhost:3002/api/globals/partners?locale=en
GET http://localhost:3002/api/globals/mentors?locale=sk
GET http://localhost:3002/api/news?locale=en
GET http://localhost:3002/api/media
```

Published English news example:

```text
GET http://localhost:3002/api/news?locale=en&where[status][equals]=published
```

Single article by slug:

```text
GET http://localhost:3002/api/news?locale=en&where[slug][equals]=article-slug
```

The public API cannot retrieve draft news articles. An authenticated CMS user can access both draft and published records.

### GraphQL API

Endpoint:

```text
POST http://localhost:3002/api/graphql
```

Example query:

```graphql
query PublishedNews {
  News(where: { status: { equals: published } }) {
    docs {
      id
      title
      slug
      excerpt
      publishedAt
    }
  }
}
```

Payload-generated API route files are located under `src/app/(payload)/api` and should not be edited manually.

---

## Frontend integration

The NTI frontend should point its CMS URL to this service:

```env
NEXT_PUBLIC_CMS_URL=http://localhost:3002
```

Typical local ports:

| Service | URL |
| --- | --- |
| NTI frontend | `http://localhost:3000` |
| NTI backend API | `http://localhost:3001` |
| NTI CMS | `http://localhost:3002` |
| Payload admin | `http://localhost:3002/admin` |

The CMS intentionally allows public reads for website globals, media, and published news. Write operations and draft access remain protected by Payload authentication.

When changing a field used by the frontend:

1. update the Payload collection or global;
2. regenerate Payload types;
3. update seed data where necessary;
4. update the frontend CMS type or normalizer;
5. verify both English and Slovak responses;
6. test static fallback behavior in the frontend.

---

## Available commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server on port `3002` |
| `pnpm build` | Create a production Next.js build |
| `pnpm start` | Start the production server on port `3002` |
| `pnpm lint` | Run ESLint across the project |
| `pnpm typescript` | Run TypeScript checking without emitting files |
| `pnpm payload` | Run the Payload CLI |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` |
| `pnpm generate:importmap` | Regenerate the Payload admin import map |
| `pnpm seed` | Seed English and Slovak marketing content |
| `pnpm test:int` | Run Vitest integration tests |
| `pnpm test:e2e` | Run Playwright end-to-end tests |
| `pnpm test` | Run integration and end-to-end tests |
| `pnpm lint:staged` | Lint staged JavaScript and TypeScript files |
| `pnpm prepare` | Install the simple-git-hooks hooks |

---

## Changing the content schema

### Add a collection

1. Create a collection file under `src/collections`.
2. Export a `CollectionConfig`.
3. Register it in `collections` inside `src/payload.config.ts`.
4. Generate updated types.
5. Update access rules and tests.
6. Update the frontend integration when the collection is public.

Example:

```ts
import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
}
```

Then register it:

```ts
collections: [Users, Media, News, Events],
```

Generate types:

```bash
pnpm generate:types
```

### Add a global

1. Create a `GlobalConfig` under `src/globals`.
2. Register it in the `globals` array.
3. Add seed data when starter content is required.
4. Generate types.
5. Add frontend loading and fallback behavior.

### After every schema change

Run:

```bash
pnpm generate:types
pnpm lint
pnpm typescript
pnpm test:int
pnpm build
```

---

## Generated files

### Payload types

Generated file:

```text
src/payload-types.ts
```

Regenerate it after changing:

- collections;
- globals;
- fields;
- relationships;
- localization settings.

Command:

```bash
pnpm generate:types
```

### Admin import map

Payload uses a generated import map for custom admin components.

Command:

```bash
pnpm generate:importmap
```

Do not manually edit generated import-map files.

---

## Testing

### Integration tests

Vitest integration tests run from:

```text
tests/int/**/*.int.spec.ts
```

Current coverage verifies that Payload can:

- query users;
- read the landing-page global;
- list news articles.

Run:

```bash
pnpm test:int
```

### End-to-end tests

Playwright tests exercise the Payload admin panel in Chromium.

Current coverage verifies that an authenticated test user can:

- open the dashboard;
- open the users collection;
- open a user edit view.

Install the Playwright browser on a new machine:

```bash
pnpm exec playwright install chromium
```

Run:

```bash
pnpm test:e2e
```

Playwright starts `pnpm dev` automatically unless a compatible server is already running.

### Run the complete suite

```bash
pnpm test
```

Use a dedicated development or test database. End-to-end tests create and remove a test user.

---

## Code quality and Git hooks

The repository uses `simple-git-hooks`.

Before each commit, the configured hook runs:

```text
lint-staged
TypeScript validation
```

Staged JavaScript and TypeScript files are automatically checked with ESLint and `--fix`.

Recommended manual validation before opening a pull request:

```bash
pnpm lint
pnpm typescript
pnpm test:int
pnpm build
```

For changes affecting admin behavior, also run:

```bash
pnpm test:e2e
```

Recommended commit style:

```text
feat(cms): add events collection
fix(news): restrict public access to published articles
content(seed): update Slovak mentors content
docs(readme): document CMS setup
```

---

## Production

Create a production build:

```bash
pnpm build
```

Start the CMS:

```bash
pnpm start
```

The production server listens on port `3002`.

Production should provide:

```env
NODE_ENV=production
POSTGRES_URL=postgresql://...
PAYLOAD_SECRET=...
FRONTEND_URL=https://frontend.example.com
CORS_ORIGINS=https://frontend.example.com
```

Add all R2 variables when production media should be stored remotely.

### Deployment checklist

- use a strong, unique `PAYLOAD_SECRET`;
- connect to the intended production PostgreSQL database;
- configure the exact production frontend origin;
- configure persistent media storage;
- verify the public R2 URL;
- create a CMS administrator securely;
- seed or enter both English and Slovak content;
- verify public news access;
- verify draft articles remain private;
- run lint, TypeScript, tests, and a production build;
- back up the database and uploaded media.

### Dockerfile note

The repository also contains a multi-stage production `Dockerfile`. It expects Next.js standalone output, while the current `next.config.ts` does not enable `output: 'standalone'`. Its exposed port is also `3000`, whereas the project scripts use `3002`.

Use `docker-compose.yml` for local development. Before relying on the standalone Dockerfile in production, align the Next.js output configuration and runtime port.

---

## Troubleshooting

### The CMS cannot connect to PostgreSQL

Check:

- `POSTGRES_URL` is present;
- the hostname is correct for the execution environment;
- PostgreSQL is running;
- the database exists;
- the credentials are correct;
- required SSL options are included for hosted databases.

Use `postgres` as the hostname inside Docker Compose and `localhost` when connecting from the host machine.

### Payload reports a missing secret

Set a non-empty secret:

```env
PAYLOAD_SECRET=your-long-random-secret
```

Restart the CMS after changing it.

### The frontend cannot load CMS content

Check:

- the CMS is running on port `3002`;
- `NEXT_PUBLIC_CMS_URL` is correct in the frontend;
- the frontend origin appears in `FRONTEND_URL` or `CORS_ORIGINS`;
- the requested content has been seeded or entered;
- the requested locale is `en` or `sk`;
- a news article is marked `published`.

### Uploaded media disappear after a restart

Local media files require persistent filesystem storage.

For production, configure all Cloudflare R2 variables or mount a persistent media volume. R2 remains disabled when even one required value is missing.

### R2 uploads work but public images do not load

Verify:

- `R2_PUBLIC_BASE_URL` is publicly reachable;
- the value does not contain an incorrect path;
- the bucket or custom domain allows public reads;
- CORS is configured for the frontend when required;
- all R2 variables were available when the CMS started.

### Generated TypeScript types are outdated

Run:

```bash
pnpm generate:types
```

Then restart the TypeScript server or development server.

### The admin panel reports an import-map error

Run:

```bash
pnpm generate:importmap
```

Restart the development server afterward.

### Playwright cannot find Chromium

Install it:

```bash
pnpm exec playwright install chromium
```

### Port `3002` is already in use

Windows PowerShell:

```powershell
Get-NetTCPConnection -LocalPort 3002
```

macOS or Linux:

```bash
lsof -i :3002
```

Stop the conflicting process or change the development/start scripts consistently.

---

## Security notes

- Never commit `.env` or real database and R2 credentials.
- Treat `PAYLOAD_SECRET` as a production secret.
- Keep public access rules limited to content intentionally consumed by the public frontend.
- Draft news content must remain unavailable to unauthenticated requests.
- Review collection access whenever adding new content models.
- Restrict production CORS origins to trusted applications.
- Use separate development, test, staging, and production databases.
- Keep Payload and its adapters on compatible versions.
- Back up PostgreSQL and media storage before destructive schema or content changes.

---

## Related repositories

- [`NTI_frontend`](https://github.com/YDVPWebDevTeam/NTI_frontend) — public website and role-based application frontend
- [`NTI_backend`](https://github.com/YDVPWebDevTeam/NTI_backend) — authentication, program workflows, applications, teams, organizations, and platform business logic

---

## License

The package metadata declares the project under the **MIT License**.

The repository currently does not include a standalone `LICENSE` file. Add one to make the licensing terms explicit for contributors and external users.

---

<div align="center">

Built for the **Nitriansky technologický inkubátor** innovation ecosystem.

</div>
