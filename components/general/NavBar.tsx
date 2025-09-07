'use client'

import Store from '@/models/Store'
import {observer} from '@legendapp/state/react'
import {motion} from 'framer-motion'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'

import LearnMoreModal from '../LearnMoreModal'
import Link from 'next/link'

const NavBar = () => {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleHomeClick = () => {
    router.push('/')
  }

  const handleResetAssessment = () => {
    Store.userTherapeuticStyle.set(null)
    Store.messages.set([])
    // Optionally reload the page or navigate to home
    window.location.reload()
  }

  const hasPreferences = Store.userTherapeuticStyle.get()

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-transparent' : 'bg-transparent'
        }`}
        initial={{y: -100}}
        animate={{y: 0}}
        transition={{type: 'spring', stiffness: 100}}>
        <div className='container mx-auto px-6 py-4 flex items-center justify-between'>
          <motion.button
            onClick={handleHomeClick}
            className='flex items-center space-x-3 group cursor-pointer'
            whileHover={{scale: 1.02}}>
            <motion.div
              className='w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300'
              animate={{
                boxShadow: [
                  '0 0 15px rgba(0, 255, 255, 0.2)',
                  '0 0 25px rgba(0, 255, 255, 0.4)',
                  '0 0 15px rgba(0, 255, 255, 0.2)',
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
                width={40}
                height={40}
                className='w-full h-full object-cover rounded-full'
              />
            </motion.div>
            <motion.h1
              className='font-light tracking-[0.1em] text-sky-600 text-lg drop-shadow-sm'
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{delay: 0.5}}>
              symbiossis
            </motion.h1>
          </motion.button>

          <nav>
            <ul className='flex items-center space-x-4 md:space-x-8'>
              <li className='flex md:items-center'>
                <motion.div
                  whileHover={{scale: 1.05}}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.6}}>
                  <Link
                    href='/demo'
                    className='text-sm text-sky-600 hover:text-sky-600 font-semibold transition-colors duration-300 relative group cursor-pointer block leading-none'>
                    Demo
                    <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 group-hover:w-full transition-all duration-300' />
                  </Link>
                </motion.div>
              </li>
              <li className='hidden sm:flex md:items-center'>
                <motion.button
                  onClick={() => setIsLearnMoreOpen(true)}
                  className='text-sm text-sky-600 hover:text-sky-600 font-semibold transition-colors duration-300 relative group cursor-pointer block leading-none'
                  whileHover={{scale: 1.05}}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.7}}>
                  Privacy
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 group-hover:w-full transition-all duration-300' />
                </motion.button>
              </li>
              <li>
                {hasPreferences ? (
                  <motion.button
                    onClick={handleResetAssessment}
                    className='px-4 py-2 bg-sky-100/20 backdrop-blur-sm border border-sky-600/60 rounded-full text-sky-600 text-sm font-semibold hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all duration-300 cursor-pointer'
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.9}}>
                    Reset Assessment
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => {
                      router.push('/')
                      Store.triggerStartOnboarding()
                    }}
                    className='px-4 py-2 bg-sky-100/20 backdrop-blur-sm border border-sky-600/60 rounded-full text-sky-600 text-sm font-semibold hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all duration-300 cursor-pointer'
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.9,
                      scale: {duration: 0.5, times: [0, 0.5, 1]},
                      y: {duration: 0.5, times: [0, 0.5, 1]},
                    }}>
                    Get Started
                  </motion.button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </motion.header>

      <LearnMoreModal isOpen={isLearnMoreOpen} onClose={() => setIsLearnMoreOpen(false)} />
    </>
  )
}

export default observer(NavBar)
