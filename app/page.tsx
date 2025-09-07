'use client'

import HeroSection from '@/components/HeroSection'
import TherapeuticPreferences from '@/components/onboarding/TherapeuticPreferences'
import Store from '@/models/Store'
import {observer} from '@legendapp/state/react'
import {useEffect, useState} from 'react'

import ChatInterface from '@/components/ChatInterface'

const Page = observer(() => {
  const hasPreferences = Store.userTherapeuticStyle.get()
  const [showHero, setShowHero] = useState(() => !hasPreferences)
  const startOnboardingTrigger = Store.startOnboardingTrigger.get()

  useEffect(() => {
    if (startOnboardingTrigger) setShowHero(false)
  }, [startOnboardingTrigger])

  const handleOnboardingComplete = (preference: string) => {
    Store.userTherapeuticStyle.set(preference)
    setShowHero(false)
  }

  if (showHero && !hasPreferences) {
    return (
      <div className='h-screen'>
        <HeroSection
          onGetStarted={() => {
            setShowHero(false)
            Store.triggerStartOnboarding()
          }}
        />
      </div>
    )
  }

  if (!hasPreferences) {
    return (
      <div className='h-screen flex items-center justify-center p-4'>
        <TherapeuticPreferences onComplete={handleOnboardingComplete} />
      </div>
    )
  }

  return (
    <div className='h-full pt-20 pb-6'>
      <div className='max-w-6xl mx-auto h-full'>
        {/* Chat Interface */}
        <ChatInterface />
      </div>
    </div>
  )
})

export default Page
