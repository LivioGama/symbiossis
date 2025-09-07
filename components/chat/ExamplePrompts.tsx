import {examplePrompts} from '@/models/prompts'
import {UIMessage} from 'ai'
import {motion} from 'framer-motion'
import {FC} from 'react'

interface ExamplePromptsProps {
  messages: UIMessage[]
  onExampleClick: (example: string) => void
  onSharedInputChange?: (value: string) => void
}

export const ExamplePrompts: FC<ExamplePromptsProps> = ({
  messages,
  onExampleClick,
  onSharedInputChange,
}) => {
  // Only show if there are no user messages
  const hasUserMessages = messages.some(msg => msg.role === 'user')

  if (hasUserMessages) {
    return null
  }

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
      className='space-y-6 mt-12'>
      <motion.div
        initial={{opacity: 0, scale: 0.9}}
        animate={{opacity: 1, scale: 1}}
        transition={{delay: 1, duration: 0.4, ease: 'easeOut'}}
        className='text-center'>
        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-xl sm:rounded-full bg-primary-50/50 border border-neutral-200 backdrop-blur-sm'>
          <span className='text-lg'>💭</span>
          <p className='text-sm font-semibold text-primary-700 tracking-wide'>
            Try one of these examples:
          </p>
        </div>
      </motion.div>

      <div className='grid gap-3 sm:gap-4 max-w-2xl mx-auto'>
        {examplePrompts.map((prompt, index) => (
          <motion.button
            key={index}
            initial={{opacity: 0, y: 20, scale: 0.95}}
            animate={{opacity: 1, y: 0, scale: 1}}
            transition={{
              delay: 1.2 + index * 0.1,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              scale: 1.02,
              transition: {duration: 0.2},
            }}
            whileTap={{scale: 0.98}}
            onClick={() => {
              if (onSharedInputChange) {
                onSharedInputChange(prompt)
              } else {
                onExampleClick(prompt)
              }
            }}
            className='group relative p-4 sm:p-5 text-left bg-white/70 hover:bg-white/90 border border-neutral-200 rounded-lg sm:rounded-2xl text-xs sm:text-sm text-neutral-700 hover:text-neutral-600 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-primary-500/10 overflow-hidden cursor-pointer'>
            {/* Background gradient on hover */}
            <div className='absolute inset-0 bg-gradient-to-r from-primary-50/0 via-primary-50/20 to-secondary-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

            {/* Content */}
            <div className='relative flex items-start gap-3'>
              <div className='flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-full bg-sky-100 backdrop-blur-md flex items-center justify-center'>
                <svg
                  className='w-3 h-3 sm:w-4 sm:h-4 text-sky-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
              </div>

              <div className='flex-1 min-w-0'>
                <p className='text-neutral-700 leading-relaxed group-hover:text-neutral-600 transition-colors duration-300'>
                  <span className='text-primary-500 font-medium text-sm'>&ldquo;</span>
                  {prompt}
                  <span className='text-primary-500 font-medium text-sm'>&rdquo;</span>
                </p>
              </div>
            </div>

            {/* Subtle border glow on hover */}
            <div className='absolute inset-0 rounded-lg sm:rounded-2xl border border-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
