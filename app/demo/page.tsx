'use client'

import DualChatInterface from '@/components/DualChatInterface'

const DemoPage = () => (
  <div className='container mx-auto pt-20 px-4 pb-6 h-full'>
    <div className='text-center mb-12'>
      <h1 className='text-3xl font-bold text-gray-800 mb-2'>Therapy Style Comparison Demo</h1>
      <p className='text-gray-600 max-w-xl mx-auto'>
        Compare therapeutic approaches side by side. Send a message to either chat.
      </p>
    </div>

    <div className='mb-4'>
      <DualChatInterface
        leftType='ENTJ'
        rightType='ISFP'
        leftTitle='Strategic & Direct Approach'
        rightTitle='Gentle & Intuitive Approach'
      />
    </div>
  </div>
)

export default DemoPage
