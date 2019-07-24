const types = {
  SET_USER: 'SET_USER'
}
const state = {
  user: 'modules xiaozhu'
}
const getters = {
  user2: state => state.user
}
const mutations = {
  [types.SET_USER](state, user) {
    if (user) {
      state.user = user
    } else {
      state.user = null
    }
  }
}
const actions = {
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  alertName({ state }) {
    alert(state.user)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
