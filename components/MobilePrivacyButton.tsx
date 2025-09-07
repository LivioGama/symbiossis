'use client'

import {FC, useState} from 'react'
import LearnMoreModal from './LearnMoreModal'

const MobilePrivacyButton: FC = () => {
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)

  return (
    <>
      {/* Mobile-only Privacy Button */}
      <button
        onClick={() => setIsLearnMoreOpen(true)}
        className='md:hidden fixed bottom-2 left-1/2 transform -translate-x-1/2 z-40 px-4 py-2 rounded-full text-white text-sm hover:text-sky-600 transition-all duration-300'>
        Privacy
      </button>

      {/* Learn More Modal */}
      <LearnMoreModal isOpen={isLearnMoreOpen} onClose={() => setIsLearnMoreOpen(false)} />
    </>
  )
}

export default MobilePrivacyButton
