import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Dancing_Script, Lato } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
})

export const metadata: Metadata = {
  title: "Baby Shower — Priya Patel",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dancing.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  )
}
