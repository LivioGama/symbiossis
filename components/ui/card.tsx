import {HTMLAttributes, ReactNode} from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'outline'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  ...props
}: CardProps) => {
  const baseClasses = 'rounded-2xl bg-white transition-all duration-200'

  const variantClasses = {
    default: 'shadow-soft border border-symbiossis-border',
    elevated: 'shadow-glow border border-primary-lavender/20',
    outline: 'border border-symbiossis-border',
  }

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

const CardHeader = ({children, className = '', ...props}: CardHeaderProps) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
)

type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode
}

const CardTitle = ({children, className = '', ...props}: CardTitleProps) => (
  <h3 className={`text-xl font-medium tracking-wide ${className}`} {...props}>
    {children}
  </h3>
)

type CardContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

const CardContent = ({children, className = '', ...props}: CardContentProps) => (
  <div className={className} {...props}>
    {children}
  </div>
)

type CardFooterProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

const CardFooter = ({children, className = '', ...props}: CardFooterProps) => (
  <div className={`mt-4 pt-4 border-t border-symbiossis-border ${className}`} {...props}>
    {children}
  </div>
)

export {Card, CardContent, CardFooter, CardHeader, CardTitle}
