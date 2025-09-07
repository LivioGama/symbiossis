import axios from 'axios'
import {useEffect, useState} from 'react'

export const useOllamaStatus = () => {
  const [isLocal, setIsLocal] = useState<boolean | null>(null)
  const [isCheckingLocal, setIsCheckingLocal] = useState(true)
  const [previousIsLocal, setPreviousIsLocal] = useState<boolean | null>(null)

  useEffect(() => {
    let isFirst = true
    const checkLocal = async () => {
      try {
        const response = await axios.get('http://localhost:11434/api/ps')
        const hasModels = response.data.models && response.data.models.length > 0
        if (hasModels !== previousIsLocal) {
          console.log(`Ollama status: ${hasModels ? 'local 🔒' : 'remote 🌐'}`)
          setPreviousIsLocal(hasModels)
        }
        setIsLocal(hasModels)
      } catch {
        if (previousIsLocal !== false) {
          console.log('Local Ollama check failed, marking as unavailable')
          setPreviousIsLocal(false)
        }
        setIsLocal(false)
      }
      if (isFirst) {
        setIsCheckingLocal(false)
        isFirst = false
      }
    }
    checkLocal()
    const interval = setInterval(checkLocal, 5000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isLocal,
    isCheckingLocal,
  }
}
