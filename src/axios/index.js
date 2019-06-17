/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */

import axios from 'axios'
import router from '../router'
// import store from '../store'
import md5 from 'js-md5'
import Qs from 'qs'
import { Message } from 'element-ui'

// 限制post快速点击
let requestingArr = []
let limitTime = 2000
let requestingId = ''

// 取消重复点击的操作
let pending = []
let cancelToken = axios.CancelToken

const LimitRapidClick = config => {
  if (config.method === 'post') {
    requestingId = md5.hex(JSON.stringify(config.data))
    let nowTime = new Date().getTime()
    requestingArr = requestingArr.filter(item => {
      return item.startTime + limitTime > nowTime
    })
    // console.log(requestingArr)
    let sessionUrl = requestingArr.map(item => {
      return item.requestingId === requestingId
    })
    if (sessionUrl.length > 0) {
      Message.error('请求重复 中断请求!')
      return new Error('请求重复 中断请求!')
      config.cancelToken = new cancelToken(c => {
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: config.url + '&' + config.method, f: c })
      })
    }
    let item = {
      requestingId: requestingId,
      startTime: nowTime
    }
    requestingArr.push(item)
  }
}

const transUrl = config => {
  return (
    [
      config.method === 'get'
        ? config.url + encodeURIComponent(JSON.stringify(config.params))
        : config.url + encodeURIComponent(JSON.stringify(config.data))
    ] + config.method
  )
}
const removePending = url => {
  // pending.push({ u: url + '&' + config.method, f: c })
  for (let p in pending) {
    if (pending[p].u === url) {
      // 当前请求在数组中存在时执行函数体
      pending[p].f() //执行取消操作
      pending.splice(p, 1) //把这条记录从数组中移除
    }
  }
}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户没有授权，访问被禁止。',
  404: '请求资源不存在，服务器没有进行操作。',
  405: '请求方法未允许。',
  406: '请求的格式不正确。',
  408: '请求超时。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  505: 'http版本不支持该请求。'
}

// 设置的请求头信息
let AUTH_TOKEN = ''
if (sessionStorage.token) {
  AUTH_TOKEN = sessionStorage.token
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
}

// 请求超时时间
axios.defaults.timeout = 10000
// post请求头 application/json application/x-www-form-urlencoded  multipart/form-data  适用于文件上传
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

axios.defaults.crossDomain = true
axios.defaults.withCredentials = true //设置cross跨域 并设置访问权限 允许跨域携带cookie信息

// 整理数据
axios.defaults.transformRequest = function(data) {
  data = Qs.stringify(data)
  return data
}

// 请求拦截器 可以设置token信息
axios.interceptors.request.use(
  config => {
    // 对请求参数做加密
    // console.log(config.method)
    if (config.method === 'post' || config.method === 'get') {
    } else {
      Message.error('请求方式错误！')
      return new Error('请求方式错误！')
    }
    // // 限制快速点击
    // LimitRapidClick(config)

    // 取消重复点击的操作
    // 这里的标识是用请求地址+参数&请求方式拼接的字符串
    let url = transUrl(config)
    // 在一个ajax发送前执行一下取消操作
    removePending(url)
    config.cancelToken = new cancelToken(c => {
      pending.push({ u: url, f: c })
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    removePending(transUrl(response.config))
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.message.includes('timeout')) {
      // 判断请求异常信息中是否含有超时timeout字符串
      Message.error('请求超时！')
      return Promise.reject(error) // reject这个错误信息
    }
    const { status } = error.response
    if (status) {
      switch (status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          Message.error(codeMessage[status])
          router.push('/login')
          break
        // 403 token过期
        // 清除本地token和清空vuex中token对象
        case 403:
          Message.error(codeMessage[status])
          // 清除token
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('user')
          // store.dispatch('clearCurrentState')
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 404:
        case 405:
        case 406:
        case 408:
        case 410:
        case 422:
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
          Message.error(codeMessage[status])
          break
        // 其他错误，直接抛出错误提示
        default:
          Message.error(error.response.data.msg)
      }
      return Promise.reject(error.response)
    } else {
      Message.error('连接到服务器失败!')
      return Promise.reject(error.response)
    }
  }
)

export default axios

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
