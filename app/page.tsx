'use client'

import TherapeuticPreferences from '@/components/onboarding/TherapeuticPreferences'
import Store from '@/models/Store'
import {easeInOut, motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Sophisticated 3-dot wave loader component
const LoadingDot = {
  display: 'block',
  width: '0.5rem',
  height: '0.5rem',
  backgroundColor: 'currentColor',
  borderRadius: '50%',
  opacity: 0.6,
}

const LoadingContainer = {
  width: '3rem',
  height: '1.25rem',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
}

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const DotVariants = {
  initial: {
    y: '0%',
  },
  animate: {
    y: '100%',
  },
}

const DotTransition = {
  duration: 0.5,
  repeatType: 'mirror' as const,
  repeat: Infinity,
  ease: easeInOut,
}

const ThreeDotsWave = () => (
  <div className='flex'>
    <motion.div
      style={LoadingContainer}
      variants={ContainerVariants}
      initial='initial'
      animate='animate'>
      <motion.span style={LoadingDot} variants={DotVariants} transition={DotTransition} />
      <motion.span style={LoadingDot} variants={DotVariants} transition={DotTransition} />
      <motion.span style={LoadingDot} variants={DotVariants} transition={DotTransition} />
    </motion.div>
  </div>
)

// Custom styled markdown components
const markdownComponents = {
  h1: ({children, ...props}: any) => (
    <h1 className='text-xl font-bold text-foreground mb-4 pb-2 border-b border-border' {...props}>
      {children}
    </h1>
  ),
  h2: ({children, ...props}: any) => (
    <h2
      className='text-lg font-semibold text-foreground mb-3 pb-1 border-b border-border/50 mt-6'
      {...props}>
      {children}
    </h2>
  ),
  h3: ({children, ...props}: any) => (
    <h3
      className='text-base font-medium text-foreground mb-2 mt-4 border-b border-border/30'
      {...props}>
      {children}
    </h3>
  ),
  table: ({children, ...props}: any) => (
    <div className='overflow-x-auto mb-4'>
      <table className='min-w-full border-collapse border border-border' {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({children, ...props}: any) => (
    <thead className='bg-muted/50' {...props}>
      {children}
    </thead>
  ),
  tbody: ({children, ...props}: any) => <tbody {...props}>{children}</tbody>,
  tr: ({children, ...props}: any) => (
    <tr className='border-b border-border/50' {...props}>
      {children}
    </tr>
  ),
  th: ({children, ...props}: any) => (
    <th
      className='border border-border px-4 py-2 text-left font-semibold text-foreground'
      {...props}>
      {children}
    </th>
  ),
  td: ({children, ...props}: any) => (
    <td className='border border-border px-4 py-2 text-foreground/90' {...props}>
      {children}
    </td>
  ),
  ul: ({children, ...props}: any) => (
    <ul className='list-disc list-inside space-y-1 mb-4 ml-4' {...props}>
      {children}
    </ul>
  ),
  ol: ({children, ...props}: any) => (
    <ol className='list-decimal list-inside space-y-1 mb-4 ml-4' {...props}>
      {children}
    </ol>
  ),
  li: ({children, ...props}: any) => (
    <li className='text-foreground/90 leading-relaxed' {...props}>
      {children}
    </li>
  ),
  p: ({children, ...props}: any) => (
    <p className='text-foreground/90 leading-relaxed mb-3' {...props}>
      {children}
    </p>
  ),
  strong: ({children, ...props}: any) => (
    <strong className='font-semibold text-foreground' {...props}>
      {children}
    </strong>
  ),
  em: ({children, ...props}: any) => (
    <em className='italic text-foreground/80' {...props}>
      {children}
    </em>
  ),
  blockquote: ({children, ...props}: any) => (
    <blockquote
      className='border-l-4 border-primary/50 pl-4 py-2 my-4 bg-white/5 rounded-r-md'
      {...props}>
      {children}
    </blockquote>
  ),
}

// System instructions for each MBTI type
const getSystemInstructionsFor = (type: string) => {
  let instructions = ''

  switch (type) {
    case 'INTJ':
      instructions = `You're an INTJ psychologist. You excel at guiding other INTJs, even when they overanalyze or detach emotionally. Think like an INTJ yourself: strategic, future-oriented, always connecting vision to action. Avoid generic advice; go deep into their blind spots and intellectual patterns. Challenge them to turn grand strategies into practical steps, provoke reflection, and provide concrete exercises to bridge planning and execution.`
      break
    case 'INTP':
      instructions = `You're an INTP psychologist. You excel at helping other INTPs, even when they get stuck in endless analysis. Think like an INTP yourself: analytical, curious, principle-driven. Avoid rigid or trivial solutions. Push them to clarify thoughts, link ideas to feelings, and convert insights into action. Provide concrete exercises and examples that stimulate their intellectual curiosity and gently challenge inertia.`
      break
    case 'ENTJ':
      instructions = `You're an ENTJ psychologist. You excel at guiding ENTJs who try to hijack topics or prove psychologists useless. Think like an ENTJ yourself: frontal, strategic, provocative. Go further in reasoning than they do, exposing blind spots, offering real solutions, and proposing actionable steps to overcome reliance on others, create internal validation, and execute solo at high speed. Your advice should be sharp, direct, and packed with exercises, examples, and 30-day action plans if relevant.`
      break
    case 'ENTP':
      instructions = `You're an ENTP psychologist. You excel at guiding ENTPs who jump ideas or resist routine. Think like an ENTP yourself: inventive, fast, and provocative. Avoid predictable suggestions. Channel their creativity into practical execution, provide exercises to maintain focus, and offer strategies to turn exploration into results.`
      break
    case 'INFJ':
      instructions = `You're an INFJ psychologist. You excel at supporting INFJs who get overwhelmed by others' emotions. Think like an INFJ yourself: insightful, empathetic, principled. Avoid shallow or purely logical advice. Help them honor inner voice, set boundaries, and translate ideals into action. Offer concrete steps and reflection exercises that connect purpose to sustainable behavior.`
      break
    case 'INFP':
      instructions = `You're an INFP psychologist. You excel at guiding INFPs who feel misunderstood or doubt themselves. Think like an INFP: imaginative, sensitive, authentic. Avoid harsh or generic advice. Help them clarify values, accept feelings, and implement small meaningful actions. Provide exercises that nurture creativity and authentic expression.`
      break
    case 'ENFJ':
      instructions = `You're an ENFJ psychologist. You excel at helping ENFJs who over-invest in others. Think like an ENFJ: warm, persuasive, insightful. Avoid cold, impersonal advice. Guide them to recognize personal needs, set compassionate boundaries, and translate relational skills into sustainable personal fulfillment. Offer actionable exercises.`
      break
    case 'ENFP':
      instructions = `You're an ENFP psychologist. You excel at guiding ENFPs overwhelmed by possibilities. Think like an ENFP: imaginative, open-hearted, exploratory. Avoid rigid or formulaic approaches. Help them focus energy, accept feelings, and take practical steps toward goals. Provide exercises to convert inspiration into consistent action.`
      break
    case 'ISTJ':
      instructions = `You're an ISTJ psychologist. You excel at guiding ISTJs who resist change or suppress emotions. Think like an ISTJ: practical, reliable, detail-oriented. Avoid vague or abstract advice. Help them adapt, recognize emotions, and balance duty with personal satisfaction. Provide step-by-step exercises and strategies.`
      break
    case 'ISFJ':
      instructions = `You're an ISFJ psychologist. You excel at supporting ISFJs who neglect themselves. Think like an ISFJ: nurturing, attentive, dependable. Avoid harsh or abstract guidance. Help them set boundaries, embrace change gradually, and care for personal well-being. Offer practical, gentle exercises.`
      break
    case 'ESTJ':
      instructions = `You're an ESTJ psychologist. You excel at guiding ESTJs who overcontrol or dismiss emotions. Think like an ESTJ: assertive, organized, results-oriented. Avoid ambiguous advice. Help them appreciate adaptability and collaboration while maintaining efficiency. Provide actionable exercises.`
      break
    case 'ESFJ':
      instructions = `You're an ESFJ psychologist. You excel at supporting ESFJs who overfocus on others. Think like an ESFJ: warm, caring, structured. Avoid abstract or detached approaches. Help them recognize personal needs, set boundaries, and balance caregiving with self-care. Offer concrete exercises.`
      break
    case 'ISTP':
      instructions = `You're an ISTP psychologist. You excel at guiding ISTPs who detach emotionally or avoid commitment. Think like an ISTP: logical, independent, hands-on. Avoid long or abstract advice. Help them communicate needs and solve problems practically while maintaining autonomy. Provide concrete exercises.`
      break
    case 'ISFP':
      instructions = `You're an ISFP psychologist. You excel at supporting ISFPs under stress. Think like an ISFP: gentle, creative, sensitive. Avoid confrontational or analytical advice. Help them express feelings, embrace individuality, and take meaningful actions. Provide step-by-step exercises.`
      break
    case 'ESTP':
      instructions = `You're an ESTP psychologist. You excel at guiding ESTPs who act impulsively. Think like an ESTP: energetic, adaptable, pragmatic. Avoid abstract or restrictive advice. Help them reflect, consider consequences, and develop strategies for growth. Provide practical, experiential exercises.`
      break
    case 'ESFP':
      instructions = `You're an ESFP psychologist. You excel at supporting ESFPs who avoid difficult feelings. Think like an ESFP: warm, spontaneous, expressive. Avoid rigid or theoretical advice. Help them face challenges, balance fun and responsibility, and take meaningful action. Provide concrete exercises and examples.`
      break
    default:
      instructions = `You're a skilled psychologist. Provide thoughtful, empathetic guidance tailored to the individual's needs.`
  }

  return `${instructions}\n\nStructure your response in Markdown: use a main title, subtitles, and bullet point lists. Provide a detailed analysis and a concrete action plan, point by point.\n\nIf the user input does not seem to be a psychological personal problem, explain that you are only designed to provide advice on psychological problems. Otherwise, respond provocatively, directly, and provide actionable steps, examples, or exercises adapted to the user's type without ever mentioning MBTI to them.`
}

function ChatInterface({userType}: {userType: string | null}) {
  const [messages, setMessages] = useState<Array<{text: string; isUser: boolean}>>([
    {
      text: "Hello! I'm here to provide therapeutic support tailored to your preferences. How are you feeling today? You can click one of the examples below or type your own message.",
      isUser: false,
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLocal, setIsLocal] = useState<boolean | null>(null)
  const [isCheckingLocal, setIsCheckingLocal] = useState(true)

  // Regular monitoring for local Ollama availability
  useEffect(() => {
    let isMounted = true

    const checkLocalOllama = async () => {
      if (!isMounted) return

      setIsCheckingLocal(true)
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 500) // 0.5 second timeout

        // Check if Ollama is running and has gpt-oss model loaded
        const psResponse = await fetch('http://localhost:11434/api/ps', {
          signal: controller.signal,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!psResponse.ok) {
          throw new Error(`Ollama not responding (status: ${psResponse.status})`)
        }

        const psData = await psResponse.json()

        // Check if gpt-oss model is currently running/loaded
        const hasGptOssRunning = psData.models?.some(
          (model: any) => model.name?.includes('gpt-oss') || model.name?.includes('gpt2')
        )

        if (!hasGptOssRunning) {
          throw new Error('gpt-oss model not currently loaded/running')
        }

        // Verify the model can actually be used by making a test call
        const testResponse = await fetch('http://localhost:11434/api/generate', {
          signal: controller.signal,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-oss:20b',
            prompt: 'test',
            stream: false,
            options: {num_predict: 1}, // Very short response
          }),
        })

        if (!testResponse.ok) {
          throw new Error(`Model test failed (status: ${testResponse.status})`)
        }

        clearTimeout(timeoutId)

        if (isMounted) {
          setIsLocal(true)
        }
      } catch (error) {
        if (isMounted) {
          setIsLocal(false)
        }
      } finally {
        if (isMounted) {
          setIsCheckingLocal(false)
        }
      }
    }

    // Initial check
    checkLocalOllama()

    // Regular monitoring every 5 seconds
    const interval = setInterval(checkLocalOllama, 5000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  const examplePrompts = [
    "I keep starting projects and getting excited about new ideas, but then I lose focus and jump to something else. My brain feels like it's constantly spinning with possibilities.",
    "I feel overwhelmed by all the possibilities in my life and don't know which direction to take. Everything seems equally interesting but also equally daunting.",
    "I'm struggling with routine tasks at work because they feel meaningless, but I know they're important. How can I stay motivated when things aren't intellectually stimulating?",
  ]

  const callGPT = async (userMessage: string) => {
    setIsLoading(true)
    let fullResponse = ''

    try {
      const systemInstruction = userType
        ? getSystemInstructionsFor(userType)
        : getSystemInstructionsFor('default')

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {role: 'system', content: systemInstruction},
            {role: 'user', content: userMessage},
          ],
          model: 'gpt-oss:20b',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('Response body is not readable')
      }

      // Add initial AI message to show streaming
      const newMessages = [
        ...messages,
        {text: userMessage, isUser: true},
        {text: '', isUser: false},
      ]
      setMessages(newMessages)

      while (true) {
        const {done, value} = await reader.read()

        if (done) break

        const chunk = decoder.decode(value, {stream: true})
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.trim()) {
            try {
              const parsed = JSON.parse(line.trim())
              if (parsed.response) {
                fullResponse += parsed.response

                // Update the last message with streaming content
                setMessages(prev => {
                  const updated = [...prev]
                  if (updated.length > 0 && !updated[updated.length - 1].isUser) {
                    updated[updated.length - 1] = {text: fullResponse, isUser: false}
                  }
                  return updated
                })
              }
              // Check if streaming is done
              if (parsed.done) {
                break
              }
            } catch (e) {
              // Ignore parsing errors for non-JSON lines
            }
          }
        }
      }

      // Update privacy status based on response headers
      const ollamaMode = response.headers.get('X-Ollama-Mode')
      if (ollamaMode && isLocal === null) {
        setIsLocal(ollamaMode === 'offline')
      }

      return fullResponse || 'No response generated.'
    } catch (error) {
      console.error('Error calling GPT:', error)
      return 'Error processing request.'
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim()
    if (!messageText) return
    if (isLoading) return

    setInputValue('')

    // Call GPT API with streaming
    await callGPT(messageText)
  }

  const handleExampleClick = (example: string) => {
    handleSendMessage(example)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className='flex flex-col h-full max-w-4xl mx-auto'>
      {/* Chat Header */}
      <div className='bg-white/5 backdrop-blur-md rounded-t-2xl border border-white/10 border-b-0 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-lg font-semibold text-foreground'>Therapeutic Chat</h2>
            <p className='text-sm text-foreground/70'>Your personalized support session</p>
          </div>
          <div className='flex items-center gap-2'>
            <>
              <div
                className={`w-2 h-2 rounded-full ${isLocal ? 'bg-green-500' : 'bg-orange-500'} ${
                  isCheckingLocal ? 'animate-pulse' : ''
                }`}></div>
              <span className={`text-xs ${isLocal ? 'text-green-400' : 'text-orange-400'}`}>
                {isLocal ? 'Local, 100% privacy' : 'Remote (Ollama turbo)'}
              </span>
            </>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className='flex-1 bg-white/5 backdrop-blur-md border border-white/10 border-t-0 border-b-0 p-4 overflow-y-auto min-h-96'>
        <div className='space-y-4'>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isUser
                    ? 'bg-primary text-white'
                    : 'bg-white/10 text-foreground border border-white/20'
                }`}>
                {message.isUser ? (
                  <p className='text-sm leading-relaxed'>{message.text}</p>
                ) : (
                  <div className='prose prose-invert max-w-none'>
                    <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                      {message.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className='flex justify-start'>
              <div className='bg-white/10 text-foreground border border-white/20 rounded-2xl px-4 py-3 max-w-xs lg:max-w-md'>
                <div className='flex items-center justify-center'>
                  <ThreeDotsWave />
                </div>
              </div>
            </div>
          )}

          {/* Example prompts - only show if there's only the initial message */}
          {messages.length === 1 && (
            <div className='space-y-3 mt-6'>
              <p className='text-sm text-foreground/60 text-center'>Try one of these examples:</p>
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(prompt)}
                  className='block w-full p-3 text-left bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-xl text-sm text-foreground/80 hover:text-foreground transition-all duration-200'>
                  &quot;{prompt}&quot;
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className='bg-white/5 backdrop-blur-md rounded-b-2xl border border-white/10 border-t-0 p-4'>
        <div className='flex gap-3'>
          <input
            type='text'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Type your message here...'
            className='flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50'
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className='px-6 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200'>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [onboardingComplete, setOnboardingComplete] = useState(() => {
    // Initialize as true if persisted data exists
    return !!Store.userTherapeuticStyle.get()
  })
  const [mbtiType, setMbtiType] = useState<string | null>(null)

  useEffect(() => {
    // Check if user has already completed onboarding
    const storedStyle = Store.userTherapeuticStyle.get()
    if (storedStyle) {
      setMbtiType(storedStyle)
      setOnboardingComplete(true)
    }
  }, [])

  const handleOnboardingComplete = (type: string) => {
    setMbtiType(type)
    setOnboardingComplete(true)
    Store.userTherapeuticStyle.set(type)
  }

  const handleResetOnboarding = () => {
    setOnboardingComplete(false)
    setMbtiType(null)
    Store.userTherapeuticStyle.set(null)
    Store.messages.set([])
  }

  if (!onboardingComplete) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <TherapeuticPreferences onComplete={handleOnboardingComplete} />
      </div>
    )
  }

  return (
    <div className='min-h-screen p-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-4 mb-4'>
            <h1 className='text-3xl font-bold text-foreground'>Welcome to Symbiossis</h1>
            {onboardingComplete && (
              <button
                onClick={handleResetOnboarding}
                className='px-3 py-1 text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-foreground/70 hover:text-foreground transition-all duration-200'>
                Reset Assessment
              </button>
            )}
          </div>
        </div>

        {/* Chat Interface */}
        <ChatInterface userType={mbtiType} />
      </div>
    </div>
  )
}
