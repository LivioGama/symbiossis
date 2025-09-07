'use client'

import {useState, useEffect} from 'react'

const ConnectionStatus = () => {
  const [isOffline, setIsOffline] = useState(true)
  const [userNotified, setUserNotified] = useState(false)

  useEffect(() => {
    const checkConnectionStatus = async () => {
      try {
        const response = await fetch('/api/completion/status')
        const mode = response.headers.get('X-Ollama-Mode')
        const newIsOffline = mode === 'offline'

        // Show notification when switching to online mode
        if (!newIsOffline && !userNotified && isOffline !== newIsOffline) {
          // You can integrate with your toast system here
          console.log('🌐 Switched to Ollama Turbo for enhanced performance')
          setUserNotified(true)
        }

        setIsOffline(newIsOffline)
      } catch (error) {
        setIsOffline(true)
      }
    }

    // Check status on mount and periodically
    checkConnectionStatus()
    const interval = setInterval(checkConnectionStatus, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [isOffline, userNotified])

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
        isOffline
          ? 'bg-green-100 text-green-800 border border-green-200'
          : 'bg-blue-100 text-blue-800 border border-blue-200'
      }`}>
      <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-green-500' : 'bg-blue-500'}`} />
      {isOffline ? '🔒 Private (Offline)' : '🌐 Enhanced (Online Turbo)'}
    </div>
  )
}

export default ConnectionStatus
