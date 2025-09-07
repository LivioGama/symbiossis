'use client'

import AnimatedButton from '@/components/ui/AnimatedButton'
import GlassCard from '@/components/ui/GlassCard'
import Store from '@/models/Store'
import {useObservable} from '@legendapp/state/react'
import {motion} from 'framer-motion'
import {FaArrowRight, FaCheck} from 'react-icons/fa'
import {questions} from './therapeutic-data'
import {TherapeuticDescription} from './therapeutic-types'

interface ResultScreenProps {
  psychologicalPreference: string
  answers: Record<string, string>
  therapeuticDescriptions: Record<string, TherapeuticDescription>
  onComplete: () => void
}

const ResultScreen = ({
  psychologicalPreference,
  answers,
  therapeuticDescriptions,
  onComplete,
}: ResultScreenProps) => {
  const startOnboardingTrigger = useObservable(Store.startOnboardingTrigger)

  const resultInfo = therapeuticDescriptions[psychologicalPreference] || {
    title: 'Your Therapeutic Style',
    description: 'Personalized therapeutic approach based on your preferences.',
  }

  const handleComplete = () => {
    Store.triggerStartOnboarding()
    setTimeout(() => onComplete(), 500)
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <motion.div
        initial={{opacity: 0, scale: 0.9}}
        animate={{
          opacity: 1,
          scale: startOnboardingTrigger.get() ? [1, 1.2, 1] : 1,
          y: startOnboardingTrigger.get() ? [0, -20, 0] : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          scale: {duration: 0.5, times: [0, 0.5, 1]},
          y: {duration: 0.5, times: [0, 0.5, 1]},
        }}
        className='w-full max-w-lg'>
        <GlassCard padding='xl' variant='default' className='bg-white shadow-sm'>
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2}}
            className='text-center'>
            <motion.div
              initial={{scale: 0}}
              animate={{scale: 1}}
              transition={{delay: 0.3, type: 'spring', stiffness: 200, damping: 10}}
              className='w-14 h-14 mx-auto mb-4 bg-sky-600 rounded-2xl flex items-center justify-center shadow-lg'>
              <FaCheck className='text-lg text-white drop-shadow-sm' />
            </motion.div>

            <motion.h2
              className='text-2xl font-medium text-neutral-700 mb-3'
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.4}}>
              Your Therapeutic Style
            </motion.h2>

            <motion.div
              className='mb-6 max-w-md mx-auto'
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.5}}>
              <p className='text-neutral-700 text-sm leading-relaxed'>{resultInfo.description}</p>
            </motion.div>

            <motion.div
              className='mb-8 max-w-md mx-auto'
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.6}}>
              <div className='text-left space-y-2'>
                <h4 className='font-medium text-neutral-700 text-sm mb-3'>Your preferences:</h4>
                {Object.entries(answers).map(([questionId, answer]) => {
                  const question = questions.find(q => q.id === questionId)
                  const option = question?.options.find(opt => opt.value === answer)
                  return (
                    <motion.div
                      key={questionId}
                      className='bg-neutral-50 rounded-lg p-2 border border-neutral-200'
                      initial={{opacity: 0, x: -20}}
                      animate={{opacity: 1, x: 0}}
                      transition={{delay: 0.7 + Object.keys(answers).indexOf(questionId) * 0.1}}>
                      <div className='flex items-start gap-2'>
                        <div className='w-2 h-2 bg-sky-600 rounded-full mt-1.5 flex-shrink-0 shadow-sm' />
                        <div>
                          <div className='font-medium text-neutral-700 text-xs mb-0.5'>
                            {question?.text}
                          </div>
                          <div className='text-neutral-700 text-sm font-medium'>{option?.text}</div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.9}}>
              <AnimatedButton
                onClick={handleComplete}
                variant='glass'
                size='md'
                className='font-semibold px-6 !bg-sky-600 hover:!bg-sky-900 shadow-lg'
                icon={<FaArrowRight className='ml-2' />}>
                Start Your Journey
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

export default ResultScreen
