import Vue from 'vue'
import Vuex from 'vuex'
import pcstate from './pc/state'
import pcgetters from './pc/getters'
import pcmutations from './pc/mutations'
import pcactions from './pc/actions'
import mbstate from './mb/state'
import mbgetters from './mb/getters'
import mbmutations from './mb/mutations'
import mbactions from './mb/actions'

Vue.use(Vuex)
const types = {
  SET_TOKEN: null
}
const state = {
  ...pcstate,
  ...mbstate,
  token: ''
}
const getters = {
  ...pcgetters,
  ...mbgetters,
  token: state => state.token
}
const mutations = {
  ...pcmutations,
  ...mbmutations,
  [types.SET_TOKEN](state, token) {
    if (token) {
      state.token = token
    } else {
      state.token = null
    }
  }
}
const actions = {
  ...pcactions,
  ...mbactions,
  setToken: ({ commit }, token) => {
    commit(types.SET_TOKEN, token)
  }
}
const store = new Vuex.Store({
  //全局Store对象
  state,
  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})

export default store
