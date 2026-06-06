import React from 'react'

export const metadata = {
  title: 'NTI CMS',
  description: 'Content management for the Nitra Technology Incubator website.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
