'use client'

import {ReactNode, useEffect} from 'react'
import {createPortal} from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, title, children, className = ''}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-neutral-900/50 backdrop-blur-sm' onClick={onClose} />

      {/* Modal content */}
      <div
        className={`relative bg-background border border-border rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Header */}
        {title && (
          <div className='flex items-center justify-between p-4 border-b border-border'>
            <h3 className='text-lg font-semibold text-foreground'>{title}</h3>
            <button
              onClick={onClose}
              className='text-foreground/60 hover:text-foreground transition-colors'>
              ✕
            </button>
          </div>
        )}

        {/* Body */}
        <div className='p-4'>{children}</div>
      </div>
    </div>,
    document.body,
  )
}

export default Modal
