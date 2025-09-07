import {UIMessage} from 'ai'
import {AnimatePresence, motion} from 'framer-motion'
import {FC} from 'react'
import {MessageItem} from './MessageItem'

interface MessageListProps {
  messages: UIMessage[]
  isEditing: boolean
  onEdit: () => void
  onEditSubmit: (messageId: string, newContent: string) => void
  onDelete: (messageId: string) => void
  status: string
  showFakeLoader?: boolean
}

export const MessageList: FC<MessageListProps> = ({
  messages,
  isEditing,
  onEdit,
  onEditSubmit,
  onDelete,
  status,
  showFakeLoader = false,
}) => (
  <div className='space-y-4 md:space-y-6'>
    <AnimatePresence>
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -20}}
          transition={{duration: 0.4, ease: 'easeOut'}}>
          <MessageItem
            message={message}
            isEditing={isEditing}
            onEdit={onEdit}
            onEditSubmit={onEditSubmit}
            onDelete={onDelete}
            status={status}
            index={index}
            isLast={index === messages.length - 1}
          />
        </motion.div>
      ))}
      {showFakeLoader && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -20}}
          transition={{duration: 0.4, ease: 'easeOut'}}>
          <MessageItem
            message={{
              id: 'fake-loader-message',
              role: 'assistant',
              parts: [{type: 'text', text: ''}],
            }}
            isEditing={isEditing}
            onEdit={onEdit}
            onEditSubmit={onEditSubmit}
            onDelete={onDelete}
            status={status}
            index={messages.length}
            isLast
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)
