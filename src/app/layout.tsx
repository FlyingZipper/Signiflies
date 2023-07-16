"use client"

import { Header } from '@/components/Header/Header'
import './globals.scss'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

import { SessionProvider } from "next-auth/react";

export default function RootLayout({children,}: { children: React.ReactNode,}) {

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient`}>
        <SessionProvider >
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}