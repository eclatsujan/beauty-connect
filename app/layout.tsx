import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Company Social Media Hub',
  description: 'Redirect to company social media profiles',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

