import Providers from '@/app/Providers'
import AnimatedBackground from '@/components/animations/AnimatedBackground'
import FloatingParticles from '@/components/animations/FloatingParticles'
import OrbitalSystem from '@/components/animations/OrbitalSystem'
import NavBar from '@/components/general/NavBar'
import MobilePrivacyButton from '@/components/MobilePrivacyButton'
import '@/styles/globals.css'
import {enable$GetSet} from '@legendapp/state/config/enable$GetSet'
import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'

enable$GetSet()

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'symbiossis | AI Self-Reflection Tool',
  description: 'Discover yourself through AI-powered reflection and personalized guidance.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'symbiossis | AI Self-Reflection Tool',
    description: 'Discover yourself through AI-powered reflection and personalized guidance.',
    images: [
      {
        url: '/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Symbiossis - AI Self-Reflection Tool',
      },
    ],
  },
}

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout = ({children}: RootLayoutProps) => (
  <html className={`${poppins.variable} font-sans`} suppressHydrationWarning>
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />

    <body className='antialiased bg-gradient-to-br from-blue-50 via-white to-blue-100'>
      {/* Global Animated Background - Available on all pages */}
      <AnimatedBackground />
      <FloatingParticles />
      <OrbitalSystem />
      <div className='fixed inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-blue-200/20 pointer-events-none' />

      <Providers>
        <NavBar />

        <main className='min-h-screen relative z-10'>{children}</main>

        <MobilePrivacyButton />
      </Providers>
    </body>
  </html>
)

export default RootLayout
