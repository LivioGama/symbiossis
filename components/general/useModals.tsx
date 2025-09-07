/* https://gist.github.com/statico/c385705ce14106cd013d413560d98622
 * Usage:
 *   const { alert, confirm, prompt } = useModals()
 *   alert("Hey!") // awaitable too
 *   if (await confirm("Are you sure?")) ...
 *   const result = await prompt("Enter a URL", "http://")
 */
import {createContext, ReactNode, useCallback, useContext, useRef, useState} from 'react'
import Modal from '@/components/ui/modal'
import Button from '@/components/ui/button'

enum ModalType {
  Alert,
  Confirm,
  Prompt,
}

export type Modals = {
  alert: (message: string | ReactNode, opts?: ModalOpenerProps) => Promise<boolean | null>
  confirm: (message: string | ReactNode, opts?: ModalOpenerProps) => Promise<boolean | null>
  prompt: (
    message: string | ReactNode,
    opts?: ModalOpenerProps & {
      defaultValue?: string
    },
  ) => Promise<string | null>
}

export type ModalOpenerProps = {
  okText?: string
  cancelText?: string
  icon?: ReactNode
  modalProps?: Partial<React.ComponentProps<typeof Modal>>
  okButtonProps?: Partial<React.ComponentProps<typeof Button>>
  cancelButtonProps?: Partial<React.ComponentProps<typeof Button>>
}

const defaultContext: Modals = {
  alert: () => {
    throw new Error('<ModalProvider> is missing')
  },
  confirm: () => {
    throw new Error('<ModalProvider> is missing')
  },
  prompt: () => {
    throw new Error('<ModalProvider> is missing')
  },
}

const Context = createContext<Modals>(defaultContext)

interface AnyEvent {
  preventDefault(): void
}

export const ModalProvider = ({children}: {children: ReactNode}) => {
  const [modal, setModal] = useState<ReactNode | null>(null)
  const input = useRef<HTMLInputElement>(null)
  const ok = useRef<HTMLButtonElement>(null)

  const createOpener = useCallback(
    (type: ModalType) =>
      (message: string, opts: ModalOpenerProps & {defaultValue?: string} = {}) =>
        new Promise<boolean | string | undefined>(resolve => {
          const handleClose = (e?: AnyEvent) => {
            e?.preventDefault()
            setModal(null)
            resolve(undefined)
          }

          const handleCancel = (e?: AnyEvent) => {
            e?.preventDefault()
            setModal(null)
            if (type === ModalType.Prompt) {
              resolve(undefined)
            } else {
              resolve(false)
            }
          }

          const handleOK = (e?: AnyEvent) => {
            e?.preventDefault()
            setModal(null)
            if (type === ModalType.Prompt) {
              resolve(input.current?.value)
            } else {
              resolve(true)
            }
          }

          setModal(
            <div className='fixed inset-0 z-50 flex items-center justify-center'>
              <div className='absolute inset-0 bg-black bg-opacity-50' onClick={handleClose} />
              <div className='relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4'>
                <div className='p-6'>
                  <div className='flex gap-4 items-center'>
                    {opts.icon}
                    <div className='space-y-5 flex-1'>
                      <p>{message}</p>
                      {type === ModalType.Prompt && (
                        <input
                          ref={input}
                          defaultValue={opts.defaultValue}
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex justify-end gap-3 p-6 pt-0'>
                  {type !== ModalType.Alert && (
                    <button
                      className='px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      onClick={handleCancel}
                      {...opts.cancelButtonProps}>
                      {opts.cancelText ?? 'Cancel'}
                    </button>
                  )}
                  <button
                    ref={ok}
                    className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    onClick={handleOK}
                    {...opts.okButtonProps}>
                    {opts.okText ?? 'OK'}
                  </button>
                </div>
              </div>
            </div>,
          )
        }),
    [],
  )

  return (
    <Context.Provider
      value={
        {
          alert: createOpener(ModalType.Alert),
          confirm: createOpener(ModalType.Confirm),
          prompt: createOpener(ModalType.Prompt),
        } as Modals
      }>
      {children}
      {modal}
    </Context.Provider>
  )
}

const useModals = () => useContext(Context)

export default useModals
