import './globals.css'
import { ReactNode } from 'react'
import Header from '../components/Header'

export const metadata = {
  title: 'WebbCall',
  description: 'Browser-based calling powered by Twilio & Supabase'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
