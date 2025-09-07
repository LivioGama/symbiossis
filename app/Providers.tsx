'use client'
import {ModalProvider} from '@/components/general/useModals'
import '@/styles/globals.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {SingleChildrenProps} from 'models/interfaces'
import {ThemeProvider} from 'next-themes'
import {PropsWithChildren, useEffect, useState} from 'react'
import PlausibleProvider from 'next-plausible'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
})

const Providers = ({children}: PropsWithChildren | SingleChildrenProps) => {
  const [mounted, setMounted] = useState(false)

  // Ensures theme is only applied client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className='bg-background min-h-screen flex items-center justify-center'>
        <div className='animate-pulse'>
          <div className='size-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center'>
            <span className='text-primary font-bold text-3xl'>R</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PlausibleProvider domain='symbiossis.anbiti.me'>
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>{children}</ModalProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </PlausibleProvider>
  )
}

export default Providers
