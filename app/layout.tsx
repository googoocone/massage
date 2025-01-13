import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextLayout } from './providers'
import { NextProvider } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '마사지통과 함께 힐링하기',
  description: '대한민국 최대 마사지 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  )
}
