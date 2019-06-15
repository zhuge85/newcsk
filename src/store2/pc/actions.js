import types from './types'

const actions = {
  PCSetUser: ({ commit }, user) => {
    commit(types.PC_SET_USER, user)
  }
}
export default actions
