import types from './types'

const actions = {
  MBSetUser: ({ commit }, user) => {
    commit(types.MB_SET_USER, user)
  }
}
export default actions
