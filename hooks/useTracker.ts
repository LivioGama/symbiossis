import {usePlausible} from 'next-plausible'

const useTracker = () => {
  const plausible = usePlausible()

  const track = (event: string, properties?: any) => {
    try {
      plausible(event, properties)
    } catch (e) {
      console.error(e)
    }
  }

  return {track}
}

export default useTracker
