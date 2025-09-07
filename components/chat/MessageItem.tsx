import ThreeDotsWave from '@/components/general/ThreeDotsWave'
import {UIMessage} from 'ai'
import {AnimatePresence, motion} from 'framer-motion'
import Image from 'next/image'
import {FC, KeyboardEvent, useLayoutEffect, useRef, useState} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MessageItemProps {
  message: UIMessage
  isEditing: boolean
  onEdit: () => void
  onEditSubmit: (messageId: string, newContent: string) => void
  onDelete: (messageId: string) => void
  status: string
  index: number
  isLast: boolean
}

export const MessageItem: FC<MessageItemProps> = ({
  message,
  isEditing,
  onEdit,
  onEditSubmit,
  onDelete,
  status,
  isLast,
}) => {
  const editInputRef = useRef<HTMLTextAreaElement>(null)
  const [textareaHeight, setTextareaHeight] = useState<number>()
  const [copySuccess, setCopySuccess] = useState(false)
  
  const hasContent = (msg: UIMessage) => {
    return msg.parts.some(part => part.type === 'text' && part.text.trim().length > 0)
  }
  useLayoutEffect(() => {
    if (isEditing && editInputRef.current) {
      const height = editInputRef.current.scrollHeight
      setTextareaHeight(height)
      editInputRef.current.focus()
      editInputRef.current.setSelectionRange(
        editInputRef.current.value.length,
        editInputRef.current.value.length,
      )
    }
  }, [isEditing])

  const handleEditKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onEditSubmit(message.id, e.currentTarget.value)
    } else if (e.key === 'Escape') {
      // Reset editing state without saving
      onEdit()
    }
  }

  if (message.role === 'user') {
    return (
      <div className='flex items-start gap-4 animate-fade-in'>
        <div className='w-8 h-8 rounded-full bg-sky-100 backdrop-blur-md items-center justify-center flex-shrink-0 mt-1 hidden md:flex'>
          <svg
            className='w-4 h-4 text-blue-400'
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
        <div className='flex flex-col gap-2 w-full md:max-w-[calc(100%-5rem)]'>
          <div className='bg-sky-600 p-5 rounded-2xl rounded-tl-none shadow-lg text-white font-medium'>
            {isEditing ? (
              <textarea
                ref={editInputRef}
                defaultValue={message.parts
                  .map(part => (part.type === 'text' ? part.text : ''))
                  .join('')}
                data-message-id={message.id}
                onKeyDown={handleEditKeyDown}
                onBlur={e => onEditSubmit(message.id, e.target.value)}
                className='w-full bg-sky-600 text-white outline-none resize-none p-0 m-0 block text-base md:text-sm font-medium leading-[1.5] md:leading-[1.45]'
                style={{
                  minHeight: 'unset',
                  height: textareaHeight ? `${textareaHeight}px` : 'auto',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  fontWeight: '500',
                }}
              />
            ) : (
              <p className='text-base md:text-sm text-white font-medium whitespace-pre-line leading-[1.5] md:leading-[1.45]'>
                {message.parts.map(part => (part.type === 'text' ? part.text : '')).join('')}
              </p>
            )}
          </div>
          {!isEditing && (
            <div className='flex justify-end gap-2'>
              <button
                type='button'
                onClick={onEdit}
                className='flex items-center gap-2 px-2 py-1 rounded-md text-neutral-600 hover:text-neutral-700 transition-colors cursor-pointer'
                aria-label='edit message'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
                </svg>
                <span className='text-xs'>Edit</span>
              </button>
              <button
                type='button'
                onClick={() => onDelete(message.id)}
                className='flex items-center gap-2 px-2 py-1 rounded-md text-neutral-600 hover:text-red-400 transition-colors cursor-pointer'
                aria-label='delete message'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path d='M3 6h18' />
                  <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                  <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                </svg>
                <span className='text-xs'>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (message.id === 'fake-loader-message') {
    return (
      <div className='flex items-start gap-4 animate-fade-in'>
        <div className='hidden md:flex'>
          <div className='flex-shrink-0'>
            <Image
              src='/logo_square.webp'
              alt='Symbiossis'
              width={32}
              height={32}
              className='w-8 h-8 rounded-full'
            />
          </div>
        </div>
        <div className='flex flex-col gap-2 w-full md:max-w-[calc(100%-5rem)]'>
          <motion.div
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.95}}
            transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
            className='bg-white p-5 rounded-2xl rounded-tl-none shadow-lg transition-all duration-500 opacity-100 translate-y-0 text-neutral-700'>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 0.1, duration: 0.3}}
              className='flex items-start py-2'>
              <ThreeDotsWave />
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex items-start gap-4 animate-fade-in'>
      <div className='hidden md:flex'>
        <div className='flex-shrink-0'>
          <Image
            src='/logo_square.webp'
            alt='Symbiossis'
            width={32}
            height={32}
            className='w-8 h-8 rounded-full'
          />
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full md:max-w-[calc(100%-5rem)]'>
        <AnimatePresence mode='wait'>
          {status === 'submitted' && isLast ? (
            <motion.div
              key='sending'
              initial={{opacity: 0, scale: 0.8, y: 10}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.8, y: -10, transition: {duration: 0.2}}}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className='bg-white/60 backdrop-blur-sm p-4 rounded-2xl rounded-tl-none shadow-lg border border-white/20'>
              <motion.div
                initial={{scale: 0.8}}
                animate={{scale: 1}}
                transition={{duration: 0.2}}
                className='flex items-center gap-3 text-primary-600'>
                <ThreeDotsWave />
                <span className='text-sm font-medium'>Sending message...</span>
              </motion.div>
            </motion.div>
          ) : status === 'streaming' && !hasContent(message) ? (
            <motion.div
              key='streaming-loader'
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.95}}
              transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
              className='bg-white p-5 rounded-2xl rounded-tl-none shadow-lg transition-all duration-500 opacity-100 translate-y-0 text-neutral-700'>
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.1, duration: 0.3}}
                className='flex items-start py-2'>
                <ThreeDotsWave />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={status === 'streaming' ? 'streaming-content' : 'content'}
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.95}}
              transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
              className='bg-white p-5 rounded-2xl rounded-tl-none shadow-lg transition-all duration-500 opacity-100 translate-y-0 text-neutral-700'>
              <div className='prose prose-base md:prose-sm max-w-none'>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({children}) => (
                      <h1 className='text-xl font-bold text-sky-600 mb-4 mt-6 first:mt-0 leading-tight'>
                        {children}
                      </h1>
                    ),
                    h2: ({children}) => (
                      <h2 className='text-lg font-semibold text-sky-600 mb-3 mt-5 first:mt-0 leading-tight'>
                        {children}
                      </h2>
                    ),
                    h3: ({children}) => (
                      <h3 className='text-base font-semibold text-sky-600 mb-3 mt-4 first:mt-0 leading-tight'>
                        {children}
                      </h3>
                    ),
                    h4: ({children}) => (
                      <h4 className='text-base font-semibold text-sky-600 mb-2 mt-3 first:mt-0 leading-tight'>
                        {children}
                      </h4>
                    ),
                    h5: ({children}) => (
                      <h5 className='text-sm font-semibold text-sky-600 mb-2 mt-3 first:mt-0 leading-tight'>
                        {children}
                      </h5>
                    ),
                    h6: ({children}) => (
                      <h6 className='text-sm font-semibold text-sky-600 mb-2 mt-2 first:mt-0 leading-tight'>
                        {children}
                      </h6>
                    ),
                    p: ({children}) => (
                      <p className='text-base md:text-sm leading-[1.6] md:leading-[1.5]'>
                        {children}
                      </p>
                    ),
                    li: ({children}) => (
                      <li className='text-base md:text-sm leading-[1.6] md:leading-[1.5] mb-2 last:mb-0'>
                        {children}
                      </li>
                    ),
                    ul: ({children}) => (
                      <ul className='text-base md:text-sm leading-[1.6] md:leading-[1.5] mb-3 ml-4 list-disc'>
                        {children}
                      </ul>
                    ),
                    ol: ({children}) => (
                      <ol className='text-base md:text-sm leading-[1.6] md:leading-[1.5] mb-3 ml-4 list-decimal'>
                        {children}
                      </ol>
                    ),
                    blockquote: ({children}) => (
                      <blockquote className='text-base md:text-sm leading-[1.6] md:leading-[1.5] mb-4 pl-4 border-l-4 border-sky-600 bg-sky-50/30 py-2 rounded-r-md italic'>
                        {children}
                      </blockquote>
                    ),
                    code: ({children}) => (
                      <code className='text-base md:text-sm bg-sky-100/50 text-sky-600 px-1.5 py-0.5 rounded font-mono leading-[1.4]'>
                        {children}
                      </code>
                    ),
                    pre: ({children}) => (
                      <pre className='text-base md:text-sm bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg overflow-x-auto mb-4 leading-[1.4]'>
                        <code className='text-base md:text-sm leading-[1.4]'>{children}</code>
                      </pre>
                    ),
                    strong: ({children}) => (
                      <strong className='text-base md:text-sm font-semibold text-sky-600'>
                        {children}
                      </strong>
                    ),
                    em: ({children}) => (
                      <em className='text-base md:text-sm italic text-sky-600'>{children}</em>
                    ),
                    table: ({children}) => (
                      <div className='overflow-x-auto my-4'>
                        <table className='min-w-full border border-neutral-200 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg'>
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({children}) => (
                      <thead className='bg-gradient-to-r from-primary-50 to-primary-100/80'>
                        {children}
                      </thead>
                    ),
                    tbody: ({children}) => (
                      <tbody className='bg-white/60 divide-y divide-primary-100/30'>
                        {children}
                      </tbody>
                    ),
                    tr: ({children}) => (
                      <tr className='hover:bg-primary-50/30 transition-colors duration-200'>
                        {children}
                      </tr>
                    ),
                    th: ({children}) => (
                      <th className='px-4 py-3 text-left text-xs font-semibold text-sky-600 uppercase tracking-wider border-b border-neutral-200'>
                        {children}
                      </th>
                    ),
                    td: ({children}) => (
                      <td className='px-4 py-3 text-base md:text-sm text-neutral-700 border-b border-neutral-200 leading-[1.5]'>
                        {children}
                      </td>
                    ),
                  }}>
                  {message.parts.map(part => (part.type === 'text' ? part.text : '')).join('')}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {message.role === 'assistant' && message.id !== 'initial' && (
          <div className='flex justify-end gap-2'>
            <button
              type='button'
              onClick={async () => {
                try {
                  const text = message.parts
                    .map(part => (part.type === 'text' ? part.text : ''))
                    .join('')
                  await navigator.clipboard.writeText(text)
                  setCopySuccess(true)
                  setTimeout(() => setCopySuccess(false), 2000)
                } catch {
                  try {
                    const textArea = document.createElement('textarea')
                    textArea.value = message.parts
                      .map(part => (part.type === 'text' ? part.text : ''))
                      .join('')
                    document.body.appendChild(textArea)
                    textArea.select()
                    document.execCommand('copy')
                    document.body.removeChild(textArea)
                    setCopySuccess(true)
                    setTimeout(() => setCopySuccess(false), 2000)
                  } catch {
                    // Silently handle fallback copy method failure
                  }
                }
              }}
              className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors cursor-pointer ${
                copySuccess ? 'text-green-600 bg-green-50' : 'text-neutral-600 hover:text-sky-600'
              }`}
              aria-label='copy message'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <rect width='14' height='14' x='8' y='8' rx='2' ry='2' />
                <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
              </svg>
              <span className='text-xs'>{copySuccess ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              type='button'
              onClick={() => onDelete(message.id)}
              className='flex items-center gap-2 px-2 py-1 rounded-md text-neutral-600 hover:text-red-400 transition-colors cursor-pointer'
              aria-label='delete message'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M3 6h18' />
                <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
              </svg>
              <span className='text-xs'>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
