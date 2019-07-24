import types from './types'
const mutations = {
  //
  [types.SET_TOKEN](state, token) {
    if (token) {
      state.token = token
    } else {
      state.token = null
    }
  },
  //
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user
    } else {
      state.user = null
    }
  },
  [types.SET_NEWANIMATION](state, newAnimation) {
    if (newAnimation) {
      state.newAnimation = newAnimation
    } else {
      state.newAnimation = {}
    }
  }
}
export default mutations
