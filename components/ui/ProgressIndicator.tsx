'use client'

import {motion} from 'framer-motion'

interface ProgressIndicatorProps {
  current: number
  total: number
  className?: string
  showPercentage?: boolean
  variant?: 'default' | 'gradient' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
  className = '',
  showPercentage = true,
  variant = 'default',
  size = 'md',
}) => {
  const progress = (current / total) * 100
  const isComplete = current >= total

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  const variantClasses = {
    default: 'bg-white/20',
    gradient: 'bg-white/10',
    minimal: 'bg-transparent',
  }

  const indicatorVariants = {
    default: 'bg-gradient-to-r from-sky-600 to-sky-900',
    gradient: 'bg-gradient-to-r from-sky-600 via-sky-900 to-purple-500',
    minimal: 'bg-foreground/60',
  }

  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm text-foreground/60'>
            Step {current} of {total}
          </span>
          <span className='text-sm text-foreground/60'>{Math.round(progress)}%</span>
        </div>
      )}
      <div
        className={`w-full ${variantClasses[variant]} rounded-full ${sizeClasses[size]} overflow-hidden`}>
        <motion.div
          className={`h-full ${indicatorVariants[variant]} ${isComplete ? 'rounded-full' : ''}`}
          initial={{width: 0}}
          animate={{width: `${progress}%`}}
          transition={{type: 'spring', stiffness: 100, damping: 15}}
        />
      </div>
    </div>
  )
}

export default ProgressIndicator
