import {observable} from '@legendapp/state'
import {ObservablePersistLocalStorage} from '@legendapp/state/persist-plugins/local-storage'
import {configureSynced, syncObservable} from '@legendapp/state/sync'
import {enable$GetSet} from '@legendapp/state/config/enable$GetSet'

enable$GetSet()

const syncPlugin = configureSynced({
  persist: {
    plugin: ObservablePersistLocalStorage,
  },
})

const messages = observable<any[]>([])
const userTherapeuticStyle = observable<string | null>(null)

const Store = {
  messages,
  userTherapeuticStyle,
  resetMessages: () => {
    messages.$ = []
  },
}

export default Store

syncObservable(messages, syncPlugin({persist: {name: 'messages'}}))
syncObservable(userTherapeuticStyle, syncPlugin({persist: {name: 'userTherapeuticStyle'}}))
