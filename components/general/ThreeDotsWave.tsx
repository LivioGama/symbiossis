'use client'
import {motion} from 'framer-motion'

const ThreeDotsWave = () => (
  <div className='flex items-center gap-1'>
    <motion.div
      className='w-3 h-3 rounded-full'
      style={{backgroundColor: '#0084d1'}}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
    <motion.div
      className='w-3 h-3 rounded-full'
      style={{backgroundColor: '#0084d1'}}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 0.2,
      }}
    />
    <motion.div
      className='w-3 h-3 rounded-full'
      style={{backgroundColor: '#0084d1'}}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 0.4,
      }}
    />
  </div>
)

export default ThreeDotsWave
