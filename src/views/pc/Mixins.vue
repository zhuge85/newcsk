<template>
  <div class="mixins" v-highlight>
    <h1>{{ title }}</h1>
    <h2>mixins 是一种分发Vue组件中可复用功能的一种灵活方式。</h2>
    <h2>数据对象在内部分进行浅合并（一层属性深度），在和组件的数据发生冲突时， 以组件数据优先 。</h2>
    <div class="item">
      <button class="btn btn-primary" @click="mixinsShow">调用mixinsShow</button>
    </div>
    <h2>创建混入对象</h2>
    <div class="item">
      <pre><code>export const Index = {
  date() {
    return {
      value: '我是mixins中的msg'
    }
  },
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log(`i'm msg from Mixins`)
    },
    show() {
      this.$message('如果组件中有同名，以组件为准', 'success')
    },
    mixinsShow() {
      this.$message(this.value, 'success')
    }
  }
}</code></pre>
    </div>
    <h2>在组件内引入并引用混入</h2>
    <div class="item">
      <pre><code>import { Index } from '@/mixins/getMixins'

export default {
  mixins: [Index],
  methods: {
    show() {
      this.$message(this.value, 'success')
    }
  }
}
</code></pre>
    </div>
  </div>
</template>

<script>
import { Index } from '@/mixins/getMixins'
export default {
  mixins: [Index],
  data() {
    return {
      title: 'Mixins混入'
    }
  },
  methods: {
    show() {
      this.$message(this.value, 'success')
    }
  }
}
</script>
