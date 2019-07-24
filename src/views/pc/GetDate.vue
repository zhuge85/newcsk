<template>
  <div class="get-date" v-highlight>
    <h1>axios/ajax获取数据</h1>
    <div class="item">
      <pre><code>/**
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
}</code></pre>
    </div>
    <h2>axios封装获取数据</h2>
    <h3>获取https://randomuser.me/api/的数据</h3>
    <div class="item">
      <button class="btn btn-green" @click="test1">未封装axios</button>
      <button class="btn btn-green" @click="test2">axios-get</button>
      <button class="btn btn-green" @click="test3">axios-post</button>
    </div>
    <div class="item">
      <pre><code>// 未封装axios
export default {
  methods: {
    test1() {
      this.$loading.show('toast')
      this.$axios.get('/api', { params: { results: 3 } }).then((res) => {
        console.log(res)
        this.$message('获取数据成功！', 'success');
        this.$loading.hide();
      }).catch((err) => {
        this.$loading.hide();
      })
    }
  }
}

// 使用封装 aixos
import { apiUser } from '@/api'
export default {
  methods: {
    test2() {
      this.$loading.show('toast')
      apiUser({ results: 3 }).then(res => {
        console.log(res)
        this.$message('获取数据成功！', 'success');
        this.$loading.hide();
      }).catch(err => {
        this.$loading.hide();
      })
    }
  }
}</code></pre>
    </div>
    <h3>mock生成模拟数据</h3>
    <div class="item">
      <button class="btn btn-green" @click="mockuser">axios获取mock数据</button>
    </div>
    <div class="item">
      <input class="zhu-input" type="text" placeholder="默认用户名：admin" v-model="username">
      <input class="zhu-input" type="password" placeholder="默认密码：123456" v-model="password">
      <button class="btn btn-green" @click="mocklogin">axios-mock仿登录</button>
      <button class="btn btn-pink" @click="ajax1">ajax-mock仿登录</button>
      <button class="btn btn-orange" @click="clear">清除数据</button>
    </div>
    <h3>ajax封装获取数据</h3>
    <div class="item">
      <button class="btn btn-pink" @click="ajax2">ajax获取数据</button>
      <button class="btn btn-pink" @click="ajax3">ajax获取mock</button>
    </div>
    <div class="item">
      <pre><code>// get
this.$loading.show('toast')
this.$http.ajax('/api', { results: 2 }).then(res => {
  console.log(res)
  this.$message('获取数据成功！', 'success');
  this.$loading.hide();
}, err => {
  this.$message(err, 'error');
  this.$loading.hide();
})

// post
let params = { username: this.username, password: this.password }
if (!this.username || !this.password) {
  this.$message('请输入用户名和密码！', 'warning');
  return
}
this.$loading.show('toast')
this.$http.ajax('/api/login', params, 'post').then(res => {
  console.log(res)
  if (res.code === 200) {
    this.$message(res.msg, 'success');
  } else {
    this.$message(res.msg, 'error');
  }
  this.$loading.hide();
}, err => {
  this.$message(err, 'error');
  this.$loading.hide();
})</code></pre>
    </div>
  </div>
</template>

<script>
import { apiUser, apiUser2, apiUser3, mockuser, mocklogin } from '@/api'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    clear() {
      this.username = ''
      this.password = ''
    },
    test1() {
      this.$loading.show('toast')
      this.$axios.get('/api', { params: { results: 3 } }).then((res) => {
        console.log(res)
        this.$message('获取数据成功！', 'success');
        this.$loading.hide();
      }).catch((err) => {
        this.$loading.hide();
      })
    },
    test2() {
      this.$loading.show('toast')
      apiUser({ results: 3 }).then(res => {
        console.log(res)
        this.$message('获取数据成功！', 'success');
        this.$loading.hide();
      }).catch(err => {
        this.$loading.hide();
      })
    },
    test3() {
      this.$loading.show('toast')
      apiUser2({ results: 3 }).then(res => {
        console.log(res)
        this.$message('获取数据成功！', 'success');
        this.$loading.hide();
      }).catch(err => {
        this.$loading.hide();
      })
    },
    mockuser() {
      this.$loading.show('toast')
      mockuser().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message(res.msg, 'success');
        }
        this.$loading.hide();
      }).catch(err => {
        this.$loading.hide();
      })
    },
    mocklogin() {
      let params = { username: this.username, password: this.password }
      if (!this.username || !this.password) {
        this.$message('请输入用户名和密码！', 'warning');
        return
      }
      this.$loading.show('toast')
      mocklogin(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message(res.msg, 'success');
        } else {
          this.$message(res.msg, 'error');
        }
        this.$loading.hide();
      }).catch(err => {
        this.$message(err.msg, 'error');
        this.$loading.hide();
      })
    },
    ajax2() {
      this.$loading.show('toast')
      this.$http.ajax('/api', { results: 2 }).then(res => {
        console.log(res)
        this.$message('获取数据成功！', 'success');
        this.$loading.hide();
      }, err => {
        this.$message(err, 'error');
        this.$loading.hide();
      })
    },
    ajax3() {
      this.$loading.show('toast')
      this.$http.ajax('/api/users').then(res => {
        console.log(res)
        this.$message('获取数据成功！', 'success');
        this.$loading.hide();
      }, err => {
        this.$message(err, 'error');
        this.$loading.hide();
      })
    },
    ajax1() {
      let params = { username: this.username, password: this.password }
      if (!this.username || !this.password) {
        this.$message('请输入用户名和密码！', 'warning');
        return
      }
      this.$loading.show('toast')
      this.$http.ajax('/api/login', params, 'post').then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message(res.msg, 'success');
        } else {
          this.$message(res.msg, 'error');
        }
        this.$loading.hide();
      }, err => {
        this.$message(err, 'error');
        this.$loading.hide();
      })
    },
    ajax4() {
      this.$loading.show('toast')
      // this.$http.ajax('http://39.100.71.143:8080/dept/selectAll').then(res => {
      // this.$http.ajax('/api3/dept/selectAll').then(res => {
      // this.$axios.get('http://39.100.71.143:8080/dept/selectAll').then(res => {
      this.$axios.get('/api3/dept/selectAll').then((res) => {
        console.log(res)
        this.$message('获取数据成功！', 'success');
        this.$loading.hide();
      }, err => {
        this.$message(err, 'error');
        this.$loading.hide();
      })
    },
  }
}
</script>
