import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import User from './modules/user.store'
export interface State {
  [key: string]: any
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    ...User.state
  },
  mutations: {
    ...User.mutations
  },
  actions: {
    ...User.actions
  },
  modules: {}
})

export function useStore() {
  return baseUseStore(key)
}
