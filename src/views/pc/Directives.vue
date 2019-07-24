<template>
  <div class="directives" v-highlight>
    <h1>{{ title }}</h1>
    <h2>自定义高亮插件</h2>
    <div class="item">
      <pre><code>// 导入代码高亮文件
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

// 自定义一个代码高亮指令
Vue.directive('highlight', function(el) {
  let blocks = el.querySelectorAll('pre code')
  // setTimeout(() => {
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  })
  // }, 10)
})
</code></pre>
    </div>
    <h2>自动获取焦点 v-focus</h2>
    <div class="item">
      <input class="zhu-input" type="text" v-focus>
    </div>
    <h2 v-color>自定义颜色 v-color</h2>
    <div class="item">
      <pre><code>export default {
  data() {
    return {
      title: '自定义指令'
    }
  },
  directives: {
    focus: {
      inserted: el => {
        el.focus();
      }
    },
    color: {
      inserted: el => {
        el.style.color = "red";
      }
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
      title: '自定义指令'
    }
  },
  directives: {
    focus: {
      inserted: el => {
        el.focus();
      }
    },
    color: {
      inserted: el => {
        el.style.color = "red";
      }
    }
  }
}
</script>
