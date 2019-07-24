const createXMLHttpRequest = function() {
  let xhr = null
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  return xhr
}
const codeMessage = {
  0: '请求超时,请重试！',
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
  505: 'http版本不支持该请求。',
  default: '请求出错，请重试！'
}
const $ = (function() {
  const ajax = function(
    url,
    data = {},
    type = 'GET',
    async = true,
    timeout = 10000
  ) {
    const promise = new Promise(function(resolve, reject) {
      // console.log(url, data, type, async, timeout)
      const handler = function() {
        // console.log(ajax.readyState)
        if (ajax.readyState === 4) {
          window.clearTimeout(timeoutFlag)
          timeoutFlag = null
          // console.log(ajax.status)
          if (ajax.status === 200) {
            try {
              // resolve(ajax.response)
              resolve(JSON.parse(ajax.responseText))
            } catch (e) {
              reject(e)
            }
            // console.log(ajax.response)
          } else {
            // console.warn(ajax.status, ajax.readyState, ajax.response)
            if (ajax.status === 0) {
              console.error('超时')
            } else if (ajax.status === 400) {
              reject(this.response.msg)
            } else if (ajax.status === 403) {
              console.warn('没有权限')
            } else {
            }
            // reject(this.response)
            reject(codeMessage[ajax.status])
          }
        }
      }

      let token = ''
      if (sessionStorage.token) {
        // localStorage
        token = sessionStorage.token
      }

      // 用于清除缓存
      let random = Math.random()

      // 获取方式转换大写
      let fs = type.toUpperCase()

      // 转换 data
      let str = ''
      if (typeof data == 'object') {
        for (var key in data) {
          str += key + '=' + data[key] + '&'
        }
        data = str.replace(/&$/, '')
      }

      // 创建ajax对象
      let ajax = createXMLHttpRequest()

      // 超时处理
      let timeoutFlag = null
      timeoutFlag = window.setTimeout(() => {
        ajax.abort()
        window.clearTimeout(timeoutFlag)
        timeoutFlag = null
      }, timeout)

      // 处理返回数据
      ajax.onreadystatechange = handler

      // 判断 获取方式
      if (fs == 'GET') {
        if (data) {
          ajax.open('GET', url + '?' + data, async)
        } else {
          ajax.open('GET', url + '?t=' + random, async)
        }
        ajax.responseType = 'json'
        ajax.setRequestHeader('Accept', 'application/json')
        // ajax.setRequestHeader('zdytoken', token)
        ajax.send()
      } else if (fs == 'POST') {
        ajax.open('POST', url, async)
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        ajax.setRequestHeader(
          'Content-type',
          'application/x-www-form-urlencoded'
        )
        ajax.responseType = 'json'
        // ajax.setRequestHeader('Accept', 'application/json')
        // ajax.setRequestHeader('zdytoken', token)
        ajax.send(data)
      } else if (fs == 'JSONP') {
        let script = document.createElement('script'),
          time = new Date(),
          funcName = 'jsonp' + time.getTime()
        if (data) {
          url = url + '?' + data
        }
        if (url.indexOf('?') > 0) {
          url = url + '&callback=' + funcName
        } else {
          url = url + '?callback=' + funcName
        }
        // 注册全局回调函数
        window[funcName] = function(data) {
          // console.log(data)
          // resolve(data)
          try {
            resolve(data)
          } catch (e) {
            reject(e)
          }
          delete window[funcName]
          script.parentNode.removeChild(script)
        }
        // 把script标签加入head，请求服务器
        script.setAttribute('src', url)
        document.getElementsByTagName('head')[0].appendChild(script)
      }
    })
    return promise
  }
  return {
    ajax
  }
})()
export default $

// 调用方式：

// $.ajax(url, data, type, async,timeout).then(function(json) {
//   console.log(json);
// }, function(error) {
//   console.log('出错了', error);
// });
