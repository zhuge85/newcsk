import types from './types'

const actions = {
  setToken: ({ commit }, token) => {
    commit(types.SET_TOKEN, token)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  }
}
export default actions
