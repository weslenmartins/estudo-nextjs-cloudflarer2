import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Estudo de upload na Cloudflare R2',
  description:
    'Projeto de estudo para fazer um upload de arquivo via React para Cloudflare R2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} Pastel bg-gradient-to-tr from-violet-500 to-orange-300`}
      >
        {children}
      </body>
    </html>
  )
}
