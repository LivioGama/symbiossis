import {ButtonHTMLAttributes, forwardRef} from 'react'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50'

    const variantClasses = {
      primary:
        'bg-gradient-to-r from-primary-lavender to-primary-ocean text-white shadow-soft hover:shadow-glow',
      outline: 'border border-symbiossis-border bg-white text-symbiossis-text hover:bg-accent-glow',
      ghost: 'bg-transparent text-symbiossis-text hover:bg-accent-glow/50',
    }

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg',
    }

    const widthClass = fullWidth ? 'w-full' : ''
    const disabledClass = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`

    return (
      <button ref={ref} disabled={disabled || isLoading} className={classes} {...props}>
        {isLoading ? (
          <div className='flex items-center'>
            <div className='w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2' />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
