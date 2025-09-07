import {FC} from 'react'

interface OllamaStatusProps {
  isLocal: boolean | null
  isCheckingLocal: boolean
}

export const OllamaStatus: FC<OllamaStatusProps> = ({isLocal, isCheckingLocal}) => (
  <div className='flex items-center gap-3'>
    <div
      className={`w-3 h-3 rounded-full ${
        isLocal ? 'bg-green-500' : 'bg-amber-500'
      } ${isCheckingLocal ? 'animate-pulse' : ''}`}
    />
    <span className={`text-xs font-semibold ${isLocal ? 'text-green-600' : 'text-amber-600'}`}>
      {isLocal ? 'Local (100% privacy)' : 'Remote (Ollama turbo)'}
    </span>
  </div>
)
