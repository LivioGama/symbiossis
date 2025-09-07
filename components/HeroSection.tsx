'use client'

import AnimatedButton from '@/components/ui/AnimatedButton'
import {AnimatePresence, motion} from 'framer-motion'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {FaArrowRight} from 'react-icons/fa'
import AnimatedBackground from './animations/AnimatedBackground'
import FloatingParticles from './animations/FloatingParticles'
import OrbitalSystem from './animations/OrbitalSystem'
import LearnMoreModal from './LearnMoreModal'

interface HeroSectionProps {
  onGetStarted?: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({onGetStarted}) => {
  const [mounted, setMounted] = useState(false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {opacity: 0, y: 30},
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const letterVariants = {
    hidden: {opacity: 0, y: 50},
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  }

  const text = 'symbiossis'

  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Orbital System */}
      <OrbitalSystem />

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-blue-200/20' />

      {/* Main Content */}
      <AnimatePresence>
        {mounted && (
          <motion.div
            className='relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto'
            variants={containerVariants}
            initial='hidden'
            animate='visible'>
            {/* Logo/Brand */}
            <motion.div
              className='mb-8 flex justify-center'
              variants={itemVariants}
              transition={{duration: 0.5, ease: 'easeOut'}}>
              <div className='relative'>
                <motion.div
                  className='w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden'
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 255, 255, 0.3)',
                      '0 0 40px rgba(0, 255, 255, 0.5)',
                      '0 0 20px rgba(0, 255, 255, 0.3)',
                    ],
                  }}
                  transition={{
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}>
                  <Image
                    src='/logo_square.webp'
                    alt='Symbiossis Logo'
                    width={120}
                    height={120}
                    className='w-full h-full object-cover rounded-full'
                  />
                </motion.div>

                {/* Cyan accent dot */}
                <motion.div
                  className='absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full'
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-6 tracking-wider'
              style={{textShadow: '0 2px 4px rgba(0,0,0,0.4)'}}
              variants={itemVariants}
              transition={{duration: 0.5, ease: 'easeOut'}}>
              {text.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  className='inline-block hover:text-cyan-300 transition-colors duration-300 cursor-pointer'
                  whileHover={{
                    y: -10,
                    transition: {type: 'spring', stiffness: 400},
                  }}>
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              className='relative mb-12 px-4'
              variants={itemVariants}
              transition={{duration: 0.5, ease: 'easeOut'}}>
              <motion.p
                className='text-lg sm:text-xl md:text-2xl font-bold leading-relaxed'
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 35%, rgba(255, 255, 255, 0.8) 38%, rgba(59, 130, 246, 0.9) 42%, rgba(59, 130, 246, 0.9) 58%, rgba(255, 255, 255, 0.8) 62%, rgba(255, 255, 255, 1) 65%, rgba(255, 255, 255, 1) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  backgroundSize: '150% 100%',
                  animation: 'textGradient 3s linear infinite',
                  textShadow: '0 0 10px rgba(255,255,255,0.3)',
                }}>
                Discover yourself through AI-powered reflection
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className='flex flex-col sm:flex-row gap-4 justify-center items-center'
              variants={itemVariants}
              transition={{duration: 0.5, ease: 'easeOut'}}>
              <AnimatedButton
                onClick={onGetStarted}
                variant='primary'
                size='md'
                className='font-semibold px-5 cursor-pointer'
                icon={<FaArrowRight className='ml-2' />}>
                Begin Journey
              </AnimatedButton>

              <motion.button
                onClick={() => setIsLearnMoreOpen(true)}
                className='px-7 py-3.5 bg-sky-100/20 backdrop-blur-sm border border-sky-600/60 rounded-full text-sky-600 font-medium hover:bg-sky-600 hover:text-white hover:border-sky-900 transition-all duration-300 cursor-pointer'
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}>
                Learn More
              </motion.button>
            </motion.div>

            {/* Corner Star */}
            <motion.div
              className='absolute bottom-8 right-8 text-white/40'
              variants={itemVariants}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                rotate: {duration: 20, repeat: Infinity, ease: 'linear'},
                scale: {duration: 4, repeat: Infinity, ease: 'easeInOut'},
              }}>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learn More Modal */}
      <LearnMoreModal isOpen={isLearnMoreOpen} onClose={() => setIsLearnMoreOpen(false)} />
    </div>
  )
}

export default HeroSection
