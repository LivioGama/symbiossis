'use client'

import {useState} from 'react'
import ChatInterface from './ChatInterface'
import {useChatState} from './chat/useChatState'

interface DualChatInterfaceProps {
  leftType: string
  rightType: string
  leftTitle: string
  rightTitle: string
}

const DualChatInterface = ({
  leftType,
  rightType,
  leftTitle,
  rightTitle,
}: DualChatInterfaceProps) => {
  const [sharedInput, setSharedInput] = useState('')

  const leftChat = useChatState(leftType, false, 'left-')
  const rightChat = useChatState(rightType, false, 'right-')

  const handleSharedSendMessage = async (message: string) => {
    if (!message.trim()) return

    await Promise.all([leftChat.sendMessage(message), rightChat.sendMessage(message)])
    setSharedInput('')
  }

  const handleSharedReset = () => {
    leftChat.setMessages([])
    rightChat.setMessages([])
  }

  return (
    <div className='flex gap-6 h-[calc(100vh-284px)] max-w-full mx-auto px-4'>
      {/* Left Chat - Strategic Approach */}
      <div className='flex-1 min-w-0'>
        <div className='h-full relative'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-cyan-50/30 rounded-3xl blur-3xl -z-10' />
          <div className='relative h-full'>
            <ChatInterface
              forcedType={leftType}
              title={leftTitle}
              className='h-full'
              sharedInput={sharedInput}
              onSharedInputChange={setSharedInput}
              sharedSendMessage={handleSharedSendMessage}
              sharedReset={handleSharedReset}
              sharedMessages={leftChat.messages}
              sharedStatus={leftChat.status}
              isDemo={true}
            />
          </div>
        </div>
      </div>

      {/* Divider with Sync Indicator */}
      <div className='flex flex-col items-center justify-center w-px relative'>
        <div className='bg-gradient-to-b from-blue-200/50 via-slate-300/40 to-green-200/50 h-full w-px' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='bg-white/90 backdrop-blur-sm border border-slate-300/50 rounded-full p-3 shadow-lg'>
            <div className='w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center'>
              <svg
                className='w-4 h-4 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Right Chat - Intuitive Approach */}
      <div className='flex-1 min-w-0'>
        <div className='h-full relative'>
          <div className='absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-emerald-50/30 rounded-3xl blur-3xl -z-10' />
          <div className='relative h-full'>
            <ChatInterface
              forcedType={rightType}
              title={rightTitle}
              className='h-full'
              sharedInput={sharedInput}
              onSharedInputChange={setSharedInput}
              sharedSendMessage={handleSharedSendMessage}
              sharedReset={handleSharedReset}
              sharedMessages={rightChat.messages}
              sharedStatus={rightChat.status}
              isDemo={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DualChatInterface
