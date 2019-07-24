<template>
  <div class="child" v-highlight>
    <h2>我是子组件</h2>
    <ul>
      <li>title2: {{ title2 }} </li>
      <li>value2: {{ value2 }} </li>
    </ul>
    <h2>props获取父元素值</h2>
    <ul>
      <li>msg: {{ msg }} </li>
      <li>arr: {{ arr }} </li>
    </ul>
    <h2>inject获取父元素值</h2>
    <ul>
      <li>title: {{ title }} </li>
      <li>url: {{ url }} </li>
    </ul>
    <div class="item">
      <pre><code>export default {
  components: {
    Three: resolve => require(['@c/pc/Three'], resolve)
  },
  data() {
    return {
      value: '',
      title2: '我是子组件',
      value2: '我是子组件的值哒，嘿嘿！',
    }
  },
  // 孙组件中能直接触发test的原因在于 子组件调用孙组件时 使用 v-on 绑定了$listeners 属性
  // 通过v-bind 绑定$attrs属性，孙组件可以直接获取到父组件中传递下来的props（除了子组件中props声明的）
  props: {
    msg: String,
    arr: Array,
  },
  inject: ['url', 'title']
}</code></pre>
    </div>
    <h2>子组件修改父元素msg值</h2>
    <div class="item">
      <input v-model="value" class="zhu-input" type="text" placeholder="修改子组件的value">
      <button class="btn btn-green" @click="change">修改父组件</button>
    </div>
    <div class="item">
      <pre><code>// 父组件
&lt;Two :msg="msg" :arr="arr" :obj="obj" :other="other" ref="child" @change1="change1" @change2="change2"&gt;&lt;/Two&gt;

// 子组件
&lt;div class="item"&gt;
  &lt;input v-model="value" class="zhu-input" type="text" placeholder="修改子组件的value"&gt;
  &lt;button class="btn btn-green" @click="change"&gt;修改父组件&lt;/button&gt;
&lt;/div&gt;

export default {
  methods: {
    change() {
      this.$emit('change1', this.value);
    }
  }
}</code></pre>
    </div>
    <div class="item">
      <!-- 孙组件中能直接触发test的原因在于 子组件调用孙组件时 使用 v-on 绑定了$listeners 属性 -->
      <!-- 通过v-bind 绑定$attrs属性，孙组件可以直接获取到父组件中传递下来的props（除了子组件中props声明的） -->
      <Three v-bind="$attrs" v-on="$listeners" ref="grandson"></Three>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Three: resolve => require(['@c/pc/Three'], resolve)
  },
  data() {
    return {
      value: '',
      title2: '我是子组件',
      value2: '我是子组件的值哒，嘿嘿！',
    }
  },
  // 孙组件中能直接触发test的原因在于 子组件调用孙组件时 使用 v-on 绑定了$listeners 属性
  // 通过v-bind 绑定$attrs属性，孙组件可以直接获取到父组件中传递下来的props（除了子组件中props声明的）
  props: {
    msg: String,
    arr: Array,
  },
  inject: ['url', 'title'],
  methods: {
    change() {
      this.$emit('change1', this.value);
    }
  }
}
</script>
