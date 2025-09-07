import AnimatedButton from '@/components/ui/AnimatedButton'
import useAutoGrowTextarea from '@/hooks/useAutoGrowTextarea'
import {FC, FormEvent, KeyboardEvent, useCallback} from 'react'
import {FaArrowRight, FaStop} from 'react-icons/fa'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  onSubmit: (e?: FormEvent) => void
  status: string
  handleKeyPress?: (e: KeyboardEvent) => void
  onStop: () => void
  isDemo?: boolean
}

export const ChatInput: FC<ChatInputProps> = ({
  input,
  setInput,
  onSubmit,
  status,
  handleKeyPress,
  onStop,
  isDemo = false,
}) => {
  const textareaRef = useAutoGrowTextarea(input, 44, 200)

  const defaultKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        onSubmit()
      }
    },
    [onSubmit],
  )

  const keyPressHandler = handleKeyPress || defaultKeyPress

  return (
    <>
      <div className='relative flex-1 min-h-[44px] max-h-[200px] bg-transparent border border-neutral-200 rounded-2xl shadow-sm focus-within:border-primary-400 transition-all duration-300'>
        {!input && (
          <>
            {!isDemo && (
              <div className='absolute top-0 left-0 right-0 h-[44px] px-6 pointer-events-none text-neutral-400 text-sm font-medium leading-[22px] hidden sm:flex sm:items-center z-20'>
                <div className='leading-tight'>
                  <span className='text-sm block'>Your current biggest challenge in life,</span>
                  <span className='text-[11px] block leading-none'>
                    detailed enough so it is uncomfortable to write on a smartphone
                  </span>
                </div>
              </div>
            )}
            <div
              className={`absolute top-0 left-0 right-0 h-[44px] px-6 pointer-events-none text-neutral-400 text-sm font-medium leading-[22px] flex items-center z-20 ${isDemo ? '' : 'sm:hidden'}`}>
              Your big challenge...
            </div>
          </>
        )}
        <div className='w-full h-full p-0'>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={keyPressHandler}
            placeholder=''
            disabled={status === 'streaming'}
            rows={1}
            className='chat-input w-full min-h-[22px] max-h-[178px] px-6 py-[11px] bg-transparent border-0 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-0 text-sm font-medium placeholder:text-sm transition-all duration-300 disabled:opacity-50 resize-none leading-[22px] no-scrollbar'
          />
        </div>
      </div>
      {status === 'streaming' ? (
        <AnimatedButton
          type='button'
          variant='secondary'
          size='md'
          className='font-semibold sm:px-5 rounded-full w-11 h-11 sm:w-auto sm:h-11 flex items-center justify-center focus:ring-0'
          onClick={onStop}
          icon={<FaStop />}>
          <span className='hidden sm:inline'>Stop</span>
        </AnimatedButton>
      ) : (
        <AnimatedButton
          type='submit'
          variant='primary'
          size='md'
          className='font-semibold sm:px-5 rounded-full w-11 h-11 sm:w-auto sm:h-11 flex items-center justify-center focus:ring-0'
          disabled={!input.trim()}
          icon={<FaArrowRight />}>
          <span className='hidden sm:inline'>Send</span>
        </AnimatedButton>
      )}
    </>
  )
}
