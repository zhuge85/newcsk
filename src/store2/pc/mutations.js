import types from './types'
const mutations = {
  [types.PC_SET_USER](state, user) {
    if (user) {
      state.user = user
    } else {
      state.user = null
    }
  }
}
export default mutations
