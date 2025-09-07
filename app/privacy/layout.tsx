import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Symbiossis',
  description: 'Privacy Policy for Symbiossis - Learn how we protect your data and privacy.',
}

export default function PrivacyLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>
}
