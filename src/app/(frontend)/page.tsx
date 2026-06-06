import { redirect } from 'next/navigation'

// This is a headless CMS — the public website lives in a separate app
// (NTI_frontend) that consumes the REST/GraphQL API. Visiting the CMS root in a
// browser should land on the admin panel.
export default function HomePage() {
  redirect('/admin')
}
