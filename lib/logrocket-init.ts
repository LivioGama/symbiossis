import LogRocket from 'logrocket'

export const initLogRocket = () => {
  if (typeof window !== 'undefined') {
    LogRocket.init('symbiossis/symbiossis')
  }
}

