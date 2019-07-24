<template>
  <div class="slot" v-highlight>
    <h1>v-slot</h1>
    <div class="slot-demo">
      <h2>默认插槽</h2>
      <Child :list="list"></Child>

      <h2>自定义内容插槽</h2>
      <Child :list="list">
        <template #header>父组件定义头部</template>
        <template v-for="item in list" #[item.id]>
          {{ item.id }}. 这是第{{ item.id }}条
        </template>
        <template #footer>父组件定义底部</template>
      </Child>

      <h2>插槽内容的解构赋值</h2>
      <Child :list="list">
        <template #header="{ msg,desc }">{{ desc }}</template>
        <template v-for="item in list" #[item.id]="{ msg }">
          {{ item.id }}. {{ msg }}
        </template>
        <template #footer="vlaue">{{ vlaue.desc }}</template>
      </Child>
    </div>
    <div class="item">
      <pre><code>// 子组件
&lt;template&gt;
  &lt;div class="slot-child"&gt;
    &lt;header class="slot-head"&gt;
      &lt;slot name="header" msg="我是插槽的头部" desc="解构方法"&gt;slot：头部&lt;/slot&gt;
    &lt;/header&gt;
    &lt;div class="slot-body"&gt;
      &lt;div class="slot-item" v-for="item in list" :key="item.id"&gt;
        &lt;slot :name="item.id" :msg="'我是第' + item.id + '条消息'"&gt;slot：{ {item.title} }&lt;/slot&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;footer class="slot-foot"&gt;
      &lt;slot name="footer" msg="我是插槽的底部" desc="获取属性"&gt;slot：底部&lt;/slot&gt;
    &lt;/footer&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  }
}
&lt;/script&gt;

// 父组件调用
&lt;h2&gt;默认插槽&lt;/h2&gt;
&lt;Child :list="list"&gt;&lt;/Child&gt;

&lt;h2&gt;自定义内容插槽&lt;/h2&gt;
&lt;Child :list="list"&gt;
  &lt;template #header&gt;父组件定义头部&lt;/template&gt;
  &lt;template v-for="item in list" #[item.id]&gt;
    { { item.id } }. 这是第{ { item.id } }条
  &lt;/template&gt;
  &lt;template #footer&gt;父组件定义底部&lt;/template&gt;
&lt;/Child&gt;

&lt;h2&gt;插槽内容的解构赋值&lt;/h2&gt;
&lt;Child :list="list"&gt;
  &lt;template #header="{ msg,desc }"&gt;{ { desc } }&lt;/template&gt;
  &lt;template v-for="item in list" #[item.id]="{ msg }"&gt;
    { { item.id } }. { { msg } }
  &lt;/template&gt;
  &lt;template #footer="vlaue"&gt;{ { vlaue.desc } }&lt;/template&gt;
&lt;/Child&gt;

export default {
  data() {
    return {
      list: [
        {
          id: 1,
          title: '这是第一条'
        },
        {
          id: 2,
          title: '这是第二条'
        },
        {
          id: 3,
          title: '这是第三条'
        }
      ]
    }
  },
  components: {
    Child: resolve => require(['@c/pc/Child.vue'], resolve)
  }
}</code></pre>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          title: '这是第一条'
        },
        {
          id: 2,
          title: '这是第二条'
        },
        {
          id: 3,
          title: '这是第三条'
        }
      ]
    }
  },
  components: {
    Child: resolve => require(['@c/pc/Child.vue'], resolve)
  }
}
</script>
