'use client'

import PlausibleProvider from 'next-plausible'
import {PropsWithChildren} from 'react'

const PlausibleWrapper = ({children}: PropsWithChildren) => (
  <PlausibleProvider
    domain='symbiossis.devliv.io'
    customDomain='https://plausible.liviogama.com'
    trackLocalhost={false}
    enabled={true}>
    {children}
  </PlausibleProvider>
)

export default PlausibleWrapper
