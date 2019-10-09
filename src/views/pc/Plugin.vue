<template>
  <div class="plugin" v-highlight>
    <h1>自定义插件</h1>
    <div class="item">
      <input class="zhu-input" v-focus type="text" @click="test($event)" placeholder="请选择日期">
      <input class="zhu-input" v-focus type="text" @click="test($event)" placeholder="请选择日期">
    </div>
    <h2>自定义消息组件</h2>
    <div class="item">
      <button class="btn btn-info" @click="msg(0)" type="info">消息提示</button>
      <button class="btn btn-success" @click="msg(1)" type="success">成功提示</button>
      <button class="btn btn-warning" @click="msg(2)" type="warning">警告提示</button>
      <button class="btn btn-danger" @click="msg(3)" type="danger">错误提示</button>
      <button class="btn btn-primary" @click="msg2()" type="success">全局调用</button>
    </div>
    <h2>自定义toast</h2>
    <div class="item">
      <button class="btn btn-green" @click="toast" type="primary">原型调用</button>
      <button class="btn btn-green" @click="globaltoast" type="primary">全局调用</button>
    </div>
    <h2>自定义提示框</h2>
    <div class="item">
      <button class="btn btn-purple" type="primary" @click.stop="msgbox">msgbox</button>
    </div>
    <h2>自定义弹框</h2>
    <div class="item">
      <button class="btn btn-orange" type="primary" @click.stop="dialog">dialog</button>
    </div>
    <h2>自定义全局loading</h2>
    <div class="item">
      <button class="btn btn-blue" type="primary" @click.stop="msg4">loading</button>
      <button class="btn btn-pink" type="primary" @click.stop="msg5">loading</button>
    </div>
    <h2>vue组件全局注册 写法和用法</h2>
    <h3>先在plugin文件夹下创建demo文件夹</h3>
    <p>1. 创建一个自己Demo组件 那么我们就先在demo文件夹下创建 Demo.vue</p>
    <div class="item">
      <pre><code>&lt;template&gt;
  &lt;div class='demo-box'&gt;I'm a demo!&lt;/div&gt;
&lt;/template&gt;
</code></pre>
    </div>
    <p>2. 继续在demo文件夹下建一个相关的index.js文件</p>
    <div class="item">
      <pre><code>import DemoComponent from './Demo'

const Demo = {
  install: function(Vue) {
    Vue.component('Demo', DemoComponent)
  }
}

export default Demo</code></pre>
    </div>
    <p>3. 在主文件main.js中 引入刚才定义的组件 和 应用 这个组件了</p>
    <div class="item">
      <pre><code>// 引入 Demo
import Demo from './plugin/demo'
Vue.use(Demo)</code></pre>
    </div>
    <p>4. 在任何想用这个组件的地方插入&lt;Demo&gt;&lt;/Demo&gt;了 组件相应的样式和js代码可以直接写在第一步中的文件之中</p>
    <Demo></Demo>
  </div>
</template>

<script>
import { Toast } from '@/plugin/toast'
import { Message } from '@/plugin/message'
export default {
  directives: {
    focus: {
      inserted(el) {
        el.onfocus = () => {
          // console.log(el)
        }
      }
    }
  },
  data() {
    return {
      msgType: {
        0: 'info',
        1: 'success',
        2: 'warning',
        3: 'error'
      },
      type: 0,
      list: [
        {
          id: 1,
          title: '活动名称',
          require: true,
          type: 'text',
          value: ''
        },
        {
          id: 2,
          title: '活动名称',
          type: 'password',
          value: ''
        },
        {
          id: 3,
          title: '活动区域',
          type: 'select',
          value: 1,
          arr: [
            {
              id: 1,
              title: '区域一'
            },
            {
              id: 2,
              title: '区域二'
            },
            {
              id: 3,
              title: '区域三'
            }
          ]
        },
        {
          id: 4,
          title: '活动形式',
          type: 'textarea',
          value: ''
        },
        {
          id: 5,
          title: '活动性质',
          type: 'checkbox',
          value: [],
          arr: [
            {
              id: 1,
              title: '美食/餐厅线上活动',
              checked: false
            },
            {
              id: 2,
              title: '地推活动',
              checked: false
            },
            {
              id: 3,
              title: '线下主题活动',
              checked: false
            },
            {
              id: 4,
              title: '线下场地免费',
              checked: false
            }
          ]
        },
        {
          id: 6,
          title: '线上品牌商赞助',
          type: 'radio',
          value: '',
          arr: [
            {
              id: 1,
              title: '线上品牌商赞助'
            },
            {
              id: 2,
              title: '线下场地免费'
            }
          ]
        }
      ]
    }
  },
  created() {
    // this.$nextTick(() => {})
  },
  methods: {
    test(dom) {
      this.$calendar({ dom })
    },
    msg(type) {
      if (!type) {
        type = this.type % 4
        this.type++
      }
      this.$message('自定义消息提示组件', this.msgType[type])
    },
    msg2() {
      this.type = this.type % 4
      Message('全局调用', this.msgType[this.type])
      this.type++
    },
    toast() {
      this.$toast({
        message: "原型调用，自定义时间",
        time: 3000
      });
    },
    globaltoast() {
      Toast({
        message: "全局调用",
        time: 5000
      });
    },
    msgbox() {
      this.$msgbox({
        title: '温馨提示',
        cancel: '取消',
        confirm: '确定按钮',
        content: '这里是消息弹出内容',
        className: 'pop-custom'
      }).then(() => {
        console.log("我点击了确定按钮")
      }).catch((err) => {
        console.log("点击取消");
      })
    },
    dialog() {
      this.$dialog({
        title: '温馨提示',
        cancel: '取消按钮',
        confirm: '确定按钮',
        content: this.list,
        className: 'pop-custom-22222'
      }).then((res) => {
        Object.keys(this.list).forEach(item => {
          if (this.list[item].type === 'checkbox') {
            this.list[item].value = this.list[item].arr.filter(val => val.checked).map(val => val.id)
          }
        })
        console.log('我点击了确定按钮')
      }).catch((err) => {
        console.log("点击取消");
      })
    },
    msg4() {
      this.$loading.show('loading')
      setTimeout(() => {
        this.$loading.hide()
      }, 2000);
    },
    msg5() {
      this.$loading.show('toast')
      setTimeout(() => {
        this.$loading.hide()
      }, 2000);
    }
  }
}
</script>
<style lang="less">
</style>
