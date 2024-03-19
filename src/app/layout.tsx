'use client'

import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Header } from './components/header'
import { Providers } from './components/providers'
import { DEFAULT_LOCALE, BRAND_NAME } from './constants'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body className={inter.className}>
        <Providers>
          <div className="flex 100 flex-col h-lvh">
            <Header />
            <main className="w-full max-w-2xl m-auto grow py-10">{children}</main>
            <footer className="p-3 border-t border-gray-100 text-center text-gray-500">
              {BRAND_NAME} - 2024
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
