type LoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
  color?: 'lavender' | 'ocean' | 'sage' | 'rose' | 'white'
}

const LoadingSpinner = ({size = 'md', color = 'lavender'}: LoadingSpinnerProps) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const colorClass = {
    lavender: 'border-primary-lavender',
    ocean: 'border-primary-ocean',
    sage: 'border-primary-sage',
    rose: 'border-primary-rose',
    white: 'border-white',
  }

  return (
    <div className='flex items-center justify-center'>
      <div
        className={`
          ${sizeClass[size]} 
          ${colorClass[color]} 
          animate-spin rounded-full border-2 border-t-transparent
        `}
      />
    </div>
  )
}

export default LoadingSpinner
