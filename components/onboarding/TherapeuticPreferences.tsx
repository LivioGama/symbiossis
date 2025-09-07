'use client'

import React, {useState} from 'react'
import {useForm} from 'react-hook-form'

interface TherapeuticPreferencesData {
  interaction_style: 'a' | 'b'
  focus_preference: 'a' | 'b'
  counselor_style: 'a' | 'b'
  session_structure: 'a' | 'b'
}

interface TherapeuticPreferencesProps {
  onComplete: (mbtiType: string) => void
}

// Hidden MBTI assessment disguised as therapeutic communication preferences
const therapeuticPreferences = [
  {
    id: 'interaction_style',
    text: 'When working through personal challenges, what helps you most?',
    options: [
      {
        id: 'a',
        text: 'Talking it through with others and getting different perspectives',
        weight: {EI_score: 2},
      },
      {
        id: 'b',
        text: 'Taking time alone to reflect and process internally first',
        weight: {EI_score: -2},
      },
    ],
  },
  {
    id: 'focus_preference',
    text: 'In therapy, which approach resonates more with you?',
    options: [
      {
        id: 'a',
        text: 'Exploring possibilities, patterns, and the bigger picture of my life',
        weight: {NS_score: 2},
      },
      {
        id: 'b',
        text: 'Focusing on practical, concrete steps I can take right now',
        weight: {NS_score: -2},
      },
    ],
  },
  {
    id: 'counselor_style',
    text: 'Do you prefer that your counselor talk to you warmly or logically?',
    options: [
      {
        id: 'a',
        text: 'Logically - with clear reasoning and objective analysis',
        weight: {TF_score: 2},
      },
      {
        id: 'b',
        text: 'Warmly - with empathy and understanding of my feelings',
        weight: {TF_score: -2},
      },
    ],
  },
  {
    id: 'session_structure',
    text: 'What kind of session structure works best for you?',
    options: [
      {
        id: 'a',
        text: 'Clear agenda with specific goals and outcomes planned',
        weight: {JP_score: 2},
      },
      {
        id: 'b',
        text: 'Flexible conversation that adapts to what comes up naturally',
        weight: {JP_score: -2},
      },
    ],
  },
]

// Calculate MBTI type from therapeutic preferences (hidden from user)
const determineTherapeuticStyle = (responses: TherapeuticPreferencesData): string => {
  const scores = {EI_score: 0, NS_score: 0, TF_score: 0, JP_score: 0}

  // Calculate scores from responses
  Object.entries(responses).forEach(([questionId, answerId]) => {
    const question = therapeuticPreferences.find(q => q.id === questionId)
    const option = question?.options.find(o => o.id === answerId)
    if (option?.weight) {
      Object.entries(option.weight).forEach(([dimension, score]) => {
        scores[dimension as keyof typeof scores] += score
      })
    }
  })

  // Convert scores to MBTI type
  const E_or_I = scores.EI_score > 0 ? 'E' : 'I'
  const N_or_S = scores.NS_score > 0 ? 'N' : 'S'
  const T_or_F = scores.TF_score > 0 ? 'T' : 'F'
  const J_or_P = scores.JP_score > 0 ? 'J' : 'P'

  return `${E_or_I}${N_or_S}${T_or_F}${J_or_P}`
}

const TherapeuticPreferences: React.FC<TherapeuticPreferencesProps> = ({onComplete}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const {register, handleSubmit, watch, setValue} = useForm<TherapeuticPreferencesData>()
  const [responses, setResponses] = useState<Partial<TherapeuticPreferencesData>>({})

  const currentQ = therapeuticPreferences[currentQuestion]
  const isLastQuestion = currentQuestion === therapeuticPreferences.length - 1
  const watchedAnswer = watch(currentQ.id as keyof TherapeuticPreferencesData)

  // Sync selectedAnswer with form state
  React.useEffect(() => {
    if (selectedAnswer !== watchedAnswer) {
      setValue(currentQ.id as keyof TherapeuticPreferencesData, selectedAnswer as any)
    }
  }, [selectedAnswer, watchedAnswer, currentQ.id, setValue])

  // Reset selectedAnswer when moving to next question
  React.useEffect(() => {
    setSelectedAnswer(null)
  }, [currentQuestion])

  const handleNext = () => {
    if (!selectedAnswer || !watchedAnswer) return

    const newResponses = {...responses, [currentQ.id]: selectedAnswer}
    setResponses(newResponses)

    if (isLastQuestion) {
      // Calculate MBTI type and complete
      const mbtiType = determineTherapeuticStyle(newResponses as TherapeuticPreferencesData)
      onComplete(mbtiType)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      // selectedAnswer will be reset by useEffect
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10'>
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-semibold text-foreground mb-2'>
          Personalize Your Support Experience
        </h2>
        <p className='text-foreground/70'>
          Help us understand your preferred communication style so we can provide the most helpful
          guidance.
        </p>
      </div>

      {/* Progress indicator */}
      <div className='mb-8'>
        <div className='flex justify-between text-sm text-foreground/60 mb-2'>
          <span>
            Question {currentQuestion + 1} of {therapeuticPreferences.length}
          </span>
          <span>{Math.round((currentQuestion / therapeuticPreferences.length) * 100)}%</span>
        </div>
        <div className='w-full bg-white/10 rounded-full h-2 overflow-hidden'>
          <div
            key={currentQuestion}
            className='bg-primary h-2 rounded-full transition-all duration-500 ease-out'
            style={{width: `${(currentQuestion / therapeuticPreferences.length) * 100}%`}}
          />
        </div>
      </div>

      {/* Question */}
      <div className='mb-8'>
        <h3 className='text-xl text-foreground mb-6 leading-relaxed'>{currentQ.text}</h3>

        {!selectedAnswer && (
          <div className='mb-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg'>
            <p className='text-sm text-orange-400'>Please select an option to continue</p>
          </div>
        )}

        <div className='space-y-4'>
          {currentQ.options.map(option => (
            <label
              key={option.id}
              className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedAnswer === option.id
                  ? 'border-primary bg-primary/10'
                  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => setSelectedAnswer(option.id)}>
              <input
                type='radio'
                value={option.id}
                {...register(currentQ.id as keyof TherapeuticPreferencesData, {required: true})}
                className='sr-only'
                onChange={e => {
                  setSelectedAnswer(e.target.value)
                  setValue(currentQ.id as keyof TherapeuticPreferencesData, e.target.value as any)
                }}
              />
              <div className='flex items-start gap-3'>
                <div
                  className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                    selectedAnswer === option.id ? 'border-primary bg-primary' : 'border-white/40'
                  }`}>
                  {selectedAnswer === option.id && (
                    <div className='w-full h-full rounded-full bg-white scale-50' />
                  )}
                </div>
                <span className='text-foreground leading-relaxed'>{option.text}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className='flex justify-between items-center'>
        <div>
          {currentQuestion > 0 && (
            <button
              type='button'
              onClick={handlePrevious}
              className='px-6 py-2 text-foreground/70 hover:text-foreground transition-colors'>
              ← Previous
            </button>
          )}
        </div>

        <div className='flex gap-3'>
          <button
            type='button'
            onClick={handleNext}
            disabled={!selectedAnswer || !watchedAnswer}
            className='px-8 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200'>
            {isLastQuestion ? 'Complete Setup' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TherapeuticPreferences
