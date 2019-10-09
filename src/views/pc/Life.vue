<template>
  <div class="life" v-highlight>
    <h1>生命周期</h1>
    <ul>
      <li><strong>beforeCreate：</strong>在new一个vue实例后，只有一些默认的生命周期钩子和默认事件，其他的东西都还没创建。在beforeCreate生命周期执行的时候，data和methods中的数据都还没有初始化。不能在这个阶段使用data中的数据和methods中的方法</li>
      <li><strong>created：</strong>data 和 methods都已经被初始化好了，如果要调用 methods 中的方法，或者操作 data 中的数据，最早可以在这个阶段中操作
      <li><strong>beforeMount：</strong>执行到这个钩子的时候，在内存中已经编译好了模板了，但是还没有挂载到页面中，此时，页面还是旧的</li>
      <li><strong>mounted：</strong>执行到这个钩子的时候，就表示Vue实例已经初始化完成了。此时组件脱离了创建阶段，进入到了运行阶段。 如果我们想要通过插件操作页面上的DOM节点，最早可以在和这个阶段中进行</li>
      <li><strong>beforeUpdate：</strong> 当执行这个钩子时，页面中的显示的数据还是旧的，data中的数据是更新后的， 页面还没有和最新的数据保持同步</li>
      <li><strong>updated：</strong>页面显示的数据和data中的数据已经保持同步了，都是最新的</li>
      <li><strong>beforeDestory：</strong>Vue实例从运行阶段进入到了销毁阶段，这个时候上所有的 data 和 methods ， 指令， 过滤器 ……都是处于可用状态。还没有真正被销毁</li>
      <li><strong>destroyed：</strong>这个时候上所有的 data 和 methods ， 指令， 过滤器 ……都是处于不可用状态。组件已经被销毁了。</li>
    </ul>
    <h2>vue第一次页面加载会触发哪几个钩子函数？</h2>
    <p>beforeCreate、created、beforeMount、mounted</p>
    <h2>DOM 渲染在哪个周期中就已经完成？</h2>
    <p>mounted</p>
    <h2>监听组件的生命周期</h2>
    <div class="item">
      <Child1 ref="one" @hook:mounted="doSomething"></Child1>
    </div>
    <div class="item">
      <pre><code>// 父组件
&lt;Child1 ref="one" @hook:mounted="doSomething"&gt;&lt;/Child1&gt;

&lt;script&gt;
import Child1 from "@c/pc/LifeChild";
export default {
  components: { Child1 },
  methods: {
    doSomething() {
      console.log(this.$refs.one.$el.innerHTML)
      this.$refs.one.$el.innerHTML = '我是子组件完成了mounted后的值'
      console.log('我是子组件完成了mounted后的值')
    }
  }
}
&lt;/script&gt;

// 子组件
&lt;template&gt;
  &lt;div&gt;我是子组件的原始值&lt;/div&gt;
&lt;/template&gt;
</code></pre>
    </div>
    <p>当然这里不仅仅是可以监听mounted，其它的生命周期事件，例如：created，updated等都可以</p>
    <h2>函数式组件</h2>
    <p>函数式组件，即无状态，无法实例化，内部没有任何生命周期处理方法，非常轻量，因而渲染性能高，特别适合用来只依赖外部数据传递而变化的组件。</p>
    <ul>
      <li>在template标签里面标明functional</li>
      <li>只接受props值</li>
      <li>不需要script标签</li>
    </ul>
    <Child2 :items="lists" :item-click="item => (clicked = item)"></Child2>
    <p>显示点击目标: {{ clicked }}</p>
    <div class="item">
      <pre><code>// 父组件
&lt;Child2 :items="lists" :item-click="item => (clicked = item)"&gt;&lt;/Child2&gt;
&lt;p&gt;显示点击目标: { { clicked } }&lt;/p&gt;

&lt;script&gt;
import Child2 from "@c/pc/FuncChild";
export default {
  components: { Child2 },
  data() {
    return {
      clicked: '',
      lists: [
        {
          id: 1,
          name: '小朱'
        },
        {
          id: 2,
          name: '小黄'
        },
        {
          id: 3,
          name: '小黑'
        },
      ]
    }
  }
}
&lt;/script&gt;

// 子组件
&lt;template functional&gt;
  &lt;div&gt;
    &lt;p v-for="item in props.items" :key="item.id" @click="props.itemClick(item);"&gt;{ { item } } &lt;button class="btn btn-blue"&gt;点我试试&lt;/button&gt;&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre>
    </div>
  </div>
</template>

<script>
import Child1 from "@c/pc/LifeChild";
import Child2 from "@c/pc/FuncChild";
export default {
  name: 'life',
  data() {
    return {
      clicked: '',
      lists: [
        {
          id: 1,
          name: '小朱'
        },
        {
          id: 2,
          name: '小黄'
        },
        {
          id: 3,
          name: '小黑'
        },
      ]
    }
  },
  components: {
    Child1, Child2
  },
  methods: {
    doSomething() {
      console.log(this.$refs.one.$el.innerHTML)
      this.$refs.one.$el.innerHTML = '我是子组件完成了mounted后的值'
      console.log('我是子组件完成了mounted后的值')
    }
  }
}
</script>