import {UIMessage} from 'ai'
import {motion} from 'framer-motion'
import {FC} from 'react'

interface ResetChatButtonProps {
  messages: UIMessage[]
  setMessages: (messages: UIMessage[]) => void
  confirm: (message: string) => Promise<boolean | null>
  variant?: 'mobile' | 'desktop'
}

export const ResetChatButton: FC<ResetChatButtonProps> = ({
  messages,
  setMessages,
  confirm,
  variant = 'desktop',
}) => {
  const handleReset = async () => {
    const isDev = process.env.NODE_ENV === 'development'

    if (isDev) {
      setMessages([])
      return
    }

    const result = await confirm(
      'Are you sure you want to reset the chat? This action cannot be undone.',
    )
    if (result === true) {
      setMessages([])
    }
  }

  const hasMessages = messages.length > 1

  return (
    <motion.div
      initial={{opacity: 0, scale: 0.8}}
      animate={{opacity: 1, scale: 1}}
      transition={{delay: 1, duration: 0.4, ease: 'easeOut'}}
      className={
        variant === 'mobile' ? 'relative' : 'absolute bottom-34 right-10 sm:bottom-24 sm:right-12'
      }>
      <motion.button
        whileHover={hasMessages ? {scale: 1.05} : {}}
        whileTap={hasMessages ? {scale: 0.95} : {}}
        onClick={handleReset}
        disabled={!hasMessages}
        className={`
          group relative flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 ${variant === 'mobile' ? 'rounded-full w-8 h-8' : 'rounded-lg sm:rounded-xl w-8 h-8 sm:w-auto sm:h-auto'}
          backdrop-blur-md border shadow-lg transition-all duration-300
          ${
            hasMessages
              ? 'bg-white/80 border-red-100/60 text-red-600 hover:bg-red-50/80 hover:border-red-200/60 hover:shadow-red-500/20 hover:shadow-xl'
              : 'bg-neutral-100/60 border-neutral-100/60 text-neutral-400 cursor-not-allowed'
          }
        `}
        title={hasMessages ? 'Reset Chat' : 'No messages to reset'}>
        {/* Background glow effect */}
        {hasMessages && (
          <div className='absolute inset-0 rounded-lg sm:rounded-xl bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        )}

        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={`w-4 h-4 transition-transform duration-300 ${hasMessages ? 'group-hover:rotate-12' : ''}`}>
          <path d='M3 6h18' />
          <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
          <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
          <line x1='10' y1='11' x2='10' y2='17' />
          <line x1='14' y1='11' x2='14' y2='17' />
        </svg>

        <span
          className={`text-xs sm:text-sm font-medium transition-colors duration-300 hidden sm:inline ${
            hasMessages ? 'group-hover:text-red-700' : ''
          }`}>
          Reset
        </span>

        {/* Subtle pulse animation for enabled state */}
        {hasMessages && (
          <div className='absolute inset-0 rounded-lg sm:rounded-xl border border-red-200/40 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        )}
      </motion.button>
    </motion.div>
  )
}
