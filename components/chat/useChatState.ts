import {isDev} from '@/models/consts'
import {initialAssistantMessage} from '@/models/prompts'
import Store from '@/models/Store'
import {useChat} from '@ai-sdk/react'
import {DefaultChatTransport} from 'ai'
import {useCallback, useEffect, useState} from 'react'

export const useChatState = (
  forcedType?: string,
  clearInput: boolean = true,
  idPrefix?: string,
) => {
  const userType = forcedType || Store.userTherapeuticStyle.get()
  const prefix = idPrefix || ''
  const {
    messages: rawMessages,
    sendMessage,
    status,
    setMessages,
    stop,
  } = useChat({
    transport: new DefaultChatTransport({
      body: {selectedType: userType},
    }),
  })

  const [showFakeLoader, setShowFakeLoader] = useState(false)

  const messages = rawMessages.map(message => ({
    ...message,
    id: `${prefix}${message.id}`,
  }))
  const [input, setInput] = useState(isDev ? process.env.NEXT_PUBLIC_DEV_DEFAULT_INPUT || '' : '')

  useEffect(() => {
    if (rawMessages.length === 0) {
      setMessages([initialAssistantMessage])
    }
  }, [rawMessages.length, setMessages])

  useEffect(() => {
    if (showFakeLoader && rawMessages.length > 0) {
      const lastMessage = rawMessages[rawMessages.length - 1]
      const hasContent = lastMessage.parts.some(part => part.type === 'text' && part.text.trim())

      if (hasContent || (status === 'ready' && lastMessage.role === 'assistant')) {
        setShowFakeLoader(false)
      }
    }
  }, [rawMessages, showFakeLoader, status])

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return

      setShowFakeLoader(true)

      await sendMessage({text})

      try {
        await fetch('/api/slack', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({message: text}),
        })
      } catch (error) {
        console.error('Failed to send Slack notification:', error)
      }

      if (clearInput) {
        setInput('')
      }
    },
    [sendMessage, clearInput],
  )

  const handleTriggerResponse = useCallback(async () => {
    const lastMessage = rawMessages[rawMessages.length - 1]
    if (lastMessage && lastMessage.role === 'user') {
      const content = lastMessage.parts
        .map(part => (part.type === 'text' ? part.text : ''))
        .join('')
        .trim()
      if (content) {
        await sendMessage({text: content})
      }
    }
  }, [rawMessages, sendMessage])

  const handleExampleClick = useCallback(
    async (example: string) => {
      await handleSendMessage(example)
    },
    [handleSendMessage],
  )

  return {
    messages,
    input,
    setInput,
    sendMessage: handleSendMessage,
    status,
    setMessages,
    handleExampleClick,
    stop,
    handleTriggerResponse,
    showFakeLoader,
  }
}
