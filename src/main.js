import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入axios
import axios from './axios'
Vue.prototype.$axios = axios

// 引入ajax
import $ from './ajax'
Vue.prototype.$http = $

process.env.NODE_ENV == 'development' && require('./mock/')

// 导入代码高亮文件
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

// 自定义一个代码高亮指令
Vue.directive('highlight', function(el) {
  let blocks = el.querySelectorAll('pre code')
  // setTimeout(() => {
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  })
  // }, 10)
})

// import {
//   Button,
//   Select,
//   Option,
//   Container,
//   Header,
//   Main,
//   Footer,
//   Form,
//   FormItem,
//   Input,
//   Message,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Menu,
//   Submenu,
//   MenuItem,
//   Table,
//   TableColumn,
//   Popover,
//   Dialog,
//   Pagination,
//   DatePicker,
//   Loading
// } from 'element-ui'
// // 注册后即可使用
// Vue.use(Button)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Main)
// Vue.use(Footer)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Popover)
// Vue.use(Dialog)
// Vue.use(Pagination)
// Vue.use(DatePicker)
// Vue.use(Loading)

// Vue.prototype.$message = Message

import calendar from './plugin/calendar'
Vue.use(calendar)

// 引入 Message
import Message from './plugin/message'
Vue.prototype.$message = Message.install

// 引入 Toast
import Toast from './plugin/toast/'
// Vue.use(Toast)
Vue.prototype.$toast = Toast.showToast

// Loading
import Loading from './plugin/loading'
Vue.use(Loading)

// 引入 Msgbox
import Msgbox from './plugin/msgbox'
Vue.use(Msgbox)

// 引入 Dialog
import Dialog from './plugin/dialog'
Vue.use(Dialog)

import './assets/css/basic.less'
import './assets/css/style.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
