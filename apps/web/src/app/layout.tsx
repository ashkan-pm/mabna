import localFont from 'next/font/local'
import { Providers } from '@/app/providers'
import type { Metadata } from 'next'
import './globals.scss'

const iranianSans = localFont({
  src: '../assets/fonts/iranian-sans.ttf'
})

export const metadata: Metadata = {
  title: 'Mabna',
  description: 'Practice project based on the Mabna code challenge'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" className={iranianSans.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
