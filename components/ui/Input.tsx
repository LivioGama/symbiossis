import {forwardRef, InputHTMLAttributes} from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({className = '', label, error, fullWidth = true, ...props}, ref) => {
    const inputClasses = `
    px-4 py-3 rounded-xl border bg-white transition-all
    focus:outline-none focus:ring-2 focus:ring-primary/30
    ${error ? 'border-red-400' : 'border-symbiossis-border'}
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `

    return (
      <div className={fullWidth ? 'w-full' : 'w-auto'}>
        {label && <label className='block text-sm font-medium mb-1.5'>{label}</label>}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <p className='mt-1.5 text-sm text-red-500'>{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
