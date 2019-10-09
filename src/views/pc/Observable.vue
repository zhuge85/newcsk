<template>
  <div class="observable" v-highlight>
    <h1>Vue.observable 实现简单store管理</h1>
    <p>随着组件的细化，就会遇到多组件状态共享的情况， Vuex当然可以解决这类问题，不过就像 Vuex官方文档所说的，如果应用不够大，为避免代码繁琐冗余，最好不要使用它。</p>
    <p>今天我们介绍的是 vue.js 2.6 新增加的 Observable API ，通过使用这个 api 我们可以应对一些简单的跨组件数据状态共享的情况。</p>
    <h2>首先创建 observable/index.js，包含一个 store和一个 mutations，分别用来指向数据和处理方法。</h2>
    <div class="item">
      <pre><code>import Vue from 'vue';

export const store = Vue.observable({
  money: 0,
  name: '小朱'
})

export const mutations = {
    setMoney(money){
        store.money = money;
    },
    changeName(name) {
        store.name = name;
    }
}
</code></pre>
    </div>
    <h2>然后在组件中引用，在组件里使用数据和方法：</h2>
    <div class="item">
      <pre><code>// 组件
&lt;template&gt;
  &lt;div class="item"&gt;
    &lt;p&gt;我的资金：{ { money } }&lt;/p&gt;
    &lt;button class="btn btn-pink" @click="setMoney(money + 100)"&gt;+100&lt;/button&gt;
    &lt;button class="btn btn-green" @click="setMoney(money - 100)"&gt;-100&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="item"&gt;
    &lt;p&gt;我的名字：{ { name } }&lt;/p&gt;
    &lt;input v-model="value" class="zhu-input" type="text" placeholder="修改名字"&gt;
    &lt;button class="btn btn-blue" @click="changeName"&gt;橙色&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { store, mutations } from "../../observable";
export default {
  name: "observable",
  data() {
    return {
      value: ''
    }
  },
  computed: {
    money() {
      return store.money;
    },
    name() {
      return store.name;
    }
  },
  methods: {
    setMoney: mutations.setMoney,
    changeName() {
      if (!this.value) {
        this.$message('value不能为空')
      } else {
        mutations.changeName(this.value)
        this.value = ''
      }
    }
  }
}
&lt;/script&gt;
</code></pre>
    </div>
    <div class="item">
      <p>我的资金：{{ money }}</p>
      <button class="btn btn-pink" @click="setMoney(money + 100)">+100</button>
      <button class="btn btn-green" @click="setMoney(money - 100)">-100</button>
    </div>
    <div class="item">
      <p>我的名字：{{ name }}</p>
      <input v-model="value" class="zhu-input" type="text" placeholder="修改名字">
      <button class="btn btn-blue" @click="changeName">橙色</button>
    </div>
    <div class="item">
      <p>如果当前项目vue版本低于2.6，要使用Vue.observable()，就必须要升级，升级 vue 和 vue-template-compiler，两者的版本需要同步，如果不同步项目会报错。</p>
    </div>
    <div class="item">
      <pre><code>// 升级vue版本
npm update vue -S 或者 yarn add vue -S
npm update vue-template-compiler -D 或者 yarn add vue-template-compiler -D</code></pre>
    </div>
  </div>
</template>

<script>
import { store, mutations } from "../../observable";
export default {
  name: "observable",
  data() {
    return {
      value: ''
    }
  },
  computed: {
    money() {
      return store.money;
    },
    name() {
      return store.name;
    }
  },
  methods: {
    setMoney: mutations.setMoney,
    changeName() {
      if (!this.value) {
        this.$message('value不能为空', 'error')
      } else {
        mutations.changeName(this.value)
        this.value = ''
      }
    }
  }
}
</script>