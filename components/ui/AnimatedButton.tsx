'use client'

import {motion} from 'framer-motion'
import {ButtonHTMLAttributes, FC, ReactNode} from 'react'

interface AnimatedButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  icon?: ReactNode
}

const AnimatedButton: FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false,
  icon,
}) => {
  const baseClasses =
    'relative overflow-hidden rounded-xl font-medium transition-all duration-300 focus:outline-none'

  const variantClasses = {
    primary:
      'bg-sky-600 text-white border-0 hover:bg-sky-900 shadow-lg hover:shadow-xl active:!bg-sky-900 active:shadow-md transition-all duration-200',
    glass:
      'bg-gradient-to-r from-blue-600/40 to-blue-700/50 text-blue-50 hover:from-blue-700/50 hover:to-blue-800/60 backdrop-blur-sm shadow-xl hover:shadow-2xl',
    secondary:
      'bg-neutral-100 text-neutral-700 border-0 hover:bg-neutral-200 shadow-sm hover:shadow-md',
    accent: 'bg-accent-cyan text-white border-0 hover:bg-accent-cyan/90 shadow-lg hover:shadow-xl',
  }

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm font-semibold tracking-wide',
    md: 'px-7 py-3.5 text-base font-semibold tracking-wide',
    lg: 'px-9 py-4.5 text-lg font-bold tracking-wide',
  }

  const hasCustomPadding =
    className.includes('!px-') || className.includes('p-0') || className.includes('!p-')

  const stateClasses =
    disabled || loading
      ? 'opacity-60 cursor-not-allowed grayscale'
      : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5 active:translate-y-0'

  const widthClasses = fullWidth ? 'w-full' : ''

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${hasCustomPadding ? '' : sizeClasses[size]}
        ${stateClasses}
        ${widthClasses}
        ${className}
      `}
      whileHover={!disabled && !loading ? {y: -1} : {}}
      whileTap={!disabled && !loading ? {scale: 0.98, y: 0} : {}}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{type: 'spring', stiffness: 300, damping: 20}}>
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-xl'
        initial={{x: '-100%'}}
        animate={loading ? {x: '100%'} : {x: '-100%'}}
        transition={{duration: 2, repeat: loading ? Infinity : 0, ease: 'easeInOut'}}
      />

      <div className='relative z-10 flex items-center justify-center'>
        {loading && (
          <motion.div
            animate={{rotate: 360}}
            transition={{duration: 0.8, repeat: Infinity, ease: 'linear'}}
            className='w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full'
          />
        )}
        <span className='select-none'>{children}</span>
        {icon && <span className='flex-shrink-0 sm:ml-2'>{icon}</span>}
      </div>
    </motion.button>
  )
}

export default AnimatedButton
