'use client'

import {ExamplePrompts} from '@/components/chat/ExamplePrompts'
import {MessageList} from '@/components/chat/MessageList'
import {OllamaStatus} from '@/components/chat/OllamaStatus'
import {ResetChatButton} from '@/components/chat/ResetChatButton'
import {useChatState} from '@/components/chat/useChatState'
import {useMessageActions} from '@/components/chat/useMessageActions'
import {useOllamaStatus} from '@/components/chat/useOllamaStatus'
import useModals from '@/components/general/useModals'
import {motion} from 'framer-motion'
import Image from 'next/image'
import {FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState} from 'react'
import {ChatInput} from './chat/ChatInput'

interface ChatInterfaceProps {
  forcedType?: string
  title?: string
  className?: string
  onMessageSent?: (message: string) => void
  sharedInput?: string
  onSharedInputChange?: (value: string) => void
  sharedSendMessage?: (message: string) => Promise<void>
  sharedReset?: () => void
  sharedMessages?: any[]
  sharedStatus?: 'ready' | 'streaming' | 'error' | 'submitted'
  isDemo?: boolean
}

const ChatInterface = ({
  forcedType,
  title = 'Private Session',
  className = '',
  onMessageSent,
  sharedInput,
  onSharedInputChange,
  sharedSendMessage,
  sharedReset,
  sharedMessages,
  sharedStatus,
  isDemo = false,
}: ChatInterfaceProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isSending, setIsSending] = useState(false)

  const hasSharedFunctionality =
    sharedSendMessage && sharedInput !== undefined && onSharedInputChange
  const hasSharedMessages = sharedMessages !== undefined && sharedStatus !== undefined

  const chatState = useChatState(forcedType, !hasSharedFunctionality)

  const messages = hasSharedMessages ? sharedMessages : chatState.messages
  const status = hasSharedMessages ? sharedStatus || 'ready' : chatState.status

  const showFakeLoader = hasSharedMessages
    ? false
    : (isSending || chatState.showFakeLoader) && status !== 'streaming'

  const setMessages = hasSharedMessages ? sharedReset || (() => {}) : chatState.setMessages
  const handleExampleClick = hasSharedMessages ? () => {} : chatState.handleExampleClick
  const handleTriggerResponse = hasSharedMessages ? () => {} : chatState.handleTriggerResponse
  const stop = hasSharedMessages ? () => {} : chatState.stop

  const effectiveStatus = isSending ? 'streaming' : status

  const input = hasSharedFunctionality ? sharedInput : chatState.input
  const setInput = hasSharedFunctionality ? onSharedInputChange! : chatState.setInput
  const sendMessage = hasSharedFunctionality ? sharedSendMessage! : chatState.sendMessage

  const {isLocal, isCheckingLocal} = useOllamaStatus()
  const {isEditing, handleEditSubmit, handleDelete, startEditing} = useMessageActions({
    messages,
    setMessages,
    onTriggerResponse: handleTriggerResponse,
    stop,
    status,
  })
  const {confirm} = useModals()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === 'user') {
        scrollToBottom()
      }
    }
  }, [messages, scrollToBottom])

  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault()
      if (!input.trim()) return

      const messageToSend = input.trim()
      if (!hasSharedFunctionality) {
        setInput('')
      }
      setIsSending(true)

      try {
        if (hasSharedFunctionality) {
          await sharedSendMessage!(messageToSend)
        } else {
          await sendMessage(messageToSend)
        }
        onMessageSent?.(messageToSend)
      } catch (error) {
        setIsSending(false)
        throw error
      } finally {
        // Reset states after a brief delay to ensure smooth transition
        setTimeout(() => {
          setIsSending(false)
        }, 100)
      }
    },
    [input, sendMessage, sharedSendMessage, setInput, onMessageSent, hasSharedFunctionality],
  )

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit],
  )

  const handleStop = useCallback(() => {
    setIsSending(false)
    if (hasSharedMessages) {
      return
    }
    chatState.stop()
  }, [hasSharedMessages, chatState])

  return (
    <div
      className={`chat-container relative flex flex-col h-[calc(100vh-124px)] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 ${className}`}>
      {/* Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-secondary-50/30 rounded-3xl blur-3xl -z-10' />
      <div className='absolute inset-0 bg-gradient-to-t from-transparent via-primary-100/5 to-transparent -z-10' />

      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: -30, scale: 0.95}}
        animate={{opacity: 1, y: 0, scale: 1}}
        transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
        className='relative rounded-t-lg sm:rounded-t-3xl backdrop-blur-xl bg-white/80 border border-white/20 shadow-primary-500/10 shadow-[0_12px_40px_rgba(0,0,0,0.25)] px-3 py-3 sm:px-6 sm:py-4 overflow-hidden flex-shrink-0'>
        {/* Header Background Pattern */}
        <div className='absolute inset-0 bg-gradient-to-r from-primary-400/5 via-transparent to-secondary-400/5' />
        <div className='absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary-200/20 to-transparent rounded-full blur-2xl' />

        <div className='relative flex items-center justify-between gap-4'>
          {/* Left Cell: Logo + Title + Status */}
          <div className='flex items-center gap-3 sm:gap-4 flex-1'>
            <div className='w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-lg'>
              <Image
                src='/logo_square.webp'
                alt='Symbiossis'
                width={40}
                height={40}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <h2 className='text-lg sm:text-xl font-bold text-sky-600 tracking-tight'>{title}</h2>
              <div className='mt-1'>
                <OllamaStatus isLocal={isLocal} isCheckingLocal={isCheckingLocal} />
              </div>
            </div>
          </div>

          {/* Right Cell: Reset Button */}
          <div className='flex-shrink-0 sm:hidden'>
            <ResetChatButton
              messages={messages}
              setMessages={setMessages}
              confirm={confirm}
              variant='mobile'
            />
          </div>
        </div>
      </motion.div>

      {/* Messages - Takes remaining space and scrolls */}
      <motion.div
        initial={{opacity: 0, scale: 0.98}}
        animate={{opacity: 1, scale: 1}}
        transition={{delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
        className='relative flex-1 min-h-0 backdrop-blur-xl bg-white/60 border-x border-white/20 p-3 sm:p-6 lg:p-8 overflow-y-auto shadow-xl shadow-primary-500/5'>
        {/* Messages Background Pattern */}
        <div className='absolute inset-0 bg-gradient-to-b from-primary-50/20 via-transparent to-secondary-50/20' />
        <div className='absolute top-4 left-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-200/10 to-transparent rounded-full blur-xl' />
        <div className='absolute bottom-4 right-4 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-tl from-secondary-200/10 to-transparent rounded-full blur-xl' />

        <div className='relative space-y-6 sm:space-y-8'>
          <MessageList
            messages={messages}
            isEditing={isEditing}
            onEdit={startEditing}
            onEditSubmit={handleEditSubmit}
            onDelete={handleDelete}
            status={effectiveStatus}
            showFakeLoader={showFakeLoader}
          />

          <ExamplePrompts
            messages={messages}
            onExampleClick={handleExampleClick}
            onSharedInputChange={onSharedInputChange}
          />

          <div ref={messagesEndRef} />
        </div>
      </motion.div>

      {/* Reset Button - Fixed Position - Hidden on Mobile */}
      <div className='hidden sm:block'>
        <ResetChatButton messages={messages} setMessages={setMessages} confirm={confirm} />
      </div>

      {/* Input - Fixed at bottom with flex-shrink-0 */}
      <motion.div
        initial={{opacity: 0, y: 30, scale: 0.95}}
        animate={{opacity: 1, y: 0, scale: 1}}
        transition={{delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
        className='relative rounded-b-lg sm:rounded-b-3xl backdrop-blur-xl bg-white/90 border border-white/20 shadow-2xl shadow-primary-500/10 px-3 py-3 sm:px-4 sm:py-4 overflow-hidden flex-shrink-0'>
        {/* Input Background Pattern */}
        <div className='absolute inset-0 bg-gradient-to-r from-primary-50/30 via-transparent to-secondary-50/30' />
        <div className='absolute bottom-0 left-0 w-24 h-12 sm:w-40 sm:h-20 bg-gradient-to-tr from-primary-200/20 to-transparent rounded-full blur-2xl' />

        <div className='relative'>
          <form onSubmit={handleSubmit} className='flex gap-3 sm:gap-4'>
            <ChatInput
              input={input}
              setInput={setInput}
              onSubmit={handleSubmit}
              status={effectiveStatus}
              handleKeyPress={handleKeyPress}
              onStop={handleStop}
              isDemo={isDemo}
            />
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default ChatInterface
