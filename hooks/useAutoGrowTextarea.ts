import {useEffect, useRef} from 'react'

const useAutoGrowTextarea = (value: string, minHeight = 44, maxHeight = 200) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'

    const idealHeight = Math.min(textarea.scrollHeight, maxHeight)
    const finalHeight = Math.max(idealHeight, minHeight)

    textarea.style.height = `${finalHeight}px`

    if (textarea.scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto'
    } else {
      textarea.style.overflowY = 'hidden'
    }

    textarea.scrollTop = textarea.scrollHeight
  }, [value, minHeight, maxHeight])

  return textareaRef
}

export default useAutoGrowTextarea
