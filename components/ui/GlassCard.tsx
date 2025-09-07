'use client'

import {ReactNode} from 'react'
import {motion} from 'framer-motion'

interface GlassCardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'accent'
  animated?: boolean
  hoverEffect?: boolean
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  padding = 'md',
  variant = 'default',
  animated = true,
  hoverEffect = true,
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }

  const variantClasses = {
    default: 'bg-neutral-50/60 backdrop-blur-xl shadow-xl',
    primary: 'bg-primary-50/70 backdrop-blur-xl shadow-xl',
    accent: 'bg-accent-cyan/10 backdrop-blur-xl shadow-xl',
  }

  const Component = animated ? motion.div : 'div'

  return (
    <Component
      className={`
        rounded-2xl
        ${paddingClasses[padding]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...(animated &&
        hoverEffect && {
          whileHover: {scale: 1.02, y: -2},
          whileTap: {scale: 0.98},
        })}
      {...(animated && {
        initial: {opacity: 0, y: 20},
        animate: {opacity: 1, y: 0},
        transition: {type: 'spring', stiffness: 100, damping: 15},
      })}>
      {children}
    </Component>
  )
}

export default GlassCard
