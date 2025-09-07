'use client'
import {ModalProvider} from '@/components/general/useModals'
import PlausibleWrapper from '@/components/PlausibleWrapper'
import '@/styles/globals.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ThemeProvider} from 'next-themes'
import {PropsWithChildren} from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
})

const Providers = ({children}: PropsWithChildren) => (
  <PlausibleWrapper>
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>{children}</ModalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </PlausibleWrapper>
)

export default Providers
