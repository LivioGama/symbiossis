'use client'

import GlassCard from '@/components/ui/GlassCard'
import Store from '@/models/Store'
import {observer} from '@legendapp/state/react'
import {AnimatePresence, motion} from 'framer-motion'
import {useState} from 'react'
import {FaArrowRight} from 'react-icons/fa'
import ResultScreen from './ResultScreen'
import {questions, therapeuticDescriptions} from './therapeutic-data'
import {TherapeuticPreferencesProps} from './therapeutic-types'

const TherapeuticPreferences = observer(({onComplete}: TherapeuticPreferencesProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [psychologicalPreference, setPsychologicalPreference] = useState<string>('')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const startOnboardingTrigger = Store.startOnboardingTrigger.get()

  const handleAnswer = (questionId: string, value: string) => {
    if (isTransitioning) return

    setIsTransitioning(true)

    const newAnswers = {...answers, [questionId]: value}
    setAnswers(newAnswers)

    if (currentStep >= questions.length - 1) {
      const allQuestionsAnswered = questions.every(q => newAnswers[q.id])

      if (allQuestionsAnswered) {
        const interactionPref = newAnswers.interaction_style
        const focusPref = newAnswers.focus_preference
        const counselorPref = newAnswers.counselor_style
        const sessionPref = newAnswers.session_structure

        const preferenceType = `${interactionPref}${focusPref}${counselorPref}${sessionPref}`

        setPsychologicalPreference(preferenceType)
        setIsCompleted(true)
      } else {
        setIsTransitioning(false)
      }
    } else {
      setCurrentStep(prev => {
        const nextStep = prev + 1
        return Math.min(nextStep, questions.length - 1)
      })
      setIsTransitioning(false)
    }
  }

  const safeCurrentStep = Math.min(currentStep, questions.length - 1)
  const currentQuestion = questions[safeCurrentStep]
  const progress = (safeCurrentStep / questions.length) * 100

  if (isCompleted) {
    return (
      <ResultScreen
        psychologicalPreference={psychologicalPreference}
        answers={answers}
        therapeuticDescriptions={therapeuticDescriptions}
        onComplete={() => onComplete(psychologicalPreference)}
      />
    )
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <motion.div
        initial={{opacity: 0, scale: 0.9}}
        animate={{
          opacity: 1,
          scale: startOnboardingTrigger ? [0.9, 1.1, 1] : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          scale: {duration: 0.5, times: [0, 0.5, 1]},
        }}
        className='w-full max-w-md'>
        {/* Progress Bar */}
        <div className='mb-6'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm text-sky-600'>
              Question {safeCurrentStep + 1} of {questions.length}
            </span>
            <span className='text-sm text-sky-600'>{Math.round(progress)}% Complete</span>
          </div>
          <div className='w-full bg-blue-100 rounded-full h-2 overflow-hidden'>
            <motion.div
              className='h-full bg-sky-600'
              initial={{width: 0}}
              animate={{width: `${progress}%`}}
              transition={{type: 'spring', stiffness: 100, damping: 15}}
            />
          </div>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentStep}
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -50}}
            transition={{type: 'spring', stiffness: 100}}>
            <GlassCard padding='lg' className='bg-white shadow-sm'>
              <div className='mb-6'>
                <h2 className='text-xl font-medium text-neutral-700 mb-2'>
                  {currentQuestion.text}
                </h2>
                <p className='text-neutral-600 text-sm'>
                  Choose the option that best describes your preference
                </p>
              </div>

              <div className='space-y-3'>
                {currentQuestion.options.map((option, index) => (
                  <motion.div
                    key={option.value}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: index * 0.1}}>
                    <button
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                      disabled={isTransitioning}
                      className={`w-full p-4 text-left border rounded-lg transition-all duration-300 group ${
                        answers[currentQuestion.id] === option.value
                          ? 'bg-blue-50 border-gray-400 shadow-sm'
                          : 'bg-white hover:bg-blue-25 border-gray-300 hover:border-gray-400'
                      } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <div className='flex items-start gap-4'>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 transition-all duration-300 ${
                            answers[currentQuestion.id] === option.value
                              ? 'border-gray-400 bg-blue-50'
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}>
                          <motion.div
                            className={`w-2 h-2 rounded-full ${
                              answers[currentQuestion.id] === option.value ? 'bg-sky-600' : ''
                            }`}
                            initial={{scale: 0, opacity: 0}}
                            animate={{
                              scale: answers[currentQuestion.id] === option.value ? 1 : 0,
                              opacity: answers[currentQuestion.id] === option.value ? 1 : 0,
                            }}
                            transition={{type: 'spring', stiffness: 400, damping: 20}}
                          />
                        </div>
                        <div className='flex-1'>
                          <h3 className='font-medium text-neutral-700 text-sm'>{option.text}</h3>
                          {option.description && (
                            <p className='text-sm text-neutral-600 mt-1'>{option.description}</p>
                          )}
                        </div>
                        <FaArrowRight className='text-neutral-400 group-hover:text-neutral-500 transition-colors text-sm' />
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Progress Dots */}
              <div className='flex items-center justify-center mt-6'>
                <div className='flex gap-2'>
                  {questions.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index <= safeCurrentStep ? 'bg-sky-600' : 'bg-blue-200'
                      }`}
                      whileHover={{scale: 1.2}}
                      animate={{
                        scale: index === safeCurrentStep ? 1.1 : 1,
                      }}
                      transition={{type: 'spring', stiffness: 300, damping: 20}}
                    />
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
})

export default TherapeuticPreferences
