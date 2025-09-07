'use client'
import {cn} from '@/lib/utils'
import {SingleChildrenProps} from 'models/interfaces'

export const MyContainer = ({
  children,
  className,
  ...props
}: SingleChildrenProps & {className?: string}) => {
  return (
    <div className={cn('flex flex-col items-center p-5 pb-10 md:pb-5 w-full', className)}>
      {children}
    </div>
  )
}
