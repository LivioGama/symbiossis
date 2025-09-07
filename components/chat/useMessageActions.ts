import {UIMessage} from 'ai'
import {useCallback, useState} from 'react'

interface UseMessageActionsProps {
  messages: UIMessage[]
  setMessages: (messages: UIMessage[]) => void
  onTriggerResponse?: () => void
  stop?: () => void
  status?: string
}

export const useMessageActions = ({
  messages,
  setMessages,
  onTriggerResponse,
  stop,
  status,
}: UseMessageActionsProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditSubmit = useCallback(
    (messageId: string, newContent: string) => {
      const messageIndex = messages.findIndex(msg => msg.id === messageId)
      if (messageIndex === -1) return

      const message = messages[messageIndex]
      const currentContent = message.parts
        .map(part => (part.type === 'text' ? part.text : ''))
        .join('')
      if (newContent.trim() === currentContent) {
        setIsEditing(false)
        return
      }

      const updatedMessages = [...messages]
      updatedMessages[messageIndex] = {
        ...message,
        parts: [{type: 'text', text: newContent.trim()}],
      } as UIMessage
      setMessages(updatedMessages)
      setIsEditing(false)

      // Trigger new response if this is a user message and it's the last message
      if (message.role === 'user' && messageIndex === messages.length - 1) {
        onTriggerResponse?.()
      }
    },
    [messages, setMessages, onTriggerResponse],
  )

  const handleDelete = useCallback(
    (messageId: string) => {
      // Prevent deletion of the first assistant message (initial greeting)
      const messageToDelete = messages.find(msg => msg.id === messageId)
      if (
        messageToDelete &&
        messageToDelete.id === 'initial' &&
        messageToDelete.role === 'assistant'
      ) {
        return // Don't delete the initial assistant message
      }

      // If deleting a loading assistant message, stop the generation first
      if (
        messageToDelete &&
        messageToDelete.role === 'assistant' &&
        status &&
        (status === 'submitted' || status === 'streaming')
      ) {
        const messageIndex = messages.findIndex(msg => msg.id === messageId)
        const isLast = messageIndex === messages.length - 1
        if (isLast && stop) {
          stop()
        }
      }

      const updatedMessages = messages.filter(msg => msg.id !== messageId)
      setMessages(updatedMessages)
    },
    [messages, setMessages, stop, status],
  )

  const startEditing = useCallback(() => {
    setIsEditing(true)
  }, [])

  const stopEditing = useCallback(() => {
    setIsEditing(false)
  }, [])

  return {
    isEditing,
    handleEditSubmit,
    handleDelete,
    startEditing,
    stopEditing,
  }
}
