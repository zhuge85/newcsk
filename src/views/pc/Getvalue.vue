<template>
  <div class="get-value" v-highlight>
    <h1>组件之间传值</h1>
    <h2>我是父组件</h2>
    <p>获取环境里变量VUE_APP_BASEURL的值: {{ url }}</p>
    <ul>
      <li>title: {{ title }} </li>
      <li>msg: {{ msg }} </li>
      <li>arr: {{ arr }} </li>
      <li>obj: {{ obj }} </li>
    </ul>
    <div class="item">
      <pre><code>export default {
  data() {
    return {
      val1: '',
      val2: '',
      value: '',
      url: process.env.VUE_APP_BASEURL,
      name: process.env.VUE_APP_MYNAME,
      like: process.env.VUE_APP_LIKE,
      title: '我是父组件',
      msg: '我就是父组件值咯',
      arr: [1, 2, 3, 4, 5, 6],
      obj: { a: 1, b: 2, c: 3 },
      other: '其它信息哈'
    }
  },
  // 向下传值
  provide() {
    return {
      title: this.title,
      url: this.url,
      name: this.name,
      like: this.like
    }
  }
}</code></pre>
    </div>
    <h2>父组件通过ref获取子孙组件的值</h2>
    <div class="item">
      <ul>
        <li>子组件的value2: {{ val1 }}</li>
        <li>孙组件的value3: {{ val2 }}</li>
      </ul>
      <button class="btn btn-pink" @click="getRefChild">获取child的值</button>
      <button class="btn btn-pink" @click="getRefGrandson">获取child的值</button>
    </div>
    <div class="item">
      <pre><code>export default {
  methods: {
    getRefChild() {
      this.val1 = this.$refs.child.value2
    },
    getRefGrandson() {
      this.val2 = this.$refs.child.$refs.grandson.value3
    }
  }
}</code></pre>
    </div>
    <h2>父组件通过ref修改子孙组件的值</h2>
    <div class="item">
      <input v-model="value" class="zhu-input" type="text" placeholder="修改子组件的value">
      <button class="btn btn-green" @click="changeOne">修改子组件</button>
      <button class="btn btn-green" @click="changeTwo">修改孙组件</button>
    </div>
    <div class="item">
      <pre><code>// 子组件
&lt;Two :msg="msg" :arr="arr" :obj="obj" :other="other" ref="child" @change1="change1" @change2="change2"&gt;&lt;/Two&gt;

// 孙组件
&lt;Three v-bind="$attrs" v-on="$listeners" ref="grandson"&gt;&lt;/Three&gt;

// 父组件

export default {
  methods: {
    changeOne() {
      this.$refs.child.value2 = this.value
      this.value = ''
    },
    changeTwo() {
      this.$refs.child.$refs.grandson.value3 = this.value
      this.value = ''
    }
  }
}</code></pre>
    </div>
    <div class="item">
      <Two :msg="msg" :arr="arr" :obj="obj" :other="other" ref="child" @change1="change1" @change2="change2"></Two>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Two: resolve => require(['@c/pc/Two.vue'], resolve)
  },
  data() {
    return {
      val1: '',
      val2: '',
      value: '',
      url: process.env.VUE_APP_BASEURL,
      name: process.env.VUE_APP_MYNAME,
      like: process.env.VUE_APP_LIKE,
      title: '我是父组件',
      msg: '我就是父组件值咯',
      arr: [1, 2, 3, 4, 5, 6],
      obj: {
        a: 1,
        b: 2,
        c: 3
      },
      other: '其它信息哈'
    }
  },
  provide() {
    return {
      title: this.title,
      url: this.url,
      name: this.name,
      like: this.like
    }
  },
  methods: {
    getRefChild() {
      this.val1 = this.$refs.child.value2
    },
    getRefGrandson() {
      this.val2 = this.$refs.child.$refs.grandson.value3
    },
    changeOne() {
      this.$refs.child.value2 = this.value
      this.value = ''
    },
    changeTwo() {
      this.$refs.child.$refs.grandson.value3 = this.value
      this.value = ''
    },
    change1(val) {
      this.msg = val
    },
    change2(val) {
      this.msg = val
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.value = this.$refs.child
      // console.log(this.$refs.child)
    })
  }
}
</script>
