<template>
  <div class="grandson" v-highlight>
    <h2>我是孙组件</h2>
    <ul>
      <li>title3: {{ title3 }} </li>
      <li>value3: {{ value3 }} </li>
    </ul>
    <h2>获取$attrs值</h2>
    <ul>
      <li>$attrs: {{ $attrs }} </li>
    </ul>
    <h2>inject获取父元素值</h2>
    <ul>
      <li>title: {{ title }} </li>
      <li>url: {{ url }} </li>
      <li>name: {{ name }} </li>
      <li>like: {{ like }} </li>
    </ul>
    <div class="item">
      <pre><code>export default {
  data() {
    return {
      value: '',
      title3: '我是孙组件',
      value3: '我就是孙组件里的value',
    }
  },
  inject: ['title', 'url', 'name', 'like']
}</code></pre>
    </div>
    <h2>孙组件修改父元素msg值</h2>
    <div class="item">
      <input v-model="value" class="zhu-input" type="text" placeholder="修改子组件的value">
      <button class="btn btn-green" @click="change">修改父组件</button>
    </div>
    <div class="item">
      <pre><code>// 父组件
&lt;Two :msg="msg" :arr="arr" :obj="obj" :other="other" ref="child" @change1="change1" @change2="change2"&gt;&lt;/Two&gt;

// 子组件
&lt;Three v-bind="$attrs" v-on="$listeners" ref="grandson"&gt;&lt;/Three&gt;

// 孙组件

&lt;div class="item"&gt;
  &lt;input v-model="value" class="zhu-input" type="text" placeholder="修改子组件的value"&gt;
  &lt;button class="btn btn-green" @click="change"&gt;修改父组件&lt;/button&gt;
&lt;/div&gt;

export default {
  methods: {
    change() {
      this.$emit('change2', this.value);
    }
  }
}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      title3: '我是孙组件',
      value3: '我就是孙组件里的value',
    }
  },
  inject: ['title', 'url', 'name', 'like'],
  methods: {
    change() {
      this.$emit('change2', this.value);
    }
  }
}
</script>
