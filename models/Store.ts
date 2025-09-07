import {observable} from '@legendapp/state'
import {enable$GetSet} from '@legendapp/state/config/enable$GetSet'
import {ObservablePersistLocalStorage} from '@legendapp/state/persist-plugins/local-storage'
import {configureSynced, syncObservable} from '@legendapp/state/sync'

enable$GetSet()

const syncPlugin = configureSynced({
  persist: {
    plugin: ObservablePersistLocalStorage,
  },
})

const messages = observable<any[]>([])
const userTherapeuticStyle = observable<string | null>(null)
const startOnboardingTrigger = observable(false)

const Store = {
  messages,
  userTherapeuticStyle,
  startOnboardingTrigger,
  resetMessages: () => {
    messages.$ = []
  },
  triggerStartOnboarding: () => {
    startOnboardingTrigger.$ = true
    setTimeout(() => (startOnboardingTrigger.$ = false), 1500)
  },
}

export default Store

syncObservable(messages, syncPlugin({persist: {name: 'messages'}}))
syncObservable(userTherapeuticStyle, syncPlugin({persist: {name: 'userTherapeuticStyle'}}))
