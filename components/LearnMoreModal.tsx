'use client'

import {AnimatePresence, motion} from 'framer-motion'
import Image from 'next/image'
import {FC} from 'react'
import {FaTimes} from 'react-icons/fa'

interface LearnMoreModalProps {
  isOpen: boolean
  onClose: () => void
}

const LearnMoreModal: FC<LearnMoreModalProps> = ({isOpen, onClose}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          onClick={onClose}
          className='fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-[60]'
        />

        {/* Modal */}
        <motion.div
          initial={{opacity: 0, scale: 0.95}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.95}}
          transition={{type: 'spring', stiffness: 300, damping: 30}}
          className='fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-[60] overflow-hidden'>
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b border-neutral-200'>
            <h1 className='text-2xl font-bold text-neutral-700'>Learn More About Symbiossis</h1>
            <button
              onClick={onClose}
              className='p-2 hover:bg-neutral-100 rounded-lg transition-colors'>
              <FaTimes className='text-neutral-600' />
            </button>
          </div>

          {/* Content */}
          <div className='p-6 max-h-[calc(100vh-120px)] overflow-y-auto'>
            <div className='max-w-4xl mx-auto space-y-6'>
              <section>
                <h2 className='text-xl font-semibold mb-3 text-neutral-700'>What is Symbiossis?</h2>
                <div className='flex flex-col md:flex-row gap-6 items-center'>
                  <div className='flex-1'>
                    <p className='text-neutral-700 leading-relaxed'>
                      Symbiossis is an AI-powered therapeutic companion designed to provide
                      personalized mental health support. Our platform adapts to your unique
                      communication style and therapeutic preferences, offering a safe space for
                      self-reflection and emotional growth.
                    </p>
                  </div>
                  <div className='flex-shrink-0'>
                    <Image
                      src='/hero.webp'
                      alt='Symbiossis Hero'
                      width={192}
                      height={128}
                      className='w-48 h-32 rounded-lg shadow-lg object-cover'
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3 text-neutral-700'>How It Works</h2>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='bg-neutral-50 p-4 rounded-lg'>
                    <h3 className='font-semibold text-neutral-700 mb-2'>Personalized Assessment</h3>
                    <p className='text-neutral-600 text-sm'>
                      Start with our therapeutic preferences quiz to help us understand your unique
                      needs and communication style.
                    </p>
                  </div>
                  <div className='bg-neutral-50 p-4 rounded-lg'>
                    <h3 className='font-semibold text-neutral-700 mb-2'>
                      AI-Powered Conversations
                    </h3>
                    <p className='text-neutral-600 text-sm'>
                      Engage in meaningful conversations with our AI therapist that adapts to your
                      therapeutic approach preferences.
                    </p>
                  </div>
                  <div className='bg-neutral-50 p-4 rounded-lg'>
                    <h3 className='font-semibold text-neutral-700 mb-2'>Privacy First</h3>
                    <p className='text-neutral-600 text-sm'>
                      Your conversations are processed locally when possible, or seamlessly relayed
                      to remote Ollama Turbo servers for optimal performance, ensuring maximum
                      privacy and data security.
                    </p>
                  </div>
                  <div className='bg-neutral-50 p-4 rounded-lg'>
                    <h3 className='font-semibold text-neutral-700 mb-2'>Continuous Learning</h3>
                    <p className='text-neutral-600 text-sm'>
                      Our AI learns from interactions to provide increasingly personalized and
                      supportive responses.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3 text-neutral-700'>
                  Remote AI Processing with Ollama Turbo
                </h2>
                <div className='flex flex-col md:flex-row gap-6 items-center'>
                  <div className='flex-1'>
                    <p className='text-neutral-700 leading-relaxed mb-4'>
                      Symbiossis leverages Ollama Turbo, a powerful remote AI service that runs on
                      datacenter-grade hardware. This allows for faster, more efficient processing
                      of your therapeutic conversations without straining your local device.
                    </p>
                    <ul className='space-y-2 text-neutral-700'>
                      <li className='flex items-start gap-3'>
                        <div className='w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0' />
                        <span>Seamless remote relay for enhanced performance</span>
                      </li>
                      <li className='flex items-start gap-3'>
                        <div className='w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0' />
                        <span>
                          Access to advanced AI models without local hardware requirements
                        </span>
                      </li>
                      <li className='flex items-start gap-3'>
                        <div className='w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0' />
                        <span>Maintains privacy while optimizing response times</span>
                      </li>
                    </ul>
                  </div>
                  <div className='flex-shrink-0'>
                    <Image
                      src='/logo_square.webp'
                      alt='Ollama Turbo Integration'
                      width={128}
                      height={128}
                      className='w-32 h-32 rounded-lg shadow-lg'
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3 text-neutral-700'>Privacy & Security</h2>
                <p className='text-neutral-700 leading-relaxed mb-4'>
                  Your privacy is our top priority. Here&apos;s how we protect your information:
                </p>
                <ul className='space-y-2 text-neutral-700'>
                  <li className='flex items-start gap-3'>
                    <div className='w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0' />
                    <span>Local processing when available for maximum privacy</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <div className='w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0' />
                    <span>
                      Your profile is stored locally in the browser&#39;s localStorage for future
                      sessions
                    </span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <div className='w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0' />
                    <span>No personal data transmitted or stored on external servers</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <div className='w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0' />
                    <span>Anonymous usage analytics only</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <div className='w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0' />
                    <span>Open source and transparent architecture</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3 text-neutral-700'>
                  Therapeutic Approaches
                </h2>
                <p className='text-neutral-700 leading-relaxed mb-4'>
                  Symbiossis supports various therapeutic approaches to match your preferences:
                </p>
                <div className='grid md:grid-cols-3 gap-4'>
                  {[
                    {
                      name: 'Cognitive Behavioral',
                      desc: 'Focus on thought patterns and behaviors',
                    },
                    {name: 'Mindfulness-Based', desc: 'Present-moment awareness and acceptance'},
                    {name: 'Humanistic', desc: 'Personal growth and self-actualization'},
                    {name: 'Solution-Focused', desc: 'Goal-oriented problem solving'},
                    {name: 'Person-Centered', desc: 'Empathetic and non-judgmental support'},
                    {name: 'Motivational', desc: 'Building motivation and commitment'},
                  ].map((approach, index) => (
                    <div
                      key={index}
                      className='text-center p-3 border border-neutral-200 rounded-lg'>
                      <h4 className='font-medium text-neutral-700 mb-1'>{approach.name}</h4>
                      <p className='text-xs text-neutral-600'>{approach.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3 text-neutral-700'>Getting Started</h2>
                <div className='bg-primary-50 p-4 rounded-lg border border-neutral-200'>
                  <p className='text-neutral-700 mb-3'>
                    Ready to begin your therapeutic journey? Here&apos;s how to get started:
                  </p>
                  <ol className='list-decimal list-inside space-y-1 text-neutral-700 text-sm'>
                    <li>Take our therapeutic preferences assessment</li>
                    <li>Choose your preferred communication style</li>
                    <li>Start your first conversation</li>
                    <li>Explore different therapeutic approaches</li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className='text-xl font-semibold mb-3 text-neutral-700'>Hackathon Context</h2>
                <p className='text-neutral-700 leading-relaxed'>
                  Symbiossis was developed as part of the OpenAI Devpost Hackathon, showcasing
                  innovative applications of AI for mental health and wellness.
                </p>
              </section>

              <section className='text-center pt-4 border-t border-neutral-200'>
                <p className='text-neutral-600 mb-4'>Have questions? We&apos;re here to help.</p>
                <a
                  href='mailto:contact@anbiti.me'
                  className='inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors'>
                  Contact Us
                </a>
              </section>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

export default LearnMoreModal
