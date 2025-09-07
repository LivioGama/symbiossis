import Providers from '@/app/Providers'
import NavBar from '@/components/general/NavBar'

import '@/styles/globals.css'
import {enable$GetSet} from '@legendapp/state/config/enable$GetSet'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

enable$GetSet()

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Symbiossis | AI Self-Reflection Tool',
  description: 'A modern AI-powered tool for thoughtful self-reflection and personalized guidance.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout = ({children}: RootLayoutProps) => (
  <html className={`${inter.variable} font-sans`}>
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />

    <body className='antialiased'>
      <div className='ambient-bg'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.15)_0,transparent_70%)]' />
        <div className='absolute top-0 right-0 h-screen w-1/2 bg-[radial-gradient(circle_at_center,rgba(var(--accent),0.1)_0,transparent_70%)] animate-pulse-soft' />
      </div>

      <Providers>
        <NavBar />

        <main className='pt-16 min-h-screen'>{children}</main>
      </Providers>
    </body>
  </html>
)

export default RootLayout
