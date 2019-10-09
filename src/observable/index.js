import Vue from 'vue'

export const store = Vue.observable({
  money: 0,
  name: '小朱'
})

export const mutations = {
  setMoney(money) {
    store.money = money
  },
  changeName(name) {
    store.name = name
  }
}
