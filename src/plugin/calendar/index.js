import Vue from 'vue'
import Tem from './Tem'

let calendar = (options = {}) => {
  let calendarConstructor = Vue.extend(Tem)
  let instance = new calendarConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
  // 将单个 confirm instance 的配置合并到默认值中
  Object.assign(instance.$data, options)
  return new Promise((resolve, reject) => {
    instance.show = true
    let selectBtn = instance.selectBtn
    let cancelBtn = instance.cancelBtn
    instance.selectBtn = () => {
      resolve(options.time)
      selectBtn()
    }
    instance.cancelBtn = () => {
      reject()
      cancelBtn()
    }
  })
}

export default function(Vue) {
  // 添加全局API
  Vue.prototype.$calendar = calendar
}

// 调用方法  引入 calendar

// 原型调用
// import calendar from './plugins/calendar/'
// Vue.use(calendar)
// this.$calendar({
//   title: '温馨提示',
//   cancel: '取消按钮',
//   confirm: '确定按钮',
//   content: '',
//   className: 'classname'
// }).then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log("点击取消");
// })
