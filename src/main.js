import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from './axios'
Vue.prototype.$axios = axios

import {
  Button,
  Select,
  Option,
  Container,
  Header,
  Main,
  Footer,
  Form,
  FormItem,
  Input,
  Message,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Table,
  TableColumn,
  Popover,
  Dialog,
  Pagination,
  DatePicker,
  Loading
} from 'element-ui'
// 注册后即可使用
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Loading)

Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
