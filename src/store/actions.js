import types from './types'

const actions = {
  setToken: ({ commit }, token) => {
    commit(types.SET_TOKEN, token)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  setNewAnimation: ({ commit }, newAnimation) => {
    commit(types.SET_NEWANIMATION, newAnimation)
  }
}
export default actions
