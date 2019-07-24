import Vue from 'vue'
import Vuex from 'vuex'
import getter from './getters'
import mutation from './mutations'
import action from './actions'

import xiaozhu from './modules/xiaozhu'

Vue.use(Vuex)

const state = {
  user: 'vuex state',
  token: '',
  newAnimation: {}
}
const getters = {
  ...getter
}
const mutations = {
  ...mutation
}
const actions = {
  ...action
}
const store = new Vuex.Store({
  //全局Store对象
  state,
  getters,
  mutations,
  actions,
  //模块
  modules: {
    xiaozhu
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
