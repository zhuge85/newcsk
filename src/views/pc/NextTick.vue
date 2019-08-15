<template>
  <div class="nextTick" v-highlight>
    <h1>nextTick</h1>
    <div class="item">
      <button class="btn btn-primary" @click="showDom">显示div</button>
      <button class="btn btn-primary" @click="showText">获取div内容</button>
    </div>
    <ul>
      <li>demo的内容 : {{ text }}</li>
      <li>demo的宽度 : {{ width }}</li>
      <li>demo的高度 : {{ height }}</li>
    </ul>
    <div class="demo" ref="demo" v-if="show">
      <div class="demo-inner">
        <p>这是一段文本</p>
        <input class="zhu-input" type="text" id="keywords">
      </div>
    </div>
    <div class="item">
      <pre><code>export default {
  data() {
    return {
      show: false,
      list: [],
      text: '',
      width: '',
      height: ''
    }
  },
  created() {
    this.composeList()
    console.log('created获取li个数：' + document.querySelectorAll('.list li').length)
    this.$nextTick(() => {
      console.log('nextTick获取li个数：' + document.querySelectorAll('.list li').length)
    })
  },
  methods: {
    showDom() {
      this.show = !this.show
      if (this.show) {
        this.$nextTick(() => {
          this.show ? document.getElementById("keywords").focus() : ''
          this.$refs.demo.scrollTop = this.$refs.demo.scrollHeight
        })
      }
    },
    showText() {
      if (this.show) {
        this.text = this.$refs.demo.innerHTML
        this.width = this.$refs.demo.offsetWidth
        this.height = this.$refs.demo.offsetHeight
      } else {
        this.text = `"TypeError: Cannot read property 'innerHTML' of null"`
        this.width = `"TypeError: Cannot read property 'offsetWidth' of undefined"`
        this.height = `"TypeError: Cannot read property 'offsetHeight' of undefined"`
      }
    },
    composeList() {
      let count = 2000
      console.time('生成li用时');
      for (let i = 0; i &gt; count; i++) {
        this.$set(this.list, i, 'list测试信息～～呜啦啦啦' + i)
      }
      this.$nextTick(() => {
        // DOM 更新了
        console.timeEnd('生成li用时');
      })
    },
  }
}</code></pre>
    </div>
    <ul class="list">
      <li v-for="(item,index) in list" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
// import { timestampToTime } from '@a/js/tools'
export default {
  data() {
    return {
      show: false,
      list: [],
      text: '',
      width: '',
      height: ''
    }
  },
  created() {
    this.composeList()
    console.log('created获取li个数：' + document.querySelectorAll('.list li').length)
    this.$nextTick(() => {
      console.log('nextTick获取li个数：' + document.querySelectorAll('.list li').length)
    })
  },
  methods: {
    showDom() {
      this.show = !this.show
      if (this.show) {
        this.$nextTick(() => {
          this.show ? document.getElementById("keywords").focus() : ''
          this.$refs.demo.scrollTop = this.$refs.demo.scrollHeight
        })
      }
    },
    showText() {
      if (this.show) {
        this.text = this.$refs.demo.innerHTML
        this.width = this.$refs.demo.offsetWidth
        this.height = this.$refs.demo.offsetHeight
      } else {
        this.text = `"TypeError: Cannot read property 'innerHTML' of null"`
        this.width = `"TypeError: Cannot read property 'offsetWidth' of undefined"`
        this.height = `"TypeError: Cannot read property 'offsetHeight' of undefined"`
      }
    },
    composeList() {
      let count = 2000
      console.time('生成li用时');
      for (let i = 0; i < count; i++) {
        this.$set(this.list, i, 'list测试信息～～呜啦啦啦' + i)
      }
      this.$nextTick(() => {
        // DOM 更新了
        console.timeEnd('生成li用时');
      })
    },
  }
}
</script>
